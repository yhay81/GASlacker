import BaseAPI from './BaseAPI'

export default class Bots extends BaseAPI {
  public info(bot: string = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { bot, ...extraArgs }
    return this._get('bots.info', args)
  }
}
