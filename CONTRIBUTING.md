# Contributing to GASlacker

Issues and pull requests are welcome — in English or Japanese.

## Setup

```sh
pnpm install
pnpm run lint && pnpm run typecheck && pnpm run test
```

Use Node.js 22.12+ on the 22.x line, 24.x, or 26+ with pnpm.

## Design policy (KISS / YAGNI)

- One code path per request type (`_get` / `_post` / `_post_form` / `_post_file`
  in `src/methods/BaseAPI.ts`). No new layers, flags, or configuration knobs.
- Method classes are thin one-line delegations; anything clever belongs in
  `BaseAPI` or `src/util.ts`.
- Slack JSON responses are preserved; exhausted HTTP 429 responses and retry sequences that
  would exceed the five-minute total sleep budget are normalized to a structured
  `ratelimited` error. Callers check `ok` / `error`.
- Comments in source code are written in English.

## Adding a Slack API method

1. Check the [official method index](https://docs.slack.dev/reference/methods.md) and the individual method’s current contract and retirement notices. Without a token,
   `curl -s -X POST https://slack.com/api/<method>` answers
   `not_authed` for most authenticated methods. Token-free methods can return success or a
   method-specific validation error. A token-free response alone cannot establish whether a method still works.
2. Add a one-line method to the matching class in `src/methods/`
   (`PascalCase` class, `camelCase` method). Use the transport Slack accepts, including form
   encoding or multipart where required. Name methods exactly after Slack's — `delete` is
   a valid method name; add a `delete_` alias next to it for consistency with
   the existing ones.
3. Register new top-level clients in `src/index.ts`.
4. Add one row to the table in `tests/routing.spec.ts`.
5. Update the API coverage table in `README.md` if you added a new family.
6. Run `pnpm run catalog` to refresh the AI-readable `docs/methods.json` catalog.
7. Run `pnpm run build` and `pnpm run parity`. Parity checks the catalog against Slack’s official Web API index and Node SDK. A retired entry needs a method-specific exception with a link to Slack’s notice.

## Testing

- Unit tests live in `tests/*.spec.ts` (Vitest). `tests/routing.spec.ts` pins
  every method to its endpoint name and HTTP style — keep it in sync.
- For behavior that needs the real Slack API, follow
  [docs/verification.md](docs/verification.md) and add the results to its verification log.

## Commits and PRs

- Keep commit subjects short and imperative (e.g. `Add canvases API`).
- In the PR body, state the purpose, the changes, and test results; link
  related issues.
- CI (lint / typecheck / test / build / dist sync) must be green.
- `dist/` is a build artifact but is committed on purpose (it is what GAS
  users paste). Run `pnpm run build` before committing so `dist/` matches
  `src/`; CI fails otherwise.
