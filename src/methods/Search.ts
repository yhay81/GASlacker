import BaseAPI from './BaseAPI'

export default class Search extends BaseAPI {
  public all(params: Record<string, any> = {}) {
    return this._get('search.all', params)
  }

  public files(params: Record<string, any> = {}) {
    return this._get('search.files', params)
  }

  public messages(params: Record<string, any> = {}) {
    return this._get('search.messages', params)
  }
}
