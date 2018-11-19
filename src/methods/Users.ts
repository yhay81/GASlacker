import BaseAPI from './BaseAPI';

export default class Users extends BaseAPI {
  public profile;
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit);
    this.profile = new UsersProfile(token, retries_limit);
  }
  public conversations(
    cursor: string = null,
    exclude_archived: boolean = true,
    limit: number = 100,
    types: string = 'public_channel',
    user: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      cursor,
      exclude_archived,
      limit,
      types,
      user,
      ...extraArgs
    };
    return this._get('users.conversations', args);
  }

  public deletePhoto(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._get('users.deletePhoto', args);
  }

  public getPresence(user: string, extraArgs: Object = {}) {
    const args: Object = { user, ...extraArgs };
    return this._get('users.getPresence', args);
  }

  public identity(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._get('users.identity', args);
  }

  public info(user: string, include_locale: boolean = false, extraArgs: Object = {}) {
    const args: Object = { user, include_locale, ...extraArgs };
    return this._get('users.info', args);
  }

  public list(
    cursor: string = null,
    include_locale: boolean = false,
    limit: number = 0,
    presence: boolean = false,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      cursor,
      include_locale,
      limit,
      presence,
      ...extraArgs
    };
    return this._get('users.list', args);
  }

  public lookupByEmail(email: string, extraArgs: Object = {}) {
    const args: Object = { email, ...extraArgs };
    return this._get('users.lookupByEmail', args);
  }

  public setActive(extraArgs: Object = {}) {
    return this._post('users.lookupByEmail', extraArgs);
  }

  public setPhoto(image, extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._post_file('users.setPhoto', { image }, args);
  }

  public setPresence(presence: string, extraArgs: Object = {}) {
    const args: Object = { presence, ...extraArgs };
    return this._post('users.setPresence', args);
  }
}

class UsersProfile extends BaseAPI {
  public get(include_labels: boolean = false, user: string = null, extraArgs: Object = {}) {
    const args: Object = { include_labels, user, ...extraArgs };
    return this._get('users.profile.get', args);
  }

  public set(
    name: string = null,
    profile: Object = null,
    user: string = null,
    value: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = { name, profile, user, value, ...extraArgs };
    return this._post('users.profile.set', args);
  }
}
