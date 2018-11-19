import BaseAPI from './BaseAPI';

class TeamProfile extends BaseAPI {
  public get(visibility: string = null, extraArgs: Object = {}) {
    const args: Object = { visibility, ...extraArgs };
    return this._get('team.profile.get', args);
  }
}

export default class Team extends BaseAPI {
  public profile;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.profile = new TeamProfile(token, retries_limit);
  }

  public accessLogs(
    before: string = 'now',
    count: number = 100,
    page: number = 1,
    extraArgs: Object = {}
  ) {
    const args: Object = { before, count, page, ...extraArgs };
    return this._get('team.accessLogs', args);
  }

  public billableInfo(user: string = null, extraArgs: Object = {}) {
    const args: Object = { user, ...extraArgs };
    return this._get('team.billableInfo', args);
  }

  public info(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._get('team.info', args);
  }

  public integrationLogs(
    app_id: string = null,
    change_type: string = null,
    count: number = 100,
    page: number = 1,
    service_id: string = null,
    user: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      app_id,
      change_type,
      count,
      page,
      service_id,
      user,
      ...extraArgs
    };
    return this._get('team.integrationLogs', args);
  }
}
