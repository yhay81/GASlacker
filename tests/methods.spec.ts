import API from '../src/methods/API'
import Chat from '../src/methods/Chat'
import Conversations from '../src/methods/Conversations'
import Files from '../src/methods/Files'
import OAuth from '../src/methods/OAuth'
import Users from '../src/methods/Users'
import { Methods } from '../src/index'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type Call = {
  type: 'get' | 'post' | 'post_form' | 'post_file'
  api: string
  params?: Record<string, any>
  fileArgs?: Record<string, any>
}

type FetchResponse = {
  getResponseCode: () => number
  getContentText: () => string
  getHeaders: () => Record<string, string>
}

const createResponse = (status: number, text: string): FetchResponse => ({
  getResponseCode: () => status,
  getContentText: () => text,
  getHeaders: () => ({}),
})

const jsonResponse = (body: Record<string, any>): FetchResponse =>
  createResponse(200, JSON.stringify(body))

class APISpy extends API {
  public calls: Call[] = []

  protected _get(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'get', api, params })
    return { ok: true }
  }

  protected _post(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'post', api, params })
    return { ok: true }
  }
}

class OAuthSpy extends OAuth {
  public call: Call | null = null

  protected _post_form(api: string, params: Record<string, any> = {}): any {
    this.call = { type: 'post_form', api, params }
    return { ok: true }
  }
}

class UsersSpy extends Users {
  public call: Call | null = null

  protected _post_file(
    api: string,
    fileArgs: Record<string, any>,
    params: Record<string, any> = {},
  ): any {
    this.call = { type: 'post_file', api, fileArgs, params }
    return { ok: true }
  }
}

describe('methods', () => {
  it('API.call routes to get/post', () => {
    const api = new APISpy('token')
    api.call('conversations.list', { limit: 1 }, 'get')
    api.call('chat.postMessage', { channel: 'C123', text: 'Hi' }, 'post')

    expect(api.calls).toEqual([
      { type: 'get', api: 'conversations.list', params: { limit: 1 } },
      {
        type: 'post',
        api: 'chat.postMessage',
        params: { channel: 'C123', text: 'Hi' },
      },
    ])
  })

  it('Chat.postMessage throws on non-object params', () => {
    const chat = new Chat('token')
    expect(() => chat.postMessage('C123' as unknown as Record<string, any>)).toThrow(
      'params must be an object',
    )
  })

  it('Conversations.list throws on non-object params', () => {
    const conversations = new Conversations('token')
    expect(() => conversations.list('C123' as unknown as Record<string, any>)).toThrow(
      'params must be an object',
    )
  })

  it('OAuth.access uses oauth.v2.access', () => {
    const oauth = new OAuthSpy('token')
    oauth.access({ client_id: 'client', client_secret: 'secret' })

    expect(oauth.call).toEqual({
      type: 'post_form',
      api: 'oauth.v2.access',
      params: { client_id: 'client', client_secret: 'secret' },
    })
  })

  it('Users.setPhoto splits image into file payload', () => {
    const users = new UsersSpy('token', 1)
    users.setPhoto({ image: 'blob', crop_w: 100, user: 'U123' })

    expect(users.call).toEqual({
      type: 'post_file',
      api: 'users.setPhoto',
      fileArgs: { image: 'blob' },
      params: { crop_w: 100, user: 'U123' },
    })
  })

  it("call routes 'form' to _post_form", () => {
    const api = new API('token') as any
    const calls: Call[] = []
    api._post_form = (endpoint: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'post_form', api: endpoint, params })
      return { ok: true }
    }
    api.call('some.method', { key: 'value' }, 'form')

    expect(calls).toEqual([{ type: 'post_form', api: 'some.method', params: { key: 'value' } }])
  })

  it('delete_ aliases call the same endpoint as delete', () => {
    const methods = new Methods('token')
    const targets: Array<{ holder: any; api: string }> = [
      { holder: methods.chat, api: 'chat.delete' },
      { holder: methods.files, api: 'files.delete' },
      { holder: methods.canvases, api: 'canvases.delete' },
      { holder: methods.canvases.access, api: 'canvases.access.delete' },
      { holder: methods.reminders, api: 'reminders.delete' },
      { holder: methods.slackLists.access, api: 'slackLists.access.delete' },
      { holder: methods.slackLists.items, api: 'slackLists.items.delete' },
      { holder: methods.apps.manifest, api: 'apps.manifest.delete' },
    ]
    for (const { holder, api } of targets) {
      const calls: string[] = []
      holder._post = (endpoint: string) => {
        calls.push(endpoint)
        return { ok: true }
      }
      holder.delete()
      holder.delete_()
      expect(calls).toEqual([api, api])
    }
  })

  it('scheduledMessagesList alias calls chat.scheduledMessages.list', () => {
    const methods = new Methods('token')
    const calls: string[] = []
    ;(methods.chat.scheduledMessages as any)._get = (endpoint: string) => {
      calls.push(endpoint)
      return { ok: true }
    }
    methods.chat.scheduledMessages.list()
    methods.chat.scheduledMessagesList()

    expect(calls).toEqual(['chat.scheduledMessages.list', 'chat.scheduledMessages.list'])
  })
})

