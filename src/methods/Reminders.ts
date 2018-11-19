import BaseAPI from './BaseAPI';

export default class Reminders extends BaseAPI {
  public add(text: string, time: number, user: string = null, extraArgs: Object = {}) {
    const args: Object = { text, time, user, ...extraArgs };
    return this._post('reminders.add', args);
  }

  public complete(reminder: string, extraArgs: Object = {}) {
    const args: Object = { reminder, ...extraArgs };
    return this._post('reminders.complete', args);
  }

  public delete_(reminder, extraArgs: Object = {}) {
    const args: Object = { reminder, ...extraArgs };
    return this._post('reminders.delete', args);
  }

  public info(reminder, extraArgs: Object = {}) {
    const args: Object = { reminder, ...extraArgs };
    return this._get('reminders.info', args);
  }

  public list(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._get('reminders.list', args);
  }
}
