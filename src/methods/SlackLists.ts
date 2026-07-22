import BaseAPI from './BaseAPI'

class SlackListsAccess extends BaseAPI {
  public delete(params: Record<string, any> = {}) {
    return this._post('slackLists.access.delete', params)
  }

  // 後方互換エイリアス
  public delete_(params: Record<string, any> = {}) {
    return this.delete(params)
  }

  public set(params: Record<string, any> = {}) {
    return this._post('slackLists.access.set', params)
  }
}

class SlackListsDownload extends BaseAPI {
  public get(params: Record<string, any> = {}) {
    return this._get('slackLists.download.get', params)
  }

  public start(params: Record<string, any> = {}) {
    return this._post('slackLists.download.start', params)
  }
}

class SlackListsItems extends BaseAPI {
  public create(params: Record<string, any> = {}) {
    return this._post('slackLists.items.create', params)
  }

  public delete(params: Record<string, any> = {}) {
    return this._post('slackLists.items.delete', params)
  }

  // 後方互換エイリアス
  public delete_(params: Record<string, any> = {}) {
    return this.delete(params)
  }

  public deleteMultiple(params: Record<string, any> = {}) {
    return this._post('slackLists.items.deleteMultiple', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('slackLists.items.info', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('slackLists.items.list', params)
  }

  public update(params: Record<string, any> = {}) {
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

  public create(params: Record<string, any> = {}) {
    return this._post('slackLists.create', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('slackLists.update', params)
  }
}
