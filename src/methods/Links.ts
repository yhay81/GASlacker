import BaseAPI, { type SlackParams } from './BaseAPI'

export default class Links extends BaseAPI {
  public accountLinkedResult(params: SlackParams = {}) {
    return this._post('links.accountLinkedResult', params)
  }
}
