import BaseAPI from './BaseAPI';

class FilesComments extends BaseAPI {
  public add(comment, file, extraArgs: Object = {}) {
    const args: Object = { comment, file };
    return this._post('files.comments.add', args);
  }

  public delete_(file, id, extraArgs: Object = {}) {
    const args: Object = { file, id };
    return this._post('files.comments.delete', args);
  }

  public edit(comment, file, id, extraArgs: Object = {}) {
    const args: Object = { comment, file, id };
    return this._post('files.comments.edit', args);
  }
}

export default class Files extends BaseAPI {
  public comments;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.comments = new FilesComments(token, retries_limit);
  }

  public delete_(file: string, extraArgs: Object = {}) {
    const args: Object = { file, ...extraArgs };
    return this._post('files.delete', args);
  }

  public info(
    file: string,
    count: number = 100,
    cursor: string = null,
    limit: number = 0,
    page: number = 1,
    extraArgs: Object = {}
  ) {
    const args: Object = { file, count, cursor, limit, page, ...extraArgs };
    return this._get('files.info', args);
  }

  public list(
    channel: string,
    count: number = 100,
    page: number = 1,
    ts_from: number = 0,
    ts_to: string = 'now',
    types: string = 'all',
    user: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      count,
      page,
      ts_from,
      ts_to,
      types,
      user,
      ...extraArgs
    };
    return this._get('files.list', args);
  }

  public revokePublicURL(file: string, extraArgs: Object = {}) {
    const args: Object = { file, ...extraArgs };
    return this._post('files.revokePublicURL', args);
  }

  public sharedPublicURL(file: string, extraArgs: Object = {}) {
    const args: Object = { file, ...extraArgs };
    return this._post('files.sharedPublicURL', args);
  }

  public upload(
    channel: string,
    content: Blob = null,
    file: Blob = null,
    filename: string = null,
    filetype: string = null,
    initial_comment: string = null,
    thread_ts: number = null,
    title: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      filename,
      filetype,
      initial_comment,
      thread_ts,
      title,
      ...extraArgs
    };
    return this._post_file('files.upload', { content, file }, args);
  }
}
