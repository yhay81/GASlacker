import BaseAPI from './BaseAPI'

export default class Users extends BaseAPI {
  public profile
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit)
    this.profile = new UsersProfile(token, retries_limit)
  }
  public conversations(
    cursor: string = null,
    exclude_archived = true,
    limit = 100,
    types = 'public_channel',
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      cursor,
      exclude_archived,
      limit,
      types,
      user,
      ...extraArgs
    }
    return this._get('users.conversations', args)
  }

  public deletePhoto(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs }
    return this._get('users.deletePhoto', args)
  }

  public getPresence(user: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { user, ...extraArgs }
    return this._get('users.getPresence', args)
  }

  public identity(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs }
    return this._get('users.identity', args)
  }

  public info(
    user: string,
    include_locale = false,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { user, include_locale, ...extraArgs }
    return this._get('users.info', args)
  }

  public list(
    cursor: string = null,
    include_locale = false,
    limit = 0,
    presence = false,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      cursor,
      include_locale,
      limit,
      presence,
      ...extraArgs
    }
    return this._get('users.list', args)
  }

  public lookupByEmail(email: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { email, ...extraArgs }
    return this._get('users.lookupByEmail', args)
  }

  public setActive(extraArgs: Record<string, any> = {}) {
    return this._post('users.lookupByEmail', extraArgs)
  }

  public setPhoto(image, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs }
    return this._post_file('users.setPhoto', { image }, args)
  }

  public setPresence(presence: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { presence, ...extraArgs }
    return this._post('users.setPresence', args)
  }
}

class UsersProfile extends BaseAPI {
  public get(
    include_labels = false,
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { include_labels, user, ...extraArgs }
    return this._get('users.profile.get', args)
  }

  public set(
    name: string = null,
    profile: Record<string, any> = null,
    user: string = null,
    value: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      name,
      profile,
      user,
      value,
      ...extraArgs
    }
    return this._post('users.profile.set', args)
  }
}
