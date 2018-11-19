import BaseAPI from './BaseAPI';

export default class MPIM extends BaseAPI {
  public close(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('mpim.close', args);
  }

  public history(
    channel: string,
    count: number = 100,
    inclusive: string = '0',
    latest: string = 'now',
    oldest: number = 0,
    unreads: string = '0',
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      count,
      inclusive,
      latest,
      oldest,
      unreads,
      ...extraArgs
    };
    return this._get('mpim.history', args);
  }

  public list(cursor: string = null, limit: number = 0, extraArgs: Object = {}) {
    const args: Object = { cursor, limit, ...extraArgs };
    return this._get('mpim.list', args);
  }

  public mark(channel: string, ts: number, extraArgs: Object = {}) {
    const args: Object = { channel, ts, ...extraArgs };
    return this._post('mpim.mark', args);
  }

  public open(channel: string, user: string, extraArgs: Object = {}) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('mpim.mark', args);
  }

  public replies(channel: string, thread_ts: string, extraArgs: Object = {}) {
    const args: Object = { channel, thread_ts, ...extraArgs };
    return this._get('mpim.replies', args);
  }
}
