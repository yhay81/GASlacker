import BaseAPI from './BaseAPI';

export default class Stars extends BaseAPI {
  public add(
    channel: string = null,
    file: string = null,
    file_comment: string = null,
    timestamp: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      file,
      file_comment,
      timestamp,
      ...extraArgs
    };
    return this._post('stars.add', args);
  }

  public list(
    count: number = 100,
    cursor: string = null,
    limit: number = null,
    page: number = 1,
    extraArgs: Object = {}
  ) {
    const args: Object = { count, cursor, limit, page, ...extraArgs };
    return this._post('stars.list', args);
  }

  public remove(
    channel: string = null,
    file: string = null,
    file_comment: string = null,
    timestamp: string = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
      channel,
      file,
      file_comment,
      timestamp,
      ...extraArgs
    };
    return this._post('stars.remove', args);
  }
}
