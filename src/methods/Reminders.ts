import BaseAPI from './BaseAPI'

export default class Reminders extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('reminders.add', params)
  }

  public complete(params: Record<string, any> = {}) {
    return this._post('reminders.complete', params)
  }

  public delete_(params: Record<string, any> = {}) {
    return this._post('reminders.delete', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('reminders.info', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('reminders.list', params)
  }
}
