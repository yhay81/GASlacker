import BaseAPI, { SlackParams } from './BaseAPI'

class WorkflowsFeatured extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('workflows.featured.add', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('workflows.featured.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('workflows.featured.remove', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('workflows.featured.set', params)
  }
}

export default class Workflows extends BaseAPI {
  public triggers = {
    create: (params: SlackParams = {}) => this._post('workflows.triggers.create', params),
    delete: (params: SlackParams = {}) => this._post('workflows.triggers.delete', params),
    delete_: (params: SlackParams = {}) => this.triggers.delete(params),
    info: (params: SlackParams = {}) => this._post('workflows.triggers.info', params),
    list: (params: SlackParams = {}) => this._post('workflows.triggers.list', params),
    permissions: {
      add: (params: SlackParams = {}) => this._post('workflows.triggers.permissions.add', params),
      list: (params: SlackParams = {}) => this._post('workflows.triggers.permissions.list', params),
      remove: (params: SlackParams = {}) =>
        this._post('workflows.triggers.permissions.remove', params),
      set: (params: SlackParams = {}) => this._post('workflows.triggers.permissions.set', params),
    },
    update: (params: SlackParams = {}) => this._post('workflows.triggers.update', params),
  }

  public featured
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.featured = new WorkflowsFeatured(token, retries_limit)
  }
}
