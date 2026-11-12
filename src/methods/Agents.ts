import BaseAPI, { SlackParams } from './BaseAPI'

class AgentsConversations extends BaseAPI {
  public archive(params: SlackParams = {}) {
    return this._post('agents.conversations.archive', params)
  }

  public create(params: SlackParams = {}) {
    return this._post('agents.conversations.create', params)
  }

  public getCanvas(params: SlackParams = {}) {
    return this._post('agents.conversations.getCanvas', params)
  }

  public listViews(params: SlackParams = {}) {
    return this._post('agents.conversations.listViews', params)
  }

  public removeView(params: SlackParams = {}) {
    return this._post('agents.conversations.removeView', params)
  }

  public setCanvasContent(params: SlackParams = {}) {
    return this._post('agents.conversations.setCanvasContent', params)
  }

  public setCommands(params: SlackParams = {}) {
    return this._post('agents.conversations.setCommands', params)
  }

  public setProperties(params: SlackParams = {}) {
    return this._post('agents.conversations.setProperties', params)
  }

  public setView(params: SlackParams = {}) {
    return this._post('agents.conversations.setView', params)
  }
}

class AgentsSessions extends BaseAPI {
  public rename(params: SlackParams = {}) {
    return this._post('agents.sessions.rename', params)
  }

  public setStatus(params: SlackParams = {}) {
    return this._post('agents.sessions.setStatus', params)
  }
}

export default class Agents extends BaseAPI {
  public conversations
  public sessions
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.conversations = new AgentsConversations(token, retries_limit)
    this.sessions = new AgentsSessions(token, retries_limit)
  }
}
