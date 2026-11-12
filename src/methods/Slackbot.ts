import BaseAPI, { SlackParams } from './BaseAPI'

export default class Slackbot extends BaseAPI {
  public skills = {
    create: (params: SlackParams = {}) => this._post('slackbot.skills.create', params),
    delete: (params: SlackParams = {}) => this._post('slackbot.skills.delete', params),
    delete_: (params: SlackParams = {}) => this.skills.delete(params),
    info: (params: SlackParams = {}) => this._post('slackbot.skills.info', params),
    library: {
      add: (params: SlackParams = {}) => this._post('slackbot.skills.library.add', params),
      remove: (params: SlackParams = {}) => this._post('slackbot.skills.library.remove', params),
    },
    list: (params: SlackParams = {}) => this._post('slackbot.skills.list', params),
    update: (params: SlackParams = {}) => this._post('slackbot.skills.update', params),
  }
}
