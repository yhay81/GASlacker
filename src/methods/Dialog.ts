import BaseAPI, { SlackParams } from './BaseAPI'

export default class Dialog extends BaseAPI {
  public open(params: SlackParams = {}) {
    return this._post('dialog.open', params)
  }
}
