import BaseAPI from './BaseAPI';

export default class API extends BaseAPI {
  public test(error: string = null, foo: string = null, extraArgs: Record<string, any> = {}): any {
    const args: Record<string, any> = { error, foo, ...extraArgs };
    return this._post('api.test', args);
  }
}
