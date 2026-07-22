import BaseAPI from './BaseAPI'

class UsersDiscoverableContacts extends BaseAPI {
  public lookup(params: Record<string, any> = {}) {
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

  public conversations(params: Record<string, any> = {}) {
    return this._get('users.conversations', params)
  }

  public deletePhoto(params: Record<string, any> = {}) {
    return this._post('users.deletePhoto', params)
  }

  public getPresence(params: Record<string, any> = {}) {
    return this._get('users.getPresence', params)
  }

  public identity(params: Record<string, any> = {}) {
    return this._get('users.identity', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('users.info', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('users.list', params)
  }

  public lookupByEmail(params: Record<string, any> = {}) {
    return this._get('users.lookupByEmail', params)
  }

  public setActive(params: Record<string, any> = {}) {
    return this._post('users.setActive', params)
  }

  public setPhoto(params: Record<string, any> = {}) {
    const args = params ? Object.assign({}, params) : {}
    const image = args.image
    delete args.image
    return this._post_file('users.setPhoto', { image }, args)
  }

  public setPresence(params: Record<string, any> = {}) {
    return this._post('users.setPresence', params)
  }
}

class UsersProfile extends BaseAPI {
  public get(params: Record<string, any> = {}) {
    return this._get('users.profile.get', params)
  }

  public set(params: Record<string, any> = {}) {
    return this._post('users.profile.set', params)
  }
}
