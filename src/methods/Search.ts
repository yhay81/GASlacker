import BaseAPI, { SlackParams } from './BaseAPI'

export default class Search extends BaseAPI {
  public all(params: SlackParams = {}) {
    return this._get('search.all', params)
  }

  public files(params: SlackParams = {}) {
    return this._get('search.files', params)
  }

  public messages(params: SlackParams = {}) {
    return this._get('search.messages', params)
  }
}
