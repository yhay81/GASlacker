import BaseAPI, { type SlackParams } from './BaseAPI'

export default class Enterprise extends BaseAPI {
  public auth = {
    idpconfig: {
      apply: (params: SlackParams = {}) =>
        this._post_form('enterprise.auth.idpconfig.apply', params),
      get: (params: SlackParams = {}) => this._post_form('enterprise.auth.idpconfig.get', params),
      list: (params: SlackParams = {}) => this._post_form('enterprise.auth.idpconfig.list', params),
      remove: (params: SlackParams = {}) =>
        this._post_form('enterprise.auth.idpconfig.remove', params),
      set: (params: SlackParams = {}) => this._post_form('enterprise.auth.idpconfig.set', params),
    },
  }
}