describe('paginate', () => {
  const pageSpy = (responses: Record<string, any>[]) => {
    const api = new API('token') as any
    const seen: Record<string, any>[] = []
    let index = 0
    api._post = (_endpoint: string, params: Record<string, any> = {}) => {
      seen.push(params)
      return responses[Math.min(index++, responses.length - 1)]
    }
    return { api, seen }
  }

  it('follows next_cursor across pages', () => {
    const { api, seen } = pageSpy([
      { ok: true, channels: ['a'], response_metadata: { next_cursor: 'c1' } },
      { ok: true, channels: ['b'], response_metadata: { next_cursor: 'c2' } },
      { ok: true, channels: ['c'], response_metadata: { next_cursor: '' } },
    ])
    const pages = api.paginate('conversations.list', { limit: 2 })

    expect(pages).toHaveLength(3)
    expect(seen).toEqual([{ limit: 2 }, { limit: 2, cursor: 'c1' }, { limit: 2, cursor: 'c2' }])
    expect(pages.flatMap((p: any) => p.channels)).toEqual(['a', 'b', 'c'])
  })

  it('stops on error response', () => {
    const { api } = pageSpy([
      { ok: true, response_metadata: { next_cursor: 'c1' } },
      { ok: false, error: 'ratelimited' },
    ])
    const pages = api.paginate('conversations.list')

    expect(pages).toHaveLength(2)
    expect(pages[1]).toEqual({ ok: false, error: 'ratelimited' })
  })

  it('respects max_pages', () => {
    const { api } = pageSpy([{ ok: true, response_metadata: { next_cursor: 'again' } }])
    const pages = api.paginate('conversations.list', {}, 'post', 3)

    expect(pages).toHaveLength(3)
  })

  it('is exposed on Methods', () => {
    const methods = new Methods('token') as any
    methods.api._get = () => ({ ok: true })
    const pages = methods.paginate('conversations.list', { limit: 1 }, 'get')

    expect(pages).toEqual([{ ok: true }])
  })
})

// Which clients carry the token, verified against the live API: openid.connect.userInfo
// requires one, while code exchanges and tooling token rotation reject an unrelated one.
describe('authorization header', () => {
  const globalAny = globalThis as typeof globalThis & {
    UrlFetchApp?: any
    Utilities?: any
  }
  let originalUrlFetchApp: any
  let originalUtilities: any

  beforeEach(() => {
    originalUrlFetchApp = globalAny.UrlFetchApp
    originalUtilities = globalAny.Utilities
  })

  afterEach(() => {
    globalAny.UrlFetchApp = originalUrlFetchApp
    globalAny.Utilities = originalUtilities
  })

  const headersOf = (invoke: (m: Methods) => unknown): Record<string, string> => {
    const fetch = vi.fn().mockReturnValue(jsonResponse({ ok: true }))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }
    invoke(new Methods('xoxp-token'))
    return fetch.mock.calls[0][1].headers
  }

  it('sends the token on openid.connect.userInfo', () => {
    expect(headersOf((m) => m.openid.connect.userInfo())).toEqual({
      Authorization: 'Bearer xoxp-token',
    })
  })

  it('omits the token on the code exchanges', () => {
    expect(headersOf((m) => m.openid.connect.token({ code: 'c' }))).toEqual({})
    expect(headersOf((m) => m.oauth.access({ code: 'c' }))).toEqual({})
  })

  it('omits the token on tooling token rotation', () => {
    expect(headersOf((m) => m.tooling.tokens.rotate({ refresh_token: 'r' }))).toEqual({})
  })

  it('sends the token on ordinary methods', () => {
    expect(headersOf((m) => m.chat.postMessage({ channel: 'C123', text: 'Hi' }))).toEqual({
      Authorization: 'Bearer xoxp-token',
    })
  })
})

