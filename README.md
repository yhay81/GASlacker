<p align="center">
  <a href="https://gaslacker.yhay81.com/">
    <img src="docs/assets/hero-automation.webp" alt="Automate Slack workflows from Google Apps Script with GASlacker" width="100%" />
  </a>
</p>

<h1 align="center">GASlacker</h1>

<p align="center">
  <strong>The complete Slack Web API client for Google Apps Script.</strong><br />
  From a spreadsheet to Slack in five minutes — no build step, server, or runtime dependency.
</p>

<p align="center">
  <a href="https://github.com/yhay81/GASlacker/actions/workflows/ci.yml"><img src="https://github.com/yhay81/GASlacker/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
  <a href="https://github.com/yhay81/GASlacker/releases/latest"><img src="https://img.shields.io/github/v/release/yhay81/GASlacker?label=release&color=287976" alt="Latest release" /></a>
  <img src="https://img.shields.io/badge/Slack_API_methods-391-d84d39" alt="391 Slack API methods" />
  <img src="https://img.shields.io/badge/runtime_dependencies-0-287976" alt="Zero runtime dependencies" />
  <a href="LICENSE.txt"><img src="https://img.shields.io/badge/license-MIT-e0a625" alt="MIT License" /></a>
</p>

<p align="center">
  <a href="https://gaslacker.yhay81.com/"><strong>5-minute quickstart</strong></a>
  ·
  <a href="#examples">Examples</a>
  ·
  <a href="docs/ai.md">AI guide</a>
  ·
  <a href="#api-coverage">API coverage</a>
  ·
  <a href="https://github.com/yhay81/GASlacker/issues">Issues</a>
</p>

<p align="center">
  English · 日本語 · 简体中文 · 한국어 · Español · Português
</p>

---

GASlacker is a lightweight Slack Web API client designed specifically for the Apps Script V8
runtime.

- 391 Slack Web API methods organized like the official SDKs: `slack.chat.postMessage({...})` —
  see the [method catalog](docs/methods.json) for the complete list
- Bearer authorization + JSON requests, with automatic retry on rate limits (HTTP 429, honoring `Retry-After`)
- File uploads implemented with the current 3-step external upload flow (`files.uploadV2`)
- OAuth v2 (`oauth.v2.access`) and modern APIs such as `canvases.*` / `assistant.threads.*`
- Zero runtime dependencies — a single `bundle.js` for the GAS V8 runtime
- Cursor pagination helper: `slack.paginate('conversations.list', { limit: 200 }, 'get')`
- Generic Web API requests: `slack.call('some.method', params)`
- AI-readable method catalog and a human-approved action pattern

