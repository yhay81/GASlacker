import BaseAPI, { SlackParams } from './BaseAPI'

export default class Blocks extends BaseAPI {
  // Slack currently ignores JSON request bodies; pass blocks/view/message as JSON strings.
  public validate(params: SlackParams = {}) {
    return this._post_form('blocks.validate', params)
  }
}
