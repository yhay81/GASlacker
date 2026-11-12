import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { expect, it } from 'vitest'
import type { methods } from '../src/index'

it('exposes working Apps Script library and direct-paste entry points in the bundle', () => {
  const bundle = readFileSync(new URL('../dist/bundle.js', import.meta.url), 'utf8')
  const catalog = JSON.parse(readFileSync(new URL('../docs/methods.json', import.meta.url), 'utf8'))
  const context = {} as { GASlacker: { methods: typeof methods }; methods: typeof methods }
  runInNewContext(bundle, context)
  for (const createClient of [context.methods, context.GASlacker.methods]) {
    const client = createClient(null)
    for (const { path } of catalog.methods) {
      const parts = path.split('.').slice(1)
      expect(typeof parts.reduce((value: any, key: string) => value?.[key], client), path).toBe(
        'function',
      )
    }
    expect(typeof client.files.uploadV2).toBe('function')
    expect(() => createClient(null, -1)).toThrow('retries_limit')
  }
})
