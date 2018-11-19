import BaseAPI from './BaseAPI';

export default class IM extends BaseAPI {
  public close(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('im.close', args);
  }

  public history(
    channel: string,
    count: number = 100,
    inclusive: string = '0',
    latest: string = 'now',
    oldest: number = 0,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      count,
      inclusive,
      latest,
      oldest,
      ...extraArgs
    };
    return this._get('im.history', args);
  }

  public list(cursor: string = null, limit: number = null, extraArgs: Object = {}) {
    const args: Object = { cursor, limit, ...extraArgs };
    return this._get('im.list', args);
  }

  public mark(channel: string, ts: number, extraArgs: Object = {}) {
    const args: Object = { channel, ts, ...extraArgs };
    return this._post('im.mark', args);
  }

  public open(
    channel: string,
    user: string,
    include_locale: boolean = false,
    return_im: boolean = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      user,
      include_locale,
      return_im,
      ...extraArgs
    };
    return this._post('im.mark', args);
  }

  public replies(channel, thread_ts, extraArgs: Object = {}) {
    const args: Object = { channel, thread_ts, ...extraArgs };
    return this._get('im.replies', args);
  }
}
