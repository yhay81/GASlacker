import BaseAPI from './BaseAPI'

export default class Conversations extends BaseAPI {
  public archive(params: Record<string, any> = {}) {
    return this._post('conversations.archive', params)
  }

  public close(params: Record<string, any> = {}) {
    return this._post('conversations.close', params)
  }

  public create(params: Record<string, any> = {}) {
    return this._post('conversations.create', params)
  }

  public history(params: Record<string, any> = {}) {
    return this._get('conversations.history', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('conversations.info', params)
  }

  public invite(params: Record<string, any> = {}) {
    return this._post('conversations.invite', params)
  }

  public join(params: Record<string, any> = {}) {
    return this._post('conversations.join', params)
  }

  public kick(params: Record<string, any> = {}) {
    return this._post('conversations.kick', params)
  }

  public leave(params: Record<string, any> = {}) {
    return this._post('conversations.leave', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('conversations.list', params)
  }

  public mark(params: Record<string, any> = {}) {
    return this._post('conversations.mark', params)
  }

  public members(params: Record<string, any> = {}) {
    return this._get('conversations.members', params)
  }

  public open(params: Record<string, any> = {}) {
    return this._post('conversations.open', params)
  }

  public rename(params: Record<string, any> = {}) {
    return this._post('conversations.rename', params)
  }

  public replies(params: Record<string, any> = {}) {
    return this._get('conversations.replies', params)
  }

  public setPurpose(params: Record<string, any> = {}) {
    return this._post('conversations.setPurpose', params)
  }

  public setTopic(params: Record<string, any> = {}) {
    return this._post('conversations.setTopic', params)
  }

  public unarchive(params: Record<string, any> = {}) {
    return this._post('conversations.unarchive', params)
  }
}
