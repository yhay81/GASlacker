import BaseAPI from './BaseAPI';

export default class Channels extends BaseAPI {
  public archive(channel: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('channels.archive', args);
  }

  public create(name: string, validate: boolean = null, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { name, validate, ...extraArgs };
    return this._get('channels.create', args);
  }

  public history(
    channel: string,
    count = 100,
    inclusive = '0',
    latest = 'now',
    oldest = 0,
    unreads = 0,
    extraArgs: Record<string, any>
  ) {
    const args: Record<string, any> = {
      channel,
      count,
      inclusive,
      latest,
      oldest,
      unreads,
      ...extraArgs
    };
    return this._get('channels.history', args);
  }

  public info(channel: string, include_locale = false, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, include_locale, ...extraArgs };
    return this._get('channels.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('channels.invite', args);
  }

  public join(name: string, validate: boolean = null, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { name, validate, ...extraArgs };
    return this._post('channels.join', args);
  }

  public kick(channel: string, user: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('channels.kick', args);
  }

  public leave(channel: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('channels.leave', args);
  }

  public list(
    cursor: string = null,
    exclude_archived = false,
    exclude_members = false,
    limit = 0,
    extraArgs: Record<string, any>
  ) {
    const args: Record<string, any> = {
      cursor,
      exclude_archived,
      exclude_members,
      limit,
      ...extraArgs
    };
    return this._get('channels.list', args);
  }

  public mark(channel: string, ts: number, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, ts, ...extraArgs };
    return this._post('channels.mark', args);
  }

  public rename(
    channel: string,
    name: string,
    validate: boolean = null,
    extraArgs: Record<string, any>
  ) {
    const args: Record<string, any> = { channel, name, validate, ...extraArgs };
    return this._get('channels.rename', args);
  }

  public replies(channel: string, thread_ts: number, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, thread_ts, ...extraArgs };
    return this._get('channels.replies', args);
  }

  public setPurpose(channel: string, purpose: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, purpose, ...extraArgs };
    return this._post('channels.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, topic, ...extraArgs };
    return this._post('channels.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Record<string, any>) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('channels.unarchive', args);
  }
}
