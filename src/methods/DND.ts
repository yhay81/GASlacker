import BaseAPI, { SlackParams } from './BaseAPI'

export default class DND extends BaseAPI {
  public endDnd(params: SlackParams = {}) {
    return this._post('dnd.endDnd', params)
  }

  public endSnooze(params: SlackParams = {}) {
    return this._post('dnd.endSnooze', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('dnd.info', params)
  }

  public setSnooze(params: SlackParams = {}) {
    return this._post('dnd.setSnooze', params)
  }

  public teamInfo(params: SlackParams = {}) {
    return this._get('dnd.teamInfo', params)
  }
}
