# Repository Guidelines

## Project Structure & Module Organization

- `src/` is the library itself. `src/methods/` has one class per Slack API category; `src/index.ts` is the entry point for `GASlacker.methods`.
- `tests/` has Vitest unit tests (`*.spec.ts`). `tests/routing.spec.ts` is the routing table mapping every method to its endpoint name.
- `docs/verification.md` is the manual verification plan and log.
- `docs/index.html` is the public landing page (multi-language; see the i18n note below).
- `dist/` is the build output, but it is committed intentionally — it is the artifact GAS users paste into their project (do not edit it directly).
- `appsscript.json` is the Google Apps Script manifest.

## Build, Test, and Development Commands

- Requirements: Node.js 22.x (22.12+), 24.x, or 26+, and the pnpm version in `package.json`.
- `pnpm install`: install dependencies.
- `pnpm run lint`: static analysis via Oxlint.
- `pnpm run typecheck`: type checking via `tsc --noEmit`.
- `pnpm run fmt`: formatting via Oxfmt.
- `pnpm run test`: run Vitest.
- `pnpm run build`: regenerate the method catalog, lint, type-check, build the bundle and declarations in `dist/`, copy the Apps Script manifest, and run the tests against the finished bundle.
- `pnpm run deploy`: build, then `clasp push` to Apps Script. clasp is fetched on demand via
  `pnpm dlx` instead of being a devDependency — it is only needed for manual publishing, and it
  pulls in ~250 packages (an MCP server, an HTTP server, the Google API clients) that neither the
  build nor CI ever touches.

## Coding Style & Naming Conventions

- Use 2-space indentation, a trailing newline, and no trailing whitespace.
- Single quotes, no semicolons, 100-column width (`.oxfmtrc.json`).
- Add new APIs under `src/methods/` with `PascalCase` class names and `camelCase` method names.
- Method names mirror Slack's exactly (`delete` works as-is); keep the `delete_` alias alongside `delete` for backward compatibility.
- Write all comments in English, in `src/`, `tests/`, `scripts/`, and everywhere else in the repository.

## Testing Guidelines

- When you add or change a method, add one row to the table in `tests/routing.spec.ts`.
- Verify an endpoint exists before adding it: run `curl -s -X POST https://slack.com/api/<method>` without a token — most authenticated methods answer `not_authed`; public methods can succeed or return a parameter error. Confirm availability and supported behavior from the official method reference and retirement notices as well. A retired endpoint can still require authentication. Do not add methods that answer `unknown_method`.
- Run `pnpm run parity` to check the catalog against the live official Web API index and Node SDK.
- When real-API confirmation is needed, run the minimal verification set in `docs/verification.md` and record the result.

## Architecture Overview

- `src/methods/BaseAPI.ts` handles the `UrlFetchApp` request, 429 retries, and response parsing.
- The `SlackResponse` type (in `BaseAPI.ts`) is the return type of every method.
- `queryEncode` / `createPayload` / `createFormPayload` in `src/util.ts` are the shared GET/JSON/form-encoding helpers.
- `files.uploadV2` composites the official 3-step flow (`files.getUploadURLExternal` → upload → `files.completeUploadExternal`) into one method, since `files.uploadV2` is not itself an HTTP endpoint (`src/methods/Files.ts`).
- `DEFAULT_RETRIES` (in `BaseAPI.ts`) can be overridden via `GASlacker.methods(token, retries)`.
- `docs/index.html` ships English as the literal page content, with other languages (currently Japanese, Simplified Chinese, Korean, Spanish, Brazilian Portuguese) as lookup dictionaries in the inline `<script>`; the language switcher orders English first, then by relevance to this project's audience.

## Change Policy

- Favor KISS/YAGNI — do not add branches or config flags.
- Reuse the existing `BaseAPI` and `util` helpers; do not introduce a new layer.
- Justify additions with a concrete failure case or request, and keep diffs minimal.
- Remove methods Slack has discontinued or documented as non-functional.

## Commit & Pull Request Guidelines

- Write commits in the imperative mood, concise subject, with rationale in the body when useful.
- PRs should state the purpose, the changes, and test results, and link related issues if any.
- CI (lint / typecheck / test / build / dist sync) must be green.
- Run `pnpm run build` before committing so `dist/` stays in sync with `src/`.

## Configuration & Security

- Store tokens in Script Properties; never commit them to code or the repository.
- Treat `.clasp.json`'s `scriptId` as local configuration, and double-check its value before sharing.
