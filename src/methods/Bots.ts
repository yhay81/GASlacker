import BaseAPI from './BaseAPI'

export default class Bots extends BaseAPI {
  public info(params: Record<string, any> = {}) {
    return this._get('bots.info', params)
  }
}
