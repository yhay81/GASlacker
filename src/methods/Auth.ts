import BaseAPI from './BaseAPI'

class AuthTeams extends BaseAPI {
  public list(params: Record<string, any> = {}) {
    return this._get('auth.teams.list', params)
  }
}

export default class Auth extends BaseAPI {
  public teams
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.teams = new AuthTeams(token, retries_limit)
  }

  public revoke(params: Record<string, any> = {}) {
    return this._post('auth.revoke', params)
  }

  public test(params: Record<string, any> = {}) {
    return this._get('auth.test', params)
  }
}
