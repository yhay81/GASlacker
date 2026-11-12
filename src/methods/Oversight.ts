import BaseAPI, { type SlackParams } from './BaseAPI'

export default class Oversight extends BaseAPI {
  public chat = {
    delete: (params: SlackParams = {}) => this._post_form('oversight.chat.delete', params),
    delete_: (params: SlackParams = {}) => this.chat.delete(params),
    info: (params: SlackParams = {}) => this._post_form('oversight.chat.info', params),
    restore: (params: SlackParams = {}) => this._post_form('oversight.chat.restore', params),
    tombstone: (params: SlackParams = {}) => this._post_form('oversight.chat.tombstone', params),
    update: (params: SlackParams = {}) => this._post_form('oversight.chat.update', params),
  }

  public conversations = {
    info: (params: SlackParams = {}) => this._post_form('oversight.conversations.info', params),
    list: (params: SlackParams = {}) => this._post_form('oversight.conversations.list', params),
    members: (params: SlackParams = {}) =>
      this._post_form('oversight.conversations.members', params),
  }

  public enterprise = {
    info: (params: SlackParams = {}) => this._post_form('oversight.enterprise.info', params),
  }

  public user = {
    conversations: (params: SlackParams = {}) =>
      this._post_form('oversight.user.conversations', params),
    info: (params: SlackParams = {}) => this._post_form('oversight.user.info', params),
  }

  public users = {
    list: (params: SlackParams = {}) => this._post_form('oversight.users.list', params),
  }
}
