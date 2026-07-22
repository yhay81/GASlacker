import BaseAPI, { SlackParams } from './BaseAPI'

export default class Entity extends BaseAPI {
  public presentDetails(params: SlackParams = {}) {
    return this._post('entity.presentDetails', params)
  }
}
