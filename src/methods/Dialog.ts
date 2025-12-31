import BaseAPI from './BaseAPI'

export default class Dialog extends BaseAPI {
  public open(params: Record<string, any> = {}) {
    return this._post('dialog.open', params)
  }
}
