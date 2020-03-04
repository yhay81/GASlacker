import BaseAPI from './BaseAPI';

export default class IM extends BaseAPI {
  public close(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('im.close', args);
  }

  public history(
    channel: string,
    count = 100,
    inclusive = '0',
    latest = 'now',
    oldest = 0,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      count,
      inclusive,
      latest,
      oldest,
      ...extraArgs
    };
    return this._get('im.history', args);
  }

  public list(cursor: string = null, limit: number = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { cursor, limit, ...extraArgs };
    return this._get('im.list', args);
  }

  public mark(channel: string, ts: number, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ts, ...extraArgs };
    return this._post('im.mark', args);
  }

  public open(
    channel: string,
    user: string,
    include_locale = false,
    return_im: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      user,
      include_locale,
      return_im,
      ...extraArgs
    };
    return this._post('im.mark', args);
  }

  public replies(channel, thread_ts, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, thread_ts, ...extraArgs };
    return this._get('im.replies', args);
  }
}
