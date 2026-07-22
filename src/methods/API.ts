import BaseAPI, { SlackResponse } from './BaseAPI'

export default class API extends BaseAPI {
  public get(api: string, params: Record<string, any> = {}): SlackResponse {
    return this._get(api, params)
  }

  public post(api: string, params: Record<string, any> = {}): SlackResponse {
    return this._post(api, params)
  }

  public call(
    api: string,
    params: Record<string, any> = {},
    method: 'get' | 'post' | 'form' = 'post',
  ): SlackResponse {
    if (method === 'get') return this._get(api, params)
    if (method === 'form') return this._post_form(api, params)
    return this._post(api, params)
  }

  // カーソルページネーションを辿り、各ページのレスポンスを配列で返す。
  // 呼び出し例: paginate('conversations.list', { limit: 200 }, 'get')
  public paginate(
    api: string,
    params: Record<string, any> = {},
    method: 'get' | 'post' = 'post',
    max_pages: number = 20,
  ): SlackResponse[] {
    const pages: SlackResponse[] = []
    let cursor: string | null = null
    while (pages.length < max_pages) {
      const res = this.call(api, cursor ? { ...params, cursor } : params, method)
      pages.push(res)
      if (!res.ok) break
      cursor = res.response_metadata?.next_cursor || null
      if (!cursor) break
    }
    return pages
  }

  public test(params: Record<string, any> = {}): SlackResponse {
    return this._get('api.test', params)
  }
}
