# Security Policy

GASlacker sends requests only to `https://slack.com/api/` and to the
short-lived upload URLs returned by `files.getUploadURLExternal`. Tokens are
held in memory only — store them in Script Properties, never in code or in
this repository.

## Reporting a vulnerability

Please report vulnerabilities privately via
[GitHub Security Advisories](https://github.com/yhay81/GASlacker/security/advisories/new)
rather than opening a public issue.
