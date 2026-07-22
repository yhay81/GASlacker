# Verification Plan

## Purpose

Confirm that GASlacker can reliably call the Slack Web API from Google Apps Script.

## Scope

- Build output generation and how it is published
- GET / JSON POST / form POST / file POST request paths
- Waiting and retrying on HTTP 429 rate limits
- Parsing the response JSON and error representation
- Calling with argument objects
- OAuth v2 / configuration-token rotation / Socket Mode / modals / large file uploads
- Usability as a library (`GASlacker.methods`)

## Prerequisites

- Node.js 22.12 or later
- A test Slack workspace and Slack App
- A test Bot Token already saved in Script Properties
- A test channel (e.g. `#gaslacker-test`)
- Client ID / Client Secret / Redirect URI for OAuth v2
- An App-Level Token (`xapp-`) for Socket Mode
- A `trigger_id` for modal verification
- If a given feature cannot be verified, record why it was skipped

## Minimal Verification Set (required)

1. The build succeeds
2. `auth.test` succeeds from GAS
3. `chat.postMessage` succeeds via JSON POST
4. `slack.call` succeeds via GET
5. `oauth.v2.access` and `tooling.tokens.rotate` return their expected errors via token-free
   form POST
6. `files.uploadV2` succeeds via file POST

## Detailed Verification

### 1. Build / distribution check

**Purpose**: confirm the library builds a usable bundle
**Steps**

```sh
pnpm run build
```

**Expected result**

- `dist/bundle.js` is generated
- `global.methods` exists inside `dist/bundle.js`

### 2. Utility check

**Purpose**: confirm the basic parameter conversion behavior is correct
**Steps**

```sh
pnpm run test
```

**Expected result**

- All tests in `tests/util.spec.ts` pass

### 3. GAS smoke test

**Purpose**: confirm GAS can call the Slack API with authorization
**Steps**

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function smoke() {
  Logger.log(slack.auth.test());
  Logger.log(slack.api.test({ ping: 'pong' }));
  Logger.log(slack.chat.postMessage({ channel: 'C123', text: 'GASlacker smoke' }));
}
```

**Expected result**

- `auth.test` returns `ok: true`
- `api.test` returns `ok: true`
- `chat.postMessage` returns `ok: true` and posts to the channel

### 4. GET / JSON POST check

**Purpose**: confirm the GET and JSON POST request paths are correct
**Steps**

- GET: `auth.test` or `conversations.list`
- JSON POST: `chat.postMessage` / `chat.update`
- GET (arbitrary method): `slack.call('conversations.list', { limit: 1 }, 'get')`
  **Expected result**
- Returns `ok: true`
- The GET query string is attached correctly

### 5. Token-free form POST check

**Purpose**: confirm form-encoded exchange requests omit unrelated bearer tokens
**Steps (example)**

- Run `oauth.v2.access` against a test app
  (even a failure confirms the request path, as long as `ok: false` with `error` comes back)
- Run `tooling.tokens.rotate` with `refresh_token: 'verification-dummy'` through a client that
  was constructed with a normal Slack token
  **Expected result**
- Returns `ok: true`, or `ok: false` with `error`, as JSON
- `tooling.tokens.rotate` returns `invalid_refresh_token`, not `invalid_auth`

### 6. File upload check

**Purpose**: confirm the `files.uploadV2` request path (a 3-step composite) is correct
**Note**: `files.uploadV2` is not itself an HTTP endpoint, so the implementation runs
`files.getUploadURLExternal` → POST to the upload URL → `files.completeUploadExternal`
internally, in that order.
**Steps (example)**

```JavaScript
function upload() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt');
  Logger.log(slack.files.uploadV2({ channel_id: 'C123', file: blob }));
}
```

**Expected result**

- Returns `ok: true`
- The file appears in the channel

### 7. Individual upload steps check

**Purpose**: confirm the `files.getUploadURLExternal` / `files.completeUploadExternal` request paths are correct
**Steps (example)**

```JavaScript
function uploadLarge() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt');
  var res = slack.files.getUploadURLExternal({ filename: 'hello.txt', length: blob.getBytes().length });
  var uploadUrl = res.upload_url;
  var fileId = res.file_id;
  UrlFetchApp.fetch(uploadUrl, { method: 'post', payload: blob });
  Logger.log(slack.files.completeUploadExternal({ files: [{ id: fileId, title: 'hello.txt' }], channel_id: 'C123' }));
}
```

**Expected result**

- Returns `ok: true`
- The file appears in the channel

### 8. Socket Mode check

**Purpose**: confirm `apps.connections.open` succeeds
**Steps (example)**

```JavaScript
function socketMode() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_APP_LEVEL_TOKEN');
  var slack = GASlacker.methods(token);
  Logger.log(slack.apps.connections.open());
}
```

**Expected result**

- Returns `ok: true`
- `url` starts with `wss://`

