import BaseAPI from './BaseAPI'

class CallsParticipants extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('calls.participants.add', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('calls.participants.remove', params)
  }
}

export default class Calls extends BaseAPI {
  public participants
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.participants = new CallsParticipants(token, retries_limit)
  }

  public add(params: Record<string, any> = {}) {
    return this._post('calls.add', params)
  }

  public end(params: Record<string, any> = {}) {
    return this._post('calls.end', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('calls.info', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('calls.update', params)
  }
}
