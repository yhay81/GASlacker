import BaseAPI from './BaseAPI';

class FilesComments extends BaseAPI {
  public add(comment, file, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { comment, file };
    return this._post('files.comments.add', args);
  }

  public delete_(file, id, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { file, id };
    return this._post('files.comments.delete', args);
  }

  public edit(comment, file, id, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { comment, file, id };
    return this._post('files.comments.edit', args);
  }
}

export default class Files extends BaseAPI {
  public comments;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.comments = new FilesComments(token, retries_limit);
  }

  public delete_(file: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { file, ...extraArgs };
    return this._post('files.delete', args);
  }

  public info(
    file: string,
    count = 100,
    cursor: string = null,
    limit = 0,
    page = 1,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      file,
      count,
      cursor,
      limit,
      page,
      ...extraArgs
    };
    return this._get('files.info', args);
  }

  public list(
    channel: string,
    count = 100,
    page = 1,
    ts_from = 0,
    ts_to = 'now',
    types = 'all',
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
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

  public revokePublicURL(file: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { file, ...extraArgs };
    return this._post('files.revokePublicURL', args);
  }

  public sharedPublicURL(file: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { file, ...extraArgs };
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
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
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
