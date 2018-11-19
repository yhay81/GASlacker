import BaseAPI from './BaseAPI';

export default class Bots extends BaseAPI {
  public info(bot: string = null, extraArgs: Object = {}) {
    const args: Object = { bot, ...extraArgs };
    return this._get('bots.info', args);
  }
}
