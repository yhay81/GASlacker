// Harness that runs the minimal verification set from docs/verification.md against the real
// Slack API.
//
// Usage:
//   node scripts/verify-live.mjs                     # no token: confirms request paths stay alive
//   SLACK_ACCESS_TOKEN=xoxb-... \
//   SLACK_TEST_CHANNEL=C0123456789 \
//   node scripts/verify-live.mjs                     # with token: real post + real upload
//
// The token value is never printed.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const workDir = mkdtempSync(join(tmpdir(), 'gaslacker-verify-'))
const bodyFile = join(workDir, 'body')
const headerFile = join(workDir, 'headers')
const blobFile = join(workDir, 'blob')

// Synchronous HTTP compatible with UrlFetchApp.fetch (uses curl, zero dependencies)
const fetchImpl = (url, params = {}) => {
  const args = [
    '-s',
    '-X',
    (params.method || 'get').toUpperCase(),
    '-o',
    bodyFile,
    '-D',
    headerFile,
    '-w',
    '%{http_code}',
  ]
  for (const [key, value] of Object.entries(params.headers || {}))
    args.push('-H', `${key}: ${value}`)
  if (params.contentType) args.push('-H', `Content-Type: ${params.contentType}`)
  const payload = params.payload
  if (payload != null) {
    if (typeof payload === 'string') {
      args.push('--data-binary', payload)
    } else if (typeof payload.getBytes === 'function') {
      writeFileSync(blobFile, Buffer.from(payload.getBytes()))
      args.push('--data-binary', `@${blobFile}`)
    } else {
      for (const [key, value] of Object.entries(payload))
        args.push('--data-urlencode', `${key}=${value}`)
    }
  }
  args.push(url)
  const status = execFileSync('curl', args, { encoding: 'utf8' }).trim()
  const text = readFileSync(bodyFile, 'utf8')
  const headers = {}
  for (const line of readFileSync(headerFile, 'utf8').split('\r\n')) {
    const i = line.indexOf(':')
    if (i > 0) headers[line.slice(0, i)] = line.slice(i + 1).trim()
  }
  return {
    getResponseCode: () => parseInt(status, 10),
    getContentText: () => text,
    getHeaders: () => headers,
  }
}

const newBlob = (content, contentType = 'text/plain', name = null) => ({
  getBytes: () => Array.from(Buffer.from(String(content), 'utf8')),
  getName: () => name,
  getContentType: () => contentType,
})

globalThis.UrlFetchApp = { fetch: fetchImpl }
globalThis.Utilities = {
  // Synchronous sleep via Atomics.wait (no external command; works on Windows too)
  sleep: (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms),
  newBlob,
}

// Evaluate the distributable itself to obtain global.methods
;(0, eval)(readFileSync(new URL('../dist/bundle.js', import.meta.url), 'utf8'))
const methods = globalThis.methods

const token = process.env.SLACK_ACCESS_TOKEN || null
const channel = process.env.SLACK_TEST_CHANNEL || null
const slack = methods(token)

let failed = 0
const check = (label, condition, detail) => {
  const mark = condition ? 'PASS' : 'FAIL'
  if (!condition) failed++
  console.log(`[${mark}] ${label}${detail ? ` — ${detail}` : ''}`)
}

console.log(
  `Mode: ${token ? 'token provided (real post)' : 'no token (request-path smoke test)'}\n`,
)

// 1. GET route (no token required)
const apiTest = slack.api.test({ ping: 'pong' })
check('api.test (GET)', apiTest.ok === true && apiTest.args?.ping === 'pong', `ok=${apiTest.ok}`)

// 2. Authorized GET route
const authTest = slack.auth.test()
check(
  'auth.test (GET + Authorization)',
  token ? authTest.ok === true : authTest.error === 'not_authed',
  token ? `ok=${authTest.ok}` : `error=${authTest.error} (route alive)`,
)

// 3. Arbitrary method via GET (slack.call)
const list = slack.call('conversations.list', { limit: 1 }, 'get')
check(
  "call('conversations.list', 'get')",
  token ? list.ok === true : list.error === 'not_authed',
  token ? `ok=${list.ok}` : `error=${list.error} (route alive)`,
)

// 4. Form POST route (oauth.v2.access needs no token and answers a JSON error)
const oauth = slack.oauth.access({ code: 'verification-dummy' })
check(
  'oauth.access (form POST)',
  oauth.ok === false && typeof oauth.error === 'string' && oauth.error !== 'invalid_json',
  `error=${oauth.error} (answered as JSON)`,
)

// 5. JSON POST route
if (token && channel) {
  const post = slack.chat.postMessage({ channel, text: 'GASlacker verify-live: chat.postMessage' })
  check(
    'chat.postMessage (JSON POST)',
    post.ok === true,
    `ok=${post.ok} error=${post.error ?? '-'}`,
  )
} else {
  const post = slack.chat.postMessage({ channel: 'C000', text: 'x' })
  check(
    'chat.postMessage (JSON POST)',
    token ? post.ok === false : post.error === 'not_authed',
    `error=${post.error} (route alive)`,
  )
}

// 6. File upload (3-step composite)
const blob = newBlob('GASlacker verify-live upload\n', 'text/plain', 'gaslacker-verify.txt')
if (token && channel) {
  const upload = slack.files.uploadV2({
    channel_id: channel,
    file: blob,
    initial_comment: 'verify-live upload',
  })
  check(
    'files.uploadV2 (3-step upload)',
    upload.ok === true,
    `ok=${upload.ok} error=${upload.error ?? '-'}`,
  )
} else {
  const upload = slack.files.uploadV2({ file: blob })
  check(
    'files.uploadV2 (step 1 route)',
    upload.error === 'not_authed',
    `error=${upload.error} (reached getUploadURLExternal)`,
  )
}

console.log(`\n${failed === 0 ? 'Minimal verification set: all passed' : `Failed: ${failed}`}`)
if (!token)
  console.log('(set SLACK_ACCESS_TOKEN and SLACK_TEST_CHANNEL to verify real posting too)')
process.exit(failed === 0 ? 0 : 1)
