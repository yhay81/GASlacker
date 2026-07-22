import { defineConfig, type Plugin } from 'vitest/config'
import { generate } from 'gas-entry-generator'

const GLOBAL_HEADER = "var global = Function('return this')();\n"

// Generate top-level function stubs at the start of the bundle, for publishing as a GAS library
const gasStubPlugin = (): Plugin => ({
  name: 'gas-stub',
  generateBundle(_options, bundle) {
    for (const output of Object.values(bundle)) {
      if (output.type !== 'chunk' || !output.isEntry) continue
      const { entryPointFunctions } = generate(output.code, {
        comment: true,
        globalIdentifierName: 'global',
      })
      output.code = `${GLOBAL_HEADER}${entryPointFunctions}${output.code}`
    }
  },
})

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GASlacker',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
      },
    },
    minify: false,
    target: 'es2019',
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  plugins: [gasStubPlugin()],
})
