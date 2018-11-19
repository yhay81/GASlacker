import BaseAPI from './BaseAPI';

export default class Conversations extends BaseAPI {
  public archive(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('conversations.archive', args);
  }

  public close(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._get('conversations.close', args);
  }

  public create(
    name: string,
    is_private: boolean = null,
    user_ids: string[] = null,
    extraArgs: Object = {}
  ) {
    const args: Object = { name, is_private, user_ids, ...extraArgs };
    return this._get('conversations.create', args);
  }

  public history(
    channel: string,
    inclusive: string = null,
    latest: string = 'now',
    limit: number = 10,
    oldest: number = 0,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      inclusive,
      latest,
      limit,
      oldest,
      ...extraArgs
    };
    return this._get('conversations.history', args);
  }

  public info(channel: string, include_locale: boolean = false, extraArgs: Object = {}) {
    const args: Object = { channel, include_locale, ...extraArgs };
    return this._get('conversations.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Object = {}) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('conversations.invite', args);
  }

  public join(name: string, extraArgs: Object = {}) {
    const args: Object = { name, ...extraArgs };
    return this._post('conversations.join', args);
  }

  public kick(channel: string, user: string, extraArgs: Object = {}) {
    const args: Object = { channel, user, ...extraArgs };
    return this._post('conversations.kick', args);
  }

  public leave(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('conversations.leave', args);
  }

  public list(
    cursor: string = null,
    exclude_archived: boolean = false,
    limit: number = 100,
    types: string = 'public_channel',
    extraArgs: Object = {}
  ) {
    const args: Object = {
      cursor,
      exclude_archived,
      limit,
      types,
      ...extraArgs
    };
    return this._get('conversations.list', args);
  }

  public member(
    channel: string,
    cursor: string = null,
    limit: number = 100,
    extraArgs: Object = {}
  ) {
    const args: Object = { channel, cursor, limit, ...extraArgs };
    return this._post('conversations.member', args);
  }

  public open(
    channel: string = null,
    return_im: boolean = null,
    users: string = null,
    extraArgs = {}
  ) {
    const args: Object = { channel, return_im, users, ...extraArgs };
    return this._post('conversations.open', args);
  }

  public rename(channel: string, name: string, extraArgs: Object = {}) {
    const args: Object = { channel, name, ...extraArgs };
    return this._post('conversations.rename', args);
  }

  public replies(
    channel: string,
    ts: number,
    cursor: string = null,
    inclusive: string = null,
    latest: string = 'now',
    limit: number = 10,
    oldest: number = 0,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      ts,
      cursor,
      inclusive,
      latest,
      limit,
      oldest,
      ...extraArgs
    };
    return this._get('conversations.replies', args);
  }

  public setPurpose(channel: string, purpose: string, extraArgs: Object = {}) {
    const args: Object = { channel, purpose, ...extraArgs };
    return this._post('conversations.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Object = {}) {
    const args: Object = { channel, topic, ...extraArgs };
    return this._post('conversations.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Object = {}) {
    const args: Object = { channel, ...extraArgs };
    return this._post('conversations.unarchive', args);
  }
}
