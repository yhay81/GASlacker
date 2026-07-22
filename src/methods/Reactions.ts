import BaseAPI, { SlackParams } from './BaseAPI'

export default class Reactions extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('reactions.add', params)
  }

  public get(params: SlackParams = {}) {
    return this._get('reactions.get', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('reactions.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('reactions.remove', params)
  }
}
