# GASlacker

Google Apps Script から Slack Web API を呼び出すための小さなライブラリです。
Authorization ヘッダー + JSON 送信を基本に、OAuth v2 やファイルアップロードのフォーム送信にも対応します。

## クイックスタート

前提: Node.js 22.12+ / pnpm

1. このリポジトリを取得し、`pnpm install` を実行します。
2. `pnpm run build` で `dist/bundle.js` を生成します。
3. 新規 Apps Script に `dist/bundle.js` を貼り付けて保存します。
4. ライブラリとして公開し、スクリプト ID を取得します。
5. 利用側の Apps Script にライブラリを追加します。
6. スクリプト プロパティに `SLACK_ACCESS_TOKEN` を保存します。

## 使い方

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function doPost(e) {
  // Events API を使う場合は署名検証などを別途実装してください。
  var event = JSON.parse(e.postData.contents).event;
  if (event.text.match(/hello/)) {
    slack.chat.postMessage({ channel: event.channel, text: 'Hello World' });
  }
}
```

### レスポンス

各メソッドは Slack API の JSON レスポンスをそのまま返します。
`ok` / `error` を利用側で確認してください。

```JavaScript
var res = slack.chat.postMessage({ channel: 'C123', text: 'Hi' });
if (!res.ok) {
  Logger.log(res.error);
}
```

### 任意のメソッド呼び出し

```JavaScript
slack.call('chat.postMessage', { channel: 'C123', text: 'Hi' });
slack.call('conversations.list', { limit: 20 }, 'get');
```

### フォーム送信が必要な例

```JavaScript
slack.oauth.access({
  client_id: clientId,
  client_secret: clientSecret,
  code: code,
  redirect_uri: redirectUri
});
slack.files.uploadV2({
  channel_id: 'C123',
  file: fileBlob,
  filename: 'report.txt'
});
```

### リトライ回数

`GASlacker.methods(token, retriesLimit)` の `retriesLimit` は 429 時の追加リトライ回数です。
省略時は 3、0 を指定すると 1 回だけリクエストします。

## 変更方針

- legacy 系の `channels.*` / `groups.*` / `im.*` / `mpim.*` / `rtm.*` は削除しています。
- `apps.permissions.users.*` は Workspace Apps 廃止に伴い削除しています。
- legacy トークン向けの `migration.exchange` / `oauth.v2.exchange` は削除しています。
- ファイルアップロードは `files.uploadV2` のみ提供します。

## 開発

- `pnpm run lint` / `pnpm run fmt` / `pnpm run test` / `pnpm run build`
- `pnpm run deploy` は `clasp push` で Apps Script に反映します。
- `.clasp.json` の `scriptId` は事前に設定してください。

## ドキュメント

Slack API の詳細は公式ドキュメントを参照してください。
https://docs.slack.dev/reference/methods/

## Reference

- https://github.com/os/slacker
- https://github.com/soundTricker/SlackApp
- https://github.com/howdy39/gas-clasp-starter

## License

MIT License. 詳細は `LICENSE.txt` を参照してください。

## Contributing

Issue と PR は歓迎します。
