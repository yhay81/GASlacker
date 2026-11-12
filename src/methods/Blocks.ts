import BaseAPI, { SlackParams } from './BaseAPI'

export default class Blocks extends BaseAPI {
  public validate(params: SlackParams = {}) {
    return this._post_form('blocks.validate', params)
  }
}
