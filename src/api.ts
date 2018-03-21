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
    const payload = extend({ token: this.token }, data);
    for (let key in payload) {
      if (payload[key] == null) delete payload[key];
    }
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
    data = extend({ error }, data);
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

class Auth extends BaseAPI {
  revoke(test = null) {
    const params = { test };
    return this.get('auth.revoke', params);
  }

  test() {
    return this.post('auth.test');
  }
}

class Bots extends BaseAPI {
  info(bot = null) {
    const params = { bot };
    return this.get('bots.info', params);
  }
}

class Channels extends BaseAPI {
  archive(channel: string) {
    const data = { channel };
    return this.post('channels.archive', data);
  }

  create(name: string, validate: boolean) {
    const params = { name, validate };
    return this.get('channels.create', params);
  }

  history(
    channel: string,
    count: number = 100,
    inclusive = false,
    latest = 'now',
    oldest = 0,
    unreads = false
  ) {
    const params = { channel, count, inclusive, latest, oldest, unreads };
    return this.get('channels.history', params);
  }

  info(channel, include_locale = false) {
    const params = { channel, include_locale };
    return this.get('channels.info', params);
  }

  invite(channel, user) {
    const data = { channel, user };
    return this.post('channels.invite', data);
  }

  join(name, validate = false) {
    const data = { name, validate };
    return this.post('channels.join', data);
  }

  kick(channel, user) {
    const data = { channel, user };
    return this.post('channels.kick', data);
  }

  leave(channel) {
    const data = { channel };
    return this.post('channels.leave', data);
  }

  list(cursor = null, exclude_archived = false, exclude_members = false, limit = 0) {
    const params = { cursor, exclude_archived, exclude_members, limit };
    return this.get('channels.list', params);
  }

  mark(channel, ts) {
    const data = { channel, ts };
    return this.post('channels.mark', data);
  }

  rename(channel, name, validate = null) {
    const params = { validate, channel, name };
    return this.get('channels.rename');
  }

  replies(channel, thread_ts) {
    return this.get('channels.replies');
  }

  setPurpose(channel, purpose) {
    const data = { channel, purpose };
    return this.post('channels.setPurpose', data);
  }

  setTopic(channel, topic) {
    const data = { channel, topic };
    return this.post('channels.setTopic', data);
  }

  unarchive(channel) {
    const data = { channel };
    return this.post('channels.unarchive', data);
  }
}

class Chat extends BaseAPI {
  delete_(channel, ts, as_user = false) {
    const data = { channel, ts, as_user };
    return this.post('chat.delete', data);
  }

  getPermalink(channel, massage_ts) {
    const params = { name, massage_ts };
    return this.get('chat.getPermalink', params);
  }

  meMessage(channel, text) {
    const data = { channel, text };
    return this.post('chat.meMessage', data);
  }

  postEphemeral(
    channel,
    text,
    user,
    as_user = false,
    attachments = null,
    link_names = false,
    parse = 'none'
  ) {
    const data = { channel, text, user, as_user, attachments, link_names, parse };
    return this.post('chat.postEphemeral', data);
  }

  postMessage(
    channel,
    text,
    as_user = false,
    attachments = null,
    icon_emoji = null,
    icon_url = null,
    link_names = false,
    mrkdwn = true,
    parse = 'none',
    reply_broadcast = false,
    thread_ts = null,
    unfurl_links = false,
    unfurl_media = true,
    username = null
  ) {
    const data = {
      channel,
      text,
      as_user,
      attachments,
      icon_emoji,
      icon_url,
      link_names,
      mrkdwn,
      parse,
      reply_broadcast,
      thread_ts,
      unfurl_links,
      unfurl_media,
      username
    };
    return this.post('chat.postMessage', data);
  }

