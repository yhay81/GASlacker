import BaseAPI, { SlackParams } from './BaseAPI'

class TeamProfile extends BaseAPI {
  public get(params: SlackParams = {}) {
    return this._get('team.profile.get', params)
  }
}

class TeamBilling extends BaseAPI {
  public info(params: SlackParams = {}) {
    return this._get('team.billing.info', params)
  }
}

class TeamPreferences extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('team.preferences.list', params)
  }
}

class TeamExternalTeams extends BaseAPI {
  public disconnect(params: SlackParams = {}) {
    return this._post('team.externalTeams.disconnect', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('team.externalTeams.list', params)
  }
}

export default class Team extends BaseAPI {
  public profile
  public billing
  public preferences
  public externalTeams
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.profile = new TeamProfile(token, retries_limit)
    this.billing = new TeamBilling(token, retries_limit)
    this.preferences = new TeamPreferences(token, retries_limit)
    this.externalTeams = new TeamExternalTeams(token, retries_limit)
  }

  public accessLogs(params: SlackParams = {}) {
    return this._get('team.accessLogs', params)
  }

  public billableInfo(params: SlackParams = {}) {
    return this._get('team.billableInfo', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('team.info', params)
  }

  public integrationLogs(params: SlackParams = {}) {
    return this._get('team.integrationLogs', params)
  }
}
