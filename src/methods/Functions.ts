import BaseAPI, { SlackParams } from './BaseAPI'

export default class Functions extends BaseAPI {
  public distributions = {
    permissions: {
      add: (params: SlackParams = {}) =>
        this._post('functions.distributions.permissions.add', params),
      list: (params: SlackParams = {}) =>
        this._post('functions.distributions.permissions.list', params),
      remove: (params: SlackParams = {}) =>
        this._post('functions.distributions.permissions.remove', params),
      set: (params: SlackParams = {}) =>
        this._post('functions.distributions.permissions.set', params),
    },
  }

  public workflows = {
    steps: {
      list: (params: SlackParams = {}) => this._post('functions.workflows.steps.list', params),
      responses: {
        export: (params: SlackParams = {}) =>
          this._post('functions.workflows.steps.responses.export', params),
      },
    },
  }

  public completeError(params: SlackParams = {}) {
    return this._post('functions.completeError', params)
  }

  public completeSuccess(params: SlackParams = {}) {
    return this._post('functions.completeSuccess', params)
  }
}
