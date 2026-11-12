import BaseAPI from '../src/methods/BaseAPI'
import Files from '../src/methods/Files'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type FetchParams = {
  method?: string
  contentType?: string
  headers?: Record<string, string>
  payload?: unknown
  muteHttpExceptions?: boolean
  followRedirects?: boolean
}

type FetchResponse = {
  getResponseCode: () => number
  getContentText: () => string
  getHeaders: () => Record<string, string | number>
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
  headers: Record<string, string | number> = {},
): FetchResponse => ({
  getResponseCode: (): number => status,
  getContentText: (): string => text,
  getHeaders: () => headers,
})

describe('BaseAPI', () => {
  // Treated as any so the GAS globals can be swapped for mocks
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
    expect(params.followRedirects).toBe(false)
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

  it.each([
    '../help/requests/new',
    '%2e%2e/help',
    'api.test?token=bad',
    'api.test#fragment',
    'https://example.com',
    '',
  ])('rejects non-method paths before sending credentials (%s)', (name) => {
    const fetch = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    const api = new TestAPI('token')
    for (const send of [
      () => api.get(name),
      () => api.post(name),
      () => api.postForm(name),
      () => api.postFile(name, {}),
    ]) {
      expect(send).toThrow('api must be a Slack method name')
    }
    expect(fetch).not.toHaveBeenCalled()
  })

  it('passes unknown single-segment method names through to Slack', () => {
    const fetch = vi
      .fn()
      .mockReturnValue(createResponse(200, '{"ok":false,"error":"unknown_method"}'))
    globalAny.UrlFetchApp = { fetch }
    expect(new TestAPI('token').post('unknown')).toEqual({ ok: false, error: 'unknown_method' })
    expect(fetch.mock.calls[0][0]).toBe('https://slack.com/api/unknown')
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
    // Form bodies carry no charset; Slack answers superfluous_charset when they do
    expect(params.contentType).toBe('application/x-www-form-urlencoded')
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
    const res = api.postFile('users.setPhoto', { image: 'blob' }, { crop_w: 100, crop_x: null })

    expect(res).toEqual({ ok: true })
    const [, params] = fetch.mock.calls[0] as FetchCall
    const expectedPayload: Record<string, string> = {
      image: 'blob',
      crop_w: '100',
    }
    expect(params.payload).toEqual(expectedPayload)
  })

  it.each(['add', 'update'] as const)('keeps file blobs intact for files.remote.%s', (method) => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    const blob = { getBytes: () => [1, 2, 3] }
    new Files('token').remote[method]({
      preview_image: blob,
      indexable_file_contents: blob,
      external_id: '123',
    })
    const [url, params] = fetch.mock.calls[0]
    expect(url).toBe(`https://slack.com/api/files.remote.${method}`)
    expect(params.payload.preview_image).toBe(blob)
    expect(params.payload.indexable_file_contents).toBe(blob)
    expect(params.payload.external_id).toBe('123')
    expect(params.contentType).toBeUndefined()
  })

  it('retries only the rate-limited upload and completes the uploaded file', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(
        createResponse(
          200,
          '{"ok":true,"upload_url":"https://files.slack.com/upload","file_id":"F1"}',
        ),
      )
      .mockReturnValueOnce(createResponse(429, '', { 'Retry-After': 2 }))
      .mockReturnValueOnce(createResponse(200, 'OK - 3'))
      .mockReturnValueOnce(createResponse(200, '{"ok":true}'))
    globalAny.UrlFetchApp = { fetch }
    const sleep = vi.fn()
    globalAny.Utilities = { sleep }
    const blob = { getBytes: () => [1, 2, 3], getName: () => 'hello.txt' }
    const response = new Files('token', 1).uploadV2({
      file: blob,
      files: [{ id: 'other' }],
      highlight_type: 'text',
      channel_id: 'C1',
    })
    expect(response).toEqual({ ok: true })
    expect(sleep).toHaveBeenCalledWith(2000)
    expect(fetch.mock.calls[1]).toEqual(fetch.mock.calls[2])
    expect(fetch.mock.calls[1][1].headers).toBeUndefined()
    expect(JSON.parse(fetch.mock.calls[3][1].payload)).toEqual({
      files: [{ id: 'F1', title: 'hello.txt', highlight_type: 'text' }],
      channel_id: 'C1',
    })
  })

  it('stops before uploading bytes when Slack omits the new file ID', () => {
    const fetch = vi
      .fn()
      .mockReturnValue(
        createResponse(200, '{"ok":true,"upload_url":"https://files.slack.com/upload"}'),
      )
    globalAny.UrlFetchApp = { fetch }
    expect(new Files('token').uploadV2({ file: { getBytes: () => [1] } })).toEqual({
      ok: false,
      error: 'invalid_response',
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('throws when params is not object', () => {
    const api = new TestAPI('token')
    expect(() =>
      api.post('chat.postMessage', 'C123' as unknown as Record<string, unknown>),
    ).toThrow('params must be an object')
  })

  it('throws when params is array', () => {
    const api = new TestAPI('token')
    expect(() => api.get('auth.test', ['a'] as unknown as Record<string, unknown>)).toThrow(
      'params must be an object',
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

  it.each([NaN, Infinity, -Infinity, -1, 0.5, 11])(
    'rejects invalid retries limit %s',
    (retriesLimit) => {
      expect(() => new TestAPI('token', retriesLimit)).toThrow(
        'retries_limit must be an integer between 0 and 10',
      )
    },
  )

  it('accepts the maximum retries limit', () => {
    expect(() => new TestAPI('token', 10)).not.toThrow()
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

  it('allows a Retry-After wait at the Apps Script five-minute limit', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(createResponse(429, '{"ok":false}', { 'retry-after': '300' }))
      .mockReturnValueOnce(createResponse(200, '{"ok":true}'))
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 1)
    const res = api.get('conversations.list')

    expect(res).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(sleep).toHaveBeenCalledWith(300_000)
  })

  it('stops before cumulative Retry-After waits exceed five minutes', () => {
    const fetch = vi.fn().mockReturnValue(
      createResponse(429, '{"ok":false,"error":"ratelimited","detail":"try later"}', {
        'retry-after': '300',
      }),
    )
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 2)
    const res = api.get('conversations.list')

    expect(res).toEqual({
      ok: false,
      error: 'ratelimited',
      detail: 'try later',
      retry_after: 300,
    })
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(sleep).toHaveBeenCalledTimes(1)
    expect(sleep).toHaveBeenCalledWith(300_000)
  })

  it('returns the 429 without sleeping past the Apps Script five-minute limit', () => {
    const fetch = vi.fn().mockReturnValue(
      createResponse(429, '{"ok":false,"error":"ratelimited","detail":"try later"}', {
        'retry-after': '301',
      }),
    )
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 2)
    const res = api.get('conversations.list')

    expect(res).toEqual({
      ok: false,
      error: 'ratelimited',
      detail: 'try later',
      retry_after: 301,
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sleep).not.toHaveBeenCalled()
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

  it('returns a structured rate-limit error without waiting past the last attempt', () => {
    const fetch = vi.fn().mockReturnValue(
      createResponse(429, '{"ok":false,"error":"ratelimited","detail":"slow down"}', {
        'retry-after': '1',
      }),
    )
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 2)
    const res = api.post('chat.postMessage', { channel: 'C123', text: 'Hi' })

    expect(res).toEqual({
      ok: false,
      error: 'ratelimited',
      detail: 'slow down',
      retry_after: 1,
    })
    expect(fetch).toHaveBeenCalledTimes(3)
    // One wait between attempts, none after the final one
    expect(sleep).toHaveBeenCalledTimes(2)
  })

  it('returns a rate-limit error when no Retry-After header or JSON body is available', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(429, 'not json'))
    const sleep = vi.fn()
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep }

    const api = new TestAPI('token', 0)
    const res = api.get('conversations.list')

    expect(res).toEqual({
      ok: false,
      error: 'ratelimited',
      raw: 'not json',
      retry_after: 1,
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sleep).not.toHaveBeenCalled()
  })

  it('returns invalid_json on non-JSON response', () => {
    const fetch = vi.fn().mockReturnValue(createResponse(200, 'not json'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const api = new TestAPI('token')
    const res = api.get('auth.test', {})

    expect(res).toEqual({ ok: false, error: 'invalid_json', raw: 'not json' })
  })

  it.each(['null', '[]', '{"ok":"false"}'])(
    'returns a Slack error for an invalid response shape (%s)',
    (text) => {
      globalAny.UrlFetchApp = { fetch: vi.fn().mockReturnValue(createResponse(200, text)) }
      expect(new TestAPI('token').get('auth.test')).toEqual({
        ok: false,
        error: 'invalid_response',
        raw: text,
      })
    },
  )
})
