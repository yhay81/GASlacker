# 検証方針と手順

## 目的

GAS から Slack Web API を安定して呼び出せることを確認する。

## 検証範囲

- ビルド成果物の生成と公開形態
- GET/JSON POST/フォーム POST/ファイル POST の送信経路
- 429 レート制限時の待機・再試行
- レスポンス JSON の解釈とエラー表現
- 引数オブジェクトの呼び出し
- OAuth v2 / Socket Mode / モーダル / 大容量アップロード
- ライブラリとしての利用性（`GASlacker.methods`）

## 前提

- Node.js 22.12 以上
- テスト用 Slack ワークスペースと Slack App
- テスト用 Bot Token を Script Properties に保存済み
- テスト用チャンネル（例: `#gaslacker-test`）
- OAuth v2 用の Client ID / Client Secret / Redirect URI
- Socket Mode 用の App-Level Token（`xapp-`）
- モーダル検証用の `trigger_id`
- 対象機能を検証できない場合は未実施理由を記録する

## 最小検証セット（必須）

1. ビルドが通る
2. GAS から `auth.test` が通る
3. JSON POST で `chat.postMessage` が通る
4. GET で `slack.call` が通る
5. フォーム POST で `oauth.v2.access` が JSON を返す
6. ファイル POST で `files.uploadV2` が通る

## 詳細検証

### 1. ビルド/配布検証

**目的**: ライブラリとして利用可能な bundle を生成できること  
**手順**

```sh
pnpm run build
```

**期待結果**

- `dist/bundle.js` が生成される
- `dist/bundle.js` 内に `global.methods` が存在する

### 2. ユーティリティ検証

**目的**: パラメータ変換の基本動作が正しいこと  
**手順**

```sh
pnpm run test
```

**期待結果**

- `tests/util.spec.ts` がすべて成功する

### 3. GAS スモークテスト

**目的**: GAS から認証付きで Slack API を呼び出せること  
**手順**

```JavaScript
var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var slack = GASlacker.methods(token);

function smoke() {
  Logger.log(slack.auth.test());
  Logger.log(slack.api.test({ ping: 'pong' }));
  Logger.log(slack.chat.postMessage({ channel: 'C123', text: 'GASlacker smoke' }));
}
```

**期待結果**

- `auth.test` が `ok: true` を返す
- `api.test` が `ok: true` を返す
- `chat.postMessage` が `ok: true` を返し、チャンネルに投稿される

### 4. GET/JSON POST の検証

**目的**: GET と JSON POST の送信経路が正しいこと  
**手順**

- GET: `auth.test` または `conversations.list`
- JSON POST: `chat.postMessage` / `chat.update`
- GET（任意メソッド）: `slack.call('conversations.list', { limit: 1 }, 'get')`
  **期待結果**
- `ok: true` を返す
- GET ではクエリ文字列が正しく付与される

### 5. フォーム POST の検証

**目的**: フォーム送信経路が正しいこと  
**手順（例）**

- `oauth.v2.access` をテスト用 App で実行  
   （失敗でも `ok: false` と `error` が返れば送信経路は確認できる）
  **期待結果**
- `ok: true` または `ok: false` と `error` が JSON で返る

### 6. ファイルアップロードの検証

**目的**: `files.uploadV2`(3 ステップ合成)の経路が正しいこと  
**補足**: `files.uploadV2` という HTTP エンドポイントは存在しないため、内部で
`files.getUploadURLExternal` → アップロード URL への POST →
`files.completeUploadExternal` を順に実行する実装になっている。  
**手順（例）**

```JavaScript
function upload() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt');
  Logger.log(slack.files.uploadV2({ channel_id: 'C123', file: blob }));
}
```

**期待結果**

- `ok: true` を返す
- チャンネルにファイルが表示される

### 7. 個別ステップでのアップロード検証

**目的**: `files.getUploadURLExternal` / `files.completeUploadExternal` の経路が正しいこと  
**手順（例）**

```JavaScript
function uploadLarge() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  var blob = Utilities.newBlob('hello', 'text/plain', 'hello.txt');
  var res = slack.files.getUploadURLExternal({ filename: 'hello.txt', length: blob.getBytes().length });
  var uploadUrl = res.upload_url;
  var fileId = res.file_id;
  UrlFetchApp.fetch(uploadUrl, { method: 'post', payload: blob });
  Logger.log(slack.files.completeUploadExternal({ files: [{ id: fileId, title: 'hello.txt' }], channel_id: 'C123' }));
}
```

**期待結果**

- `ok: true` を返す
- チャンネルにファイルが表示される

