import BaseAPI from './BaseAPI';

export default class Migration extends BaseAPI {
  public exchange(users: string, to_old: boolean = false, extraArgs: Object = {}) {
    const args: Object = { users, to_old, ...extraArgs };
    return this._get('migration.exchange', args);
  }
}
