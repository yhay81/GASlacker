import BaseAPI from './BaseAPI'

class OpenIDConnect extends BaseAPI {
  // OAuth 系エンドポイントのためフォーム送信(client_id / client_secret / code を使う)
  public token(params: Record<string, any> = {}) {
    return this._post_form('openid.connect.token', params)
  }

  public userInfo(params: Record<string, any> = {}) {
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
