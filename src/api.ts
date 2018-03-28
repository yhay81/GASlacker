import { extend, queryEncode } from './util';

const DEFAULT_RETRIES = 3;

class BaseAPI {
  protected _token;
  private _retries_limit;
  static API_ENDPOINT = 'https://slack.com/api/';
  constructor(token = null, retries_limit = DEFAULT_RETRIES) {
    this._token = token;
    this._retries_limit = retries_limit;
  }

  _get(api, params = {}) {
    // https://github.com/requests/requests/blob/master/requests/models.py
    params = extend({ token: this._token }, params);
    const encodedParams = queryEncode(params);
    const url = `${BaseAPI.API_ENDPOINT}${api}?${encodedParams}`;
    return this._fetch(url);
  }

  _post(api, data = {}) {
    const url = `${BaseAPI.API_ENDPOINT}${api}`;
    const payload = extend({ token: this._token }, data);
    for (let key in payload) {
      if (payload[key] == null) delete payload[key];
      if (Array.isArray(payload[key])) payload[key] = payload[key].join(',');
    }
    return this._fetch(url, { method: 'post', payload });
  }

  _fetch(url, options = null) {
    let response = null;
    for (let retry = 0; retry < this._retries_limit; retry++) {
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
    data = extend({ error }, data);
    return this._post('api.test', data);
  }
}

class AppsPermissions extends BaseAPI {
  info() {
    return this._get('apps.permissions.info');
  }

  request(scopes: Array<string>, trigger_id) {
    const params = { scopes: scopes.join(','), trigger_id };
    return this._get('apps.permissions.request', params);
  }
}

class Apps extends BaseAPI {
  public permissions;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.permissions = new AppsPermissions(token, retries_limit);
  }
}

class Auth extends BaseAPI {
  revoke(test = null) {
    const params = { test };
    return this._get('auth.revoke', params);
  }

  test() {
    return this._post('auth.test');
  }
}

class Bots extends BaseAPI {
  info(options = {}) {
    const params = options;
    return this._get('bots.info', params);
  }
}

class Channels extends BaseAPI {
  archive(channel: string) {
    const data = { channel };
    return this._post('channels.archive', data);
  }

  create(name: string, validate: boolean) {
    const params = { name, validate };
    return this._get('channels.create', params);
  }

  history(channel: string, options = {}) {
    const params = extend({ channel }, options);
    return this._get('channels.history', params);
  }

  info(channel, options = {}) {
    const params = extend({ channel }, options);
    return this._get('channels.info', params);
  }

  invite(channel, user) {
    const data = { channel, user };
    return this._post('channels.invite', data);
  }

  join(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('channels.join', data);
  }

  kick(channel, user) {
    const data = { channel, user };
    return this._post('channels.kick', data);
  }

  leave(channel) {
    const data = { channel };
    return this._post('channels.leave', data);
  }

  list(options = {}) {
    const params = options;
    return this._get('channels.list', params);
  }

  mark(channel, ts) {
    const data = { channel, ts };
    return this._post('channels.mark', data);
  }

  rename(channel, name, options = {}) {
    const params = extend({ channel, name }, options);
    return this._get('channels.rename');
  }

  replies(channel, thread_ts) {
    const params = { channel, thread_ts };
    return this._get('channels.replies', params);
  }

  setPurpose(channel, purpose) {
    const data = { channel, purpose };
    return this._post('channels.setPurpose', data);
  }

  setTopic(channel, topic) {
    const data = { channel, topic };
    return this._post('channels.setTopic', data);
  }

  unarchive(channel) {
    const data = { channel };
    return this._post('channels.unarchive', data);
  }
}

class Chat extends BaseAPI {
  delete_(channel, ts, options = {}) {
    const data = extend({ channel, ts }, options);
    return this._post('chat.delete', data);
  }

  getPermalink(channel, massage_ts) {
    const params = { name, massage_ts };
    return this._get('chat.getPermalink', params);
  }

  meMessage(channel, text) {
    const data = { channel, text };
    return this._post('chat.meMessage', data);
  }

  postEphemeral(channel, text, user, options = {}) {
    const data = extend({ channel, text, user }, options);
    return this._post('chat.postEphemeral', data);
  }

