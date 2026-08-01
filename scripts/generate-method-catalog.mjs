import { readFileSync, writeFileSync } from 'node:fs'

const ROUTING_URL = new URL('../tests/routing.spec.ts', import.meta.url)
const OUTPUT_URL = new URL('../docs/methods.json', import.meta.url)
const TRANSPORTS = {
  get: 'get',
  post: 'json',
  post_form: 'form',
  post_file: 'multipart',
}
const DESTRUCTIVE_ACTION =
  /^(archive|decline|delete|disable|disconnect|end|kick|leave|remove|revoke|uninstall)/

const sourceText = readFileSync(ROUTING_URL, 'utf8')

// Split TypeScript array literals without evaluating the test file. This only needs lexical
// nesting because every catalog field is a string literal in the routing table.
const splitTopLevel = (text) => {
  const parts = []
  const stack = []
  let start = 0
  let quote = null
  let escaped = false
  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    if (quote) {
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === quote) quote = null
      continue
    }
    if (character === "'" || character === '"' || character === '`') {
      quote = character
      continue
    }
    if (character === '[' || character === '(' || character === '{') stack.push(character)
    else if (character === ']' || character === ')' || character === '}') stack.pop()
    else if (character === ',' && stack.length === 0) {
      parts.push(text.slice(start, index).trim())
      start = index + 1
    }
  }
  const finalPart = text.slice(start).trim()
  if (finalPart) parts.push(finalPart)
  return parts
}

const casesDeclaration = sourceText.indexOf('const CASES:')
const casesAssignment = sourceText.indexOf('= [', casesDeclaration)
const casesStart = casesAssignment === -1 ? -1 : casesAssignment + 2
let casesEnd = -1
let squareDepth = 0
let quote = null
let escaped = false
for (let index = casesStart; index < sourceText.length; index++) {
  const character = sourceText[index]
  if (quote) {
    if (escaped) escaped = false
    else if (character === '\\') escaped = true
    else if (character === quote) quote = null
    continue
  }
  if (character === "'" || character === '"' || character === '`') quote = character
  else if (character === '[') squareDepth += 1
  else if (character === ']' && --squareDepth === 0) {
    casesEnd = index
    break
  }
}
if (casesDeclaration === -1 || casesStart === -1 || casesEnd === -1) {
  throw new Error('Could not find the CASES routing table')
}

const stringValue = (value, field, index) => {
  const match = value?.match(/^'([^']+)'$/)
  if (!match) throw new Error(`Routing row ${index + 1} has a non-literal ${field}`)
  return match[1]
}

const rows = splitTopLevel(sourceText.slice(casesStart + 1, casesEnd))
const methods = rows.map((row, index) => {
  if (!row.startsWith('[') || !row.endsWith(']')) {
    throw new Error(`Routing row ${index + 1} is not an array literal`)
  }
  const fields = splitTopLevel(row.slice(1, -1))
  const path = stringValue(fields[0], 'path', index)
  const routeType = stringValue(fields[2], 'transport', index)
  const endpoint = fields[3] ? stringValue(fields[3], 'endpoint', index) : path
  const transport = TRANSPORTS[routeType]
  if (!transport) throw new Error(`Routing row ${index + 1} has unknown transport ${routeType}`)

  const action = endpoint.split('.').at(-1)
  const effect =
    transport === 'get' ? 'read' : DESTRUCTIVE_ACTION.test(action) ? 'destructive' : 'write'

  return {
    path: `slack.${path}`,
    endpoint,
    transport,
    effect,
    docs: `https://docs.slack.dev/reference/methods/${endpoint}/`,
  }
})

const catalog = {
  schema_version: 1,
  generated_from: 'tests/routing.spec.ts',
  effect_policy:
    'GET routes are read; non-GET routes are write; destructive action-name prefixes are destructive.',
  method_count: methods.length,
  methods,
  helpers: [
    {
      path: 'slack.call',
      transport: 'dynamic',
      effect: 'depends_on_endpoint',
      docs: 'https://github.com/yhay81/GASlacker#calling-any-method',
    },
    {
      path: 'slack.paginate',
      transport: 'dynamic',
      effect: 'depends_on_endpoint',
      docs: 'https://github.com/yhay81/GASlacker#pagination',
    },
    {
      path: 'slack.files.uploadV2',
      transport: 'composite',
      effect: 'write',
      docs: 'https://github.com/yhay81/GASlacker#uploading-files',
    },
  ],
}

const output = `${JSON.stringify(catalog, null, 2)}\n`
if (process.argv.includes('--check')) {
  const existing = readFileSync(OUTPUT_URL, 'utf8')
  if (existing !== output) {
    console.error('docs/methods.json is out of date. Run pnpm run catalog.')
    process.exit(1)
  }
} else {
  writeFileSync(OUTPUT_URL, output)
  console.log(`Generated ${methods.length} methods in docs/methods.json`)
}
