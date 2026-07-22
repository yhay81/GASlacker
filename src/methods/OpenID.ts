import BaseAPI, { SlackParams } from './BaseAPI'

class OpenIDConnect extends BaseAPI {
  // Form-encoded, like other OAuth endpoints (uses client_id / client_secret / code)
  public token(params: SlackParams = {}) {
    return this._post_form('openid.connect.token', params)
  }

  public userInfo(params: SlackParams = {}) {
    return this._post('openid.connect.userInfo', params)
  }
}

export default class OpenID extends BaseAPI {
  public connect
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.connect = new OpenIDConnect(token, retries_limit)
  }
}
