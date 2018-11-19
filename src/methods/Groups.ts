import BaseAPI from './BaseAPI';

export default class Groups extends BaseAPI {
  public archive(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('groups.archive', args);
  }

  public create(name: string, validate: boolean = null, extraArgs: Object = {}) {
    const args: Object = { name, validate, ...extraArgs };
    return this._get('groups.create', args);
  }

  public createChild(
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
    return this._get('groups.createChild', args);
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
    return this._get('groups.history', args);
  }

  public info(channel: string, include_locale: boolean = false, extraArgs: Object = {}) {
    const args: Object = { channel, include_locale, ...extraArgs };
    return this._get('groups.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Object = {}) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('groups.invite', args);
  }

  public kick(channel, user, extraArgs: Object = {}) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('groups.kick', args);
  }

  public leave(channel, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('groups.leave', args);
  }

  public list(
    options = {},
    cursor: string = null,
    exclude_archived: string = '0',
    exclude_members: boolean = false,
    limit: number = 0,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      cursor,
      exclude_archived,
      exclude_members,
      limit,
      ...extraArgs
    };
    return this._get('groups.list', args);
  }

  public mark(channel, ts, extraArgs: Object = {}) {
    const args: Object = { channel, ts, ...extraArgs };
    return this._post('groups.mark', args);
  }

  public open(channel, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('groups.mark', args);
  }

  public rename(channel: string, name: string, validate: boolean = null, extraArgs: Object = {}) {
    const args: Object = { channel, name, validate, ...extraArgs };
    return this._get('groups.rename', args);
  }

  public replies(channel: string, thread_ts: string, extraArgs: Object = {}) {
    const args: Object = { channel, thread_ts, ...extraArgs };
    return this._get('groups.replies', args);
  }

  public setPurpose(channel: string, purpose: string, extraArgs: Object = {}) {
    const args: Object = { channel, purpose, ...extraArgs };
    return this._post('groups.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Object = {}) {
    const args: Object = { channel, topic, ...extraArgs };
    return this._post('groups.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('groups.unarchive', args);
  }
}
