import BaseAPI from './BaseAPI';

export default class Search extends BaseAPI {
  public all(
    query: string,
    count: number = 20,
    highlight: boolean = null,
    page: number = 1,
    sort: string = 'score',
    sort_dir: string = 'desc',
    extraArgs: Object = {}
  ) {
    const args: Object = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    };
    return this._get('search.add', args);
  }

  public files(
    query: string,
    count: number = 20,
    highlight: boolean = null,
    page: number = 1,
    sort: string = 'score',
    sort_dir: string = 'desc',
    extraArgs: Object = {}
  ) {
    const args: Object = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    };
    return this._get('search.files', args);
  }

  public messages(
    query: string,
    count: number = 20,
    highlight: boolean = null,
    page: number = 1,
    sort: string = 'score',
    sort_dir: string = 'desc',
    extraArgs: Object = {}
  ) {
    const args: Object = {
      query,
      count,
      highlight,
      page,
      sort,
      sort_dir,
      ...extraArgs
    };
    return this._get('search.messages', args);
  }
}
