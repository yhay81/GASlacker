import BaseAPI, { SlackResponse } from './BaseAPI'

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
  public remote
  constructor(token: string, retries_limit?: number) {
    super(token, retries_limit)
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

  // files.uploadV2 という HTTP エンドポイントは存在しないため、公式推奨の
  // 3 ステップ(URL 取得 → アップロード → 完了通知)を 1 メソッドにまとめている。
  // file には GAS の Blob、content には文字列を指定する。
  public uploadV2(params: Record<string, any> = {}): SlackResponse {
    const safeParams = this._normalizeArgs(params, 'params')
    const { file, content, filename, snippet_type, alt_txt, title, ...completeArgs } = safeParams
    if (file == null && content == null) {
      throw new Error('file または content を指定してください')
    }
    const blob = file != null ? file : Utilities.newBlob(String(content))
    if (typeof blob.getBytes !== 'function') {
      throw new Error('file には Blob を指定してください')
    }
    const name = filename ?? (typeof blob.getName === 'function' ? blob.getName() : null) ?? 'file'
    // files.getUploadURLExternal は JSON ボディを受け付けない(フォーム送信のみ。実測で確認)
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

  // JSON ボディ非対応のためフォーム送信(実測で確認)
  public getUploadURLExternal(params: Record<string, any> = {}) {
    return this._post_form('files.getUploadURLExternal', params)
  }

  public completeUploadExternal(params: Record<string, any> = {}) {
    return this._post('files.completeUploadExternal', params)
  }
}
