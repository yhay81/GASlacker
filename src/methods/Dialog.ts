import BaseAPI from './BaseAPI'

export default class Dialog extends BaseAPI {
  public open(
    dialog: Record<string, any>,
    trigger_id: string,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { dialog, trigger_id, ...extraArgs }
    return this._post('conversations.unarchive', args)
  }
}
