import BaseAPI from './BaseAPI'

export default class Functions extends BaseAPI {
  public completeError(params: Record<string, any> = {}) {
    return this._post('functions.completeError', params)
  }

  public completeSuccess(params: Record<string, any> = {}) {
    return this._post('functions.completeSuccess', params)
  }
}
