var global = Function('return this')();
function methods(token, retries_limit = DEFAULT_RETRIES) {
}var GASlacker = (function(exports) {
  "use strict";
  const isNil = (value) => value === null || value === void 0;
  const normalizeFormValue = (value) => {
    if (isNil(value)) return null;
    if (Array.isArray(value)) return value.join(",");
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };
  const queryEncode = (params) => {
    if (params == null) return "";
    const param_list = [];
    for (const [key, rawValue] of Object.entries(params)) {
      const value = normalizeFormValue(rawValue);
      if (value === null) continue;
      param_list.push(`${encodeURIComponent(String(key))}=${encodeURIComponent(value)}`);
    }
    return param_list.join("&");
  };
  const createPayload = (params) => {
    if (params == null) return {};
    const payload = {};
    for (const [key, value] of Object.entries(params)) {
      if (isNil(value)) continue;
      payload[key] = value;
    }
    return payload;
  };
  const createFormPayload = (params) => {
    if (params == null) return {};
    const payload = {};
    for (const [key, rawValue] of Object.entries(params)) {
      const value = normalizeFormValue(rawValue);
      if (value === null) continue;
      payload[key] = value;
    }
    return payload;
  };
  const DEFAULT_RETRIES = 3;
  const _BaseAPI = class _BaseAPI {
    constructor(_token = null, _retries_limit = DEFAULT_RETRIES) {
      this._token = _token;
      this._retries_limit = _retries_limit;
    }
    _get(api, args = {}) {
      const safeArgs = this._normalizeArgs(args, "params");
      const encodedArgs = queryEncode(safeArgs);
      const query = encodedArgs ? `?${encodedArgs}` : "";
      const url = `${_BaseAPI.API_ENDPOINT}${api}${query}`;
      const params = {
        method: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: this._buildHeaders()
      };
      return this._fetch(url, params);
    }
    _post(api, args = {}) {
      const safeArgs = this._normalizeArgs(args, "params");
      const payload = createPayload(safeArgs);
      const url = `${_BaseAPI.API_ENDPOINT}${api}`;
      const params = {
        headers: this._buildHeaders(),
        method: "post",
        contentType: "application/json; charset=UTF-8",
        payload: JSON.stringify(payload)
      };
      return this._fetch(url, params);
    }
    _post_form(api, args = {}) {
      const safeArgs = this._normalizeArgs(args, "params");
      const payload = createFormPayload(safeArgs);
      const url = `${_BaseAPI.API_ENDPOINT}${api}`;
      const params = {
        headers: this._buildHeaders(),
        method: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        payload
      };
      return this._fetch(url, params);
    }
    _post_file(api, file_args, args = {}) {
      const safeArgs = this._normalizeArgs(args, "params");
      const safeFileArgs = this._normalizeArgs(file_args, "file_params");
      const payload = createFormPayload(safeArgs);
      const filePayload = createPayload(safeFileArgs);
      const url = `${_BaseAPI.API_ENDPOINT}${api}`;
      const params = {
        headers: this._buildHeaders(),
        method: "post",
        payload: Object.assign({}, filePayload, payload)
      };
      return this._fetch(url, params);
    }
    _fetch(url, params = null) {
      const requestParams = Object.assign({}, params || {});
      if (requestParams.muteHttpExceptions == null) {
        requestParams.muteHttpExceptions = true;
      }
      const maxAttempts = Math.max(1, this._retries_limit + 1);
      let response = null;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        response = UrlFetchApp.fetch(url, requestParams);
        if (response.getResponseCode() === 429) {
          const retryAfterHeader = this._getHeader(response.getHeaders(), "retry-after");
          const retryAfter = parseInt(retryAfterHeader != null ? retryAfterHeader : "", 10);
          const waitMs = isNaN(retryAfter) ? 1e3 : retryAfter * 1e3;
          Utilities.sleep(waitMs);
          continue;
        }
        return this._parseResponse(response);
      }
      throw Error("Try limit over");
    }
    _getHeader(headers, name) {
      if (!headers) return null;
      const found = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
      if (!found) return null;
      return headers[found];
    }
    _buildHeaders() {
      if (!this._token) return {};
      return { Authorization: `Bearer ${this._token}` };
    }
    _normalizeArgs(args, name) {
      if (args == null) return {};
      if (typeof args !== "object" || Array.isArray(args)) {
        throw new Error(`${name} はオブジェクトで指定してください`);
      }
      return args;
    }
    _parseResponse(response) {
      const text = response.getContentText();
      if (!text) return { ok: false, error: "empty_response" };
      try {
        return JSON.parse(text);
      } catch {
        return { ok: false, error: "invalid_json", raw: text };
      }
    }
  };
  _BaseAPI.API_ENDPOINT = "https://slack.com/api/";
  let BaseAPI = _BaseAPI;
  class API extends BaseAPI {
    get(api, params = {}) {
      return this._get(api, params);
    }
    post(api, params = {}) {
      return this._post(api, params);
    }
    call(api, params = {}, method = "post") {
      if (method === "get") return this._get(api, params);
      if (method === "form") return this._post_form(api, params);
      return this._post(api, params);
    }
    // カーソルページネーションを辿り、各ページのレスポンスを配列で返す。
    // 呼び出し例: paginate('conversations.list', { limit: 200 }, 'get')
    paginate(api, params = {}, method = "post", max_pages = 20) {
      var _a;
      const pages = [];
      let cursor = null;
      while (pages.length < max_pages) {
        const res = this.call(api, cursor ? { ...params, cursor } : params, method);
        pages.push(res);
        if (!res.ok) break;
        cursor = ((_a = res.response_metadata) == null ? void 0 : _a.next_cursor) || null;
        if (!cursor) break;
      }
      return pages;
    }
    test(params = {}) {
      return this._get("api.test", params);
    }
  }
  class AppsConnections extends BaseAPI {
    open(params = {}) {
      return this._post("apps.connections.open", params);
    }
  }
  class AppsEventAuthorizations extends BaseAPI {
    list(params = {}) {
      return this._get("apps.event.authorizations.list", params);
    }
  }
  class AppsManifest extends BaseAPI {
    create(params = {}) {
      return this._post("apps.manifest.create", params);
    }
    delete(params = {}) {
      return this._post("apps.manifest.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    export(params = {}) {
      return this._get("apps.manifest.export", params);
    }
    update(params = {}) {
      return this._post("apps.manifest.update", params);
    }
    validate(params = {}) {
      return this._post("apps.manifest.validate", params);
    }
  }
  class AppsUserConnection extends BaseAPI {
    update(params = {}) {
      return this._post("apps.user.connection.update", params);
    }
  }
  class AppsUser extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.connection = new AppsUserConnection(token, retries_limit);
    }
  }
  class Apps extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.connections = new AppsConnections(token, retries_limit);
      this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit);
      this.manifest = new AppsManifest(token, retries_limit);
      this.user = new AppsUser(token, retries_limit);
    }
    uninstall(params = {}) {
      return this._post_form("apps.uninstall", params);
    }
  }
  class AssistantThreads extends BaseAPI {
    setStatus(params = {}) {
      return this._post("assistant.threads.setStatus", params);
    }
    setSuggestedPrompts(params = {}) {
      return this._post("assistant.threads.setSuggestedPrompts", params);
    }
    setTitle(params = {}) {
      return this._post("assistant.threads.setTitle", params);
    }
  }
  class Assistant extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.threads = new AssistantThreads(token, retries_limit);
    }
  }
  class AuthTeams extends BaseAPI {
    list(params = {}) {
      return this._get("auth.teams.list", params);
    }
  }
  class Auth extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.teams = new AuthTeams(token, retries_limit);
    }
    revoke(params = {}) {
      return this._post("auth.revoke", params);
    }
    test(params = {}) {
      return this._get("auth.test", params);
    }
  }
  class Bookmarks extends BaseAPI {
    add(params = {}) {
      return this._post("bookmarks.add", params);
    }
    edit(params = {}) {
      return this._post("bookmarks.edit", params);
    }
    list(params = {}) {
      return this._get("bookmarks.list", params);
    }
    remove(params = {}) {
      return this._post("bookmarks.remove", params);
    }
  }
  class Bots extends BaseAPI {
    info(params = {}) {
      return this._get("bots.info", params);
    }
  }
  class CallsParticipants extends BaseAPI {
    add(params = {}) {
      return this._post("calls.participants.add", params);
    }
    remove(params = {}) {
      return this._post("calls.participants.remove", params);
    }
  }
  class Calls extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.participants = new CallsParticipants(token, retries_limit);
    }
    add(params = {}) {
      return this._post("calls.add", params);
    }
    end(params = {}) {
      return this._post("calls.end", params);
    }
    info(params = {}) {
      return this._get("calls.info", params);
    }
    update(params = {}) {
      return this._post("calls.update", params);
    }
  }
  class CanvasesAccess extends BaseAPI {
    set(params = {}) {
      return this._post("canvases.access.set", params);
    }
    delete(params = {}) {
      return this._post("canvases.access.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
  }
  class CanvasesSections extends BaseAPI {
    lookup(params = {}) {
      return this._post("canvases.sections.lookup", params);
    }
  }
  class Canvases extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.access = new CanvasesAccess(token, retries_limit);
      this.sections = new CanvasesSections(token, retries_limit);
    }
    create(params = {}) {
      return this._post("canvases.create", params);
    }
    edit(params = {}) {
      return this._post("canvases.edit", params);
    }
    delete(params = {}) {
      return this._post("canvases.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
  }
  class Chat extends BaseAPI {
    // AI アシスタント向けストリーミング投稿
    appendStream(params = {}) {
      return this._post("chat.appendStream", params);
    }
    startStream(params = {}) {
      return this._post("chat.startStream", params);
    }
    stopStream(params = {}) {
      return this._post("chat.stopStream", params);
    }
    delete(params = {}) {
      return this._post("chat.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    deleteScheduledMessage(params = {}) {
      return this._post("chat.deleteScheduledMessage", params);
    }
    getPermalink(params = {}) {
      return this._get("chat.getPermalink", params);
    }
    meMessage(params = {}) {
      return this._post("chat.meMessage", params);
    }
    postEphemeral(params = {}) {
      return this._post("chat.postEphemeral", params);
    }
    postMessage(params = {}) {
      return this._post("chat.postMessage", params);
    }
    scheduleMessage(params = {}) {
      return this._post("chat.scheduleMessage", params);
    }
    scheduledMessagesList(params = {}) {
      return this._get("chat.scheduledMessages.list", params);
    }
    unfurl(params = {}) {
      return this._post("chat.unfurl", params);
    }
    update(params = {}) {
      return this._post("chat.update", params);
    }
  }
  class ConversationsCanvases extends BaseAPI {
    create(params = {}) {
      return this._post("conversations.canvases.create", params);
    }
  }
  class ConversationsExternalInvitePermissions extends BaseAPI {
    set(params = {}) {
      return this._post("conversations.externalInvitePermissions.set", params);
    }
  }
  class ConversationsRequestSharedInvite extends BaseAPI {
    approve(params = {}) {
      return this._post("conversations.requestSharedInvite.approve", params);
    }
    deny(params = {}) {
      return this._post("conversations.requestSharedInvite.deny", params);
    }
    list(params = {}) {
      return this._get("conversations.requestSharedInvite.list", params);
    }
  }
  class Conversations extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.canvases = new ConversationsCanvases(token, retries_limit);
      this.externalInvitePermissions = new ConversationsExternalInvitePermissions(
        token,
        retries_limit
      );
      this.requestSharedInvite = new ConversationsRequestSharedInvite(token, retries_limit);
    }
    // Slack Connect(外部共有チャンネル)関連
    acceptSharedInvite(params = {}) {
      return this._post("conversations.acceptSharedInvite", params);
    }
    approveSharedInvite(params = {}) {
      return this._post("conversations.approveSharedInvite", params);
    }
    declineSharedInvite(params = {}) {
      return this._post("conversations.declineSharedInvite", params);
    }
    inviteShared(params = {}) {
      return this._post("conversations.inviteShared", params);
    }
    listConnectInvites(params = {}) {
      return this._get("conversations.listConnectInvites", params);
    }
    archive(params = {}) {
      return this._post("conversations.archive", params);
    }
    close(params = {}) {
      return this._post("conversations.close", params);
    }
    create(params = {}) {
      return this._post("conversations.create", params);
    }
    history(params = {}) {
      return this._get("conversations.history", params);
    }
    info(params = {}) {
      return this._get("conversations.info", params);
    }
    invite(params = {}) {
      return this._post("conversations.invite", params);
    }
    join(params = {}) {
      return this._post("conversations.join", params);
    }
    kick(params = {}) {
      return this._post("conversations.kick", params);
    }
    leave(params = {}) {
      return this._post("conversations.leave", params);
    }
    list(params = {}) {
      return this._get("conversations.list", params);
    }
    mark(params = {}) {
      return this._post("conversations.mark", params);
    }
    members(params = {}) {
      return this._get("conversations.members", params);
    }
    open(params = {}) {
      return this._post("conversations.open", params);
    }
    rename(params = {}) {
      return this._post("conversations.rename", params);
    }
    replies(params = {}) {
      return this._get("conversations.replies", params);
    }
    setPurpose(params = {}) {
      return this._post("conversations.setPurpose", params);
    }
    setTopic(params = {}) {
      return this._post("conversations.setTopic", params);
    }
    unarchive(params = {}) {
      return this._post("conversations.unarchive", params);
    }
  }
  class Dialog extends BaseAPI {
    open(params = {}) {
      return this._post("dialog.open", params);
    }
  }
  class DND extends BaseAPI {
    endDnd(params = {}) {
      return this._post("dnd.endDnd", params);
    }
    endSnooze(params = {}) {
      return this._post("dnd.endSnooze", params);
    }
    info(params = {}) {
      return this._get("dnd.info", params);
    }
    setSnooze(params = {}) {
      return this._post("dnd.setSnooze", params);
    }
    teamInfo(params = {}) {
      return this._get("dnd.teamInfo", params);
    }
  }
  class Emoji extends BaseAPI {
    list(params = {}) {
      return this._get("emoji.list", params);
    }
  }
  class Entity extends BaseAPI {
    presentDetails(params = {}) {
      return this._post("entity.presentDetails", params);
    }
  }
  class FilesRemote extends BaseAPI {
    add(params = {}) {
      return this._post("files.remote.add", params);
    }
    info(params = {}) {
      return this._get("files.remote.info", params);
    }
    list(params = {}) {
      return this._get("files.remote.list", params);
    }
    remove(params = {}) {
      return this._post("files.remote.remove", params);
    }
    share(params = {}) {
      return this._post("files.remote.share", params);
    }
    update(params = {}) {
      return this._post("files.remote.update", params);
    }
  }
  class Files extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.remote = new FilesRemote(token, retries_limit);
    }
    delete(params = {}) {
      return this._post("files.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    info(params = {}) {
      return this._get("files.info", params);
    }
    list(params = {}) {
      return this._get("files.list", params);
    }
    revokePublicURL(params = {}) {
      return this._post("files.revokePublicURL", params);
    }
    sharedPublicURL(params = {}) {
      return this._post("files.sharedPublicURL", params);
    }
    // files.uploadV2 という HTTP エンドポイントは存在しないため、公式推奨の
    // 3 ステップ(URL 取得 → アップロード → 完了通知)を 1 メソッドにまとめている。
    // file には GAS の Blob、content には文字列を指定する。
    uploadV2(params = {}) {
      var _a;
      const safeParams = this._normalizeArgs(params, "params");
      const { file, content, filename, snippet_type, alt_txt, title, ...completeArgs } = safeParams;
      if (file == null && content == null) {
        throw new Error("file または content を指定してください");
      }
      const blob = file != null ? file : Utilities.newBlob(String(content));
      if (typeof blob.getBytes !== "function") {
        throw new Error("file には Blob を指定してください");
      }
      const name = (_a = filename != null ? filename : typeof blob.getName === "function" ? blob.getName() : null) != null ? _a : "file";
      const urlRes = this._post_form("files.getUploadURLExternal", {
        filename: name,
        length: blob.getBytes().length,
        snippet_type,
        alt_txt
      });
      if (!urlRes.ok) return urlRes;
      const uploadRes = UrlFetchApp.fetch(urlRes.upload_url, {
        method: "post",
        payload: blob,
        muteHttpExceptions: true
      });
      if (uploadRes.getResponseCode() !== 200) {
        return { ok: false, error: "upload_failed", raw: uploadRes.getContentText() };
      }
      return this._post("files.completeUploadExternal", {
        files: [{ id: urlRes.file_id, title: title != null ? title : name }],
        ...completeArgs
      });
    }
    // JSON ボディ非対応のためフォーム送信(実測で確認)
    getUploadURLExternal(params = {}) {
      return this._post_form("files.getUploadURLExternal", params);
    }
    completeUploadExternal(params = {}) {
      return this._post("files.completeUploadExternal", params);
    }
  }
  class Functions extends BaseAPI {
    completeError(params = {}) {
      return this._post("functions.completeError", params);
    }
    completeSuccess(params = {}) {
      return this._post("functions.completeSuccess", params);
    }
  }
  class OAuth extends BaseAPI {
    access(params = {}) {
      return this._post_form("oauth.v2.access", params);
    }
  }
  class OpenIDConnect extends BaseAPI {
    // OAuth 系エンドポイントのためフォーム送信(client_id / client_secret / code を使う)
    token(params = {}) {
      return this._post_form("openid.connect.token", params);
    }
    userInfo(params = {}) {
      return this._post("openid.connect.userInfo", params);
    }
  }
  class OpenID extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.connect = new OpenIDConnect(token, retries_limit);
    }
  }
  class Pins extends BaseAPI {
    add(params = {}) {
      return this._post("pins.add", params);
    }
    list(params = {}) {
      return this._get("pins.list", params);
    }
    remove(params = {}) {
      return this._post("pins.remove", params);
    }
  }
  class Reactions extends BaseAPI {
    add(params = {}) {
      return this._post("reactions.add", params);
    }
    get(params = {}) {
      return this._get("reactions.get", params);
    }
    list(params = {}) {
      return this._get("reactions.list", params);
    }
    remove(params = {}) {
      return this._post("reactions.remove", params);
    }
  }
  class Reminders extends BaseAPI {
    add(params = {}) {
      return this._post("reminders.add", params);
    }
    complete(params = {}) {
      return this._post("reminders.complete", params);
    }
    delete(params = {}) {
      return this._post("reminders.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    info(params = {}) {
      return this._get("reminders.info", params);
    }
    list(params = {}) {
      return this._get("reminders.list", params);
    }
  }
  class Search extends BaseAPI {
    all(params = {}) {
      return this._get("search.all", params);
    }
    files(params = {}) {
      return this._get("search.files", params);
    }
    messages(params = {}) {
      return this._get("search.messages", params);
    }
  }
  class SlackListsAccess extends BaseAPI {
    delete(params = {}) {
      return this._post("slackLists.access.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    set(params = {}) {
      return this._post("slackLists.access.set", params);
    }
  }
  class SlackListsDownload extends BaseAPI {
    get(params = {}) {
      return this._get("slackLists.download.get", params);
    }
    start(params = {}) {
      return this._post("slackLists.download.start", params);
    }
  }
  class SlackListsItems extends BaseAPI {
    create(params = {}) {
      return this._post("slackLists.items.create", params);
    }
    delete(params = {}) {
      return this._post("slackLists.items.delete", params);
    }
    // 後方互換エイリアス
    delete_(params = {}) {
      return this.delete(params);
    }
    deleteMultiple(params = {}) {
      return this._post("slackLists.items.deleteMultiple", params);
    }
    info(params = {}) {
      return this._get("slackLists.items.info", params);
    }
    list(params = {}) {
      return this._get("slackLists.items.list", params);
    }
    update(params = {}) {
      return this._post("slackLists.items.update", params);
    }
  }
  class SlackLists extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.access = new SlackListsAccess(token, retries_limit);
      this.download = new SlackListsDownload(token, retries_limit);
      this.items = new SlackListsItems(token, retries_limit);
    }
    create(params = {}) {
      return this._post("slackLists.create", params);
    }
    update(params = {}) {
      return this._post("slackLists.update", params);
    }
  }
  class Stars extends BaseAPI {
    add(params = {}) {
      return this._post("stars.add", params);
    }
    list(params = {}) {
      return this._get("stars.list", params);
    }
    remove(params = {}) {
      return this._post("stars.remove", params);
    }
  }
  class TeamProfile extends BaseAPI {
    get(params = {}) {
      return this._get("team.profile.get", params);
    }
  }
  class TeamBilling extends BaseAPI {
    info(params = {}) {
      return this._get("team.billing.info", params);
    }
  }
  class TeamPreferences extends BaseAPI {
    list(params = {}) {
      return this._get("team.preferences.list", params);
    }
  }
  class TeamExternalTeams extends BaseAPI {
    disconnect(params = {}) {
      return this._post("team.externalTeams.disconnect", params);
    }
    list(params = {}) {
      return this._get("team.externalTeams.list", params);
    }
  }
  class Team extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.profile = new TeamProfile(token, retries_limit);
      this.billing = new TeamBilling(token, retries_limit);
      this.preferences = new TeamPreferences(token, retries_limit);
      this.externalTeams = new TeamExternalTeams(token, retries_limit);
    }
    accessLogs(params = {}) {
      return this._get("team.accessLogs", params);
    }
    billableInfo(params = {}) {
      return this._get("team.billableInfo", params);
    }
    info(params = {}) {
      return this._get("team.info", params);
    }
    integrationLogs(params = {}) {
      return this._get("team.integrationLogs", params);
    }
  }
  class ToolingTokens extends BaseAPI {
    // refresh_token を使うためフォーム送信
    rotate(params = {}) {
      return this._post_form("tooling.tokens.rotate", params);
    }
  }
  class Tooling extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.tokens = new ToolingTokens(token, retries_limit);
    }
  }
  class UsergroupsUsers extends BaseAPI {
    list(params = {}) {
      return this._get("usergroups.users.list", params);
    }
    update(params = {}) {
      return this._post("usergroups.users.update", params);
    }
  }
  class UserGroups extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.users = new UsergroupsUsers(token, retries_limit);
    }
    create(params = {}) {
      return this._post("usergroups.create", params);
    }
    disable(params = {}) {
      return this._post("usergroups.disable", params);
    }
    enable(params = {}) {
      return this._post("usergroups.enable", params);
    }
    list(params = {}) {
      return this._get("usergroups.list", params);
    }
    update(params = {}) {
      return this._post("usergroups.update", params);
    }
  }
  class UsersDiscoverableContacts extends BaseAPI {
    lookup(params = {}) {
      return this._post("users.discoverableContacts.lookup", params);
    }
  }
  class Users extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.profile = new UsersProfile(token, retries_limit);
      this.discoverableContacts = new UsersDiscoverableContacts(token, retries_limit);
    }
    conversations(params = {}) {
      return this._get("users.conversations", params);
    }
    deletePhoto(params = {}) {
      return this._post("users.deletePhoto", params);
    }
    getPresence(params = {}) {
      return this._get("users.getPresence", params);
    }
    identity(params = {}) {
      return this._get("users.identity", params);
    }
    info(params = {}) {
      return this._get("users.info", params);
    }
    list(params = {}) {
      return this._get("users.list", params);
    }
    lookupByEmail(params = {}) {
      return this._get("users.lookupByEmail", params);
    }
    setActive(params = {}) {
      return this._post("users.setActive", params);
    }
    setPhoto(params = {}) {
      const args = params ? Object.assign({}, params) : {};
      const image = args.image;
      delete args.image;
      return this._post_file("users.setPhoto", { image }, args);
    }
    setPresence(params = {}) {
      return this._post("users.setPresence", params);
    }
  }
  class UsersProfile extends BaseAPI {
    get(params = {}) {
      return this._get("users.profile.get", params);
    }
    set(params = {}) {
      return this._post("users.profile.set", params);
    }
  }
  class Views extends BaseAPI {
    open(params = {}) {
      return this._post("views.open", params);
    }
    publish(params = {}) {
      return this._post("views.publish", params);
    }
    push(params = {}) {
      return this._post("views.push", params);
    }
    update(params = {}) {
      return this._post("views.update", params);
    }
  }
  class WorkflowsFeatured extends BaseAPI {
    add(params = {}) {
      return this._post("workflows.featured.add", params);
    }
    list(params = {}) {
      return this._get("workflows.featured.list", params);
    }
    remove(params = {}) {
      return this._post("workflows.featured.remove", params);
    }
    set(params = {}) {
      return this._post("workflows.featured.set", params);
    }
  }
  class Workflows extends BaseAPI {
    constructor(token, retries_limit) {
      super(token, retries_limit);
      this.featured = new WorkflowsFeatured(token, retries_limit);
    }
  }
  class Methods {
    constructor(token, retries_limit = DEFAULT_RETRIES) {
      this.api = new API(token, retries_limit);
      this.apps = new Apps(token, retries_limit);
      this.assistant = new Assistant(token, retries_limit);
      this.auth = new Auth(token, retries_limit);
      this.bookmarks = new Bookmarks(token, retries_limit);
      this.bots = new Bots(token, retries_limit);
      this.calls = new Calls(token, retries_limit);
      this.canvases = new Canvases(token, retries_limit);
      this.chat = new Chat(token, retries_limit);
      this.conversations = new Conversations(token, retries_limit);
      this.dialog = new Dialog(token, retries_limit);
      this.dnd = new DND(token, retries_limit);
      this.emoji = new Emoji(token, retries_limit);
      this.entity = new Entity(token, retries_limit);
      this.files = new Files(token, retries_limit);
      this.functions = new Functions(token, retries_limit);
      this.oauth = new OAuth(null, retries_limit);
      this.openid = new OpenID(null, retries_limit);
      this.pins = new Pins(token, retries_limit);
      this.reactions = new Reactions(token, retries_limit);
      this.reminders = new Reminders(token, retries_limit);
      this.search = new Search(token, retries_limit);
      this.slackLists = new SlackLists(token, retries_limit);
      this.stars = new Stars(token, retries_limit);
      this.team = new Team(token, retries_limit);
      this.tooling = new Tooling(token, retries_limit);
      this.usergroups = new UserGroups(token, retries_limit);
      this.users = new Users(token, retries_limit);
      this.views = new Views(token, retries_limit);
      this.workflows = new Workflows(token, retries_limit);
    }
    call(api, params = {}, method = "post") {
      return this.api.call(api, params, method);
    }
    // カーソルページネーションを辿り、各ページのレスポンスを配列で返す
    paginate(api, params = {}, method = "post", max_pages = 20) {
      return this.api.paginate(api, params, method, max_pages);
    }
  }
  global.methods = (token, retries_limit = DEFAULT_RETRIES) => new Methods(token, retries_limit);
  exports.Methods = Methods;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
