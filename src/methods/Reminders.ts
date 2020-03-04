import BaseAPI from './BaseAPI';

export default class Reminders extends BaseAPI {
  public add(text: string, time: number, user: string = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { text, time, user, ...extraArgs };
    return this._post('reminders.add', args);
  }

  public complete(reminder: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { reminder, ...extraArgs };
    return this._post('reminders.complete', args);
  }

  public delete_(reminder, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { reminder, ...extraArgs };
    return this._post('reminders.delete', args);
  }

  public info(reminder, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { reminder, ...extraArgs };
    return this._get('reminders.info', args);
  }

  public list(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs };
    return this._get('reminders.list', args);
  }
}
