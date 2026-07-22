import BaseAPI, { SlackParams } from './BaseAPI'

class UsersProfile extends BaseAPI {
  public get(params: SlackParams = {}) {
    return this._get('users.profile.get', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('users.profile.set', params)
  }
}

class UsersDiscoverableContacts extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('users.discoverableContacts.lookup', params)
  }
}

export default class Users extends BaseAPI {
  public profile
  public discoverableContacts
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.profile = new UsersProfile(token, retries_limit)
    this.discoverableContacts = new UsersDiscoverableContacts(token, retries_limit)
  }

  public conversations(params: SlackParams = {}) {
    return this._get('users.conversations', params)
  }

  public deletePhoto(params: SlackParams = {}) {
    return this._post('users.deletePhoto', params)
  }

  public getPresence(params: SlackParams = {}) {
    return this._get('users.getPresence', params)
  }

  public identity(params: SlackParams = {}) {
    return this._get('users.identity', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('users.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('users.list', params)
  }

  public lookupByEmail(params: SlackParams = {}) {
    return this._get('users.lookupByEmail', params)
  }

  public setActive(params: SlackParams = {}) {
    return this._post('users.setActive', params)
  }

  public setPhoto(params: SlackParams = {}) {
    const { image, ...args } = this._normalizeArgs(params, 'params')
    return this._post_file('users.setPhoto', { image }, args)
  }

  public setPresence(params: SlackParams = {}) {
    return this._post('users.setPresence', params)
  }
}
