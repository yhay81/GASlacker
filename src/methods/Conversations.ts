import BaseAPI from './BaseAPI';

export default class Conversations extends BaseAPI {
  public archive(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('conversations.archive', args);
  }

  public close(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._get('conversations.close', args);
  }

  public create(
    name: string,
    is_private: boolean = null,
    user_ids: string[] = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      name,
      is_private,
      user_ids,
      ...extraArgs
    };
    return this._get('conversations.create', args);
  }

  public history(
    channel: string,
    inclusive: string = null,
    latest = 'now',
    limit = 10,
    oldest = 0,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      inclusive,
      latest,
      limit,
      oldest,
      ...extraArgs
    };
    return this._get('conversations.history', args);
  }

  public info(channel: string, include_locale = false, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, include_locale, ...extraArgs };
    return this._get('conversations.info', args);
  }

  public invite(channel: string, user: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('conversations.invite', args);
  }

  public join(name: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { name, ...extraArgs };
    return this._post('conversations.join', args);
  }

  public kick(channel: string, user: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, user, ...extraArgs };
    return this._post('conversations.kick', args);
  }

  public leave(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('conversations.leave', args);
  }

  public list(
    cursor: string = null,
    exclude_archived = false,
    limit = 100,
    types = 'public_channel',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
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
    limit = 100,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, cursor, limit, ...extraArgs };
    return this._post('conversations.member', args);
  }

  public open(
    channel: string = null,
    return_im: boolean = null,
    users: string = null,
    extraArgs = {}
  ) {
    const args: Record<string, any> = {
      channel,
      return_im,
      users,
      ...extraArgs
    };
    return this._post('conversations.open', args);
  }

  public rename(channel: string, name: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, name, ...extraArgs };
    return this._post('conversations.rename', args);
  }

  public replies(
    channel: string,
    ts: number,
    cursor: string = null,
    inclusive: string = null,
    latest = 'now',
    limit = 10,
    oldest = 0,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
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

  public setPurpose(channel: string, purpose: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, purpose, ...extraArgs };
    return this._post('conversations.setPurpose', args);
  }

  public setTopic(channel: string, topic: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, topic, ...extraArgs };
    return this._post('conversations.setTopic', args);
  }

  public unarchive(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs };
    return this._post('conversations.unarchive', args);
  }
}
