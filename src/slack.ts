import { extend, queryEncode } from './util';

const DEFAULT_RETRIES = 3;

class BaseAPI {
  protected token;
  private retries_limit;
  static API_ENDPOINT = 'https://slack.com/api/';
  constructor(token = null, retries_limit = DEFAULT_RETRIES) {
    this.token = token;
    this.retries_limit = retries_limit;
  }

  get(api, params = {}) {
    // https://github.com/requests/requests/blob/master/requests/models.py
    const url = BaseAPI.createURL(api, params);
    for (let retry = 0; retry < this.retries_limit; retry++) {
      try {
        const response = UrlFetchApp.fetch(url);
        return response;
      } catch (e) {
        throw e;
      }
    }
    throw Error('Try limit over');
  }

  post(api, data = {}) {
    const url = BaseAPI.createURL(api);
    const payload = this.token ? extend({ token: this.token }, data) : data;
    for (let retry = 0; retry < this.retries_limit; retry++) {
      try {
        const response = UrlFetchApp.fetch(url, { method: 'post', payload });
        return response;
      } catch (e) {
        throw e;
      }
    }
    throw Error('Try limit over');
  }

  static createURL(api, params = {}) {
    if (Object.keys(params).length === 0) {
      return `${BaseAPI.API_ENDPOINT}${api}`;
    } else {
      const encodedParams = queryEncode(params);
      return `${BaseAPI.API_ENDPOINT}${api}?${encodedParams}`;
    }
  }
}

class API_ extends BaseAPI {
  test(error = null, data = {}) {
    if (error !== null) data['error'] = error;
    return this.post('api.test', data);
  }
}

class Bots extends BaseAPI {
  info(bot = null, params = {}) {
    if (bot !== null) params['bot'] = bot;
    params = extend({ token: this.token }, params);
    return this.get('bots.info', params);
  }
}

export class API {
  public api;
  public bots;
  constructor(token, retries_limit = DEFAULT_RETRIES) {
    this.api = new API_(token, retries_limit);
    this.bots = new Bots(token, retries_limit);
  }
}
