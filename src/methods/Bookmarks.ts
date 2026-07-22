import BaseAPI, { SlackParams } from './BaseAPI'

export default class Bookmarks extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('bookmarks.add', params)
  }

  public edit(params: SlackParams = {}) {
    return this._post('bookmarks.edit', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('bookmarks.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('bookmarks.remove', params)
  }
}
