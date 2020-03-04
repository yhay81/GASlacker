import BaseAPI from './BaseAPI';

export default class DND extends BaseAPI {
  public endDnd(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs };
    return this._post('dnd.endDnd', args);
  }

  public endSnooze(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs };
    return this._post('dnd.endSnooze', args);
  }

  public info(user: string = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { user, ...extraArgs };
    return this._get('dnd.info', args);
  }

  public setSnooze(num_minutes: number, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { num_minutes, ...extraArgs };
    return this._get('dnd.setSnooze', args);
  }

  public teamInfo(users: string[] = [], extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { users, ...extraArgs };
    return this._get('dnd.teamInfo', args);
  }
}
