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
binding the repository to a model provider. Expose only `stageSlackDraft` to the model. Give
spreadsheet edit access only to trusted reviewers, who check the draft and destination before
selecting **Approved**. Clear approval before editing a draft or its destination. The posting
function rechecks the row and records the attempt before calling Slack. Once a row is marked
`posting`, it may already be on its way. If that status remains or the result is `uncertain`,
check the destination before clearing the result to retry.

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
then consult the linked Slack method or SDK reference for arguments. Check the method scopes.
```

Slack also publishes an [LLM-oriented documentation index](https://docs.slack.dev/llms.txt). Prefer
that source over remembered parameter names when generating calls.

## Machine-readable capabilities

[`methods.json`](methods.json) is generated from the exhaustive routing table used by the test suite.
Each entry contains:

- `path`: the GASlacker property and method path;
- `endpoint`: the Slack Web API endpoint actually called;
- `transport`: GET, JSON POST, form POST, or multipart POST;
- `effect`: a conservative `read`, `write`, or `destructive` classification;
- `docs`: Slack’s official method page, guide or SDK reference.

`effect` describes the action independently of its HTTP transport. For example, sharing a file
changes access, and search reads data. Consult the linked method documentation, Slack OAuth scopes
and workspace policy before authorizing an action.

Run `pnpm run catalog` after changing `tests/routing.spec.ts`. The normal build also refreshes the
catalog.
