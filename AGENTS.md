# Repository Guidelines

## プロジェクト構成とモジュール整理
- `src/` が本体です。`src/methods/` に Slack API カテゴリ別のクラス、`src/index.ts` が `GASlacker.methods` の入口です。
- `tests/` に Vitest のユニットテスト（`*.spec.ts`）があります。
- `docs/verification.md` は手動検証の方針と手順です。
- `dist/` はビルド成果物のため直接編集しません。
- `appsscript.json` は Google Apps Script 用マニフェストです。

## ビルド・テスト・開発コマンド
- 要件: Node.js 22.12+、pnpm。
- `pnpm install`: 依存関係の導入。
- `pnpm run lint`: Oxlint による静的解析。
- `pnpm run fmt`: Oxfmt による整形。
- `pnpm run test`: Vitest 実行。
- `pnpm run build`: lint/test 後に Vite で `dist/bundle.js` を生成し、`appsscript.json` を `dist/` にコピー。
- `pnpm run deploy`: build 後に `clasp push` で Apps Script へ反映。

## コーディングスタイルと命名
- 2 スペースインデント、末尾改行、末尾空白削除（`.editorconfig`）。
- シングルクォート、セミコロンなし、幅 100（`.oxfmtrc.json`）。
- 新規 API は `src/methods/` に追加し、`PascalCase` のクラス名と `camelCase` のメソッド名に揃えます。
- コメントやドキュメントは日本語で記述します。

## テスト指針
- 追加・変更したユーティリティやメソッドは `tests/*.spec.ts` に最小限のテストを追加します。
- 実 API の確認が必要な場合は `docs/verification.md` の最小検証セットを実施し、結果を記録します。
- 失敗時は再現手順と期待結果を記録します。

## アーキテクチャ概要
- `src/methods/BaseAPI.ts` が `UrlFetchApp` への送信、再試行、レスポンス整形を担当します。
- `src/util.ts` の `queryEncode` / `createPayload` / `createFormPayload` が GET/JSON/フォーム送信の共通処理です。
- `src/config.ts` の `DEFAULT_RETRIES` を `GASlacker.methods(token, retries)` から上書きできます。

## 変更方針
- KISS / YAGNI を優先し、分岐や設定フラグは増やしません。
- 既存の `BaseAPI` と `util` を再利用し、新しいレイヤは作らない方針です。
- 追加前に失敗例や要望などの根拠を示し、最小差分で対応します。
- README と `docs/verification.md` は必要最小限で更新します。

## コミットと PR
- 厳密な形式はありませんが、直近は “Update ...” のような短い英語件名が中心です。
- コミットは命令形かつ簡潔にし、必要なら本文で変更理由を補足します。
- PR には目的・変更点・テスト結果を明記し、関連 Issue があればリンクします。

## 設定とセキュリティ
- トークンは Script Properties に保存し、コードやリポジトリに書きません。
- `.clasp.json` の `scriptId` はローカル設定として扱い、共有時は値を確認します。
