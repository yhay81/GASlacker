import BaseAPI, { SlackParams } from './BaseAPI'

export default class Emoji extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('emoji.list', params)
  }
}
