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

export default class Apps extends BaseAPI {
  public connections: AppsConnections
  public eventAuthorizations: AppsEventAuthorizations
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.connections = new AppsConnections(token, retries_limit)
    this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit)
  }

  public uninstall(params: Record<string, any> = {}): any {
    return this._post_form('apps.uninstall', params)
  }
}
