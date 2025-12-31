import BaseAPI from './BaseAPI'

export default class Chat extends BaseAPI {
  public delete_(params: Record<string, any> = {}) {
    return this._post('chat.delete', params)
  }

  public deleteScheduledMessage(params: Record<string, any> = {}) {
    return this._post('chat.deleteScheduledMessage', params)
  }

  public getPermalink(params: Record<string, any> = {}) {
    return this._get('chat.getPermalink', params)
  }

  public meMessage(params: Record<string, any> = {}) {
    return this._post('chat.meMessage', params)
  }

  public postEphemeral(params: Record<string, any> = {}) {
    return this._post('chat.postEphemeral', params)
  }

  public postMessage(params: Record<string, any> = {}) {
    return this._post('chat.postMessage', params)
  }

  public scheduleMessage(params: Record<string, any> = {}) {
    return this._post('chat.scheduleMessage', params)
  }

  public scheduledMessagesList(params: Record<string, any> = {}) {
    return this._get('chat.scheduledMessages.list', params)
  }

  public unfurl(params: Record<string, any> = {}) {
    return this._post('chat.unfurl', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('chat.update', params)
  }
}
