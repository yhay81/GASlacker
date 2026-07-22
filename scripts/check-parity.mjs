// Diffs the official node-slack-sdk method list against dist/bundle.js, printing any
// unimplemented new APIs and exiting 1 (run from the weekly CI job).
import { readFileSync } from 'node:fs'

const SDK_URL =
  'https://raw.githubusercontent.com/slackapi/node-slack-sdk/main/packages/web-api/src/methods.ts'

// Intentionally out of scope (mirrors the Removed / not included section of the README)
const EXCLUDED = [
  /^admin\./, // Enterprise admin APIs are out of scope (reachable via slack.call())
  /^files\.comments\./, // discontinued in 2018
  /^rtm\./, // legacy RTM
  /^migration\./, // legacy token migration
  /^oauth\.access$/, // OAuth v1
  /^oauth\.v2\.exchange$/, // legacy token exchange
]

const extract = (source, quote) => {
  const re = new RegExp(`${quote}[a-zA-Z]+(\\.[a-zA-Z0-9]+)+${quote}`, 'g')
  return [...new Set((source.match(re) ?? []).map((s) => s.slice(1, -1)))].filter(
    (m) => !m.startsWith('application/') && !m.startsWith('text/') && m !== 'Module',
  )
}

const sdkSource = await (await fetch(SDK_URL)).text()
const sdkMethods = extract(sdkSource, "'")
const implMethods = extract(
  readFileSync(new URL('../dist/bundle.js', import.meta.url), 'utf8'),
  '"',
)

if (sdkMethods.length < 100) {
  console.error(`Fetching the SDK method list may have failed (extracted ${sdkMethods.length})`)
  process.exit(2)
}

const missing = sdkMethods.filter(
  (m) => !EXCLUDED.some((ex) => ex.test(m)) && !implMethods.includes(m),
)

if (missing.length === 0) {
  console.log(`Parity OK: all in-scope methods implemented (${sdkMethods.length} SDK methods)`)
  process.exit(0)
}

console.log('Methods present in the Slack SDK but not implemented in GASlacker:')
for (const m of missing) console.log(`- ${m}`)
console.log(
  '\nSee CONTRIBUTING.md for how to add them (verify liveness -> one line in the class -> one line in routing.spec.ts)',
)
process.exit(1)
