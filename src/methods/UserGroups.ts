import BaseAPI from './BaseAPI'

class UsergroupsUsers extends BaseAPI {
  public list(
    usergroup: string,
    include_disabled: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      include_disabled,
      ...extraArgs
    }
    return this._get('usergroups.users.list', args)
  }

  public update(
    usergroup: string,
    users: string[],
    include_count: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      users,
      include_count,
      ...extraArgs
    }
    return this._post('usergroups.users.update', args)
  }
}

export default class UserGroups extends BaseAPI {
  public users
  constructor(token, retries_limit) {
    super(token, retries_limit)
    this.users = new UsergroupsUsers(token, retries_limit)
  }

  public create(
    name: string,
    channels: string[] = null,
    description: string = null,
    handle: string = null,
    include_disabled: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      name,
      channels,
      description,
      handle,
      include_disabled,
      ...extraArgs
    }
    return this._post('usergroups.create', args)
  }

  public disable(
    usergroup: string,
    include_count: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      include_count,
      ...extraArgs
    }
    return this._post('usergroups.disable', args)
  }

  public enable(
    usergroup: string,
    include_count: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      include_count,
      ...extraArgs
    }
    return this._post('usergroups.enable', args)
  }

  public list(
    usergroup: string,
    include_count: boolean = null,
    include_disabled: boolean = null,
    include_users: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      include_count,
      include_disabled,
      include_users,
      ...extraArgs
    }
    return this._get('usergroups.list', args)
  }

  public update(
    usergroup: string,
    channels: string[] = null,
    description: string = null,
    handle: string = null,
    include_disabled: boolean = null,
    name: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      usergroup,
      channels,
      description,
      handle,
      include_disabled,
      name,
      ...extraArgs
    }
    return this._post('usergroups.create', args)
  }
}
