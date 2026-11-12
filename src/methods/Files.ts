import BaseAPI, { SlackParams, SlackResponse } from './BaseAPI'

class FilesRemote extends BaseAPI {
  public add(params: SlackParams = {}) {
    const { preview_image, indexable_file_contents, ...fields } = this._normalizeArgs(
      params,
      'params',
    )
    return this._post_file('files.remote.add', { preview_image, indexable_file_contents }, fields)
  }

  public info(params: SlackParams = {}) {
    return this._get('files.remote.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('files.remote.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post_form('files.remote.remove', params)
  }

  public share(params: SlackParams = {}) {
    return this._get('files.remote.share', params)
  }

  public update(params: SlackParams = {}) {
    const { preview_image, indexable_file_contents, ...fields } = this._normalizeArgs(
      params,
      'params',
    )
    return this._post_file(
      'files.remote.update',
      { preview_image, indexable_file_contents },
      fields,
    )
  }
}

export default class Files extends BaseAPI {
  public comments = {
    delete: (params: SlackParams = {}) => this._post('files.comments.delete', params),
    delete_: (params: SlackParams = {}) => this.comments.delete(params),
    get: (params: SlackParams = {}) => this._get('files.comments.get', params),
  }

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
    const {
      file,
      content,
      filename,
      snippet_type,
      alt_txt,
      title,
      highlight_type,
      ...completeArgs
    } = safeParams
    if (file == null && content == null) {
      throw new Error('Specify either file or content')
    }
    const blob = file != null ? file : Utilities.newBlob(String(content))
    if (typeof blob.getBytes !== 'function') {
      throw new Error('file must be a Blob')
    }
    const name = filename ?? (typeof blob.getName === 'function' ? blob.getName() : null) ?? 'file'
    const urlRes = this.getUploadURLExternal({
      filename: name,
      length: blob.getBytes().length,
      snippet_type,
      alt_txt,
    })
    if (!urlRes.ok) return urlRes
    if (!urlRes.upload_url || !urlRes.file_id) return { ok: false, error: 'invalid_response' }
    const uploadRes = this._fetch(
      urlRes.upload_url,
      { method: 'post', payload: blob },
      (response) =>
        response.getResponseCode() === 200
          ? { ok: true }
          : { ok: false, error: 'upload_failed', raw: response.getContentText() },
    )
    if (!uploadRes.ok) return uploadRes
    return this.completeUploadExternal({
      ...completeArgs,
      files: [{ id: urlRes.file_id, title: title ?? name, highlight_type }],
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
