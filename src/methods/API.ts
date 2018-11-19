import BaseAPI from './BaseAPI';

export default class API extends BaseAPI {
  public test(error: string = null, foo: string = null, extraArgs: Object = {}): any {
    const args: Object = { error, foo, ...extraArgs };
    return this._post('api.test', args);
  }
}
