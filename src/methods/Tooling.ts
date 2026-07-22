import BaseAPI from './BaseAPI'

class ToolingTokens extends BaseAPI {
  // refresh_token を使うためフォーム送信
  public rotate(params: Record<string, any> = {}) {
    return this._post_form('tooling.tokens.rotate', params)
  }
}

export default class Tooling extends BaseAPI {
  public tokens
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.tokens = new ToolingTokens(token, retries_limit)
  }
}
