import BaseAPI from './BaseAPI'

export default class Auth extends BaseAPI {
  public revoke(params: Record<string, any> = {}) {
    return this._post('auth.revoke', params)
  }

  public test(params: Record<string, any> = {}) {
    return this._get('auth.test', params)
  }
}
