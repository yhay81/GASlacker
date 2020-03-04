import BaseAPI from './BaseAPI';

export default class Auth extends BaseAPI {
  public revoke(test: boolean = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { test, ...extraArgs };
    return this._get('auth.revoke', args);
  }

  public test(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs };
    return this._post('auth.test', args);
  }
}
