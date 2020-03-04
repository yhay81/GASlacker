import BaseAPI from './BaseAPI';

export default class Groups extends BaseAPI {
  public archive(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('groups.archive', args);
  }

  public create(name: string, validate: boolean = null, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { name, validate, ...extraArgs };
    return this._get('groups.create', args);
  }

  public createChild(
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
    };
    return this._get('groups.createChild', args);
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
    };
    return this._get('groups.history', args);
  }

  public info(channel: string, include_locale = false, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, include_locale, ...extraArgs };
    return this._get('groups.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('groups.invite', args);
  }

  public kick(channel, user, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('groups.kick', args);
  }

  public leave(channel, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('groups.leave', args);
  }

  public list(
    options = {},
    cursor: string = null,
    exclude_archived = '0',
    exclude_members = false,
    limit = 0,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      cursor,
      exclude_archived,
      exclude_members,
      limit,
      ...extraArgs
    };
    return this._get('groups.list', args);
  }

  public mark(channel, ts, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ts, ...extraArgs };
    return this._post('groups.mark', args);
  }

  public open(channel, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('groups.mark', args);
  }

  public rename(
    channel: string,
    name: string,
    validate: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, name, validate, ...extraArgs };
    return this._get('groups.rename', args);
  }

  public replies(channel: string, thread_ts: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, thread_ts, ...extraArgs };
    return this._get('groups.replies', args);
  }

  public setPurpose(channel: string, purpose: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, purpose, ...extraArgs };
    return this._post('groups.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, topic, ...extraArgs };
    return this._post('groups.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('groups.unarchive', args);
  }
}
