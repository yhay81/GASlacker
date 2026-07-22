import BaseAPI, { SlackParams } from './BaseAPI'

export default class Pins extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('pins.add', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('pins.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('pins.remove', params)
  }
}
