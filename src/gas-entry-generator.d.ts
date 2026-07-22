// gas-entry-generator ships no type definitions, so declare the minimal shape we use here.
declare module 'gas-entry-generator' {
  export function generate(
    source: string,
    options?: { comment?: boolean; globalIdentifierName?: string },
  ): { entryPointFunctions: string }
}
