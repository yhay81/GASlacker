import BaseAPI from './BaseAPI'

class FilesComments extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('files.comments.add', params)
  }

  public delete_(params: Record<string, any> = {}) {
    return this._post('files.comments.delete', params)
  }

  public edit(params: Record<string, any> = {}) {
    return this._post('files.comments.edit', params)
  }
}

class FilesRemote extends BaseAPI {
  public add(params: Record<string, any> = {}) {
    return this._post('files.remote.add', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('files.remote.info', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('files.remote.list', params)
  }

  public remove(params: Record<string, any> = {}) {
    return this._post('files.remote.remove', params)
  }

  public share(params: Record<string, any> = {}) {
    return this._post('files.remote.share', params)
  }

  public update(params: Record<string, any> = {}) {
    return this._post('files.remote.update', params)
  }
}

export default class Files extends BaseAPI {
  public comments
  public remote
  constructor(token, retries_limit) {
    super(token, retries_limit)
    this.comments = new FilesComments(token, retries_limit)
    this.remote = new FilesRemote(token, retries_limit)
  }

  public delete_(params: Record<string, any> = {}) {
    return this._post('files.delete', params)
  }

  public info(params: Record<string, any> = {}) {
    return this._get('files.info', params)
  }

  public list(params: Record<string, any> = {}) {
    return this._get('files.list', params)
  }

  public revokePublicURL(params: Record<string, any> = {}) {
    return this._post('files.revokePublicURL', params)
  }

  public sharedPublicURL(params: Record<string, any> = {}) {
    return this._post('files.sharedPublicURL', params)
  }

  public uploadV2(params: Record<string, any> = {}) {
    const safeParams = this._normalizeArgs(params, 'params')
    const { file, content, ...args } = safeParams
    return this._post_file('files.uploadV2', { file, content }, args)
  }

  public getUploadURLExternal(params: Record<string, any> = {}) {
    return this._post('files.getUploadURLExternal', params)
  }

  public completeUploadExternal(params: Record<string, any> = {}) {
    return this._post('files.completeUploadExternal', params)
  }
}
