import API from '../src/methods/API'
import Chat from '../src/methods/Chat'
import Conversations from '../src/methods/Conversations'
import Files from '../src/methods/Files'
import OAuth from '../src/methods/OAuth'
import Users from '../src/methods/Users'
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
      'params はオブジェクトで指定してください',
    )
  })

  it('Conversations.list throws on non-object params', () => {
    const conversations = new Conversations('token')
    expect(() => conversations.list('C123' as unknown as Record<string, any>)).toThrow(
      'params はオブジェクトで指定してください',
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
    // getUploadURLExternal は JSON 非対応のためフォーム送信(値は文字列化される)
    expect(params1.contentType).toBe('application/x-www-form-urlencoded; charset=UTF-8')
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
    expect(() => files.uploadV2({ channel_id: 'C123' })).toThrow(
      'file または content を指定してください',
    )
  })

  it('throws when file is not a Blob', () => {
    const files = new Files('token', 1)
    expect(() => files.uploadV2({ file: 'not a blob' })).toThrow(
      'file には Blob を指定してください',
    )
  })

  it('throws on non-object params', () => {
    const files = new Files('token', 1)
    expect(() => files.uploadV2('C123' as unknown as Record<string, any>)).toThrow(
      'params はオブジェクトで指定してください',
    )
  })
})
