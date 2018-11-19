import BaseAPI from './BaseAPI';

export default class Auth extends BaseAPI {
  public revoke(test: boolean = null, extraArgs: Object = {}) {
    const args: Object = { test, ...extraArgs };
    return this._get('auth.revoke', args);
  }

  public test(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._post('auth.test', args);
  }
}
