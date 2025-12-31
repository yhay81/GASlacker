import '../src/index'
import { describe, expect, it } from 'vitest'

type MethodsFactory = (
  token: string,
  retries?: number,
) => {
  call: (api: string, params?: Record<string, any>, method?: 'get' | 'post') => any
  chat: unknown
  files: unknown
}

describe('index', () => {
  it('exposes global methods factory', () => {
    const globalAny = globalThis as typeof globalThis & {
      methods?: MethodsFactory
    }
    expect(typeof globalAny.methods).toBe('function')

    const slack = globalAny.methods && globalAny.methods('token')
    expect(slack).toBeTruthy()
    expect(typeof slack?.call).toBe('function')
    expect(slack?.chat).toBeTruthy()
    expect(slack?.files).toBeTruthy()
  })
})
