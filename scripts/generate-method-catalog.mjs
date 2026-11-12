import { readFileSync, writeFileSync } from 'node:fs'
import { parseSync } from 'vite'

const ROUTING_URL = new URL('../tests/routing.spec.ts', import.meta.url)
const OUTPUT_URL = new URL('../docs/methods.json', import.meta.url)
const TRANSPORTS = {
  get: 'get',
  post: 'json',
  post_form: 'form',
  post_file: 'multipart',
}
// Classify actions independently of their HTTP verb. Slack uses GET for some writes.
const DESTRUCTIVE_ACTION =
  /^(archive|bulkArchive|bulkDelete|clear|close|deactivate|decline|delete|deny|disable|disconnect|end|invalidate|kick|leave|remove|reset|restrict|revoke|tombstone|uninstall|unlink|unpublish)/
const READ_ACTIONS = new Set([
  'accessLogs',
  'activity',
  'all',
  'billableInfo',
  'bulkGet',
  'context',
  'conversations',
  'count',
  'fetch',
  'files',
  'get',
  'getCanvas',
  'getContent',
  'getConversationPrefs',
  'getCustomRetention',
  'getEntities',
  'getExpiration',
  'getFile',
  'getItem',
  'getPermalink',
  'getPresence',
  'getSettings',
  'getTeams',
  'history',
  'identity',
  'info',
  'integrationLogs',
  'list',
  'listAssignments',
  'listChannels',
  'listConnectInvites',
  'listGroups',
  'listOriginalConnectedChannelInfo',
  'listViews',
  'lookup',
  'lookupByEmail',
  'members',
  'messages',
  'metadata',
  'query',
  'replies',
  'search',
  'skills',
  'teamInfo',
  'test',
  'tools',
  'userInfo',
  'validate',
])

// Some public methods have their specification in a guide or SDK instead of a method page.
const SDK_DOCS = {
  'apps.user.connection.bulkUpdate': 'AppsUserConnectionBulkUpdateArguments',
  'apps.user.connection.requestAuth': 'AppsUserConnectionRequestAuthArguments',
}

function documentationURL(endpoint) {
  if (SDK_DOCS[endpoint])
    return `https://docs.slack.dev/tools/node-slack-sdk/reference/web-api/type-aliases/${SDK_DOCS[endpoint]}/`
  const [, family, action] = endpoint.split('.')
  if (endpoint.startsWith('admin.legalHold.'))
    return `https://docs.slack.dev/reference/legal-holds-api-reference/#${endpoint.split('.').slice(2).join('_')}`
  if (endpoint.startsWith('oversight.'))
    return `https://docs.slack.dev/admins/admin-oversight-api/#${family}_${action}`
  if (endpoint === 'links.accountLinkedResult' || endpoint === 'apps.links.toggle')
    return `https://docs.slack.dev/authentication/sign-in-with-slack/setting-up-sign-in-with-slack-links/#${endpoint === 'apps.links.toggle' ? 'kill_switch' : 'metrics'}`
  if (endpoint === 'files.comments.get')
    return 'https://docs.slack.dev/changelog/2019/02/01/cemented-fate-for-file-comments/'
  if (endpoint.startsWith('enterprise.auth.idpconfig.'))
    return 'https://github.com/slackapi/deno-slack-api/blob/2.9.3/src/generated/method-types/enterprise.ts'
  if (endpoint === 'workflows.triggers.info')
    return 'https://github.com/slackapi/slack-cli/blob/v4.13.0/internal/api/workflows.go'
  if (/^workflows\.triggers\.(create|delete|list|update)$/.test(endpoint))
    return 'https://github.com/slackapi/deno-slack-api/blob/2.9.3/src/typed-method-types/workflows/triggers/mod.ts'
  return `https://docs.slack.dev/reference/methods/${endpoint}/`
}

const { program, errors } = parseSync(ROUTING_URL.pathname, readFileSync(ROUTING_URL, 'utf8'))
if (errors.length) throw new Error(errors[0].message)
const rows = program.body
  .flatMap((node) => node.declarations ?? [])
  .find((declaration) => declaration.id.name === 'CASES')?.init.elements
if (!rows?.length) throw new Error('Could not find the CASES routing table')

const methods = rows.map(({ elements: [name, , route] }, index) => {
  const endpoint = name.value
  const transport = TRANSPORTS[route.value]
  if (typeof endpoint !== 'string' || !transport)
    throw new Error(`Invalid routing row ${index + 1}`)
  const action = endpoint.split('.').at(-1)
  const effect = DESTRUCTIVE_ACTION.test(action)
    ? 'destructive'
    : READ_ACTIONS.has(action) || endpoint === 'apps.manifest.export'
      ? 'read'
      : 'write'
  // oauth.access has historically been a v2 alias in GASlacker.
  const path = endpoint === 'oauth.access' ? 'slack.oauth.v1.access' : `slack.${endpoint}`
  return { path, endpoint, transport, effect, docs: documentationURL(endpoint) }
})

const catalog = {
  schema_version: 1,
  generated_from: 'tests/routing.spec.ts',
  effect_policy:
    'Known reads are read. Destructive action names are destructive. All other actions are write.',
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
