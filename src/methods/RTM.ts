import BaseAPI, { SlackParams } from './BaseAPI'

export default class RTM extends BaseAPI {
  public connect(params: SlackParams = {}) {
    return this._get('rtm.connect', params)
  }

  public start(params: SlackParams = {}) {
    return this._get('rtm.start', params)
  }
}
