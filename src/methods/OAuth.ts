import BaseAPI from './BaseAPI'

export default class OAuth extends BaseAPI {
  public access(params: Record<string, any> = {}) {
    return this._post_form('oauth.v2.access', params)
  }
}
