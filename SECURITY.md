# Security Policy

GASlacker sends requests only to `https://slack.com/api/` and to the
short-lived upload URLs returned by `files.getUploadURLExternal`. Tokens are
held in memory only — store them in Script Properties, never in code or in
this repository.

GASlacker is an outbound Web API client; it does not authenticate inbound Slack
events. Do not process Events API payloads directly in an Apps Script `doPost`
Web App: Slack request verification requires HTTP signature headers that Apps
Script does not expose to `doPost(e)`. Receive and verify those requests in an
HTTP service that exposes the raw body and headers.

## Reporting a vulnerability

Please report vulnerabilities privately via
[GitHub Security Advisories](https://github.com/yhay81/GASlacker/security/advisories/new)
rather than opening a public issue.
