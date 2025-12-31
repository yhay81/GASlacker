import BaseAPI from './BaseAPI'

export default class API extends BaseAPI {
  public get(api: string, params: Record<string, any> = {}): any {
    return this._get(api, params)
  }

  public post(api: string, params: Record<string, any> = {}): any {
    return this._post(api, params)
  }

  public call(api: string, params: Record<string, any> = {}, method: 'get' | 'post' = 'post'): any {
    if (method === 'get') return this._get(api, params)
    return this._post(api, params)
  }

  public test(params: Record<string, any> = {}): any {
    return this._get('api.test', params)
  }
}
