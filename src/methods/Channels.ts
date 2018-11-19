import BaseAPI from './BaseAPI';

export default class Channels extends BaseAPI {
  public archive(channel: string, extraArgs: Object) {
    const args: Object = { channel, ...extraArgs };
    return this._post('channels.archive', args);
  }

  public create(name: string, validate: boolean = null, extraArgs: Object) {
    const args: Object = { name, validate, ...extraArgs };
    return this._get('channels.create', args);
  }

  public history(
    channel: string,
    count: number = 100,
    inclusive: string = '0',
    latest: string = 'now',
    oldest: number = 0,
    unreads: number = 0,
    extraArgs: Object
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
    return this._get('channels.history', args);
  }

  public info(channel: string, include_locale: boolean = false, extraArgs: Object) {
    const args: Object = { channel, include_locale, ...extraArgs };
    return this._get('channels.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Object) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('channels.invite', args);
  }

  public join(name: string, validate: boolean = null, extraArgs: Object) {
    const args: Object = { name, validate, ...extraArgs };
    return this._post('channels.join', args);
  }

  public kick(channel: string, user: string, extraArgs: Object) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('channels.kick', args);
  }

  public leave(channel: string, extraArgs: Object) {
    const args: Object = { channel, ...extraArgs };
    return this._post('channels.leave', args);
  }

  public list(
    cursor: string = null,
    exclude_archived: boolean = false,
    exclude_members: boolean = false,
    limit: number = 0,
    extraArgs: Object
  ) {
    const args: Object = {
      cursor,
      exclude_archived,
      exclude_members,
      limit,
      ...extraArgs
    };
    return this._get('channels.list', args);
  }

  public mark(channel: string, ts: number, extraArgs: Object) {
    const args: Object = { channel, ts, ...extraArgs };
    return this._post('channels.mark', args);
  }

  public rename(channel: string, name: string, validate: boolean = null, extraArgs: Object) {
    const args: Object = { channel, name, validate, ...extraArgs };
    return this._get('channels.rename', args);
  }

  public replies(channel: string, thread_ts: number, extraArgs: Object) {
    const args: Object = { channel, thread_ts, ...extraArgs };
    return this._get('channels.replies', args);
  }

  public setPurpose(channel: string, purpose: string, extraArgs: Object) {
    const args: Object = { channel, purpose, ...extraArgs };
    return this._post('channels.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Object) {
    const args: Object = { channel, topic, ...extraArgs };
    return this._post('channels.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Object) {
    const args: Object = { channel, ...extraArgs };
    return this._post('channels.unarchive', args);
  }
}
