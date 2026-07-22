// gas-entry-generator は型定義を提供しないため、利用箇所に必要な最小限の宣言を書く
declare module 'gas-entry-generator' {
  export function generate(
    source: string,
    options?: { comment?: boolean; globalIdentifierName?: string },
  ): { entryPointFunctions: string }
}
