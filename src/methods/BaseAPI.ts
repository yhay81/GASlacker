import { queryEncode, createPayload, createFormPayload } from '../util'

export const DEFAULT_RETRIES = 3
const MAX_RETRIES = 10
const MAX_TOTAL_SLEEP_MILLISECONDS = 300_000

// Arguments passed to a method. Shape follows whatever the Slack API docs specify.
export type SlackParams = Record<string, any>

// Common Slack Web API response shape. Fields other than ok/error vary per method.
export interface SlackResponse {
  ok: boolean
  error?: string
  retry_after?: number
  [key: string]: any
}

type ResponseParser = (response: GoogleAppsScript.URL_Fetch.HTTPResponse) => SlackResponse

export default class BaseAPI {
  static API_ENDPOINT = 'https://slack.com/api/'
  constructor(
    protected _token: string | null = null,
    private _retries_limit: number = DEFAULT_RETRIES,
  ) {
    if (
      !Number.isInteger(this._retries_limit) ||
      this._retries_limit < 0 ||
      this._retries_limit > MAX_RETRIES
    ) {
      throw new Error(`retries_limit must be an integer between 0 and ${MAX_RETRIES}`)
    }
  }

  protected _get(
    api: string,
    args: SlackParams = {},
    parseResponse?: ResponseParser,
  ): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const encodedArgs: string = queryEncode(safeArgs)
    const query = encodedArgs ? `?${encodedArgs}` : ''
    return this._request(
      api,
      { method: 'get', contentType: 'application/x-www-form-urlencoded; charset=UTF-8' },
      query,
      parseResponse,
    )
  }

  protected _post(
    api: string,
    args: SlackParams = {},
    parseResponse?: ResponseParser,
  ): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const payload: Record<string, any> = createPayload(safeArgs)
    return this._request(
      api,
      {
        method: 'post',
        // Slack warns missing_charset on JSON without it, and superfluous_charset on
        // form bodies with it, so the two content types differ on purpose (confirmed live)
        contentType: 'application/json; charset=UTF-8',
        payload: JSON.stringify(payload),
      },
      '',
      parseResponse,
    )
  }

  protected _post_form(
    api: string,
    args: SlackParams = {},
    parseResponse?: ResponseParser,
  ): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const payload: Record<string, any> = createFormPayload(safeArgs)
    return this._request(
      api,
      {
        method: 'post',
        // No charset here: Slack answers superfluous_charset when a form body carries one
        contentType: 'application/x-www-form-urlencoded',
        payload,
      },
      '',
      parseResponse,
    )
  }

  protected _post_file(api: string, file_args: SlackParams, args: SlackParams = {}): SlackResponse {
    const safeArgs = this._normalizeArgs(args, 'params')
    const safeFileArgs = this._normalizeArgs(file_args, 'file_params')
    const payload: Record<string, any> = createFormPayload(safeArgs)
    const filePayload: Record<string, any> = createPayload(safeFileArgs)
    return this._request(api, {
      method: 'post',
      payload: { ...filePayload, ...payload },
    })
  }

  private _request(
    api: string,
    params: Record<string, any>,
    query = '',
    parseResponse?: ResponseParser,
  ): SlackResponse {
    if (typeof api !== 'string' || !/^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(api)) {
      throw new Error('api must be a Slack method name')
    }
    return this._fetch(
      `${BaseAPI.API_ENDPOINT}${api}${query}`,
      {
        ...params,
        headers: this._token ? { Authorization: `Bearer ${this._token}` } : {},
        followRedirects: false,
      },
      parseResponse,
    )
  }

  protected _fetch(
    url: string,
    params: Record<string, any> = {},
    parseResponse: ResponseParser = (response) => this._parseResponse(response.getContentText()),
  ): SlackResponse {
    const requestParams = { ...params, muteHttpExceptions: params?.muteHttpExceptions ?? true }
    let totalSleepMilliseconds = 0
    for (let attempt = 0; ; attempt++) {
      const response = UrlFetchApp.fetch(url, requestParams)
      // Treat HTTP 429 as a rate limit: wait, then retry
      const status = response.getResponseCode()
      if (status !== 429) return parseResponse(response)
      const retryAfterHeader = this._getHeader(response.getHeaders(), 'retry-after')
      const parsedRetryAfter = Number(retryAfterHeader)
      const retryAfter =
        retryAfterHeader != null &&
        retryAfterHeader.trim() !== '' &&
        Number.isFinite(parsedRetryAfter) &&
        parsedRetryAfter >= 0
          ? parsedRetryAfter
          : 1
      const waitMilliseconds = Math.ceil(retryAfter * 1000)
      // Apps Script executions are time-limited, and Utilities.sleep rejects a single wait
      // above five minutes. Keep the whole retry sequence within the same five-minute budget.
      if (
        attempt === this._retries_limit ||
        totalSleepMilliseconds + waitMilliseconds > MAX_TOTAL_SLEEP_MILLISECONDS
      ) {
        return {
          ...this._parseResponse(response.getContentText()),
          ok: false,
          error: 'ratelimited',
          retry_after: retryAfter,
        }
      }
      Utilities.sleep(waitMilliseconds)
      totalSleepMilliseconds += waitMilliseconds
    }
  }

  protected _getHeader(headers: Record<string, any>, name: string): string | null {
    if (!headers) return null
    const found = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase())
    if (!found) return null
    return String(headers[found])
  }

  protected _normalizeArgs(args: SlackParams, name: string): SlackParams {
    if (args == null) return {}
    if (typeof args !== 'object' || Array.isArray(args)) {
      throw new Error(`${name} must be an object`)
    }
    return args
  }

  protected _parseResponse(text: string, isSuccess?: (parsed: any) => boolean): SlackResponse {
    if (!text) return { ok: false, error: 'empty_response' }
    try {
      const parsed = JSON.parse(text)
      if (typeof parsed?.ok === 'boolean') return parsed
      if (parsed?.ok === undefined && !parsed?.error && isSuccess?.(parsed)) {
        return { ...parsed, ok: true }
      }
      return { ok: false, error: 'invalid_response', raw: text }
    } catch {
      return { ok: false, error: 'invalid_json', raw: text }
    }
  }
}
