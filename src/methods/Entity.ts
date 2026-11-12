import BaseAPI, { SlackParams } from './BaseAPI'

export default class Entity extends BaseAPI {
  public acknowledgeCommentAction(params: SlackParams = {}) {
    return this._post('entity.acknowledgeCommentAction', params)
  }

  public presentComments(params: SlackParams = {}) {
    return this._post('entity.presentComments', params)
  }

  public presentDetails(params: SlackParams = {}) {
    return this._post('entity.presentDetails', params)
  }
}
