import BaseAPI from './BaseAPI'

export default class Chat extends BaseAPI {
  public delete_(
    channel: string,
    ts: number,
    as_user: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, ts, as_user, ...extraArgs }
    return this._post('chat.delete', args)
  }

  public getPermalink(
    channel: string,
    message_ts: number,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, message_ts, ...extraArgs }
    return this._get('chat.getPermalink', args)
  }

  public meMessage(
    channel: string,
    text: string,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, text, ...extraArgs }
    return this._post('chat.meMessage', args)
  }

  public postEphemeral(
    channel: string,
    text: string,
    user: string,
    as_user = false,
    attachements: Record<string, any>[] = null,
    link_names = false,
    parse = 'none',
    thread_ts: number = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      text,
      user,
      as_user,
      attachements,
      link_names,
      parse,
      thread_ts,
      ...extraArgs
    }
    return this._post('chat.postEphemeral', args)
  }

  public postMessage(
    channel: string,
    text: string,
    as_user = false,
    attachements: Record<string, any>[] = null,
    icon_emoji: string = null,
    icon_url: boolean = null,
    link_names = false,
    mrkdwn = true,
    parse = 'none',
    reply_broadcast = true,
    thread_ts: number = null,
    unfurl_links: boolean = null,
    unfurl_media: boolean = null,
    username: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      text,
      as_user,
      attachements,
      icon_emoji,
      icon_url,
      link_names,
      mrkdwn,
      parse,
      reply_broadcast,
      thread_ts,
      unfurl_links,
      unfurl_media,
      username,
      ...extraArgs
    }
    return this._post('chat.postMessage', args)
  }

  public unfurl(
    channel: string,
    ts: number,
    unfurls: string = null,
    user_auth_required = '0',
    user_auth_url: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      ts,
      unfurls,
      user_auth_required,
      user_auth_url,
      ...extraArgs
    }
    return this._post('chat.unfurl', args)
  }

  public update(
    channel: string,
    text: string,
    ts: number,
    attachements: Record<string, any>[] = null,
    link_names = false,
    parse = 'none',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      text,
      ts,
      attachements,
      link_names,
      parse,
      ...extraArgs
    }
    return this._post('chat.update', args)
  }
}