  unfurl(
    channel,
    ts,
    unfurls,
    user_auth_message = null,
    user_auth_required = false,
    user_auth_url = null
  ) {
    const data = { channel, ts, unfurls, user_auth_message, user_auth_required, user_auth_url };
    return this.post('chat.unfurl', data);
  }

  update(
    channel,
    text,
    ts,
    as_user = false,
    attachments = null,
    link_names = 'none',
    parse = 'client'
  ) {
    const data = { channel, text, ts, as_user, attachments, link_names, parse };
    return this.post('chat.update', data);
  }
}

class Conversations extends BaseAPI {
  archive(channel: string) {
    const data = { channel };
    return this.post('conversations.archive', data);
  }

  close(channel) {
    const params = { channel };
    return this.get('conversations.close', params);
  }

  create(name, is_private = false) {
    const params = { name, is_private };
    return this.get('conversations.create', params);
  }

  history(
    channel: string,
    count: number = 100,
    inclusive = false,
    latest = 'now',
    oldest = 0,
    unreads = false
  ) {
    const params = { channel, count, inclusive, latest, oldest, unreads };
    return this.get('conversations.history', params);
  }

  info(channel, include_locale = false) {
    const params = { channel, include_locale };
    return this.get('conversations.info', params);
  }

  invite(channel, user) {
    const data = { channel, user };
    return this.post('conversations.invite', data);
  }

  join(name, validate = false) {
    const data = { name, validate };
    return this.post('conversations.join', data);
  }

  kick(channel, user) {
    const data = { channel, user };
    return this.post('conversations.kick', data);
  }

  leave(channel) {
    const data = { channel };
    return this.post('conversations.leave', data);
  }

  list(cursor = null, exclude_archived = false, exclude_members = false, limit = 0) {
    const params = { cursor, exclude_archived, exclude_members, limit };
    return this.get('conversations.list', params);
  }

  member(channel, cursor = null, limit = 100) {
    const data = { channel, cursor, limit };
    return this.post('conversations.member', data);
  }

  open(channel = null, return_im = false, users = null) {
    const data = { channel, return_im, users };
    if (Array.isArray(users)) data['users'] = users.join(',');
    return this.post('conversations.open', data);
  }

  rename(channel, name, validate = null) {
    const data = { validate, channel, name };
    return this.post('conversations.rename', data);
  }

  replies(
    channel,
    thread_ts,
    cursor = null,
    inclusive = false,
    latest = 'now',
    limit = 10,
    oldest = 0
  ) {
    const params = { thread_ts, cursor, inclusive, latest, limit, oldest };
    return this.get('conversations.replies', params);
  }

  setPurpose(channel, purpose) {
    const data = { channel, purpose };
    return this.post('conversations.setPurpose', data);
  }

  setTopic(channel, topic) {
    const data = { channel, topic };
    return this.post('conversations.setTopic', data);
  }

  unarchive(channel) {
    const data = { channel };
    return this.post('conversations.unarchive', data);
  }
}

class Dialog extends BaseAPI {
  open(dialog, trigger_id) {
    const data = { dialog, trigger_id };
    return this.post('conversations.unarchive', data);
  }
}

class DND extends BaseAPI {
  endDnd() {
    return this.post('dnd.endDnd');
  }

  endSnooze() {
    return this.post('dnd.endSnooze');
  }

  info(user) {
    const params = { user };
    return this.get('dnd.info', params);
  }

  setSnooze(num_minutes) {
    const params = { num_minutes };
    return this.get('dnd.setSnooze', params);
  }

  teamInfo(users = null) {
    const params = { users };
    return this.get('dnd.teamInfo', params);
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
    this.auth = new Auth(token, retries_limit);
    this.bots = new Bots(token, retries_limit);
    this.channels = new Channels(token, retries_limit);
    this.chat = new Chat(token, retries_limit);
    this.conversations = new Conversations(token, retries_limit);
    this.dialog = new Dialog(token, retries_limit);
    this.dnd = new DND(token, retries_limit);
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
