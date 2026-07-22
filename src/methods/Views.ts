import BaseAPI, { SlackParams } from './BaseAPI'

export default class Views extends BaseAPI {
  public open(params: SlackParams = {}) {
    return this._post('views.open', params)
  }

  public publish(params: SlackParams = {}) {
    return this._post('views.publish', params)
  }

  public push(params: SlackParams = {}) {
    return this._post('views.push', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('views.update', params)
  }
}
