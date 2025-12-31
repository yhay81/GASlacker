import BaseAPI from './BaseAPI'

export default class Views extends BaseAPI {
  public open(params: Record<string, any> = {}) {
    return this._post('views.open', params)
  }

  public publish(params: Record<string, any> = {}) {
    return this._post('views.publish', params)
  }

  public push(params: Record<string, any> = {}) {
    return this._post('views.push', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('views.update', params)
  }
}