### 9. Modal check

**Purpose**: confirm `views.open` succeeds
**Steps (example)**

```JavaScript
function openModal(triggerId) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  Logger.log(slack.views.open({
    trigger_id: triggerId,
    view: { type: 'modal', title: { type: 'plain_text', text: 'GASlacker' }, blocks: [] }
  }));
}
```

**Expected result**

- Returns `ok: true`

### 10. Failure-path check

**Purpose**: confirm `ok: false` comes back on errors
**Steps**

- Run `auth.test` with an invalid token
- Run `call` with a nonexistent API name
  **Expected result**
- Returns `ok: false` with `error`

### 11. Rate-limit check (optional)

**Purpose**: confirm waiting and retrying on 429 works
**Steps**

- Trigger a 429 with high-frequency calls
- Unit-test `Retry-After` values at 300 and 301 seconds, repeated 300-second waits, and invalid
  retry limits
  **Expected result**
- Retries after waiting for the number of seconds in `retry-after`
- At 301 seconds, or before cumulative waits exceed five minutes, returns `ratelimited`
  immediately
- Rejects retry limits outside the integer range 0 through 10 before making a request

### 12. Library publication check

**Purpose**: confirm the library can be used from another script as a library
**Steps**

- Paste `dist/bundle.js` into Apps Script and publish it as a library
- Add it as a library from a separate Apps Script project and call `GASlacker.methods`
  **Expected result**
- `GASlacker.methods` is reachable
- `auth.test` succeeds

## Minimal Pass Criteria

- The minimal verification set passes in full
- `ok: true` is obtained on GAS
- Every feature documented in the README has a passing detailed check, or a recorded reason it was skipped

## How to Keep Records

- Note the run date/time, token type (Bot/User), channel ID, and `ok`/`error`
- On failure, record the `error` value and the reproduction steps

## Verification Log (no token required)

- Run at: 2026-01-01 01:00
- Environment: Node.js v24.12.0
- Commands run: `pnpm run test` / `pnpm run build`
- Result: Lint / utility / method / entry-point tests all passed; confirmed `dist/bundle.js` is generated and `global.methods` exists
- Notes: In addition to GET/JSON POST/form POST/file POST and 429 wait-and-retry, unit tests confirmed no-Authorization-header behavior, `Users.setPhoto`, and nested-client routing (no real API calls were made)

## Automated Verification Harness

`scripts/verify-live.mjs` runs this document's minimal verification set against the real Slack
API. It evaluates `dist/bundle.js` itself (the actual distributable) with GAS global stubs, so it
doubles as a bundle smoke test.

```sh
pnpm run verify:live                     # no token: confirms request paths stay alive
SLACK_ACCESS_TOKEN=xoxb-... \
SLACK_TEST_CHANNEL=C0123456789 \
pnpm run verify:live                     # with token: real post + real upload
```

## Verification Log (endpoint existence check)

- Run at: 2026-07-22
- Method: ran `curl -X POST https://slack.com/api/<method>` without a token for every method,
  judging existence (`not_authed`) versus discontinuation (`unknown_method`)
- Result: confirmed all 116 endpoints the library provided at the time actually exist.
  `files.uploadV2` (not an HTTP endpoint), `files.comments.add/edit/delete`, and
  `apps.permissions.*` were judged discontinued and removed or replaced with a composite
  implementation. The newly added `canvases.*` / `conversations.canvases.create` /
  `assistant.threads.*` were also confirmed to exist.
- Notes: token-based real-API verification (the minimal verification set) was not yet performed;
  recommended before release.

## Verification Log (request-path smoke test — verify:live)

