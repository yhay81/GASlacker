import BaseAPI, { SlackParams } from './BaseAPI'

class AssistantThreads extends BaseAPI {
  public setStatus(params: SlackParams = {}) {
    return this._post('assistant.threads.setStatus', params)
  }

  public setSuggestedPrompts(params: SlackParams = {}) {
    return this._post('assistant.threads.setSuggestedPrompts', params)
  }

  public setTitle(params: SlackParams = {}) {
    return this._post('assistant.threads.setTitle', params)
  }
}

export default class Assistant extends BaseAPI {
  public threads
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.threads = new AssistantThreads(token, retries_limit)
  }
}
