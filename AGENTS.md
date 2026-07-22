# Repository Guidelines

## プロジェクト構成とモジュール整理

- `src/` が本体です。`src/methods/` に Slack API カテゴリ別のクラス、`src/index.ts` が `GASlacker.methods` の入口です。
- `tests/` に Vitest のユニットテスト(`*.spec.ts`)があります。`tests/routing.spec.ts` が全メソッドとエンドポイント名の対応表です。
- `docs/verification.md` は手動検証の方針と手順です。
- `dist/` はビルド成果物ですが、GAS 利用者が貼り付ける配布物のため意図的にコミットします(直接編集はしません)。
- `appsscript.json` は Google Apps Script 用マニフェストです。
- README は英語版 `README.md` が正、日本語版 `README.ja.md` を併記します。

## ビルド・テスト・開発コマンド

- 要件: Node.js 22.12+、pnpm。
- `pnpm install`: 依存関係の導入。
- `pnpm run lint`: Oxlint による静的解析。
- `pnpm run typecheck`: tsc --noEmit による型検査。
- `pnpm run fmt`: Oxfmt による整形。
- `pnpm run test`: Vitest 実行。
- `pnpm run build`: lint/typecheck/test 後に Vite で `dist/bundle.js` を生成し、`appsscript.json` を `dist/` にコピー。
- `pnpm run deploy`: build 後に `clasp push` で Apps Script へ反映。

## コーディングスタイルと命名

- 2 スペースインデント、末尾改行、末尾空白削除(`.editorconfig`)。
- シングルクォート、セミコロンなし、幅 100(`.oxfmtrc.json`)。
- 新規 API は `src/methods/` に追加し、`PascalCase` のクラス名と `camelCase` のメソッド名に揃えます。
- メソッド名は Slack と同名にします(`delete` もそのまま使えます)。`delete` には後方互換の
  `delete_` エイリアスを併設します。
- `src/` のコード内コメントは日本語で記述します。`examples/` は利用者向け配布物のため英語コメントとします。

## テスト指針

- 追加・変更したメソッドは `tests/routing.spec.ts` の表に 1 行追加します。
- エンドポイントを追加する前に実在確認をします: トークンなしで
  `curl -s -X POST https://slack.com/api/<method>` を実行し、実在なら
  `not_authed`、廃止済みなら `unknown_method` が返ります。`unknown_method` の
  メソッドは追加しません。
- 実 API の確認が必要な場合は `docs/verification.md` の最小検証セットを実施し、結果を記録します。

## アーキテクチャ概要

- `src/methods/BaseAPI.ts` が `UrlFetchApp` への送信、429 再試行、レスポンス整形を担当します。
- `SlackResponse` 型(`BaseAPI.ts`)が全メソッドの戻り値です。
- `src/util.ts` の `queryEncode` / `createPayload` / `createFormPayload` が GET/JSON/フォーム送信の共通処理です。
- `files.uploadV2` は存在しない HTTP エンドポイントのため、
  `files.getUploadURLExternal` → アップロード → `files.completeUploadExternal`
  の 3 ステップを 1 メソッドに合成しています(`src/methods/Files.ts`)。
- `DEFAULT_RETRIES`(`BaseAPI.ts`)を `GASlacker.methods(token, retries)` から上書きできます。

## 変更方針

- KISS / YAGNI を優先し、分岐や設定フラグは増やしません。
- 既存の `BaseAPI` と `util` を再利用し、新しいレイヤは作らない方針です。
- 追加前に失敗例や要望などの根拠を示し、最小差分で対応します。
- Slack 側で廃止された(`unknown_method` を返す)メソッドは削除します。

## コミットと PR

- コミットは命令形かつ簡潔にし、必要なら本文で変更理由を補足します。
- PR には目的・変更点・テスト結果を明記し、関連 Issue があればリンクします。
- CI(lint / typecheck / test / build / dist 同期)が緑であること。
- コミット前に `pnpm run build` を実行し、`dist/` を `src/` と同期させます。

## 設定とセキュリティ

- トークンは Script Properties に保存し、コードやリポジトリに書きません。
- `.clasp.json` の `scriptId` はローカル設定として扱い、共有時は値を確認します。
