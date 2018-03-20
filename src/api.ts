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
    params = extend({ token: this.token }, params);
    const encodedParams = queryEncode(params);
    const url = `${BaseAPI.API_ENDPOINT}${api}?${encodedParams}`;
    return this.fetch(url);
  }

  post(api, data = {}) {
    const url = `${BaseAPI.API_ENDPOINT}${api}`;
    const payload = this.token ? extend({ token: this.token }, data) : data;
    return this.fetch(url, { method: 'post', payload });
  }

  fetch(url, options = null) {
    let response = null;
    for (let retry = 0; retry < this.retries_limit; retry++) {
      try {
        if (options === null) {
          response = UrlFetchApp.fetch(url);
        } else {
          response = UrlFetchApp.fetch(url, options);
        }
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

class API extends BaseAPI {
  test(error = null, data = {}) {
    if (error !== null) data['error'] = error;
    return this.post('api.test', data);
  }
}

class AppsPermissions extends BaseAPI {
  info() {
    return this.get('apps.permissions.info');
  }

  request(scopes: Array<string>, trigger_id) {
    const params = { scopes: scopes.join(','), trigger_id };
    return this.get('apps.permissions.request', params);
  }
}

class Apps extends BaseAPI {
  public permissions;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.permissions = new AppsPermissions(token, retries_limit);
  }
}

export class Methods {
  public api;
  public apps;
  public auth;
  public bots;
  public channels;
  public chat;
  public conversations;
  public dialog;
  public dnd;
  public emoji;
  public files;
  public im;
  public migration;
  public mpim;
  public oauth;
  public pins;
  public reactions;
  public reminders;
  public rtm;
  public search;
  public stars;
  public team;
  public usergroups;
  public users;

  constructor(token, retries_limit = DEFAULT_RETRIES) {
    this.api = new API(token, retries_limit);
    this.apps = new Apps(token, retries_limit);
    // this.auth = new Auth(token, retries_limit);
    this.bots = new Bots(token, retries_limit);
    // this.channels = new Channels(token, retries_limit);
    // this.chat = new Chat(token, retries_limit);
    // this.conversations = new Conversations(token, retries_limit);
    // this.dialog = new Dialog(token, retries_limit);
    // this.dnd = new DND(token, retries_limit);
    // this.emoji = new Emoji(token, retries_limit);
    // this.files = new Files(token, retries_limit);
    // this.groups = new Groups(token, retries_limit);
    // this.im = new IM(token, retries_limit);
    // this.migration = new Migration(token, retries_limit);
    // this.mpim = new MPIM(token, retries_limit);
    // this.oauth = new OAuth(token, retries_limit);
    // this.pins = new Pins(token, retries_limit);
    // this.reactions = new Reactions(token, retries_limit);
    // this.reminders = new Reminders(token, retries_limit);
    // this.rtm = new RTM(token, retries_limit);
    // this.search = new Search(token, retries_limit);
    // this.stars = new Stars(token, retries_limit);
    // this.team = new Team(token, retries_limit);
    // this.usergroups = new UserGroups(token, retries_limit);
    // this.users = new Users(token, retries_limit);

    // this.presence = new Presence(token, retries_limit);
    // this.idpgroups = new IDPGroups(token, retries_limit);
    // this.incomingwebhook = new IncomingWebhook(url);
  }
}
