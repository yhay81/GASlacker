import BaseAPI, { SlackParams } from './BaseAPI'

class WorkflowsFeatured extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('workflows.featured.add', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('workflows.featured.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('workflows.featured.remove', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('workflows.featured.set', params)
  }
}

export default class Workflows extends BaseAPI {
  public featured
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.featured = new WorkflowsFeatured(token, retries_limit)
  }
}
