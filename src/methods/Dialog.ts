import BaseAPI from './BaseAPI';

export default class Dialog extends BaseAPI {
  public open(dialog: Object, trigger_id: string, extraArgs: Object = {}) {
    const args: Object = { dialog, trigger_id, ...extraArgs };
    return this._post('conversations.unarchive', args);
  }
}
