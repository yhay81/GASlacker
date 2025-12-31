import BaseAPI from './BaseAPI'

export default class Reactions extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('reactions.add', params)
  }

  public get(params: Record<string, any> = {}) {
    return this._get('reactions.get', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('reactions.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('reactions.remove', params)
  }
}
