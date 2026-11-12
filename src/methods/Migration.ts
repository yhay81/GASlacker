import BaseAPI, { SlackParams } from './BaseAPI'

export default class Migration extends BaseAPI {
  public exchange(params: SlackParams = {}) {
    return this._get('migration.exchange', params)
  }
}
