import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GASlacker',
      formats: ['iife'],
      fileName: () => 'bundle.js',
    },
    rolldownOptions: {
      output: {
        // Apps Script discovers library entry points from top-level function declarations.
        footer: `/**
 * Creates a Slack Web API client.
 * @param {string|null} token Slack access token, or null for token-free methods.
 * @param {number} [retries_limit] Extra attempts on HTTP 429 (0–10, default 3).
 * @return {Object} The Slack client.
 */
function methods(token, retries_limit) {
  return GASlacker.methods(token, retries_limit);
}`,
      },
    },
    minify: false,
    target: 'es2019',
  },
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
