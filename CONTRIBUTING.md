# Contributing to GASlacker

Issues and pull requests are welcome — in English or Japanese.

## Setup

```sh
pnpm install
pnpm run lint && pnpm run typecheck && pnpm run test
```

Node.js 22.12+ and pnpm are required.

## Design policy (KISS / YAGNI)

- One code path per request type (`_get` / `_post` / `_post_form` / `_post_file`
  in `src/methods/BaseAPI.ts`). No new layers, flags, or configuration knobs.
- Method classes are thin one-line delegations; anything clever belongs in
  `BaseAPI` or `src/util.ts`.
- Responses are returned as-is; callers check `ok` / `error`.
- Comments in source code are written in English.

## Adding a Slack API method

1. **Verify the endpoint exists.** Without a token,
   `curl -s -X POST https://slack.com/api/<method>` answers
   `{"error":"not_authed"}` for real methods and `{"error":"unknown_method"}`
   for dead ones. Do not add methods that answer `unknown_method`.
2. Add a one-line method to the matching class in `src/methods/`
   (`PascalCase` class, `camelCase` method, `_get` for GET-style reads,
   `_post` for JSON writes). Name methods exactly after Slack's — `delete` is
   a valid method name; add a `delete_` alias next to it for consistency with
   the existing ones.
3. Register new top-level clients in `src/index.ts`.
4. Add one row to the table in `tests/routing.spec.ts`.
5. Update the API coverage table in `README.md` if you added a new family.
6. `pnpm run build` must pass (lint + typecheck + tests + bundle).

## Testing

- Unit tests live in `tests/*.spec.ts` (Vitest). `tests/routing.spec.ts` pins
  every method to its endpoint name and HTTP style — keep it in sync.
- For behavior that needs the real Slack API, follow
  [docs/verification.md](docs/verification.md) and record the results in the PR.

## Commits and PRs

- Keep commit subjects short and imperative (e.g. `Add canvases API`).
- In the PR body, state the purpose, the changes, and test results; link
  related issues.
- CI (lint / typecheck / test / build / dist sync) must be green.
- `dist/` is a build artifact but is committed on purpose (it is what GAS
  users paste). Run `pnpm run build` before committing so `dist/` matches
  `src/`; CI fails otherwise.
