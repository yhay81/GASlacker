import BaseAPI from './BaseAPI'

export default class Bookmarks extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('bookmarks.add', params)
  }

  public edit(params: Record<string, any> = {}) {
    return this._post('bookmarks.edit', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('bookmarks.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('bookmarks.remove', params)
  }
}
