import BaseAPI from './BaseAPI'

export default class DND extends BaseAPI {
  public endDnd(params: Record<string, any> = {}) {
    return this._post('dnd.endDnd', params)
  }

  public endSnooze(params: Record<string, any> = {}) {
    return this._post('dnd.endSnooze', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('dnd.info', params)
  }

  public setSnooze(params: Record<string, any> = {}) {
    return this._post('dnd.setSnooze', params)
  }

  public teamInfo(params: Record<string, any> = {}) {
    return this._get('dnd.teamInfo', params)
  }
}
