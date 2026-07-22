# GASlacker

[![CI](https://github.com/yhay81/GASlacker/actions/workflows/ci.yml/badge.svg)](https://github.com/yhay81/GASlacker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)

English version: [README.md](README.md)

Google Apps Script から Slack Web API を呼び出すための軽量クライアントライブラリです。

- 公式 SDK と同じ構成の 110+ メソッド: `slack.chat.postMessage({...})`
- Bearer 認証 + JSON 送信、レート制限(HTTP 429)時は `Retry-After` を尊重して自動リトライ
- ファイルアップロードは現行の 3 ステップ外部アップロード方式で実装(`files.uploadV2`)
- OAuth v2(`oauth.v2.access`)や `canvases.*` / `assistant.threads.*` などの新しい API に対応
- ランタイム依存ゼロ — GAS V8 ランタイム向けの単一 `bundle.js`
- 未対応メソッドも呼べる: `slack.call('some.method', params)`

本ライブラリの全エンドポイント名は、実際の Slack API に存在することを検証済みです
(存在しないメソッドは `unknown_method` を返すことを利用。[tests/routing.spec.ts](tests/routing.spec.ts) 参照)。

## インストール

ビルドは不要です — リポジトリ内の [`dist/bundle.js`](dist/bundle.js) が
そのまま使える配布物です。以下のいずれかで導入します。

**A. 公開ライブラリを追加(最も簡単)**

1. Apps Script プロジェクトの「ライブラリ」に次のスクリプト ID を追加します:

   ```
   101aZZYpRRnr5AGkVIo8t_yo4kHb7xryLfq3w-HVPpQ4fX0Tkxv3UJyzc
   ```

2. 最新バージョンを選び、識別子は `GASlacker` のまま
   `GASlacker.methods(token)` で利用します。

自分のコピーを固定したい場合は、スタンドアロンの Apps Script プロジェクトに
[`dist/bundle.js`](dist/bundle.js) を貼り付けて自分のライブラリとして公開してください。

**B. プロジェクトに直接貼り付け**

[`dist/bundle.js`](dist/bundle.js) を自分のプロジェクトにスクリプトファイルとして追加し、
`methods(token)` を直接呼びます(`GASlacker.` プレフィックス不要)。

**C. clasp で push**

このリポジトリを clone し、`.clasp.json` の `scriptId` を自分のものに設定して:

```sh
pnpm install
pnpm run deploy   # build + clasp push
```

`dist/bundle.js` を自分で再生成する場合は `pnpm install && pnpm run build`
(Node.js 22.12+ / pnpm が必要)。

## クイックスタート

スクリプト プロパティに `SLACK_ACCESS_TOKEN` を保存して:

```javascript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function hello() {
  var res = slack.chat.postMessage({ channel: 'C0123456789', text: 'Hello World' });
  if (!res.ok) {
    Logger.log(res.error);
  }
}
```

各メソッドは Slack API の JSON レスポンスをそのまま返します。`ok` / `error` を利用側で確認してください。

### Slack イベントの処理(Events API)

```javascript
function doPost(e) {
  var body = JSON.parse(e.postData.contents);
  // Events API 設定時のエンドポイント URL 検証
  if (body.type === 'url_verification') {
    return ContentService.createTextOutput(body.challenge);
  }
  // 本番では署名検証を別途実装してください。
  var event = body.event;
  if (event && event.type === 'message' && event.text && /hello/.test(event.text)) {
    slack.chat.postMessage({ channel: event.channel, text: 'Hello World' });
  }
  return ContentService.createTextOutput('');
}
```

### 任意のメソッド呼び出し

```javascript
slack.call('chat.postMessage', { channel: 'C0123456789', text: 'Hi' });
slack.call('conversations.list', { limit: 20 }, 'get');
```

### ファイルアップロード

`files.uploadV2` は Slack 公式の 3 ステップ
(`files.getUploadURLExternal` → アップロード → `files.completeUploadExternal`)を
1 回の呼び出しにまとめたものです:

```javascript
var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt');
slack.files.uploadV2({ channel_id: 'C0123456789', file: blob, initial_comment: 'A file!' });

// 文字列をファイルとしてアップロードする場合
slack.files.uploadV2({ channel_id: 'C0123456789', content: 'hello', filename: 'hello.txt' });
```

`file` には GAS の `Blob`、`content` には文字列(+`filename`)を指定します。
細かく制御したい場合は `slack.files.getUploadURLExternal` /
`slack.files.completeUploadExternal` を個別に呼べます。

### OAuth v2

```javascript
slack.oauth.access({
  client_id: clientId,
  client_secret: clientSecret,
  code: code,
  redirect_uri: redirectUri
});
```

### リトライ回数

`GASlacker.methods(token, retriesLimit)` の `retriesLimit` は HTTP 429 時の追加リトライ回数です。
省略時は 3、`0` を指定すると 1 回だけリクエストします。待機時間は `Retry-After` ヘッダーに従います。

## API カバレッジ

| プロパティ            | Slack API ファミリー                                                  |
| --------------------- | --------------------------------------------------------------------- |
| `slack.api`           | `api.test` と任意メソッド用の `call()`                                |
| `slack.apps`          | `apps.uninstall`, `apps.connections.*`, `apps.event.authorizations.*` |
| `slack.assistant`     | `assistant.threads.*`                                                 |
| `slack.auth`          | `auth.*`                                                              |
| `slack.bookmarks`     | `bookmarks.*`                                                         |
| `slack.bots`          | `bots.*`                                                              |
| `slack.canvases`      | `canvases.*`(`access` / `sections` 含む)                              |
| `slack.chat`          | `chat.*`                                                              |
| `slack.conversations` | `conversations.*`(`canvases.create` 含む)                             |
| `slack.dialog`        | `dialog.*`(レガシー)                                                  |
| `slack.dnd`           | `dnd.*`                                                               |
| `slack.emoji`         | `emoji.*`                                                             |
| `slack.files`         | `files.*`(`remote`・3 ステップアップロード含む)                       |
| `slack.oauth`         | `oauth.v2.access`                                                     |
| `slack.pins`          | `pins.*`                                                              |
| `slack.reactions`     | `reactions.*`                                                         |
| `slack.reminders`     | `reminders.*`                                                         |
| `slack.search`        | `search.*`                                                            |
| `slack.stars`         | `stars.*`(「後で」機能に移行済みだが現在も応答あり)                   |
| `slack.team`          | `team.*`(`profile` 含む)                                              |
| `slack.usergroups`    | `usergroups.*`(`users` 含む)                                          |
| `slack.users`         | `users.*`(`profile`・`setPhoto` 含む)                                 |
| `slack.views`         | `views.*`                                                             |

メソッド名は Slack のものと同じです。JavaScript の予約語と重なる場合のみ末尾に
アンダースコアを付けます: `chat.delete_()`, `files.delete_()`, `canvases.delete_()`。

## 削除済み・非対応

- レガシーの `channels.*` / `groups.*` / `im.*` / `mpim.*` / `rtm.*`
- `files.comments.*` と `apps.permissions.*`(Slack 側で廃止済み。`unknown_method` が返る)
- `files.upload`(v1、廃止済み)— `files.uploadV2` を使ってください
- `admin.*` 系(スコープ外。必要なら `slack.call()` で呼べます)

## 開発

```sh
pnpm run lint        # oxlint
pnpm run typecheck   # tsc --noEmit
pnpm run test        # vitest
pnpm run build       # lint + typecheck + test + vite build
pnpm run deploy      # build + clasp push
```

実 API に対する手動検証の方針は [docs/verification.md](docs/verification.md)、
API メソッドの追加手順は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

## 参考

- Slack Web API ドキュメント: https://docs.slack.dev/reference/methods/
- [os/slacker](https://github.com/os/slacker)、[soundTricker/SlackApp](https://github.com/soundTricker/SlackApp) を参考にしています

## ライセンス

MIT License。詳細は [LICENSE.txt](LICENSE.txt) を参照してください。
