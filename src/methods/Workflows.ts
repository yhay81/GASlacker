import BaseAPI from './BaseAPI'

class WorkflowsFeatured extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('workflows.featured.add', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('workflows.featured.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('workflows.featured.remove', params)
  }

  public set(params: Record<string, any> = {}) {
    return this._post('workflows.featured.set', params)
  }
}

export default class Workflows extends BaseAPI {
  public featured
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.featured = new WorkflowsFeatured(token, retries_limit)
  }
}
