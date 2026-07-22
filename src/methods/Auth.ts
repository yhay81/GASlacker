import BaseAPI, { SlackParams } from './BaseAPI'

class AuthTeams extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('auth.teams.list', params)
  }
}

export default class Auth extends BaseAPI {
  public teams
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.teams = new AuthTeams(token, retries_limit)
  }

  public revoke(params: SlackParams = {}) {
    return this._post('auth.revoke', params)
  }

  public test(params: SlackParams = {}) {
    return this._get('auth.test', params)
  }
}
