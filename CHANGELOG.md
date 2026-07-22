# Changelog

## 1.1.0 (2026-07-22)

### Added

- **Full parity with Slack's official SDK method list** (minus `admin.*` and
  discontinued APIs) — 52 new methods, every one verified to exist on the live
  API: `calls.*`, `slackLists.*` (Lists API), `openid.connect.*` (Sign in with
  Slack), `functions.*`, `tooling.tokens.rotate`, `workflows.featured.*`,
  `entity.presentDetails`, `apps.manifest.*`, `apps.user.connection.update`,
  `auth.teams.list`, `chat.startStream` / `appendStream` / `stopStream`,
  Slack Connect conversation methods, `team.billing` / `preferences` /
  `externalTeams`, and `users.discoverableContacts.lookup`. 168 methods total.
- `slack.paginate(api, params, method, max_pages)` — cursor pagination helper
  that follows `response_metadata.next_cursor`.
- `slack.call(api, params, 'form')` — form-encoded escape hatch.
- `delete` is now a first-class method name (`chat.delete()`, `files.delete()`,
  `canvases.delete()`, …). The `delete_` aliases remain for backwards
  compatibility.

### Fixed

- oxlint / oxfmt no longer process `dist/` (reformatting the bundle would have
  broken the CI dist-sync check).

## 1.0.1 (2026-07-22)

### Fixed

- `files.getUploadURLExternal` (and step 1 of `files.uploadV2`) now sends
  form-encoded requests. The endpoint rejects JSON bodies with
  `invalid_arguments` — found by running the minimal verification set against
  the real Slack API with a live token (`pnpm run verify:live`), which now
  passes end to end including a real upload.

## 1.0.0 (2026-07-22)

### Fixed

- **`files.uploadV2` now actually works.** It previously POSTed to
  `https://slack.com/api/files.uploadV2`, an endpoint that does not exist
  (Slack answers `unknown_method`; "uploadV2" is an SDK-side helper, not an
  HTTP method). It is now a composite of the official 3-step flow:
  `files.getUploadURLExternal` → upload to the returned URL →
  `files.completeUploadExternal`.

### Removed (breaking)

- `files.comments.add` / `files.comments.edit` / `files.comments.delete` —
  discontinued by Slack in 2018; the live API answers `unknown_method`.
- `apps.permissions.info` / `apps.permissions.request` /
  `apps.permissions.resources.list` / `apps.permissions.scopes.list` —
  removed along with Workspace Apps; the live API answers `unknown_method`.

### Added

- `canvases.*`: `create`, `edit`, `delete_`, `access.set`, `access.delete_`,
  `sections.lookup`, plus `conversations.canvases.create`.
- `assistant.threads.*`: `setStatus`, `setSuggestedPrompts`, `setTitle`.
- `SlackResponse` type for all request results.
- Routing test that pins every method to its verified endpoint name
  (`tests/routing.spec.ts`, 116 cases).
- `pnpm run typecheck` (tsc) wired into the build, and a GitHub Actions CI
  running lint / typecheck / tests / build / dist-sync check.

### Changed (breaking)

- Empty HTTP response bodies now yield `{ ok: false, error: 'empty_response' }`
  instead of `{}`, matching the existing `invalid_json` convention.
- Documentation is now English-first (`README.md`) with a Japanese version
  (`README.ja.md`).

## 0.1.0

Initial releases (2018–2026): thin wrapper classes per API category, Bearer +
JSON requests, 429 retry with `Retry-After`, Vite/clasp build pipeline.
