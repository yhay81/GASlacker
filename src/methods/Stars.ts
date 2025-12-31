import BaseAPI from './BaseAPI'

export default class Stars extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('stars.add', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('stars.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('stars.remove', params)
  }
}
