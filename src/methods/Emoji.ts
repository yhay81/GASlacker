import BaseAPI from './BaseAPI'

export default class Emoji extends BaseAPI {
  public list(extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { ...extraArgs }
    return this._get('emoji.list', args)
  }
}
