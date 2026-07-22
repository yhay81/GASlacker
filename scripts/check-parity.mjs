// Slack 公式 node-slack-sdk のメソッド一覧と dist/bundle.js を突き合わせ、
// 未実装の新 API があれば一覧を出力して exit 1 する(週次 CI から実行)。
import { readFileSync } from 'node:fs'

const SDK_URL =
  'https://raw.githubusercontent.com/slackapi/node-slack-sdk/main/packages/web-api/src/methods.ts'

// 意図的に対象外とするもの(README の Removed / not included と対応)
const EXCLUDED = [
  /^admin\./, // Enterprise 管理系はスコープ外(slack.call() で呼べる)
  /^files\.comments\./, // 2018 年廃止
  /^rtm\./, // legacy RTM
  /^migration\./, // legacy トークン移行
  /^oauth\.access$/, // OAuth v1
  /^oauth\.v2\.exchange$/, // legacy トークン交換
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
  console.error(`SDK 一覧の取得に失敗した可能性があります(抽出数: ${sdkMethods.length})`)
  process.exit(2)
}

const missing = sdkMethods.filter(
  (m) => !EXCLUDED.some((ex) => ex.test(m)) && !implMethods.includes(m),
)

if (missing.length === 0) {
  console.log(`パリティ OK: SDK ${sdkMethods.length} メソッド中、対象の全メソッドを実装済み`)
  process.exit(0)
}

console.log('Slack SDK に存在し GASlacker に未実装のメソッド:')
for (const m of missing) console.log(`- ${m}`)
console.log(
  '\n追加手順は CONTRIBUTING.md を参照(実在確認 → クラスに 1 行 → routing.spec.ts に 1 行)',
)
process.exit(1)
