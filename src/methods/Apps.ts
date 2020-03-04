import BaseAPI from './BaseAPI';

class AppsPermissions extends BaseAPI {
  public resouces;
  public scopes;
  public users;
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit);
    this.resouces = new AppsPermissionsResouces(token, retries_limit);
    this.scopes = new AppsPermissionsScopes(token, retries_limit);
    this.users = new AppsPermissionsUsers(token, retries_limit);
  }

  public info(extraArgs: Record<string, any> = {}): any {
    const args: Record<string, any> = { ...extraArgs };
    return this._get('apps.permissions.info', args);
  }

  public request(scopes: string[], trigger_id: string, extraArgs: Record<string, any> = {}): any {
    const args: Record<string, any> = {
      ...{ scopes, trigger_id },
      ...extraArgs
    };
    return this._get('apps.permissions.request', args);
  }
}

class AppsPermissionsResouces extends BaseAPI {
  public list(
    cursor: string = null,
    limit: string = null,
    extraArgs: Record<string, any> = {}
  ): any {
    const args: Record<string, any> = { ...{ cursor, limit }, ...extraArgs };
    return this._get('apps.permissions.resouces.list', args);
  }
}

class AppsPermissionsScopes extends BaseAPI {
  public list(extraArgs: Record<string, any> = {}): any {
    const args: Record<string, any> = { ...extraArgs };
    return this._get('apps.permissions.scopes.list', args);
  }
}

class AppsPermissionsUsers extends BaseAPI {
  public list(
    cursor: string = null,
    limit: number = null,
    extraArgs: Record<string, any> = {}
  ): any {
    const args: Record<string, any> = { cursor, limit, ...extraArgs };
    return this._get('apps.permissions.users.list', args);
  }
  public request(
    scopes: string,
    trigger_id: string,
    user: string,
    extraArgs: Record<string, any> = {}
  ): any {
    const args: Record<string, any> = { scopes, trigger_id, user, ...extraArgs };
    return this._get('apps.permissions.users.request', args);
  }
}

export default class Apps extends BaseAPI {
  public permissions: AppsPermissions;
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit);
    this.permissions = new AppsPermissions(token, retries_limit);
  }
  public uninstall(
    client_id: string,
    client_secret: string,
    options: Record<string, any> = {}
  ): any {
    const args: Record<string, any> = { client_id, client_secret, ...options };
    return this._get('apps.permissions.users.request', args);
  }
}
