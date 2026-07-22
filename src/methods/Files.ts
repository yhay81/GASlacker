import BaseAPI, { SlackParams, SlackResponse } from './BaseAPI'

class FilesRemote extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('files.remote.add', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('files.remote.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('files.remote.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('files.remote.remove', params)
  }

  public share(params: SlackParams = {}) {
    return this._post('files.remote.share', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('files.remote.update', params)
  }
}

export default class Files extends BaseAPI {
  public remote
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.remote = new FilesRemote(token, retries_limit)
  }

  public delete(params: SlackParams = {}) {
    return this._post('files.delete', params)
  }

  // Backward-compatible alias
  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public info(params: SlackParams = {}) {
    return this._get('files.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('files.list', params)
  }

  public revokePublicURL(params: SlackParams = {}) {
    return this._post('files.revokePublicURL', params)
  }

  public sharedPublicURL(params: SlackParams = {}) {
    return this._post('files.sharedPublicURL', params)
  }

  // files.uploadV2 is not itself an HTTP endpoint, so this composites the official
  // 3-step flow (get upload URL -> upload -> complete) into a single method.
  // Pass a GAS Blob as file, or a string as content.
  public uploadV2(params: SlackParams = {}): SlackResponse {
    const safeParams = this._normalizeArgs(params, 'params')
    const { file, content, filename, snippet_type, alt_txt, title, ...completeArgs } = safeParams
    if (file == null && content == null) {
      throw new Error('Specify either file or content')
    }
    const blob = file != null ? file : Utilities.newBlob(String(content))
    if (typeof blob.getBytes !== 'function') {
      throw new Error('file must be a Blob')
    }
    const name = filename ?? (typeof blob.getName === 'function' ? blob.getName() : null) ?? 'file'
    // files.getUploadURLExternal rejects JSON bodies (form-encoded only; confirmed live)
    const urlRes = this._post_form('files.getUploadURLExternal', {
      filename: name,
      length: blob.getBytes().length,
      snippet_type,
      alt_txt,
    })
    if (!urlRes.ok) return urlRes
    const uploadRes = UrlFetchApp.fetch(urlRes.upload_url, {
      method: 'post',
      payload: blob,
      muteHttpExceptions: true,
    })
    if (uploadRes.getResponseCode() !== 200) {
      return { ok: false, error: 'upload_failed', raw: uploadRes.getContentText() }
    }
    return this._post('files.completeUploadExternal', {
      files: [{ id: urlRes.file_id, title: title ?? name }],
      ...completeArgs,
    })
  }

  // Form-encoded because JSON bodies are rejected (confirmed live)
  public getUploadURLExternal(params: SlackParams = {}) {
    return this._post_form('files.getUploadURLExternal', params)
  }

  public completeUploadExternal(params: SlackParams = {}) {
    return this._post('files.completeUploadExternal', params)
  }
}
