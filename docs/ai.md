# AI-assisted automation with GASlacker

GASlacker is most useful in an AI system as a deterministic action layer. Let a model classify,
summarize, or draft; let small, testable Apps Script code decide whether and where the result may be
sent to Slack.

The core library deliberately does not choose a model provider, manage prompts, or host an agent.
That keeps tokens local, the bundle small, and Slack actions predictable.

## Choose the right Slack integration

| Need                                                                            | Recommended tool                                                                                                           |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Scheduled or approved Sheets, Forms, or Calendar automation that sends to Slack | GASlacker                                                                                                                  |
| Direct, user-authorized Slack search and actions from an AI client              | [Slack MCP server](https://docs.slack.dev/ai/slack-mcp-server/)                                                            |
| A real-time Slack agent that receives events and streams replies                | [Slack agent development tools](https://docs.slack.dev/ai/developing-agents/) with Bolt or another verifiable HTTP service |

Apps Script web apps do not expose the incoming headers required to verify Slack request signatures.
Do not use an Apps Script `doPost(e)` handler as a public Slack Events API receiver.

## Safe action pattern

Use four explicit stages for AI-generated Slack writes:

1. **Prepare** — collect the minimum source data needed for the task.
2. **Draft** — ask the model for text or structured data, without giving it a Slack token.
3. **Approve** — show the exact content and destination to a person.
4. **Execute** — use GASlacker with an allowlisted destination, a per-run action cap, duplicate
   protection, and a small audit record.

The model should never select an arbitrary Slack API method or destination and immediately execute
it. Slack content and model output are untrusted inputs; prompt injection can turn a broad tool into
an unintended data-export path. See Slack's
[security guidance](https://docs.slack.dev/concepts/security/) and
[agent governance guidance](https://docs.slack.dev/ai/agent-governance/).

[`examples/ai-approved-draft.js`](https://github.com/yhay81/GASlacker/blob/main/examples/ai-approved-draft.js)
implements this pattern without
binding the repository to a model provider. A model integration stages a draft in a sheet; a person
checks the destination and selects **Approved**; a separate function performs the Slack write.

## Instructions for coding assistants

Give a coding assistant the following project context before asking it to generate an automation:

```text
Write Google Apps Script V8 JavaScript using GASlacker.
Read tokens, channel IDs, and allowlists from Script Properties.
Use named GASlacker methods and check ok/error on every response.
Do not create a Slack Events API doPost handler in Apps Script.
For AI-generated writes, separate draft creation from execution, require explicit approval,
cap actions per run, fail closed on uncertain results, and avoid logging secrets or message bodies.
Use https://gaslacker.yhay81.com/methods.json to discover wrapper paths and transport styles,
then consult the linked official Slack method page for arguments and scopes.
```

Slack also publishes an [LLM-oriented documentation index](https://docs.slack.dev/llms.txt). Prefer
that source over remembered parameter names when generating calls.

## Machine-readable capabilities

[`methods.json`](methods.json) is generated from the exhaustive routing table used by the test suite.
Each entry contains:

- `path`: the GASlacker property and method path;
- `endpoint`: the Slack Web API endpoint actually called;
- `transport`: GET, JSON POST, or form POST;
- `effect`: a conservative `read`, `write`, or `destructive` classification;
- `docs`: the corresponding official Slack method documentation.

`effect` is a name-based guardrail hint, not an authorization system. GET routes are reads; other
routes are writes; action names such as `delete`, `remove`, and `revoke` are marked destructive.
Slack OAuth scopes and workspace policy remain the source of truth. Methods not classified as reads
are deliberately treated as writes, even when a particular call may only create a temporary
resource.

Run `pnpm run catalog` after changing `tests/routing.spec.ts`. The normal build also refreshes the
catalog.
