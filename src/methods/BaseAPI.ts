import { queryEncode, createPayload, createFormPayload } from '../util'

export const DEFAULT_RETRIES = 3

// Arguments passed to a method. Shape follows whatever the Slack API docs specify.
export type SlackParams = Record<string, any>

// Common Slack Web API response shape. Fields other than ok/error vary per method.
export interface SlackResponse {
  ok: boolean
  error?: string
  [key: string]: any
}

export default class BaseAPI {
  static API_ENDPOINT = 'https://slack.com/api/'
  constructor(
    protected _token: string | null = null,
    private _retries_limit: number = DEFAULT_RETRIES,
  ) {}

  protected _get(api: string, args: SlackParams = {}): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const encodedArgs: string = queryEncode(safeArgs)
    const query = encodedArgs ? `?${encodedArgs}` : ''
    const url = `${BaseAPI.API_ENDPOINT}${api}${query}`
    const params: Record<string, any> = {
      method: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      headers: this._buildHeaders(),
    }
    return this._fetch(url, params)
  }

  protected _post(api: string, args: SlackParams = {}): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const payload: Record<string, any> = createPayload(safeArgs)
    const url = `${BaseAPI.API_ENDPOINT}${api}`
    const params: Record<string, any> = {
      headers: this._buildHeaders(),
      method: 'post',
      // Slack warns missing_charset on JSON without it, and superfluous_charset on
      // form bodies with it, so the two content types differ on purpose (confirmed live)
      contentType: 'application/json; charset=UTF-8',
      payload: JSON.stringify(payload),
    }
    return this._fetch(url, params)
  }

  protected _post_form(api: string, args: SlackParams = {}): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const payload: Record<string, any> = createFormPayload(safeArgs)
    const url = `${BaseAPI.API_ENDPOINT}${api}`
    const params: Record<string, any> = {
      headers: this._buildHeaders(),
      method: 'post',
      // No charset here: Slack answers superfluous_charset when a form body carries one
      contentType: 'application/x-www-form-urlencoded',
      payload,
    }
    return this._fetch(url, params)
  }

  protected _post_file(api: string, file_args: SlackParams, args: SlackParams = {}): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const safeFileArgs = this._normalizeArgs(file_args, 'file_params')
    const payload: Record<string, any> = createFormPayload(safeArgs)
    const filePayload: Record<string, any> = createPayload(safeFileArgs)
    const url = `${BaseAPI.API_ENDPOINT}${api}`
    const params: Record<string, any> = {
      headers: this._buildHeaders(),
      method: 'post',
      payload: Object.assign({}, filePayload, payload),
    }
    return this._fetch(url, params)
  }

  protected _fetch(url: string, params: Record<string, any> = {}): SlackResponse {
    const requestParams: Record<string, any> = Object.assign({}, params || {})
    if (requestParams.muteHttpExceptions == null) {
      requestParams.muteHttpExceptions = true
    }
    const maxAttempts = Math.max(1, this._retries_limit + 1)
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response: any = UrlFetchApp.fetch(url, requestParams)
      // Treat HTTP 429 as a rate limit: wait, then retry
      if (response.getResponseCode() !== 429) return this._parseResponse(response)
      // No point waiting after the last attempt (GAS caps execution time)
      if (attempt === maxAttempts - 1) break
      const retryAfterHeader = this._getHeader(response.getHeaders(), 'retry-after')
      const retryAfter = parseInt(retryAfterHeader ?? '', 10)
      const waitMs = isNaN(retryAfter) ? 1000 : retryAfter * 1000
      Utilities.sleep(waitMs)
    }
    throw Error('Try limit over')
  }

  private _getHeader(headers: Record<string, any>, name: string): string | null {
    if (!headers) return null
    const found = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase())
    if (!found) return null
    return headers[found]
  }

  private _buildHeaders(): Record<string, string> {
    if (!this._token) return {}
    return { Authorization: `Bearer ${this._token}` }
  }

  protected _normalizeArgs(args: SlackParams, name: string): SlackParams {
    if (args == null) return {}
    if (typeof args !== 'object' || Array.isArray(args)) {
      throw new Error(`${name} must be an object`)
    }
    return args
  }

  private _parseResponse(response: any): SlackResponse {
    const text = response.getContentText()
    if (!text) return { ok: false, error: 'empty_response' }
    try {
      return JSON.parse(text)
    } catch {
      return { ok: false, error: 'invalid_json', raw: text }
    }
  }
}
