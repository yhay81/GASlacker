import BaseAPI, { SlackParams } from './BaseAPI'

export default class Stars extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('stars.add', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('stars.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('stars.remove', params)
  }
}
