import { queryEncode, createPayload } from '../util';
import { DEFAULT_RETRIES } from '../config';

export default class BaseAPI {
  static API_ENDPOINT = 'https://slack.com/api/';
  constructor(protected _token: string = null, private _retries_limit: number = DEFAULT_RETRIES) {}

  protected _get(api: string, args: Object = {}): any {
    // https://github.com/requests/requests/blob/master/requests/models.py
    const encodedArgs: string = queryEncode({ token: this._token, ...args });
    const url: string = `${BaseAPI.API_ENDPOINT}${api}?${encodedArgs}`;
    const params: Object = {
      method: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    return this._fetch(url, params);
  }

  protected _post(api: string, args: Object = {}): any {
    const payload: Object = createPayload({ ...args });
    const url: string = `${BaseAPI.API_ENDPOINT}${api}`;
    const params: Object = {
      headers: { Authorization: this._token },
      method: 'post',
      contentType: 'application/json; charset=UTF-8',
      payload: JSON.stringify(payload)
    };
    return this._fetch(url, params);
  }

  protected _post_file(api: string, file_args: Object, args: Object = {}): any {
    const payload: Object = createPayload({ ...args });
    const url: string = `${BaseAPI.API_ENDPOINT}${api}?`;
    const params: Object = {
      headers: { Authorization: this._token },
      method: 'post',
      contentType: 'multipart/form-data; charset=UTF-8',
      payload: { ...file_args, ...payload }
    };
    return this._fetch(url, params);
  }

  protected _fetch(url: string, params: Object = null, headers: Object = null): any {
    let response: any = null;
    for (let retry: number = 0; retry < this._retries_limit; retry++) {
      try {
        response = UrlFetchApp.fetch(url, params);
      } catch (e) {
        throw e;
      }
      // handle HTTP 429 as documented at
      // https://api.slack.com/docs/rate-limits
      if (response.getResponseCode() === 429) {
        Utilities.sleep(parseInt(response.getHeaders()['retry-after']));
        continue;
      }
      return response;
    }
    throw Error('Try limit over');
  }
}
