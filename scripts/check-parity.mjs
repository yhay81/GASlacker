// Compare tested routes with Slack's Web API index and its additional Node SDK bindings.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const INDEX_URL = 'https://docs.slack.dev/reference/methods.md'
const SDK_URL =
  'https://raw.githubusercontent.com/slackapi/node-slack-sdk/main/packages/web-api/src/methods.ts'
const RETIRED = new Set([
  'files.upload', // Sunset on November 12, 2025: https://docs.slack.dev/reference/methods/files.upload/
  'users.setActive', // Non-functional: https://docs.slack.dev/reference/methods/users.setActive/
])

export function parseMethodIndex(markdown) {
  // The link label preserves the endpoint's case, but Slack lowercases the URL slug.
  const sections = markdown.split(/^\|\s*Name\s*\|\s*Description\s*\|\s*\r?$/m)
  if (sections.length !== 2) throw new Error('Expected one complete Slack Web API method table')
  const rows = sections[1].trim().split(/\r?\n/)
  if (!/^\|[\s:-]+\|[\s:-]+\|$/.test(rows.shift())) throw new Error('Invalid method table header')
  const methods = new Set()
  for (const row of rows) {
    const match =
      /^\|\s*\[([a-zA-Z]\w*(?:\.[a-zA-Z]\w*)+)\]\(https:\/\/docs\.slack\.dev\/reference\/methods\/([^/)]+)\.md\)\s*\|/.exec(
        row,
      )
    if (!match || match[1].toLowerCase() !== match[2].toLowerCase() || methods.has(match[1]))
      throw new Error(`Invalid or duplicate Slack Web API method row: ${row.slice(0, 150)}`)
    methods.add(match[1])
  }
  if (methods.size < 300) throw new Error(`Found only ${methods.size} Slack Web API methods`)
  return methods
}

function parseSDK(source) {
  // SDK bindings take (this, 'endpoint'); ignore dotted strings in comments and examples.
  const bindings = /\bthis\s*,\s*['"]([a-zA-Z]\w*(?:\.[a-zA-Z]\w*)+)['"]\s*,?\s*\)/g
  const methods = new Set(Array.from(source.matchAll(bindings), (m) => m[1]))
  if (methods.size < 200) throw new Error(`Found only ${methods.size} Slack SDK bindings`)
  return methods
}

export function missingMethods(methods, supported) {
  return [...methods].filter((name) => !RETIRED.has(name) && !supported.has(name)).sort()
}

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`)
  return response.text()
}

async function checkParity() {
  const catalog = JSON.parse(readFileSync(new URL('../docs/methods.json', import.meta.url), 'utf8'))
  const supported = new Set(catalog.methods.map(({ endpoint }) => endpoint))
  const sources = [
    { name: 'Slack Web API index', url: INDEX_URL, parse: parseMethodIndex },
    { name: 'Slack Node SDK', url: SDK_URL, parse: parseSDK },
  ]
  const results = await Promise.allSettled(
    sources.map(({ url, parse }) => download(url).then(parse)),
  )
  const seen = new Set()
  let incomplete = false
  for (const [i, result] of results.entries()) {
    const { name, url } = sources[i]
    if (result.status === 'rejected') {
      console.error(`Could not check ${name}: ${result.reason.message}`)
      incomplete = true
      continue
    }
    const methods = result.value
    const missing = missingMethods(methods, supported).filter((method) => !seen.has(method))
    const retired = [...methods].filter((method) => RETIRED.has(method))
    console.log(`Checked ${methods.size} entries in the ${name}: ${url}`)
    if (retired.length) console.log(`Retired entries: ${retired.sort().join(', ')}`)
    if (missing.length) {
      console.log(`Missing methods from the ${name}:`)
      for (const method of missing) {
        console.log(`- ${method}`)
        seen.add(method)
      }
    }
  }
  // A verified gap still deserves an issue if the other source is temporarily unavailable.
  if (seen.size) return 1
  if (incomplete) return 2
  console.log('Parity OK: all current methods in both sources are implemented.')
  return 0
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    process.exitCode = await checkParity()
  } catch (error) {
    console.error(`Could not check API parity: ${error.message}`)
    process.exitCode = 2
  }
}
