> 2026年7月追記: 2018年に公開したGASlackerを全面的に更新し、v1.4.0として再リリースしました。この記事も、現在のSlack APIとApps Scriptの仕様に合わせて書き直しています。

## tl;dr

[GASlacker](https://github.com/yhay81/GASlacker)は、Google Apps ScriptからSlack Web APIを呼び出すためのOSSライブラリです。

- 公開ライブラリを追加するだけ。ビルドもサーバーも不要
- Slack公式SDKと同じ感覚で `slack.chat.postMessage({...})` と書ける
- 168個のSlack Web APIメソッドに対応
- 429レート制限の自動リトライ、カーソルページネーション、現在の3段階ファイルアップロードに対応
- 実行時依存ゼロ、MIT License

5分で試せる多言語ガイドも用意しました。

https://yhay81.github.io/GASlacker/

## 5分で導入する

### 1. Slack Appを用意する

[Slack API](https://api.slack.com/apps)でアプリを作り、必要なBot Token Scopesを追加してワークスペースへインストールします。メッセージ投稿だけなら、まずは `chat:write` があれば動かせます。

発行された `xoxb-` で始まるBot User OAuth Tokenは、コードへ直接書かず、Apps Scriptの「プロジェクトの設定」→「スクリプト プロパティ」に保存します。

| プロパティ | 値 |
|---|---|
| `SLACK_ACCESS_TOKEN` | `xoxb-...` |

### 2. GASlackerを追加する

Apps Scriptエディタ左側の「ライブラリ」の `+` を押し、次のスクリプトIDを入力します。

```text
101aZZYpRRnr5AGkVIo8t_yo4kHb7xryLfq3w-HVPpQ4fX0Tkxv3UJyzc
```

「検索」を押し、最新バージョンを選択します。識別子は `GASlacker` のままで構いません。v1.4.0はライブラリバージョン `9` です。

### 3. 投稿する

```javascript
function hello() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)

  var res = slack.chat.postMessage({
    channel: 'C0123456789',
    text: 'Hello from Google Apps Script!',
  })

  if (!res.ok) Logger.log(res.error)
}
```

各メソッドはSlackのレスポンスを返すので、`ok` と `error` を確認できます。メソッド名と引数はSlack公式ドキュメントに近く、たとえば履歴取得は `slack.conversations.history({...})`、リアクション追加は `slack.reactions.add({...})` です。

## 業務自動化レシピ

リポジトリに、そのままコピーして使える例を追加しました。

### Googleフォームの回答をSlackへ通知

回答先スプレッドシートで、インストール型の「フォーム送信時」トリガーを設定します。質問と回答をBlock Kitで読みやすく通知します。

https://github.com/yhay81/GASlacker/blob/main/examples/form-response-notification.js

### 毎朝、今日のGoogleカレンダーを投稿

時間主導型トリガーで毎朝実行し、終日予定と時刻付き予定をSlackへまとめます。

https://github.com/yhay81/GASlacker/blob/main/examples/daily-calendar-agenda.js

### スプレッドシートの期限超過タスクを担当者へDM

タスク、SlackユーザーID、期限、ステータスをシートで管理し、期限超過だけをDMします。「最終通知日」を記録するため、同じ日に何度実行しても重複通知しません。

https://github.com/yhay81/GASlacker/blob/main/examples/overdue-task-reminder.js

### CSVレポートをアップロード

Slackが廃止した旧 `files.upload` ではなく、現在の外部アップロード3段階フローを `files.uploadV2` ひとつにまとめています。

https://github.com/yhay81/GASlacker/blob/main/examples/upload-and-paginate.js

## v1.4.0でできること

GASlackerはSlack Web APIの168メソッドを、公式SDKに近い形で整理しています。

- `chat.*`: 投稿、更新、削除、予約投稿、ストリーミング
- `conversations.*`: チャンネル一覧、履歴、参加、Slack Connect
- `files.*`: ファイル一覧と現在のアップロードフロー
- `canvases.*`、`assistant.threads.*`、`slackLists.*` などの新しいAPI
- OAuth v2、OpenID Connect、トークンローテーション

未ラップのAPIも次の形で呼べます。

```javascript
slack.call('some.method', { key: 'value' })
```

カーソルページネーションも共通化しています。

```javascript
var pages = slack.paginate('conversations.list', { limit: 200 }, 'get')
var channels = pages.flatMap(function (page) {
  return page.channels || []
})
```

HTTP 429ではSlackの `Retry-After` を尊重して自動的に再試行します。再試行を使い切った場合も例外で処理を壊さず、`{ ok: false, error: 'ratelimited', retry_after: ... }` を返します。

## Events APIについての重要な注意

2018年版の記事では、Apps Scriptの `doPost(e)` でSlack Events APIを直接受ける例を載せていました。現在、この構成は推奨しません。

Slackのリクエスト検証には生のリクエスト本文と `X-Slack-Signature` / `X-Slack-Request-Timestamp` ヘッダーが必要ですが、Apps ScriptのWebアプリは `doPost(e)` に受信ヘッダーを公開しません。本文だけを信用する公開エンドポイントは偽装できます。

Events APIを使う場合はCloud RunやCloud Functionsなど、ヘッダーを取得できるHTTPサービスで署名検証と3秒以内の応答を行い、GASlackerは信頼できるApps Scriptからの送信処理に利用してください。

## 品質をどう担保しているか

- すべての登録エンドポイントについて、Slack API上に実在することを確認
- 243件のテストと型チェック、lint、bundle同期確認をCIで実行
- Slack公式SDKとのメソッド差分を週次で確認し、新APIを検出するとIssueを作成
- トークンはメモリ上だけで扱い、実行時依存はゼロ

ソースコード、詳細なAPI一覧、コントリビューション方法はこちらです。

https://github.com/yhay81/GASlacker

## まとめ

最初に公開してから時間が空きましたが、2026年にSlack APIの現状へ追随し、導入体験、テスト、型定義、ドキュメントまでまとめて作り直しました。

スプレッドシートやフォーム、カレンダーをSlackにつなぐ小さな自動化に向いています。使えそうならGitHub Starや、Discussionsでの利用例共有をもらえるとうれしいです。
