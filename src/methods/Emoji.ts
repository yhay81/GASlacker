import BaseAPI from './BaseAPI';

export default class Emoji extends BaseAPI {
  public list(extraArgs: Object = {}) {
    const args: Object = { ...extraArgs };
    return this._get('emoji.list', args);
  }
}