  postMessage(channel, text, options = {}) {
    const data = extend({ channel, text }, options);
    return this._post('chat.postMessage', data);
  }

  unfurl(channel, ts, unfurls, options = {}) {
    const data = extend({ channel, ts, unfurls }, options);
    return this._post('chat.unfurl', data);
  }

  update(channel, text, ts, options = {}) {
    const data = extend({ channel, text, ts }, options);
    return this._post('chat.update', data);
  }
}

class Conversations extends BaseAPI {
  archive(channel: string) {
    const data = { channel };
    return this._post('conversations.archive', data);
  }

  close(channel) {
    const params = { channel };
    return this._get('conversations.close', params);
  }

  create(name, options = {}) {
    const params = extend({ name }, options);
    return this._get('conversations.create', params);
  }

  history(channel: string, options = {}) {
    const params = extend({ channel }, options);
    return this._get('conversations.history', params);
  }

  info(channel, options = {}) {
    const params = extend({ channel }, options);
    return this._get('conversations.info', params);
  }

  invite(channel, user) {
    const data = { channel, user };
    return this._post('conversations.invite', data);
  }

  join(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('conversations.join', data);
  }

  kick(channel, user) {
    const data = { channel, user };
    return this._post('conversations.kick', data);
  }

  leave(channel) {
    const data = { channel };
    return this._post('conversations.leave', data);
  }

  list(options = {}) {
    const params = options;
    return this._get('conversations.list', params);
  }

  member(channel, options = {}) {
    const data = extend({ channel }, options);
    return this._post('conversations.member', data);
  }

  open(options = {}) {
    const data = options;
    return this._post('conversations.open', data);
  }

  rename(channel, name, options = {}) {
    const data = extend({ channel, name }, options);
    return this._post('conversations.rename', data);
  }

  replies(channel, thread_ts, options = {}) {
    const params = extend({ channel, thread_ts }, options);
    return this._get('conversations.replies', params);
  }

  setPurpose(channel, purpose) {
    const data = { channel, purpose };
    return this._post('conversations.setPurpose', data);
  }

  setTopic(channel, topic) {
    const data = { channel, topic };
    return this._post('conversations.setTopic', data);
  }

  unarchive(channel) {
    const data = { channel };
    return this._post('conversations.unarchive', data);
  }
}

class Dialog extends BaseAPI {
  open(dialog, trigger_id) {
    const data = { dialog, trigger_id };
    return this._post('conversations.unarchive', data);
  }
}

class DND extends BaseAPI {
  endDnd() {
    return this._post('dnd.endDnd');
  }

  endSnooze() {
    return this._post('dnd.endSnooze');
  }

  info(user) {
    const params = { user };
    return this._get('dnd.info', params);
  }

  setSnooze(num_minutes) {
    const params = { num_minutes };
    return this._get('dnd.setSnooze', params);
  }

  teamInfo(options = {}) {
    const params = options;
    return this._get('dnd.teamInfo', params);
  }
}

class Emoji extends BaseAPI {
  list() {
    return this._get('emoji.list');
  }
}

class FilesComments extends BaseAPI {
  add(comment, file) {
    const data = { comment, file };
    return this._post('files.comments.add', data);
  }

  delete_(file, id) {
    const data = { file, id };
    return this._post('files.comments.delete', data);
  }

  edit(comment, file, id) {
    const data = { comment, file, id };
    return this._post('files.comments.edit', data);
  }
}

class Files extends BaseAPI {
  public comments;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.comments = new FilesComments(token, retries_limit);
  }

  delete_(file) {
    const data = { file };
    return this._post('files.delete', data);
  }

  info(file, options = {}) {
    const params = extend({ file }, options);
    return this._get('files.info', params);
  }

  list(channel, options = {}) {
    const params = extend({ channel }, options);
    return this._get('files.list', params);
  }

  revokePublicURL(file) {
    const data = { file };
    return this._post('files.revokePublicURL', data);
  }

  sharedPublicURL(file) {
    const data = { file };
    return this._post('files.sharedPublicURL', data);
  }

  upload(options = {}) {
    const data = options;
    return this._post('files.upload', data);
  }
}

class Groups extends BaseAPI {
  archive(channel: string) {
    const data = { channel };
    return this._post('groups.archive', data);
  }

