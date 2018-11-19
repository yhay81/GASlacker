import BaseAPI from './BaseAPI';

export default class DND extends BaseAPI {
  public endDnd(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._post('dnd.endDnd', args);
  }

  public endSnooze(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._post('dnd.endSnooze', args);
  }

  public info(user: string = null, extraArgs: Object = {}) {
    const args: Object = { user, ...extraArgs };
    return this._get('dnd.info', args);
  }

  public setSnooze(num_minutes: number, extraArgs: Object = {}) {
    const args: Object = { num_minutes, ...extraArgs };
    return this._get('dnd.setSnooze', args);
  }

  public teamInfo(users: string[] = [], extraArgs: Object = {}) {
    const args: Object = { users, ...extraArgs };
    return this._get('dnd.teamInfo', args);
  }
}
