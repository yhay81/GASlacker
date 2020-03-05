import BaseAPI from './BaseAPI'

export default class MPIM extends BaseAPI {
  public close(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs }
    return this._post('mpim.close', args)
  }

  public history(
    channel: string,
    count = 100,
    inclusive = '0',
    latest = 'now',
    oldest = 0,
    unreads = '0',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      count,
      inclusive,
      latest,
      oldest,
      unreads,
      ...extraArgs
    }
    return this._get('mpim.history', args)
  }

  public list(
    cursor: string = null,
    limit = 0,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { cursor, limit, ...extraArgs }
    return this._get('mpim.list', args)
  }

  public mark(
    channel: string,
    ts: number,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, ts, ...extraArgs }
    return this._post('mpim.mark', args)
  }

  public open(
    channel: string,
    user: string,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, user, ...extraArgs }
    return this._post('mpim.mark', args)
  }

  public replies(
    channel: string,
    thread_ts: string,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, thread_ts, ...extraArgs }
    return this._get('mpim.replies', args)
  }
}
