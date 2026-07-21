import BaseAPI from './BaseAPI'

class AssistantThreads extends BaseAPI {
  public setStatus(params: Record<string, any> = {}) {
    return this._post('assistant.threads.setStatus', params)
  }

  public setSuggestedPrompts(params: Record<string, any> = {}) {
    return this._post('assistant.threads.setSuggestedPrompts', params)
  }

  public setTitle(params: Record<string, any> = {}) {
    return this._post('assistant.threads.setTitle', params)
  }
}

export default class Assistant extends BaseAPI {
  public threads
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
    this.threads = new AssistantThreads(token, retries_limit)
  }
}