  create(name: string, validate: boolean) {
    const params = { name, validate };
    return this._get('groups.create', params);
  }

  createChild(channel) {
    const params = { channel };
    return this._get('groups.createChild', params);
  }

  history(channel: string, options = {}) {
    const params = extend({ channel }, options);
    return this._get('groups.history', params);
  }

  info(channel, options = {}) {
    const params = extend({ channel }, options);
    return this._get('groups.info', params);
  }

  invite(channel, user) {
    const data = { channel, user };
    return this._post('groups.invite', data);
  }

  join(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('groups.join', data);
  }

  kick(channel, user) {
    const data = { channel, user };
    return this._post('groups.kick', data);
  }

  leave(channel) {
    const data = { channel };
    return this._post('groups.leave', data);
  }

  list(options = {}) {
    const params = options;
    return this._get('groups.list', params);
  }

  mark(channel, ts) {
    const data = { channel, ts };
    return this._post('groups.mark', data);
  }

  open(channel) {
    const data = { channel };
    return this._post('groups.mark', data);
  }

  rename(channel, name, options = {}) {
    const params = extend({ channel }, options);
    return this._get('groups.rename');
  }

  replies(channel, thread_ts) {
    const params = { channel, thread_ts };
    return this._get('groups.replies', params);
  }

  setPurpose(channel, purpose) {
    const data = { channel, purpose };
    return this._post('groups.setPurpose', data);
  }

  setTopic(channel, topic) {
    const data = { channel, topic };
    return this._post('groups.setTopic', data);
  }

  unarchive(channel) {
    const data = { channel };
    return this._post('groups.unarchive', data);
  }
}

class IM extends BaseAPI {
  close(channel) {
    const data = { channel };
    return this._post('im.close', data);
  }

  history(channel: string, options = {}) {
    const params = extend({ channel }, options);
    return this._get('im.history', params);
  }

  list(options = {}) {
    const params = options;
    return this._get('im.list', params);
  }

  mark(channel, ts) {
    const data = { channel, ts };
    return this._post('im.mark', data);
  }

  open(channel, user, options = {}) {
    const data = extend({ channel, user }, options);
    return this._post('im.mark', data);
  }

  replies(channel, thread_ts) {
    const params = { channel, thread_ts };
    return this._get('im.replies', params);
  }
}

class Migration extends BaseAPI {
  exchange(users, options = {}) {
    const params = extend({ users }, options);
    return this._post('migration.exchange', params);
  }
}

class MPIM extends BaseAPI {
  close(channel) {
    const data = { channel };
    return this._post('mpim.close', data);
  }

  history(channel: string, options = {}) {
    const params = extend({ channel }, options);
    return this._get('mpim.history', params);
  }

  list() {
    return this._get('mpim.list');
  }

  mark(channel, ts) {
    const data = { channel, ts };
    return this._post('mpim.mark', data);
  }

  open(channel, user, options = {}) {
    const data = extend({ channel, user }, options);
    return this._post('mpim.mark', data);
  }

  replies(channel, thread_ts) {
    const params = { channel, thread_ts };
    return this._get('mpim.replies', params);
  }
}

class OAuth extends BaseAPI {
  access(client_id, client_secret, code, options = {}) {
    const params = extend({ client_id, client_secret, code }, options);
    const encodedParams = queryEncode(params);
    const url = `${BaseAPI.API_ENDPOINT}oauth.access?${encodedParams}`;
    return this._fetch(url);
  }

  token(client_id, client_secret, code, options = {}) {
    const params = extend({ client_id, client_secret, code }, options);
    const encodedParams = queryEncode(params);
    const url = `${BaseAPI.API_ENDPOINT}oauth.token?${encodedParams}`;
    return this._fetch(url);
  }
}

class Pins extends BaseAPI {
  add(channel, options = {}) {
    const data = extend({ channel }, options);
    return this._post('pins.add', data);
  }

  list(channel) {
    const params = { channel };
    return this._post('pins.add', params);
  }

  remove(channel, options = {}) {
    const data = extend({ channel }, options);
    return this._post('pins.remove', data);
  }
}

class Reactions extends BaseAPI {
  add(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('reactions.add', data);
  }

