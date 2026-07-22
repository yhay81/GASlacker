import BaseAPI, { SlackParams } from './BaseAPI'

class ToolingTokens extends BaseAPI {
  // Form-encoded, since it takes a refresh_token
  public rotate(params: SlackParams = {}) {
    return this._post_form('tooling.tokens.rotate', params)
  }
}

export default class Tooling extends BaseAPI {
  public tokens
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.tokens = new ToolingTokens(token, retries_limit)
  }
}
