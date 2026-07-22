import BaseAPI, { SlackParams } from './BaseAPI'

export default class Bots extends BaseAPI {
  public info(params: SlackParams = {}) {
    return this._get('bots.info', params)
  }
}
