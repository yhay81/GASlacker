import BaseAPI from './BaseAPI'

class TeamProfile extends BaseAPI {
  public get(params: Record<string, any> = {}) {
    return this._get('team.profile.get', params)
  }
}

export default class Team extends BaseAPI {
  public profile
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.profile = new TeamProfile(token, retries_limit)
  }

  public accessLogs(params: Record<string, any> = {}) {
    return this._get('team.accessLogs', params)
  }

  public billableInfo(params: Record<string, any> = {}) {
    return this._get('team.billableInfo', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('team.info', params)
  }

  public integrationLogs(params: Record<string, any> = {}) {
    return this._get('team.integrationLogs', params)
  }
}
