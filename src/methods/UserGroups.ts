import BaseAPI, { SlackParams } from './BaseAPI'

class UserGroupsUsers extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('usergroups.users.list', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('usergroups.users.update', params)
  }
}

export default class UserGroups extends BaseAPI {
  public users
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.users = new UserGroupsUsers(token, retries_limit)
  }

  public create(params: SlackParams = {}) {
    return this._post('usergroups.create', params)
  }

  public disable(params: SlackParams = {}) {
    return this._post('usergroups.disable', params)
  }

  public enable(params: SlackParams = {}) {
    return this._post('usergroups.enable', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('usergroups.list', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('usergroups.update', params)
  }
}
