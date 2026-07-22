import BaseAPI, { SlackParams } from './BaseAPI'

class ChatScheduledMessages extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('chat.scheduledMessages.list', params)
  }
}

export default class Chat extends BaseAPI {
  public scheduledMessages
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.scheduledMessages = new ChatScheduledMessages(token, retries_limit)
  }

  // Streaming posts for AI assistant apps
  public appendStream(params: SlackParams = {}) {
    return this._post('chat.appendStream', params)
  }

  public startStream(params: SlackParams = {}) {
    return this._post('chat.startStream', params)
  }

  public stopStream(params: SlackParams = {}) {
    return this._post('chat.stopStream', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('chat.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public deleteScheduledMessage(params: SlackParams = {}) {
    return this._post('chat.deleteScheduledMessage', params)
  }

  public getPermalink(params: SlackParams = {}) {
    return this._get('chat.getPermalink', params)
  }

  public meMessage(params: SlackParams = {}) {
    return this._post('chat.meMessage', params)
  }

  public postEphemeral(params: SlackParams = {}) {
    return this._post('chat.postEphemeral', params)
  }

  public postMessage(params: SlackParams = {}) {
    return this._post('chat.postMessage', params)
  }

  public scheduleMessage(params: SlackParams = {}) {
    return this._post('chat.scheduleMessage', params)
  }

  // Backward-compatible alias
  public scheduledMessagesList(params: SlackParams = {}) {
    return this.scheduledMessages.list(params)
  }

  public unfurl(params: SlackParams = {}) {
    return this._post('chat.unfurl', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('chat.update', params)
  }
}
