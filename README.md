# GASlacker

[![CI](https://github.com/yhay81/GASlacker/actions/workflows/ci.yml/badge.svg)](https://github.com/yhay81/GASlacker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)

**New here? Try the [5-minute quickstart guide](https://yhay81.github.io/GASlacker/)** — also
available in 日本語, 简体中文, 한국어, Español, and Português via the language switcher.

A lightweight Slack Web API client for Google Apps Script.

- 168 Slack Web API methods organized like the official SDKs: `slack.chat.postMessage({...})` —
  full parity with Slack's official SDK method list (minus `admin.*` and discontinued APIs)
- Bearer authorization + JSON requests, with automatic retry on rate limits (HTTP 429, honoring `Retry-After`)
- File uploads implemented with the current 3-step external upload flow (`files.uploadV2`)
- OAuth v2 (`oauth.v2.access`) and modern APIs such as `canvases.*` / `assistant.threads.*`
- Zero runtime dependencies — a single `bundle.js` for the GAS V8 runtime
- Cursor pagination helper: `slack.paginate('conversations.list', { limit: 200 }, 'get')`
- Escape hatch for any method: `slack.call('some.method', params)`

Every endpoint name in this library is verified to exist on the live Slack API
(dead endpoints answer `unknown_method`; see [tests/routing.spec.ts](tests/routing.spec.ts)),
and a [weekly CI job](.github/workflows/parity.yml) checks parity against Slack's
official SDK method list — when Slack ships new APIs, an issue is filed automatically.

## Installation

No build step is required — [`dist/bundle.js`](dist/bundle.js) in this
repository is the ready-to-use distributable. Choose one:

**A. Add the published library (easiest)**

1. In your Apps Script project, open **Libraries** and add this script ID:

   ```
   101aZZYpRRnr5AGkVIo8t_yo4kHb7xryLfq3w-HVPpQ4fX0Tkxv3UJyzc
   ```

2. Pick the latest version, keep the identifier `GASlacker`, and call
   `GASlacker.methods(token)`.

To pin your own copy instead, create a standalone Apps Script project, paste
[`dist/bundle.js`](dist/bundle.js) into it, and deploy it as your own library.

**B. Paste directly into your project**

Copy [`dist/bundle.js`](dist/bundle.js) into your Apps Script project as a
script file and call `methods(token)` directly (no `GASlacker.` prefix).

**C. Push with clasp**

Clone this repository, copy the local clasp configuration template, and replace
`YOUR_SCRIPT_ID` with your own Apps Script project ID:

```sh
cp .clasp.example.json .clasp.json
pnpm install
pnpm run deploy   # build + clasp push
```

To rebuild `dist/bundle.js` yourself, run `pnpm install && pnpm run build`
(Node.js 22.12+ and pnpm required).

## Quick start

Save your bot token in Script Properties as `SLACK_ACCESS_TOKEN`, then:

```javascript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
var slack = GASlacker.methods(token)

function hello() {
  var res = slack.chat.postMessage({ channel: 'C0123456789', text: 'Hello World' })
  if (!res.ok) {
    Logger.log(res.error)
  }
}
```

Every method returns a response object — check `ok` / `error` yourself. Slack JSON responses
are preserved; an exhausted HTTP 429 is normalized as described under rate-limit retries below.

### Receiving Slack events safely

Do not process Slack Events API requests directly in an Apps Script `doPost` Web App.
Slack requires the raw request body plus the `X-Slack-Signature` and
`X-Slack-Request-Timestamp` headers for request verification, but Apps Script does not expose
incoming request headers to `doPost(e)`. A public handler that acts on the JSON body alone can
be forged by anyone who learns its URL.

Receive and verify events in an HTTP service that exposes request headers (for example, Cloud
Run or Cloud Functions), acknowledge them within three seconds, and keep GASlacker for outbound
Web API calls from trusted Apps Script workflows. See Slack's
[request verification](https://docs.slack.dev/authentication/verifying-requests-from-slack/)
and [Events API](https://docs.slack.dev/apis/events-api/) documentation.

### Calling any method

```javascript
slack.call('chat.postMessage', { channel: 'C0123456789', text: 'Hi' })
slack.call('conversations.list', { limit: 20 }, 'get')

// Token rotation is form-encoded and must not carry an Authorization header
var tokenFree = GASlacker.methods(null)
tokenFree.call('tooling.tokens.rotate', { refresh_token: refreshToken }, 'form')
```

### Pagination

`paginate` follows `response_metadata.next_cursor` and returns one response per
page (with the same rate-limit retries as every other call):

```javascript
var pages = slack.paginate('conversations.list', { limit: 200 }, 'get')
var channels = pages.flatMap(function (p) {
  return p.channels || []
})
```

### Uploading files

`files.uploadV2` wraps Slack's 3-step upload flow
(`files.getUploadURLExternal` → upload → `files.completeUploadExternal`) in one call:

```javascript
var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt')
slack.files.uploadV2({ channel_id: 'C0123456789', file: blob, initial_comment: 'A file!' })

// or upload a string as a file
slack.files.uploadV2({ channel_id: 'C0123456789', content: 'hello', filename: 'hello.txt' })
```

Pass a GAS `Blob` as `file`, or a string as `content` (with `filename`).
The individual steps are also exposed (`slack.files.getUploadURLExternal` /
`slack.files.completeUploadExternal`) if you need finer control.

### OAuth v2

```javascript
slack.oauth.access({
  client_id: clientId,
  client_secret: clientSecret,
  code: code,
  redirect_uri: redirectUri,
})
```

`oauth.access`, `openid.connect.token`, and `tooling.tokens.rotate` are sent without an
`Authorization` header because their exchange credentials are in the request body and Slack
rejects an unrelated bearer token. `openid.connect.userInfo` is the opposite — it needs the
user token the exchange returned, so build a client with it:
`GASlacker.methods(userToken).openid.connect.userInfo()`.

### TypeScript

Type definitions are generated into [`dist/types/`](dist/types/). In a
clasp + TypeScript project, copy that folder in and include it in your
`tsconfig.json` — [`gas-global.d.ts`](dist/types/gas-global.d.ts) declares the
`GASlacker` global (library use) and the `methods` global (direct paste), so
all 168 methods autocomplete.

### Rate-limit retries

`GASlacker.methods(token, retriesLimit)` — `retriesLimit` is the number of extra
attempts on HTTP 429 (default 3; integer from 0 to 10; `0` sends exactly one request). Waits
for the `Retry-After` header between attempts. If every attempt is rate-limited, the method
returns `{ ok: false, error: 'ratelimited', retry_after: seconds }` without sleeping after the
final response. Retry waits are capped at five minutes in total, so a longer single wait or
repeated long waits return that structured response instead of exhausting Apps Script's
execution time.

## Examples

Copy-paste-ready scripts live in [`examples/`](examples/):

- [`notify-from-spreadsheet.js`](examples/notify-from-spreadsheet.js) — daily sheet summary with Block Kit
- [`upload-and-paginate.js`](examples/upload-and-paginate.js) — file upload + walking all channels

## API coverage

| Property              | Slack API family                                                           |
| --------------------- | -------------------------------------------------------------------------- |
| `slack.api`           | `api.test`, plus `call()` / `paginate()` for arbitrary methods             |
| `slack.apps`          | `apps.*` (incl. `connections`, `event.authorizations`, `manifest`, `user`) |
| `slack.assistant`     | `assistant.threads.*`                                                      |
| `slack.auth`          | `auth.*` (incl. `teams.list`)                                              |
| `slack.bookmarks`     | `bookmarks.*`                                                              |
| `slack.bots`          | `bots.*`                                                                   |
| `slack.calls`         | `calls.*` (incl. `participants`)                                           |
| `slack.canvases`      | `canvases.*` (incl. `access` / `sections`)                                 |
| `slack.chat`          | `chat.*` (incl. `startStream` / `appendStream` / `stopStream`)             |
| `slack.conversations` | `conversations.*` (incl. `canvases`, Slack Connect invites)                |
| `slack.dialog`        | `dialog.*` (legacy)                                                        |
| `slack.dnd`           | `dnd.*`                                                                    |
| `slack.emoji`         | `emoji.*`                                                                  |
| `slack.entity`        | `entity.presentDetails`                                                    |
| `slack.files`         | `files.*` (incl. `remote`, 3-step upload)                                  |
| `slack.functions`     | `functions.*`                                                              |
| `slack.oauth`         | `oauth.v2.access`                                                          |
| `slack.openid`        | `openid.connect.*` (Sign in with Slack)                                    |
| `slack.pins`          | `pins.*`                                                                   |
| `slack.reactions`     | `reactions.*`                                                              |
| `slack.reminders`     | `reminders.*`                                                              |
| `slack.search`        | `search.*`                                                                 |
| `slack.slackLists`    | `slackLists.*` (Lists API)                                                 |
| `slack.stars`         | `stars.*` (superseded by "Later" but still served)                         |
| `slack.team`          | `team.*` (incl. `profile`, `billing`, `preferences`, `externalTeams`)      |
| `slack.tooling`       | `tooling.tokens.rotate`                                                    |
| `slack.usergroups`    | `usergroups.*` (incl. `users`)                                             |
| `slack.users`         | `users.*` (incl. `profile`, `setPhoto`, `discoverableContacts`)            |
| `slack.views`         | `views.*`                                                                  |
| `slack.workflows`     | `workflows.featured.*`                                                     |

Method names mirror Slack's exactly — including `delete`: `chat.delete()`,
`files.delete()`, `canvases.delete()`. (The older `delete_` aliases still work.)

## Removed / not included

- Legacy `channels.*` / `groups.*` / `im.*` / `mpim.*` / `rtm.*`
- `files.comments.*` and `apps.permissions.*` (discontinued by Slack; they answer `unknown_method`)
- `files.upload` (v1, discontinued) — use `files.uploadV2`
- `admin.*` enterprise methods (out of scope; use `slack.call()` if needed)

## Development

```sh
pnpm run lint        # oxlint
pnpm run typecheck   # tsc --noEmit
pnpm run test        # vitest
pnpm run build       # lint + typecheck + test + vite build
pnpm run deploy      # build + clasp push
```

See [docs/verification.md](docs/verification.md) for the manual verification
plan against the real Slack API, and [CONTRIBUTING.md](CONTRIBUTING.md) for how
to add a new API method.

## Reference

- Slack Web API docs: https://docs.slack.dev/reference/methods/
- Inspired by [os/slacker](https://github.com/os/slacker) and [soundTricker/SlackApp](https://github.com/soundTricker/SlackApp)

## License

MIT License. See [LICENSE.txt](LICENSE.txt).
