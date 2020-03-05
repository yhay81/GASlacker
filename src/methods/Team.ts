import BaseAPI from './BaseAPI'

class TeamProfile extends BaseAPI {
  public get(visibility: string = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { visibility, ...extraArgs }
    return this._get('team.profile.get', args)
  }
}

export default class Team extends BaseAPI {
  public profile
  constructor(token, retries_limit) {
    super(token, retries_limit)
    this.profile = new TeamProfile(token, retries_limit)
  }

  public accessLogs(
    before = 'now',
    count = 100,
    page = 1,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { before, count, page, ...extraArgs }
    return this._get('team.accessLogs', args)
  }

  public billableInfo(
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { user, ...extraArgs }
    return this._get('team.billableInfo', args)
  }

  public info(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs }
    return this._get('team.info', args)
  }

  public integrationLogs(
    app_id: string = null,
    change_type: string = null,
    count = 100,
    page = 1,
    service_id: string = null,
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      app_id,
      change_type,
      count,
      page,
      service_id,
      user,
      ...extraArgs
    }
    return this._get('team.integrationLogs', args)
  }
}
