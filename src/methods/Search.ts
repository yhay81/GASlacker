import BaseAPI from './BaseAPI'

export default class Search extends BaseAPI {
  public all(
    query: string,
    count = 20,
    highlight: boolean = null,
    page = 1,
    sort = 'score',
    sort_dir = 'desc',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    }
    return this._get('search.add', args)
  }

  public files(
    query: string,
    count = 20,
    highlight: boolean = null,
    page = 1,
    sort = 'score',
    sort_dir = 'desc',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    }
    return this._get('search.files', args)
  }

  public messages(
    query: string,
    count = 20,
    highlight: boolean = null,
    page = 1,
    sort = 'score',
    sort_dir = 'desc',
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    }
    return this._get('search.messages', args)
  }
}