### 8. Socket Mode の検証

**目的**: `apps.connections.open` が成功すること  
**手順（例）**

```JavaScript
function socketMode() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_APP_LEVEL_TOKEN');
  var slack = GASlacker.methods(token);
  Logger.log(slack.apps.connections.open());
}
```

**期待結果**

- `ok: true` を返す
- `url` が `wss://` で始まる

### 9. モーダルの検証

**目的**: `views.open` が成功すること  
**手順（例）**

```JavaScript
function openModal(triggerId) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slack = GASlacker.methods(token);
  Logger.log(slack.views.open({
    trigger_id: triggerId,
    view: { type: 'modal', title: { type: 'plain_text', text: 'GASlacker' }, blocks: [] }
  }));
}
```

**期待結果**

- `ok: true` を返す

### 10. 失敗系の検証

**目的**: エラー時に `ok: false` が返ること  
**手順**

- 無効なトークンで `auth.test` を実行
- 存在しない API 名で `call` を実行  
  **期待結果**
- `ok: false` と `error` が返る

### 11. レート制限の検証（任意）

**目的**: 429 の待機・再試行が動くこと  
**手順**

- 高頻度呼び出しで 429 を発生させる
  **期待結果**
- `retry-after` の秒数だけ待機後に再試行される

### 12. ライブラリ公開の検証

**目的**: ライブラリとして他スクリプトから利用できること  
**手順**

- `dist/bundle.js` を Apps Script に貼り付けてライブラリ公開
- 別の Apps Script でライブラリとして追加し `GASlacker.methods` を呼ぶ
  **期待結果**
- `GASlacker.methods` が参照できる
- `auth.test` が成功する

## 最小合否基準

- 最小検証セットがすべて成功すること
- GAS 上で `ok: true` が取得できること
- README に記載した機能は対応する詳細検証が成功、または未実施理由が記録されていること

## 記録の残し方

- 実行日時、トークン種別（Bot/User）、チャンネル ID、`ok`/`error` をメモする
- 失敗時は `error` 値と再現手順を残す

## 検証記録（トークン不要）

- 実行日時: 2026-01-01 01:00
- 環境: Node.js v24.12.0
- 実行コマンド: `pnpm run test` / `pnpm run build`
- 結果: Lint/ユーティリティ/メソッド/エントリのテスト成功、`dist/bundle.js` 生成と `global.methods` の存在を確認
- 補足: GET/JSON POST/フォーム POST/ファイル POST/429 待機・再試行に加え、Authorization ヘッダー無し、Users.setPhoto、ネストクライアントのルーティングをユニットテストで確認（実 API 呼び出しは未実施）

## 自動検証ハーネス

`scripts/verify-live.mjs` が本ドキュメントの最小検証セットを実 Slack API に対して実行する。
`dist/bundle.js`(配布物そのもの)を GAS グローバルのスタブ付きで評価するため、
バンドルのスモークテストを兼ねる。

```sh
pnpm run verify:live                     # トークンなし: 送信経路の生存確認
SLACK_ACCESS_TOKEN=xoxb-... \
SLACK_TEST_CHANNEL=C0123456789 \
pnpm run verify:live                     # トークンあり: 実投稿・実アップロード
```

## 検証記録（エンドポイント実在確認）

- 実行日時: 2026-07-22
- 方法: トークンなしで `curl -X POST https://slack.com/api/<method>` を全メソッドに実行し、
  実在(`not_authed`)/廃止(`unknown_method`)を判定
- 結果: ライブラリが提供する全 116 エンドポイントの実在を確認。
  廃止判定となった `files.uploadV2`(HTTP エンドポイントとしては不存在)、
  `files.comments.add/edit/delete`、`apps.permissions.*` は削除または合成実装に置き換え。
  新規追加した `canvases.*` / `conversations.canvases.create` / `assistant.threads.*` も実在を確認。
- 補足: トークンを使う実 API 検証(最小検証セット)は未実施。リリース前に実施を推奨。
## 検証記録(送信経路の実測 — verify:live)

- 実行日時: 2026-07-22
- 方法: `pnpm run verify:live`(トークンなしモード)で dist/bundle.js を実 Slack API に対して実行
- 結果: 6 項目すべて成功 — api.test は ok:true、認証付き GET / call GET / フォーム POST /
  JSON POST / uploadV2 1 段目はいずれも正しいエラー(not_authed / invalid_code)で応答し、
  送信経路とレスポンス解釈の生存を確認
- 補足: 実投稿・実アップロード(トークンありモード)は未実施
