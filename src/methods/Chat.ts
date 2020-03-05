import BaseAPI from './BaseAPI'

export default class Chat extends BaseAPI {
  public delete_(
    channel: string,
    ts: number,
    as_user: boolean = null, // deprecated_arguments
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = { channel, ts, as_user, ...extraArgs }
    return this._post('chat.delete', args)
  }

  public deleteScheduledMessage(
    channel: string,
    scheduled_message_id: string,
    as_user: boolean = null, // deprecated_arguments
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      scheduled_message_id,
      as_user,
      ...extraArgs
    }
    return this._post('chat.deleteScheduledMessage', args)
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
    blocks: Record<string, any>[] = null,
    icon_emoji: string = null,
    icon_url: string = null,
    link_names = false,
    parse = 'none',
    thread_ts: number = null,
    username: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      text,
      user,
      blocks,
      icon_emoji,
      icon_url,
      link_names,
      parse,
      thread_ts,
      username,
      ...extraArgs
    }
    return this._post('chat.postEphemeral', args)
  }

  public postMessage(
    channel: string,
    text: string,
    as_user = null, // deprecated_arguments
    attachements: Record<string, any>[] = null,
    blocks: Record<string, any>[] = null,
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
      blocks,
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

  public scheduleMessage(
    channel: string,
    post_at: string,
    text: string,
    as_user: boolean = null, // deprecated_arguments
    attachements: Record<string, any>[] = null,
    blocks: Record<string, any>[] = null,
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
      post_at,
      text,
      as_user,
      attachements,
      blocks,
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
    return this._post('chat.scheduleMessage', args)
  }

  public unfurl(
    channel: string,
    ts: number,
    unfurls: string,
    user_auth_message: string = null,
    user_auth_required = '0',
    user_auth_url: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      ts,
      unfurls,
      user_auth_message,
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
    as_user: boolean = null, // deprecated_arguments
    blocks: Record<string, any>[] = null,
    attachements: Record<string, any>[] = null,
    link_names = false,
    parse = 'none',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      text,
      ts,
      as_user,
      blocks,
      attachements,
      link_names,
      parse,
      ...extraArgs
    }
    return this._post('chat.update', args)
  }
}
