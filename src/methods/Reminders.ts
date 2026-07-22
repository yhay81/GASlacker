import BaseAPI, { SlackParams } from './BaseAPI'

export default class Reminders extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('reminders.add', params)
  }

  public complete(params: SlackParams = {}) {
    return this._post('reminders.complete', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('reminders.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public info(params: SlackParams = {}) {
    return this._get('reminders.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('reminders.list', params)
  }
}