- Run at: 2026-07-22
- Method: ran `pnpm run verify:live` (no-token mode) against the real Slack API
- Result: all 6 checks passed — `api.test` returned `ok: true`; the authorized GET, GET via
  `call`, form POST, JSON POST, and step 1 of `uploadV2` all answered with the correct error
  (`not_authed` / `invalid_code`), confirming the request paths and response parsing stay alive
- Notes: real posting and real upload (token mode) were not yet performed

## Verification Log (library publication)

- Run at: 2026-07-22
- Method: pushed the v1.0.0 bundle via `clasp push` and created version 3 with `clasp create-version`
- Result: published as version 3 of script ID `101aZZYpRRnr5AGkVIo8t_yo4kHb7xryLfq3w-HVPpQ4fX0Tkxv3UJyzc`
- Notes: for third parties to add it as a library, the script's sharing setting must be enabled (Anyone with the link: Viewer)

## Verification Log (minimal verification set with a real token — complete)

- Run at: 2026-07-22
- Method: ran `pnpm run verify:live` with a Bot token and `#testchannel` (C9SPERADS)
- Result: all 6 items in the minimal verification set passed. Confirmed `auth.test` /
  `conversations.list` / `chat.postMessage` (real post) / `oauth.v2.access` (form) /
  `files.uploadV2` (real upload, 3 steps) against the real API
- Finding and fix: `files.getUploadURLExternal` rejects JSON bodies with `invalid_arguments`
  (the official docs read as if JSON is accepted, but it is not in practice). Fixed to use form
  encoding; all items then passed (v1.0.1)
- The token used was revoked with `auth.revoke` after verification completed (confirmed
  `account_inactive`)

## Verification Log (full API coverage — v1.1.0)

- Run at: 2026-07-22
- Method: diffed the official node-slack-sdk method list (267 entries) against the
  implementation, then verified all 52 missing non-admin methods live (via the `unknown_method`
  check) before implementing them
- Result: all 168 endpoints in the bundle are confirmed to exist. GET-acceptance for read
  methods was also confirmed live.
- Notes: the `pnpm run verify:live` (no-token) request-path smoke test also passed

## Verification Log (authorization requirements — v1.4.0)

- Run at: 2026-07-22
- Method: re-ran the `unknown_method` liveness check over all 168 endpoints in the bundle, and
  probed the OAuth-family and tooling exchange endpoints both with and without an
  `Authorization: Bearer` header
- Result: all 168 endpoints are alive (no `unknown_method`). Authorization turns out to be
  required in one direction and rejected in the other:
  `openid.connect.userInfo` answers `not_authed` without a header and `invalid_auth` with one,
  while `openid.connect.token` and `oauth.v2.access` answer `invalid_code` (their normal path)
  without a header but `invalid_auth` with one. `tooling.tokens.rotate` likewise reaches
  `invalid_refresh_token` without a header but stops at `invalid_auth` with one.
- Finding and fix: `openid.*` was constructed with a null token, so `openid.connect.userInfo`
  could never authenticate. `userInfo` now carries the token from `methods()` and the code
  exchange stays token-free; re-running through `dist/bundle.js` against the real API,
  `userInfo` reaches the auth layer (`invalid_auth` on a dummy token) and the two exchanges
  still answer `invalid_code` (v1.4.0)
- Finding and fix: `tooling.*` inherited the main client's bearer token even though rotation
  authenticates with `refresh_token`. It is now constructed token-free; re-running through the
  bundle reaches `invalid_refresh_token` even when the main client has a token (v1.4.0).
- Also checked: which `Content-Type` each request style should send. A form body with
  `; charset=UTF-8` answers `superfluous_charset`, and a JSON body without it answers
  `missing_charset`, so form POST drops the suffix while JSON POST keeps it. GET carries no
  body and warns either way. Re-running through the bundle, GET / JSON POST / form POST all
  come back with no `warning` field.
- Notes: `pnpm run verify:live` (no-token) passed all 7 checks afterwards

## Verification Log (toolchain refresh — v1.2.0)

- Run at: 2026-07-22
- Method: after upgrading to TypeScript 7.0 (native Go compiler) / Vite 8 (Rolldown) / oxlint
  1.75 / oxfmt 0.60 / pnpm 11, confirmed all tests (210), `pnpm run verify:live` (no-token
  request-path smoke test), and the bundle structure (GAS stub, `global.methods`, `exports`)
- Result: everything passed. The build is roughly 3x faster, and `dist/types/` now ships type
  definitions.
