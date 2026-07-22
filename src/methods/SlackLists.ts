import BaseAPI, { SlackParams } from './BaseAPI'

class SlackListsAccess extends BaseAPI {
  public delete(params: SlackParams = {}) {
    return this._post('slackLists.access.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public set(params: SlackParams = {}) {
    return this._post('slackLists.access.set', params)
  }
}

class SlackListsDownload extends BaseAPI {
  public get(params: SlackParams = {}) {
    return this._get('slackLists.download.get', params)
  }

  public start(params: SlackParams = {}) {
    return this._post('slackLists.download.start', params)
  }
}

class SlackListsItems extends BaseAPI {
  public create(params: SlackParams = {}) {
    return this._post('slackLists.items.create', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('slackLists.items.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public deleteMultiple(params: SlackParams = {}) {
    return this._post('slackLists.items.deleteMultiple', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('slackLists.items.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('slackLists.items.list', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('slackLists.items.update', params)
  }
}

export default class SlackLists extends BaseAPI {
  public access
  public download
  public items
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.access = new SlackListsAccess(token, retries_limit)
    this.download = new SlackListsDownload(token, retries_limit)
    this.items = new SlackListsItems(token, retries_limit)
  }

  public create(params: SlackParams = {}) {
    return this._post('slackLists.create', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('slackLists.update', params)
  }
}
