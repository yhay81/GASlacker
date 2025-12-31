import BaseAPI from './BaseAPI'

class AppsPermissions extends BaseAPI {
  public resources
  public scopes
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit)
    this.resources = new AppsPermissionsResources(token, retries_limit)
    this.scopes = new AppsPermissionsScopes(token, retries_limit)
  }

  public info(params: Record<string, any> = {}): any {
    return this._get('apps.permissions.info', params)
  }

  public request(params: Record<string, any> = {}): any {
    return this._post('apps.permissions.request', params)
  }
}

class AppsPermissionsResources extends BaseAPI {
  public list(params: Record<string, any> = {}): any {
    return this._get('apps.permissions.resources.list', params)
  }
}

class AppsPermissionsScopes extends BaseAPI {
  public list(params: Record<string, any> = {}): any {
    return this._get('apps.permissions.scopes.list', params)
  }
}

class AppsConnections extends BaseAPI {
  public open(params: Record<string, any> = {}): any {
    return this._post('apps.connections.open', params)
  }
}

class AppsEventAuthorizations extends BaseAPI {
  public list(params: Record<string, any> = {}): any {
    return this._get('apps.event.authorizations.list', params)
  }
}

export default class Apps extends BaseAPI {
  public permissions: AppsPermissions
  public connections: AppsConnections
  public eventAuthorizations: AppsEventAuthorizations
  constructor(token: string, retries_limit: number) {
    super(token, retries_limit)
    this.permissions = new AppsPermissions(token, retries_limit)
    this.connections = new AppsConnections(token, retries_limit)
    this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit)
  }

  public uninstall(params: Record<string, any> = {}): any {
    return this._post_form('apps.uninstall', params)
  }
}
