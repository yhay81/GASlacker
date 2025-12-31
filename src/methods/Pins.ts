import BaseAPI from './BaseAPI'

export default class Pins extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('pins.add', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('pins.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('pins.remove', params)
  }
}
