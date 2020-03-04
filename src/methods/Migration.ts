import BaseAPI from './BaseAPI';

export default class Migration extends BaseAPI {
  public exchange(users: string, to_old = false, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { users, to_old, ...extraArgs };
    return this._get('migration.exchange', args);
  }
}
