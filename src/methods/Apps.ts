import BaseAPI from './BaseAPI'

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

// App Configuration Token(xoxe-)で使うマニフェスト管理 API
class AppsManifest extends BaseAPI {
  public create(params: Record<string, any> = {}) {
    return this._post('apps.manifest.create', params)
  }

  public delete(params: Record<string, any> = {}) {
    return this._post('apps.manifest.delete', params)
  }

  // 後方互換エイリアス
  public delete_(params: Record<string, any> = {}) {
    return this.delete(params)
  }

  public export(params: Record<string, any> = {}) {
    return this._get('apps.manifest.export', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('apps.manifest.update', params)
  }

  public validate(params: Record<string, any> = {}) {
    return this._post('apps.manifest.validate', params)
  }
}

class AppsUserConnection extends BaseAPI {
  public update(params: Record<string, any> = {}) {
    return this._post('apps.user.connection.update', params)
  }
}

class AppsUser extends BaseAPI {
  public connection
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.connection = new AppsUserConnection(token, retries_limit)
  }
}

export default class Apps extends BaseAPI {
  public connections: AppsConnections
  public eventAuthorizations: AppsEventAuthorizations
  public manifest: AppsManifest
  public user: AppsUser
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.connections = new AppsConnections(token, retries_limit)
    this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit)
    this.manifest = new AppsManifest(token, retries_limit)
    this.user = new AppsUser(token, retries_limit)
  }

  public uninstall(params: Record<string, any> = {}): any {
    return this._post_form('apps.uninstall', params)
  }
}
