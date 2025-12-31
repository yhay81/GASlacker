import BaseAPI from './BaseAPI'

export default class Emoji extends BaseAPI {
  public list(params: Record<string, any> = {}) {
    return this._get('emoji.list', params)
  }
}