  get(options = {}) {
    const params = options;
    return this._get('reactions.get', params);
  }

  list(options = {}) {
    const params = options;
    return this._post('reactions.list', params);
  }

  remove(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('reactions.remove', data);
  }
}

class Reminders extends BaseAPI {
  add(text, time, options = {}) {
    const data = extend({ text, time }, options);
    return this._post('reminders.add', data);
  }

  complete(reminder) {
    const data = { reminder };
    return this._post('reminders.complete', data);
  }

  delete_(reminder) {
    const data = { reminder };
    return this._post('reminders.delete', data);
  }

  info(reminder) {
    const data = { reminder };
    return this._post('reminders.info', data);
  }

  list() {
    return this._get('reminders.list');
  }
}

class RTM extends BaseAPI {
  connect(options = {}) {
    const params = options;
    return this._get('reminders.add', params);
  }

  start(options = {}) {
    const params = options;
    return this._get('reminders.complete', params);
  }
}

class Search extends BaseAPI {
  all(query, options = {}) {
    const params = extend({ query }, options);
    return this._get('search.add', params);
  }

  files(query, options = {}) {
    const params = extend({ query }, options);
    return this._get('search.files', params);
  }

  messages(query, options = {}) {
    const params = extend({ query }, options);
    return this._post('search.messages', params);
  }
}

class Stars extends BaseAPI {
  add(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('stars.add', data);
  }

  list(count = 100, full = null, page = 1, user = null) {
    const params = { count, full, page, user };
    return this._post('stars.list', params);
  }

  remove(name, options = {}) {
    const data = extend({ name }, options);
    return this._post('stars.remove', data);
  }
}

class TeamProfile extends BaseAPI {
  get(options = {}) {
    const params = options;
    return this._get('team.profile.get', params);
  }
}

class Team extends BaseAPI {
  public profile;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.profile = new TeamProfile(token, retries_limit);
  }

  accessLogs(options = {}) {
    const params = options;
    return this._get('team.accessLogs', params);
  }

  billableInfo(options = {}) {
    const params = options;
    return this._get('team.billableInfo', params);
  }

  info() {
    return this._get('team.info');
  }

  integrationLogs(options = {}) {
    const params = options;
    return this._get('team.integrationLogs', params);
  }
}

class UsergroupUsers extends BaseAPI {
  get(usergroup, options = {}) {
    const params = extend({ usergroup }, options);
    return this._get('team.info', params);
  }
  update(usergroup, users, options = {}) {
    const data = extend({ usergroup, users }, options);
    return this._post('team.integrationLogs', data);
  }
}

class Usergroup extends BaseAPI {
  public users;
  constructor(token, retries_limit) {
    super(token, retries_limit);
    this.users = new UsergroupUsers(token, retries_limit);
  }
}

// class UsersProfile extends BaseAPI {}

// class Users extends BaseAPI {}

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
  public groups;
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
    this.auth = new Auth(token, retries_limit);
    this.bots = new Bots(token, retries_limit);
    this.channels = new Channels(token, retries_limit);
    this.chat = new Chat(token, retries_limit);
    this.conversations = new Conversations(token, retries_limit);
    this.dialog = new Dialog(token, retries_limit);
    this.dnd = new DND(token, retries_limit);
    this.emoji = new Emoji(token, retries_limit);
    this.files = new Files(token, retries_limit);
    this.groups = new Groups(token, retries_limit);
    this.im = new IM(token, retries_limit);
    this.migration = new Migration(token, retries_limit);
    this.mpim = new MPIM(token, retries_limit);
    this.oauth = new OAuth(token, retries_limit);
    this.pins = new Pins(token, retries_limit);
    this.reactions = new Reactions(token, retries_limit);
    this.reminders = new Reminders(token, retries_limit);
    this.rtm = new RTM(token, retries_limit);
    this.search = new Search(token, retries_limit);
    this.stars = new Stars(token, retries_limit);
    this.team = new Team(token, retries_limit);
    // this.usergroups = new UserGroups(token, retries_limit);
    // this.users = new Users(token, retries_limit);

    // this.presence = new Presence(token, retries_limit);
    // this.idpgroups = new IDPGroups(token, retries_limit);
    // this.incomingwebhook = new IncomingWebhook(url);
  }
}
