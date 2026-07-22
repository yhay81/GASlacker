import BaseAPI, { SlackParams } from './BaseAPI'

class CanvasesAccess extends BaseAPI {
  public set(params: SlackParams = {}) {
    return this._post('canvases.access.set', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('canvases.access.delete', params)
  }

  // 後方互換エイリアス
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }
}

class CanvasesSections extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('canvases.sections.lookup', params)
  }
}

export default class Canvases extends BaseAPI {
  public access
  public sections
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.access = new CanvasesAccess(token, retries_limit)
    this.sections = new CanvasesSections(token, retries_limit)
  }

  public create(params: SlackParams = {}) {
    return this._post('canvases.create', params)
  }

  public edit(params: SlackParams = {}) {
    return this._post('canvases.edit', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('canvases.delete', params)
  }

  // 後方互換エイリアス
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }
}
