import BaseAPI, { SlackParams, SlackResponse } from './BaseAPI'

export default class API extends BaseAPI {
  public get(api: string, params: SlackParams = {}): SlackResponse {
    return this._get(api, params)
  }

  public post(api: string, params: SlackParams = {}): SlackResponse {
    return this._post(api, params)
  }

  public call(
    api: string,
    params: SlackParams = {},
    method: 'get' | 'post' | 'form' = 'post',
  ): SlackResponse {
    if (method === 'get') return this._get(api, params)
    if (method === 'form') return this._post_form(api, params)
    if (method === 'post') return this._post(api, params)
    throw new Error('method must be get, post, or form')
  }

  // Follows cursor pagination, returning one response per page.
  // Example: paginate('conversations.list', { limit: 200 }, 'get')
  public paginate(
    api: string,
    params: SlackParams = {},
    method: 'get' | 'post' | 'form' = 'post',
    max_pages?: number,
  ): SlackResponse[] {
    if (max_pages !== undefined && (!Number.isInteger(max_pages) || max_pages < 1)) {
      throw new Error('max_pages must be a positive integer')
    }
    const pages: SlackResponse[] = []
    const requestedCursors = new Set<string>()
    let pageParams = params
    while (max_pages === undefined || pages.length < max_pages) {
      const cursor = pageParams?.cursor
      if (cursor) {
        if (requestedCursors.has(cursor))
          throw new Error('Slack returned a repeated pagination cursor')
        requestedCursors.add(cursor)
      }
      const res = this.call(api, pageParams, method)
      pages.push(res)
      const nextCursor = res.response_metadata?.next_cursor
      if (!res.ok || !nextCursor) break
      pageParams = { ...params, cursor: nextCursor }
    }
    return pages
  }

  public test(params: SlackParams = {}): SlackResponse {
    return this._post_form('api.test', params)
  }
}
