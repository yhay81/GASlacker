// docs/verification.md の最小検証セットを実 Slack API に対して実行するハーネス。
// dist/bundle.js(配布物そのもの)を GAS グローバルのスタブ付きで実行する。
//
// 使い方:
//   node scripts/verify-live.mjs                     # トークンなし: 送信経路の生存確認
//   SLACK_ACCESS_TOKEN=xoxb-... \
//   SLACK_TEST_CHANNEL=C0123456789 \
//   node scripts/verify-live.mjs                     # トークンあり: 実投稿・実アップロード
//
// トークンの値は一切出力しない。
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const workDir = mkdtempSync(join(tmpdir(), 'gaslacker-verify-'))
const bodyFile = join(workDir, 'body')
const headerFile = join(workDir, 'headers')
const blobFile = join(workDir, 'blob')

// UrlFetchApp.fetch 互換の同期 HTTP(curl 利用、依存ゼロ)
const fetchImpl = (url, params = {}) => {
  const args = ['-s', '-X', (params.method || 'get').toUpperCase(), '-o', bodyFile, '-D', headerFile, '-w', '%{http_code}']
  for (const [key, value] of Object.entries(params.headers || {})) args.push('-H', `${key}: ${value}`)
  if (params.contentType) args.push('-H', `Content-Type: ${params.contentType}`)
  const payload = params.payload
  if (payload != null) {
    if (typeof payload === 'string') {
      args.push('--data-binary', payload)
    } else if (typeof payload.getBytes === 'function') {
      writeFileSync(blobFile, Buffer.from(payload.getBytes()))
      args.push('--data-binary', `@${blobFile}`)
    } else {
      for (const [key, value] of Object.entries(payload)) args.push('--data-urlencode', `${key}=${value}`)
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
  sleep: (ms) => execFileSync('sleep', [String(ms / 1000)]),
  newBlob,
}

// 配布物そのものを評価して global.methods を得る
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

console.log(`モード: ${token ? 'トークンあり(実投稿)' : 'トークンなし(送信経路の生存確認)'}\n`)

// 1. GET 経路(トークン不要)
const apiTest = slack.api.test({ ping: 'pong' })
check('api.test (GET)', apiTest.ok === true && apiTest.args?.ping === 'pong', `ok=${apiTest.ok}`)

// 2. 認証付き GET 経路
const authTest = slack.auth.test()
check(
  'auth.test (GET + Authorization)',
  token ? authTest.ok === true : authTest.error === 'not_authed',
  token ? `ok=${authTest.ok}` : `error=${authTest.error}(経路生存)`,
)

// 3. 任意メソッド GET(slack.call)
const list = slack.call('conversations.list', { limit: 1 }, 'get')
check(
  "call('conversations.list', 'get')",
  token ? list.ok === true : list.error === 'not_authed',
  token ? `ok=${list.ok}` : `error=${list.error}(経路生存)`,
)

// 4. フォーム POST 経路(oauth.v2.access はトークン不要で JSON エラーを返す)
const oauth = slack.oauth.access({ code: 'verification-dummy' })
check(
  'oauth.access (form POST)',
  oauth.ok === false && typeof oauth.error === 'string' && oauth.error !== 'invalid_json',
  `error=${oauth.error}(JSON で応答)`,
)

// 5. JSON POST 経路
if (token && channel) {
  const post = slack.chat.postMessage({ channel, text: 'GASlacker verify-live: chat.postMessage' })
  check('chat.postMessage (JSON POST)', post.ok === true, `ok=${post.ok} error=${post.error ?? '-'}`)
} else {
  const post = slack.chat.postMessage({ channel: 'C000', text: 'x' })
  check(
    'chat.postMessage (JSON POST)',
    token ? post.ok === false : post.error === 'not_authed',
    `error=${post.error}(経路生存)`,
  )
}

// 6. ファイルアップロード(3 ステップ合成)
const blob = newBlob('GASlacker verify-live upload\n', 'text/plain', 'gaslacker-verify.txt')
if (token && channel) {
  const upload = slack.files.uploadV2({ channel_id: channel, file: blob, initial_comment: 'verify-live upload' })
  check('files.uploadV2 (3-step upload)', upload.ok === true, `ok=${upload.ok} error=${upload.error ?? '-'}`)
} else {
  const upload = slack.files.uploadV2({ file: blob })
  check(
    'files.uploadV2 (step 1 route)',
    upload.error === 'not_authed',
    `error=${upload.error}(getUploadURLExternal まで到達)`,
  )
}

console.log(`\n${failed === 0 ? '最小検証セット: すべて成功' : `失敗: ${failed} 件`}`)
if (!token) console.log('(実投稿まで検証するには SLACK_ACCESS_TOKEN と SLACK_TEST_CHANNEL を設定してください)')
process.exit(failed === 0 ? 0 : 1)
