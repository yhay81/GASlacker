import BaseAPI from './BaseAPI'

export default class Entity extends BaseAPI {
  public presentDetails(params: Record<string, any> = {}) {
    return this._post('entity.presentDetails', params)
  }
}
