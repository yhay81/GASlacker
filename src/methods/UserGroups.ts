import BaseAPI from './BaseAPI'

class UsergroupsUsers extends BaseAPI {
  public list(params: Record<string, any> = {}) {
    return this._get('usergroups.users.list', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('usergroups.users.update', params)
  }
}

export default class UserGroups extends BaseAPI {
  public users
  constructor(token, retries_limit) {
    super(token, retries_limit)
    this.users = new UsergroupsUsers(token, retries_limit)
  }

  public create(params: Record<string, any> = {}) {
    return this._post('usergroups.create', params)
  }

  public disable(params: Record<string, any> = {}) {
    return this._post('usergroups.disable', params)
  }

  public enable(params: Record<string, any> = {}) {
    return this._post('usergroups.enable', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('usergroups.list', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('usergroups.update', params)
  }
}
