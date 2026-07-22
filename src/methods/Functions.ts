import BaseAPI, { SlackParams } from './BaseAPI'

export default class Functions extends BaseAPI {
  public completeError(params: SlackParams = {}) {
    return this._post('functions.completeError', params)
  }

  public completeSuccess(params: SlackParams = {}) {
    return this._post('functions.completeSuccess', params)
  }
}