describe('Files.uploadV2', () => {
  const globalAny = globalThis as typeof globalThis & {
    UrlFetchApp?: any
    Utilities?: any
  }
  let originalUrlFetchApp: any
  let originalUtilities: any

  beforeEach(() => {
    originalUrlFetchApp = globalAny.UrlFetchApp
    originalUtilities = globalAny.Utilities
  })

  afterEach(() => {
    globalAny.UrlFetchApp = originalUrlFetchApp
    globalAny.Utilities = originalUtilities
  })

  const blobOf = (bytes: number[], name: string | null) => ({
    getBytes: () => bytes,
    getName: () => name,
  })

  it('uploads file via getUploadURLExternal → upload → completeUploadExternal', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(
        jsonResponse({ ok: true, upload_url: 'https://upload.example/abc', file_id: 'F999' }),
      )
      .mockReturnValueOnce(createResponse(200, 'OK - 3'))
      .mockReturnValueOnce(jsonResponse({ ok: true, files: [{ id: 'F999' }] }))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const blob = blobOf([1, 2, 3], 'hello.txt')
    const files = new Files('token', 1)
    const res = files.uploadV2({ channel_id: 'C123', file: blob, initial_comment: 'hi' })

    expect(res).toEqual({ ok: true, files: [{ id: 'F999' }] })
    expect(fetch).toHaveBeenCalledTimes(3)

    const [url1, params1] = fetch.mock.calls[0]
    expect(url1).toBe('https://slack.com/api/files.getUploadURLExternal')
    // getUploadURLExternal is form-encoded because it rejects JSON (values become strings)
    expect(params1.contentType).toBe('application/x-www-form-urlencoded')
    expect(params1.payload).toEqual({ filename: 'hello.txt', length: '3' })

    const [url2, params2] = fetch.mock.calls[1]
    expect(url2).toBe('https://upload.example/abc')
    expect(params2.method).toBe('post')
    expect(params2.payload).toBe(blob)

    const [url3, params3] = fetch.mock.calls[2]
    expect(url3).toBe('https://slack.com/api/files.completeUploadExternal')
    expect(JSON.parse(params3.payload)).toEqual({
      files: [{ id: 'F999', title: 'hello.txt' }],
      channel_id: 'C123',
      initial_comment: 'hi',
    })
  })

  it('uploads content as blob via Utilities.newBlob', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(
        jsonResponse({ ok: true, upload_url: 'https://upload.example/abc', file_id: 'F999' }),
      )
      .mockReturnValueOnce(createResponse(200, 'OK - 5'))
      .mockReturnValueOnce(jsonResponse({ ok: true }))
    const contentBlob = blobOf([1, 2, 3, 4, 5], null)
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn(), newBlob: vi.fn().mockReturnValue(contentBlob) }

    const files = new Files('token', 1)
    const res = files.uploadV2({ content: 'hello', filename: 'hello.txt', title: 'greeting' })

    expect(res).toEqual({ ok: true })
    expect(globalAny.Utilities.newBlob).toHaveBeenCalledWith('hello')
    const [, params1] = fetch.mock.calls[0]
    expect(params1.payload).toEqual({ filename: 'hello.txt', length: '5' })
    const [, params3] = fetch.mock.calls[2]
    expect(JSON.parse(params3.payload)).toEqual({
      files: [{ id: 'F999', title: 'greeting' }],
    })
  })

  it('returns error response when getUploadURLExternal fails', () => {
    const fetch = vi.fn().mockReturnValueOnce(jsonResponse({ ok: false, error: 'invalid_auth' }))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const files = new Files('token', 1)
    const res = files.uploadV2({ file: blobOf([1], 'a.txt') })

    expect(res).toEqual({ ok: false, error: 'invalid_auth' })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('returns upload_failed when upload POST is not 200', () => {
    const fetch = vi
      .fn()
      .mockReturnValueOnce(
        jsonResponse({ ok: true, upload_url: 'https://upload.example/abc', file_id: 'F999' }),
      )
      .mockReturnValueOnce(createResponse(500, 'server error'))
    globalAny.UrlFetchApp = { fetch }
    globalAny.Utilities = { sleep: vi.fn() }

    const files = new Files('token', 1)
    const res = files.uploadV2({ file: blobOf([1], 'a.txt') })

    expect(res).toEqual({ ok: false, error: 'upload_failed', raw: 'server error' })
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('throws when neither file nor content is given', () => {
    const files = new Files('token', 1)
    expect(() => files.uploadV2({ channel_id: 'C123' })).toThrow('Specify either file or content')
  })

  it('throws when file is not a Blob', () => {
    const files = new Files('token', 1)
    expect(() => files.uploadV2({ file: 'not a blob' })).toThrow('file must be a Blob')
  })

  it('throws on non-object params', () => {
    const files = new Files('token', 1)
    expect(() => files.uploadV2('C123' as unknown as Record<string, any>)).toThrow(
      'params must be an object',
    )
  })
})
