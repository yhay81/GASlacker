import type { Methods } from './index'

// Global types for consuming GASlacker as an Apps Script library.
// This file is only emitted into dist/types/ as a declaration; it ships in no bundle.
declare global {
  // When added as a library (identifier GASlacker)
  const GASlacker: {
    methods(token: string | null, retries_limit?: number): Methods
  }
  // When bundle.js is pasted directly into a project
  function methods(token: string | null, retries_limit?: number): Methods
}

export {}
