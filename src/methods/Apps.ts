import BaseAPI, { SlackParams } from './BaseAPI'

class AppsConnections extends BaseAPI {
  public open(params: SlackParams = {}) {
    return this._post('apps.connections.open', params)
  }
}

class AppsEventAuthorizations extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post('apps.event.authorizations.list', params)
  }
}

// Manifest management API, used with an App Configuration Token (xoxe-)
class AppsManifest extends BaseAPI {
  public create(params: SlackParams = {}) {
    return this._post('apps.manifest.create', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('apps.manifest.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public export(params: SlackParams = {}) {
    return this._post('apps.manifest.export', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('apps.manifest.update', params)
  }

  public validate(params: SlackParams = {}) {
    return this._post('apps.manifest.validate', params)
  }
}

class AppsUserConnection extends BaseAPI {
  public bulkUpdate(params: SlackParams = {}) {
    return this._post_form('apps.user.connection.bulkUpdate', params)
  }

  public requestAuth(params: SlackParams = {}) {
    return this._post_form('apps.user.connection.requestAuth', params)
  }

  public update(params: SlackParams = {}) {
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
  public activities = {
    list: (params: SlackParams = {}) => this._post_form('apps.activities.list', params),
  }

  public auth = {
    external: {
      delete: (params: SlackParams = {}) => this._post('apps.auth.external.delete', params),
      delete_: (params: SlackParams = {}) => this.auth.external.delete(params),
      get: (params: SlackParams = {}) => this._post('apps.auth.external.get', params),
    },
  }

  public datastore = {
    bulkDelete: (params: SlackParams = {}) => this._post('apps.datastore.bulkDelete', params),
    bulkGet: (params: SlackParams = {}) => this._post('apps.datastore.bulkGet', params),
    bulkPut: (params: SlackParams = {}) => this._post('apps.datastore.bulkPut', params),
    count: (params: SlackParams = {}) => this._post('apps.datastore.count', params),
    delete: (params: SlackParams = {}) => this._post('apps.datastore.delete', params),
    delete_: (params: SlackParams = {}) => this.datastore.delete(params),
    get: (params: SlackParams = {}) => this._post('apps.datastore.get', params),
    put: (params: SlackParams = {}) => this._post('apps.datastore.put', params),
    query: (params: SlackParams = {}) => this._post('apps.datastore.query', params),
    update: (params: SlackParams = {}) => this._post('apps.datastore.update', params),
  }

  public icon = {
    set: (params: SlackParams = {}) => {
      const { file, ...fields } = this._normalizeArgs(params, 'params')
      return this._post_file('apps.icon.set', { file }, fields)
    },
  }

  public links = {
    toggle: (params: SlackParams = {}) => this._post_form('apps.links.toggle', params),
  }

  public managed = {
    permissions: {
      set: (params: SlackParams = {}) => this._post('apps.managed.permissions.set', params),
    },
  }

  public connections: AppsConnections
  public event
  public eventAuthorizations: AppsEventAuthorizations
  public manifest: AppsManifest
  public user: AppsUser
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.connections = new AppsConnections(token, retries_limit)
    this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit)
    this.event = { authorizations: this.eventAuthorizations }
    this.manifest = new AppsManifest(token, retries_limit)
    this.user = new AppsUser(token, retries_limit)
  }

  public uninstall(params: SlackParams = {}) {
    return this._post_form('apps.uninstall', params)
  }
}
