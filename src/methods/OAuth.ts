import BaseAPI, { SlackParams } from './BaseAPI'

export default class OAuth extends BaseAPI {
  public access(params: SlackParams = {}) {
    return this._post_form('oauth.v2.access', params)
  }
}
