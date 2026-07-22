import BaseAPI, { SlackParams } from './BaseAPI'

// The code exchange takes client_id / client_secret, and Slack answers invalid_auth when an
// Authorization header is present, so it is sent from a token-free client (confirmed live).
class OpenIDConnectExchange extends BaseAPI {
  public token(params: SlackParams = {}) {
    return this._post_form('openid.connect.token', params)
  }
}

class OpenIDConnect extends BaseAPI {
  private _exchange: OpenIDConnectExchange
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this._exchange = new OpenIDConnectExchange(null, retries_limit)
  }

  public token(params: SlackParams = {}) {
    return this._exchange.token(params)
  }

  // Needs the user token returned by openid.connect.token, so pass it to methods()
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
