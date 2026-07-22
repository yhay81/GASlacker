# Changelog

## 1.4.0 (2026-07-22)

### Fixed

- **`openid.connect.userInfo` could never succeed.** The whole `openid.*` client was built
  with a null token, so the request went out without an `Authorization` header and Slack
  always answered `not_authed`. `userInfo` now carries the token passed to `methods()`,
  while `openid.connect.token` keeps going out token-free — Slack answers `invalid_auth`
  if the code exchange carries an `Authorization` header (both directions confirmed against
  the live API). A test now pins the header for each of these endpoints.
- **The weekly parity job could never report anything.** It read `$?` after
  `node scripts/check-parity.mjs | tee parity.txt`, which is `tee`'s exit code, so the
  status was always `0`: no issue was ever filed and the job never failed. It now reads
  `${PIPESTATUS[0]}`.
- On the final retry attempt, a 429 no longer sleeps for `Retry-After` seconds before
  throwing `Try limit over` — the wait was pure loss against the GAS execution limit.
- Form-encoded requests no longer come back with a `superfluous_charset` warning: Slack
  rejects the `; charset=UTF-8` suffix on form bodies. JSON bodies keep it, because Slack
  warns `missing_charset` without it (both confirmed live), so the two content types
  intentionally differ. GET / JSON POST / form POST are now all warning-free.

### Added

- `chat.scheduledMessages.list`, matching how every other dotted endpoint is nested
  (`files.remote.*`, `apps.manifest.*`, …) and how the official SDK names it. The previous
  flat `chat.scheduledMessagesList` remains as an alias, like the `delete_` ones.

### Changed

- `.gitignore`'s remaining Japanese comment translated (leftover from the 1.3.0
  English unification), `UsersProfile` declared before it is used like every other nested
  class, and the stale CPython reference on `queryEncode` replaced with a description of
  what it does.

## 1.3.0 (2026-07-22)

### Changed (breaking)

- The three error messages `BaseAPI`/`Files.uploadV2` throw on invalid input are now in
  English (`params must be an object`, `Specify either file or content`, `file must be a
Blob`) instead of Japanese. Behavior and conditions are unchanged; only the message text
  changed.

### Changed

- **Repository language unified to English.** All source comments, `AGENTS.md`,
  `CONTRIBUTING.md`, `docs/verification.md`, dev scripts (`verify-live.mjs`,
  `check-parity.mjs`), and CI workflow comments are now in English. `README.ja.md` is
  removed; the landing page (`docs/index.html`) remains multilingual for end users, but its
  literal page content is now English, with Japanese and four other languages served as
  runtime-switchable dictionaries.
- **Landing page language switcher reordered English-first**, then by relevance to this
  project's audience: English, 日本語, 简体中文, Español, Português, 한국어. Browser-language
  auto-detection and the `localStorage`-saved preference now default to English when nothing
  matches.

## 1.2.1 (2026-07-22)

### Changed (internal refactoring)

- Introduce the `SlackParams` type alias for every method signature, and
  re-export `SlackParams` / `SlackResponse` from the entry point (also set
  `types` in package.json).
- Fold `config.ts` into `BaseAPI.ts` (one less file for one constant).
- `users.setPhoto` now uses the same destructuring style as `uploadV2` and
  rejects non-object params like every other method.
- Rename internal class `UsergroupsUsers` → `UserGroupsUsers`; drop stray
  `any` return annotations in `Apps`.
- Routing test table no longer repeats the endpoint name when it matches the
  method path; `verify-live` sleeps via `Atomics.wait` (Windows-friendly).

## 1.2.0 (2026-07-22)

### Added

- TypeScript type definitions shipped in `dist/types/` —
  `gas-global.d.ts` declares the `GASlacker` / `methods` globals so all 168
  methods autocomplete in clasp + TypeScript projects.
- JSDoc on the `methods()` stub in `bundle.js`, so the Apps Script editor
  shows parameter help.

### Changed

- Toolchain refreshed to the current generation: TypeScript 7.0 (native Go
  compiler; codebase now passes its stricter defaults with explicit
  `string | null` tokens), Vite 8 (Rolldown bundler — builds ~3x faster,
  slightly smaller bundle), oxlint 1.75 / oxfmt 0.60, pnpm 11, clasp 3.3.
- Dropped `cpx`, `rimraf`, and the vestigial `braces` pin from
  devDependencies (replaced by Node built-ins).

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
