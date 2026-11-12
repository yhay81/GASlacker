import BaseAPI, { SlackParams } from './BaseAPI'

class OAuthTokenRotation extends BaseAPI {
  public send(api: string, params: SlackParams) {
    return this._post_form(api, params)
  }
}

export default class OAuth extends BaseAPI {
  private rotation: OAuthTokenRotation
  constructor(token: string | null, retries_limit?: number) {
    super(null, retries_limit)
    this.rotation = new OAuthTokenRotation(token, retries_limit)
  }

  // The original GASlacker oauth.access alias exchanges v2 codes.
  // Expose the classic endpoint separately so existing installations keep working.
  public v1 = {
    access: (params: SlackParams = {}) =>
      this._post_form('oauth.access', params, (response) =>
        this._parseResponse(
          response.getContentText(),
          (parsed) =>
            response.getResponseCode() === 200 &&
            typeof parsed?.access_token === 'string' &&
            parsed.access_token.length > 0,
        ),
      ),
  }

  public v2 = {
    access: (params: SlackParams = {}) => this.access(params),
    beginShortTokenRotation: (params: SlackParams = {}) =>
      this.rotate('oauth.v2.beginShortTokenRotation', params),
    completeShortTokenRotation: (params: SlackParams = {}) =>
      this.rotate('oauth.v2.completeShortTokenRotation', params),
    exchange: (params: SlackParams = {}) => this.rotate('oauth.v2.exchange', params),
    user: {
      access: (params: SlackParams = {}) => this._post_form('oauth.v2.user.access', params),
    },
  }

  // A token explicitly selected for rotation takes precedence over the client's bearer.
  private rotate(api: string, params: SlackParams) {
    const fields = this._normalizeArgs(params, 'params')
    return fields.token == null ? this.rotation.send(api, fields) : this._post_form(api, fields)
  }

  public access(params: SlackParams = {}) {
    return this._post_form('oauth.v2.access', params)
  }
}
