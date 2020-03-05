import BaseAPI from './BaseAPI'

export default class Reactions extends BaseAPI {
  public add(
    name: string,
    file: string,
    channel: string,
    channel_comment: string,
    timestamp: number,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      name,
      file,
      channel,
      channel_comment,
      timestamp,
      ...extraArgs
    }
    return this._post('reactions.add', args)
  }

  public get(
    channel: string = null,
    file: string = null,
    file_comment: string = null,
    full: boolean = null,
    timestamp: number = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      file,
      file_comment,
      full,
      timestamp,
      ...extraArgs
    }
    return this._get('reactions.get', args)
  }

  public list(
    count: number,
    cursor: string = null,
    full: boolean = null,
    limit = 0,
    page = 1,
    user: string = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      count,
      cursor,
      full,
      limit,
      page,
      user,
      ...extraArgs
    }
    return this._get('reactions.list', args)
  }

  public remove(
    name: string = null,
    channel: string = null,
    file: string = null,
    file_comment: string = null,
    timestamp: number = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      name,
      channel,
      file,
      file_comment,
      timestamp,
      ...extraArgs
    }
    return this._post('reactions.remove', args)
  }
}