Endpoints are checked against the live Slack API before being added. The
[routing tests](tests/routing.spec.ts) verify their names and transports locally.
Pull requests are checked against Slack’s official [Web API method index](https://docs.slack.dev/reference/methods.md)
and Node SDK, including all `admin.*` families. A [weekly check](.github/workflows/parity.yml)
opens or updates an issue listing any missing methods.
Run `pnpm run parity` to check the current upstream lists locally.

## Installation

No build step is required — [`dist/bundle.js`](dist/bundle.js) in this
repository is the ready-to-use distributable. Choose one:

**A. Add the published library (easiest)**

1. In your Apps Script project, open **Libraries** and add this script ID:

   ```
   101aZZYpRRnr5AGkVIo8t_yo4kHb7xryLfq3w-HVPpQ4fX0Tkxv3UJyzc
   ```

2. Pick the latest published version, keep the identifier `GASlacker`, and call
   `GASlacker.methods(token)`. To use changes on `main` before the next library release,
   use the bundle below.

To pin your own copy instead, create a standalone Apps Script project, paste
[`dist/bundle.js`](dist/bundle.js) into it, and deploy it as your own library.

**B. Paste directly into your project**

Copy [`dist/bundle.js`](dist/bundle.js) into your Apps Script project as a
script file. Both `GASlacker.methods(token)` and `methods(token)` are available.

**C. Push with clasp**

Clone this repository and enable the Apps Script API in your
[Apps Script settings](https://script.google.com/home/usersettings). Then:

```sh
cp .clasp.example.json .clasp.json
# Edit .clasp.json and replace YOUR_SCRIPT_ID with your own Apps Script project ID.
pnpm dlx @google/clasp@3 login
pnpm install
pnpm run deploy   # build + clasp push
```

To rebuild `dist/bundle.js` yourself, run `pnpm install && pnpm run build`
(Node.js 22.12+ on the 22.x line, 24.x, or 26+ with pnpm).

## Quick start

Give your Slack app the `chat:write` bot scope, install it in your workspace, and invite it
to the target channel. Save the bot token in Script Properties as `SLACK_ACCESS_TOKEN`
and replace the example channel ID with your own.

```javascript
function hello() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)
  var res = slack.chat.postMessage({ channel: 'C0123456789', text: 'Hello World' })
  if (!res.ok) {
    Logger.log(res.error)
  }
}
```

Check the response's `ok` field and inspect `error` on failure. `paginate` returns an array
of responses, including the error page if a request failed. Network errors can throw.

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

Use `call` for GET, JSON POST and form POST requests that return Slack JSON. Use the named
methods for file transfers, OAuth exchanges and other methods with special response handling.

```javascript
slack.call('chat.postMessage', { channel: 'C0123456789', text: 'Hi' })
slack.call('conversations.list', { limit: 20 }, 'get')

// Token rotation is form-encoded and must not carry an Authorization header
var tokenFree = GASlacker.methods(null)
tokenFree.call('tooling.tokens.rotate', { refresh_token: refreshToken }, 'form')
```

### Pagination

`paginate` follows `response_metadata.next_cursor` and returns one response per page. It throws
if Slack repeats a cursor. Use `'get'`, `'post'` (the default), or `'form'` for the endpoint's
transport. An optional fourth argument caps the number of pages:

```javascript
var pages = slack.paginate('conversations.list', { limit: 200 }, 'get')
var channels = pages.flatMap(function (p) {
  if (!p.ok) throw new Error('conversations.list failed: ' + p.error)
  return p.channels
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
slack.oauth.v2.access({
  client_id: clientId,
  client_secret: clientSecret,
  code: code,
  redirect_uri: redirectUri,
})
```

`oauth.v2.access`, `openid.connect.token`, and `tooling.tokens.rotate` are sent without an
`Authorization` header because their exchange credentials are in the request body and Slack
rejects an unrelated bearer token. `openid.connect.userInfo` is the opposite — it needs the
user token the exchange returned, so build a client with it:
`GASlacker.methods(userToken).openid.connect.userInfo()`.

The classic `oauth.access` endpoint is available as `slack.oauth.v1.access(...)`.
The historical `slack.oauth.access(...)` alias still calls `oauth.v2.access`.
For short-token rotation, create the client with the original short user token and call
`slack.oauth.v2.beginShortTokenRotation(...)` or `slack.oauth.v2.completeShortTokenRotation(...)`.

### Enterprise administration

Use an organization installation and a token with the scopes and role listed for the method.
For example, `slack.admin.teams.list({ limit: 20 })` lists workspaces. Oversight requires access from Slack, and
an organization owner must install the Legal Holds app. See the
[Admin API](https://docs.slack.dev/admins/), [Oversight](https://docs.slack.dev/admins/admin-oversight-api/)
and [Legal Holds](https://docs.slack.dev/admins/legal-holds-api/) guides.

`admin.analytics.getFile` returns the compressed analytics file as an Apps Script Blob in
`file` on success. Check `ok` before reading it:

```javascript
var result = slack.admin.analytics.getFile({ type: 'member', date: '2026-11-01' })
if (result.ok) {
  var ndjson = Utilities.ungzip(result.file).getDataAsString()
}
```

### TypeScript

Type definitions are generated into [`dist/types/`](dist/types/). In a
clasp + TypeScript project, copy that folder in and include it in your
`tsconfig.json` — [`gas-global.d.ts`](dist/types/gas-global.d.ts) declares the
`GASlacker` global (library use) and the `methods` global (direct paste), so
all 391 methods autocomplete.

### Rate-limit retries

`GASlacker.methods(token, retriesLimit)` — `retriesLimit` is the number of extra
attempts on HTTP 429 (default 3; integer from 0 to 10; `0` sends exactly one request). Waits
for the `Retry-After` header between attempts. If every attempt is rate-limited, the method
returns `{ ok: false, error: 'ratelimited', retry_after: seconds }` without sleeping after the
final response. Each HTTP request has a five-minute retry wait budget. Pagination and
file uploads make several requests within the same Apps Script execution.

## AI-assisted automations

GASlacker is designed to be the deterministic Slack action layer in an AI-assisted Google
Workspace automation. Let a model classify, summarize, or draft; let small Apps Script code apply
an explicit destination allowlist, action cap, duplicate protection, and human approval before a
consequential Slack write.

- [`docs/ai.md`](docs/ai.md) explains when to use GASlacker, the official Slack MCP server, or a
  real-time Slack agent framework.
- [`docs/llms.txt`](docs/llms.txt) gives coding assistants concise, security-oriented project
  context.
- [`docs/methods.json`](docs/methods.json) lists every wrapper path, endpoint, transport style,
  conservative effect classification, and a link to Slack’s method or SDK documentation.

The core library intentionally remains model-provider-neutral and has no AI runtime dependency.

## Examples

Copy-paste-ready scripts live in [`examples/`](examples/):

- [`notify-from-spreadsheet.js`](examples/notify-from-spreadsheet.js) — daily sheet summary with Block Kit
- [`form-response-notification.js`](examples/form-response-notification.js) — Google Form response → Slack notification
- [`daily-calendar-agenda.js`](examples/daily-calendar-agenda.js) — every morning's Google Calendar agenda
- [`overdue-task-reminder.js`](examples/overdue-task-reminder.js) — at most one DM attempt per overdue task per day
- [`ai-approved-draft.js`](examples/ai-approved-draft.js) — allowlisted, human-approved AI drafts
- [`upload-and-paginate.js`](examples/upload-and-paginate.js) — file upload + walking all channels

## API coverage

| Property              | Slack API family                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `slack.admin`         | `admin.*`, including analytics, apps, conversations, Legal Holds, roles, users and workflows |
| `slack.agents`        | `agents.conversations.*` and `agents.sessions.*`                                             |
| `slack.api`           | `api.test`, plus `call()` / `paginate()` for arbitrary methods                               |
| `slack.apps`          | `apps.*` (incl. `auth.external`, `datastore`, `icon`, `links`, `manifest`, `user`)           |
| `slack.assistant`     | `assistant.search.*`, `assistant.threads.*`                                                  |
| `slack.auth`          | `auth.*` (incl. `teams.list`)                                                                |
| `slack.blocks`        | `blocks.validate`                                                                            |
| `slack.bookmarks`     | `bookmarks.*`                                                                                |
| `slack.bots`          | `bots.*`                                                                                     |
| `slack.calls`         | `calls.*` (incl. `participants`)                                                             |
| `slack.canvases`      | `canvases.*` (incl. `access` / `sections`)                                                   |
| `slack.chat`          | `chat.*` (incl. `startStream` / `appendStream` / `stopStream`)                               |
| `slack.conversations` | `conversations.*` (incl. `canvases`, Slack Connect invites)                                  |
| `slack.dialog`        | `dialog.*` (legacy)                                                                          |
| `slack.dnd`           | `dnd.*`                                                                                      |
| `slack.emoji`         | `emoji.*`                                                                                    |
| `slack.enterprise`    | `enterprise.auth.idpconfig.*`                                                                |
| `slack.entity`        | `entity.*` (including work object comments)                                                  |
| `slack.files`         | `files.*` (incl. historical comments, remote files, external upload)                         |
| `slack.functions`     | `functions.*`                                                                                |
| `slack.links`         | `links.accountLinkedResult`                                                                  |
| `slack.migration`     | `migration.exchange`                                                                         |
| `slack.oauth`         | `oauth.*` (including classic OAuth and token rotation)                                       |
| `slack.openid`        | `openid.connect.*` (Sign in with Slack)                                                      |
| `slack.oversight`     | `oversight.*` (Enterprise Admin Oversight)                                                   |
| `slack.pins`          | `pins.*`                                                                                     |
| `slack.reactions`     | `reactions.*`                                                                                |
| `slack.reminders`     | `reminders.*`                                                                                |
| `slack.rtm`           | `rtm.connect`, `rtm.start` (connection URLs for eligible classic apps)                       |
| `slack.search`        | `search.*`                                                                                   |
| `slack.slackbot`      | `slackbot.skills.*`, including the skills library                                            |
| `slack.slackLists`    | `slackLists.*` (Lists API)                                                                   |
| `slack.stars`         | `stars.*` (superseded by "Later" but still served)                                           |
| `slack.team`          | `team.*` (incl. `profile`, `billing`, `preferences`, `externalTeams`)                        |
| `slack.tooling`       | `tooling.tokens.rotate`                                                                      |
| `slack.usergroups`    | `usergroups.*` (incl. `users`)                                                               |
| `slack.users`         | `users.*` (incl. `profile`, `setPhoto`, `discoverableContacts`)                              |
| `slack.views`         | `views.*`                                                                                    |
| `slack.workflows`     | `workflows.featured.*`, `workflows.triggers.*`                                               |

Named methods mirror Slack's, including `chat.delete()`, `files.delete()` and
`canvases.delete()`. The older `delete_`, `oauth.access` and `apps.eventAuthorizations.list`
aliases still work.

## Coverage and retired methods

On November 13, 2026, the official Web API index listed 357 methods. This bundle implements
all 355 functional entries, including all 131 indexed `admin.*` methods. The catalog also
includes methods Slack documents separately, such as Legal Holds, Admin Oversight and workflow
triggers. Enterprise SCIM and Audit Logs use separate HTTP APIs.

- Slack retired [`files.upload`](https://docs.slack.dev/reference/methods/files.upload/).
  Use `slack.files.uploadV2` for the current external upload flow.
- [`users.setActive`](https://docs.slack.dev/reference/methods/users.setActive/) no longer changes
  presence. Use `users.setPresence` for manual away or automatic presence.
- `slack.files.comments.get` and `slack.files.comments.delete` work with historical file comments.
  Slack retired `files.comments.add` and `files.comments.edit`. Use message threads for new replies.
  See the [file comments announcement](https://docs.slack.dev/changelog/2019/02/01/cemented-fate-for-file-comments/).
- `slack.rtm.connect` and `slack.rtm.start` obtain a WebSocket URL for eligible classic apps.
  The WebSocket connection itself must run outside Apps Script. See Slack’s
  [legacy RTM guide](https://docs.slack.dev/legacy/legacy-rtm-api/).

## Development

```sh
pnpm run lint        # oxlint
pnpm run typecheck   # tsc --noEmit
pnpm run test        # vitest
pnpm run parity      # check coverage against the live official lists
pnpm run catalog     # regenerate docs/methods.json from the routing table
pnpm run build       # catalog, lint, typecheck, bundle, declarations, and tests
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
