import BaseAPI from '../src/methods/BaseAPI'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type FetchParams = {
  method?: string
  contentType?: string
  headers?: Record<string, string>
  payload?: unknown
  muteHttpExceptions?: boolean
}

type FetchResponse = {
  getResponseCode: () => number
  getContentText: () => string
  getHeaders: () => Record<string, string>
}

type UrlFetchAppLike = {
  fetch: (url: string, params: FetchParams) => FetchResponse
}

type UtilitiesLike = {
  sleep: (ms: number) => void
}

type FetchCall = [string, FetchParams]

class TestAPI extends BaseAPI {
  public get(api: string, params: Record<string, unknown> = {}): unknown {
    return this._get(api, params)
  }

  public post(api: string, params: Record<string, unknown> = {}): unknown {
    return this._post(api, params)
  }

  public postForm(api: string, params: Record<string, unknown> = {}): unknown {
    return this._post_form(api, params)
  }

  public postFile(
    api: string,
    fileArgs: Record<string, unknown>,
    params: Record<string, unknown> = {},
  ): unknown {
    return this._post_file(api, fileArgs, params)
  }
}

const createResponse = (
  status: number,
  text: string,
  headers: Record<string, string> = {},
): FetchResponse => ({
  getResponseCode: (): number => status,
  getContentText: (): string => text,
  getHeaders: (): Record<string, string> => headers,
})

describe('BaseAPI', () => {
  // GAS グローバルをモックで差し替えるため any 扱いにする
  const globalAny = globalThis as Record<string, any>
  let originalUrlFetchApp: UrlFetchAppLike | undefined
  let originalUtilities: UtilitiesLike | undefined

  beforeEach(() => {
    originalUrlFetchApp = globalAny.UrlFetchApp
    originalUtilities = globalAny.Utilities
  })

  afterEach(() => {
    globalAny.UrlFetchApp = originalUrlFetchApp
    globalAny.Utilities = originalUtilities
  })

  it('builds GET request with query params and auth header', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const res = api.get('auth.test', { a: 'b', c: 1 })

    expect(res).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, params] = fetch.mock.calls[0] as FetchCall
    const parsed = new URL(url)
    expect(`${parsed.origin}${parsed.pathname}`).toBe('https://slack.com/api/auth.test')
    expect(parsed.searchParams.get('a')).toBe('b')
    expect(parsed.searchParams.get('c')).toBe('1')
    expect(params.method).toBe('get')
    expect(params.contentType).toBe('application/x-www-form-urlencoded; charset=UTF-8')
    expect(params.headers).toEqual({ Authorization: 'Bearer token' })
  })

  it('does not set Authorization header when token is null', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI(null)
    api.get('auth.test', {})

    const [, params] = fetch.mock.calls[0] as FetchCall
    expect(params.headers).toEqual({})
  })

  it('sets muteHttpExceptions to true by default', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    api.get('auth.test', {})

    const [, params] = fetch.mock.calls[0] as FetchCall
    expect(params.muteHttpExceptions).toBe(true)
  })

  it('builds JSON POST request with filtered payload', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const res = api.post('chat.postMessage', {
      channel: 'C123',
      text: 'Hi',
      omit: null,
    })

    expect(res).toEqual({ ok: true })
    const [, params] = fetch.mock.calls[0] as FetchCall
    expect(params.method).toBe('post')
    expect(params.contentType).toBe('application/json; charset=UTF-8')
    expect(params.payload).toBe(JSON.stringify({ channel: 'C123', text: 'Hi' }))
  })

  it('builds form POST request with normalized payload', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const formParams: Record<string, unknown> = {
      scope: ['chat:write', 'files:write'],
      extra: { foo: 'bar' },
      omit: undefined,
    }
    formParams['client_id'] = 'client'
    const res = api.postForm('oauth.v2.access', formParams)

    expect(res).toEqual({ ok: true })
    const [, params] = fetch.mock.calls[0] as FetchCall
    expect(params.contentType).toBe('application/x-www-form-urlencoded; charset=UTF-8')
    const expectedPayload: Record<string, string> = {
      scope: 'chat:write,files:write',
      extra: '{"foo":"bar"}',
    }
    expectedPayload['client_id'] = 'client'
    expect(params.payload).toEqual(expectedPayload)
  })

  it('builds file POST request by merging file and form payloads', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const fileParams: Record<string, unknown> = { title: 'hello.txt' }
    fileParams['channel_id'] = 'C123'
    const res = api.postFile('files.uploadV2', { file: 'blob', content: null }, fileParams)

    expect(res).toEqual({ ok: true })
    const [, params] = fetch.mock.calls[0] as FetchCall
    const expectedPayload: Record<string, string> = {
      file: 'blob',
      title: 'hello.txt',
    }
    expectedPayload['channel_id'] = 'C123'
    expect(params.payload).toEqual(expectedPayload)
  })

  it('throws when params is not object', () => {
    const api = new TestAPI('token')
    expect(() =>
      api.post('chat.postMessage', 'C123' as unknown as Record<string, unknown>),
    ).toThrow('params はオブジェクトで指定してください')
  })

  it('throws when params is array', () => {
    const api = new TestAPI('token')
    expect(() => api.get('auth.test', ['a'] as unknown as Record<string, unknown>)).toThrow(
      'params はオブジェクトで指定してください',
    )
  })

  it('returns empty_response error on empty response', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, ''))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const res = api.get('auth.test', {})

    expect(res).toEqual({ ok: false, error: 'empty_response' })
  })

  it('makes at least one request when retries limit is 0', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token', 0)
    const res = api.get('auth.test', {})

    expect(res).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('retries on 429 with retry-after header', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(createResponse(429, '{"ok":false}', { 'retry-after': '2' }))
      .mockReturnValueOnce(createResponse(200, '{"ok":true}'))
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 2)
    const res = api.post('chat.postMessage', { channel: 'C123', text: 'Hi' })

    expect(res).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(sleep).toHaveBeenCalledWith(2000)
  })

  it('retries on 429 without retry-after header using default wait', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(createResponse(429, '{"ok":false}', {}))
      .mockReturnValueOnce(createResponse(200, '{"ok":true}'))
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 2)
    const res = api.post('chat.postMessage', { channel: 'C123', text: 'Hi' })

    expect(res).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(sleep).toHaveBeenCalledWith(1000)
  })

  it('throws after retry limit', () => {
    const fetch = vi
      .fn()
      .mockReturnValue(createResponse(429, '{"ok":false}', { 'retry-after': '1' }))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token', 2)
    expect(() => api.post('chat.postMessage', { channel: 'C123', text: 'Hi' })).toThrow(
      'Try limit over',
    )
  })

  it('returns invalid_json on non-JSON response', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, 'not json'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const res = api.get('auth.test', {})

    expect(res).toEqual({ ok: false, error: 'invalid_json', raw: 'not json' })
  })
})
