import BaseAPI from './BaseAPI'

export default class Pins extends BaseAPI {
  public add(
    channel: string,
    file: string,
    file_comment: string,
    timestamp: number,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      file,
      file_comment,
      timestamp,
      ...extraArgs
    }
    return this._post('pins.add', args)
  }

  public list(channel: string, extraArgs: Record<string, any> = {}) {
    const args: Record<string, any> = { channel, ...extraArgs }
    return this._post('pins.add', args)
  }

  public remove(
    channel: string,
    file: string,
    file_comment: string,
    timestamp: number,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      channel,
      file,
      file_comment,
      timestamp,
      ...extraArgs
    }
    return this._post('pins.remove', args)
  }
}
