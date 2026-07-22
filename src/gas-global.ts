import type { Methods } from './index'

// Apps Script ライブラリとして利用するときのグローバル型。
// dist/types/ に型定義として出力するためのファイルで、bundle には含まれない。
declare global {
  // ライブラリとして追加した場合(識別子 GASlacker)
  const GASlacker: {
    methods(token: string | null, retries_limit?: number): Methods
  }
  // bundle.js を直接貼り付けた場合
  function methods(token: string | null, retries_limit?: number): Methods
}

export {}
