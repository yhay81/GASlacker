var global = Function('return this')();
/**
	* Creates a Slack Web API client.
	* @param {string|null} token Bot/User token (xoxb- / xoxp-). May be null if you only call token-free APIs.
	* @param {number} [retries_limit] Extra retry attempts on HTTP 429 (default 3)
	* @return {Object} A client with one property per category (chat, conversations, files, etc.)
	*/
function methods(token, retries_limit = 3) {
}var GASlacker = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	//#region src/util.ts
	var isNil = (value) => value === null || value === void 0;
	var normalizeFormValue = (value) => {
		if (isNil(value)) return null;
		if (Array.isArray(value)) return value.join(",");
		if (typeof value === "object") return JSON.stringify(value);
		return String(value);
	};
	var queryEncode = (params) => {
		if (params == null) return "";
		const param_list = [];
		for (const [key, rawValue] of Object.entries(params)) {
			const value = normalizeFormValue(rawValue);
			if (value === null) continue;
			param_list.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
		}
		return param_list.join("&");
	};
	var createPayload = (params) => {
		if (params == null) return {};
		const payload = {};
		for (const [key, value] of Object.entries(params)) {
			if (isNil(value)) continue;
			payload[key] = value;
		}
		return payload;
	};
	var createFormPayload = (params) => {
		if (params == null) return {};
		const payload = {};
		for (const [key, rawValue] of Object.entries(params)) {
			const value = normalizeFormValue(rawValue);
			if (value === null) continue;
			payload[key] = value;
		}
		return payload;
	};
	//#endregion
	//#region src/methods/BaseAPI.ts
	var _BaseAPI;
	var BaseAPI = class BaseAPI {
		constructor(_token = null, _retries_limit = 3) {
			this._token = _token;
			this._retries_limit = _retries_limit;
		}
		_get(api, args = {}) {
			const encodedArgs = queryEncode(this._normalizeArgs(args, "params"));
			const query = encodedArgs ? `?${encodedArgs}` : "";
			const url = `${BaseAPI.API_ENDPOINT}${api}${query}`;
			const params = {
				method: "get",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				headers: this._buildHeaders()
			};
			return this._fetch(url, params);
		}
		_post(api, args = {}) {
			const payload = createPayload(this._normalizeArgs(args, "params"));
			const url = `${BaseAPI.API_ENDPOINT}${api}`;
			const params = {
				headers: this._buildHeaders(),
				method: "post",
				contentType: "application/json; charset=UTF-8",
				payload: JSON.stringify(payload)
			};
			return this._fetch(url, params);
		}
		_post_form(api, args = {}) {
			const payload = createFormPayload(this._normalizeArgs(args, "params"));
			const url = `${BaseAPI.API_ENDPOINT}${api}`;
			const params = {
				headers: this._buildHeaders(),
				method: "post",
				contentType: "application/x-www-form-urlencoded",
				payload
			};
			return this._fetch(url, params);
		}
		_post_file(api, file_args, args = {}) {
			const safeArgs = this._normalizeArgs(args, "params");
			const safeFileArgs = this._normalizeArgs(file_args, "file_params");
			const payload = createFormPayload(safeArgs);
			const filePayload = createPayload(safeFileArgs);
			const url = `${BaseAPI.API_ENDPOINT}${api}`;
			const params = {
				headers: this._buildHeaders(),
				method: "post",
				payload: Object.assign({}, filePayload, payload)
			};
			return this._fetch(url, params);
		}
		_fetch(url, params = {}) {
			const requestParams = Object.assign({}, params || {});
			if (requestParams.muteHttpExceptions == null) requestParams.muteHttpExceptions = true;
			const maxAttempts = Math.max(1, this._retries_limit + 1);
			for (let attempt = 0; attempt < maxAttempts; attempt++) {
				const response = UrlFetchApp.fetch(url, requestParams);
				if (response.getResponseCode() !== 429) return this._parseResponse(response);
				if (attempt === maxAttempts - 1) break;
				const retryAfterHeader = this._getHeader(response.getHeaders(), "retry-after");
				const retryAfter = parseInt(retryAfterHeader !== null && retryAfterHeader !== void 0 ? retryAfterHeader : "", 10);
				const waitMs = isNaN(retryAfter) ? 1e3 : retryAfter * 1e3;
				Utilities.sleep(waitMs);
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
			if (typeof args !== "object" || Array.isArray(args)) throw new Error(`${name} must be an object`);
			return args;
		}
		_parseResponse(response) {
			const text = response.getContentText();
			if (!text) return {
				ok: false,
				error: "empty_response"
			};
			try {
				return JSON.parse(text);
			} catch {
				return {
					ok: false,
					error: "invalid_json",
					raw: text
				};
			}
		}
	};
	_BaseAPI = BaseAPI;
	_BaseAPI.API_ENDPOINT = "https://slack.com/api/";
	//#endregion
	//#region src/methods/API.ts
	var API = class extends BaseAPI {
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
		paginate(api, params = {}, method = "post", max_pages = 20) {
			const pages = [];
			let cursor = null;
			while (pages.length < max_pages) {
				var _res$response_metadat;
				const res = this.call(api, cursor ? {
					...params,
					cursor
				} : params, method);
				pages.push(res);
				if (!res.ok) break;
				cursor = ((_res$response_metadat = res.response_metadata) === null || _res$response_metadat === void 0 ? void 0 : _res$response_metadat.next_cursor) || null;
				if (!cursor) break;
			}
			return pages;
		}
		test(params = {}) {
			return this._get("api.test", params);
		}
	};
	//#endregion
	//#region src/methods/Apps.ts
	var AppsConnections = class extends BaseAPI {
		open(params = {}) {
			return this._post("apps.connections.open", params);
		}
	};
	var AppsEventAuthorizations = class extends BaseAPI {
		list(params = {}) {
			return this._get("apps.event.authorizations.list", params);
		}
	};
	var AppsManifest = class extends BaseAPI {
		create(params = {}) {
			return this._post("apps.manifest.create", params);
		}
		delete(params = {}) {
			return this._post("apps.manifest.delete", params);
		}
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
	};
	var AppsUserConnection = class extends BaseAPI {
		update(params = {}) {
			return this._post("apps.user.connection.update", params);
		}
	};
	var AppsUser = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.connection = new AppsUserConnection(token, retries_limit);
		}
	};
	var Apps = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Assistant.ts
	var AssistantThreads = class extends BaseAPI {
		setStatus(params = {}) {
			return this._post("assistant.threads.setStatus", params);
		}
		setSuggestedPrompts(params = {}) {
			return this._post("assistant.threads.setSuggestedPrompts", params);
		}
		setTitle(params = {}) {
			return this._post("assistant.threads.setTitle", params);
		}
	};
	var Assistant = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.threads = new AssistantThreads(token, retries_limit);
		}
	};
	//#endregion
	//#region src/methods/Auth.ts
	var AuthTeams = class extends BaseAPI {
		list(params = {}) {
			return this._get("auth.teams.list", params);
		}
	};
	var Auth = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Bookmarks.ts
	var Bookmarks = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Bots.ts
	var Bots = class extends BaseAPI {
		info(params = {}) {
			return this._get("bots.info", params);
		}
	};
	//#endregion
	//#region src/methods/Calls.ts
	var CallsParticipants = class extends BaseAPI {
		add(params = {}) {
			return this._post("calls.participants.add", params);
		}
		remove(params = {}) {
			return this._post("calls.participants.remove", params);
		}
	};
	var Calls = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Canvases.ts
	var CanvasesAccess = class extends BaseAPI {
		set(params = {}) {
			return this._post("canvases.access.set", params);
		}
		delete(params = {}) {
			return this._post("canvases.access.delete", params);
		}
		delete_(params = {}) {
			return this.delete(params);
		}
	};
	var CanvasesSections = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("canvases.sections.lookup", params);
		}
	};
	var Canvases = class extends BaseAPI {
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
		delete_(params = {}) {
			return this.delete(params);
		}
	};
	//#endregion
	//#region src/methods/Chat.ts
	var ChatScheduledMessages = class extends BaseAPI {
		list(params = {}) {
			return this._get("chat.scheduledMessages.list", params);
		}
	};
	var Chat = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.scheduledMessages = new ChatScheduledMessages(token, retries_limit);
		}
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
			return this.scheduledMessages.list(params);
		}
		unfurl(params = {}) {
			return this._post("chat.unfurl", params);
		}
		update(params = {}) {
			return this._post("chat.update", params);
		}
	};
	//#endregion
	//#region src/methods/Conversations.ts
	var ConversationsCanvases = class extends BaseAPI {
		create(params = {}) {
			return this._post("conversations.canvases.create", params);
		}
	};
	var ConversationsExternalInvitePermissions = class extends BaseAPI {
		set(params = {}) {
			return this._post("conversations.externalInvitePermissions.set", params);
		}
	};
	var ConversationsRequestSharedInvite = class extends BaseAPI {
		approve(params = {}) {
			return this._post("conversations.requestSharedInvite.approve", params);
		}
		deny(params = {}) {
			return this._post("conversations.requestSharedInvite.deny", params);
		}
		list(params = {}) {
			return this._get("conversations.requestSharedInvite.list", params);
		}
	};
	var Conversations = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.canvases = new ConversationsCanvases(token, retries_limit);
			this.externalInvitePermissions = new ConversationsExternalInvitePermissions(token, retries_limit);
			this.requestSharedInvite = new ConversationsRequestSharedInvite(token, retries_limit);
		}
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
	};
	//#endregion
	//#region src/methods/Dialog.ts
	var Dialog = class extends BaseAPI {
		open(params = {}) {
			return this._post("dialog.open", params);
		}
	};
	//#endregion
	//#region src/methods/DND.ts
	var DND = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Emoji.ts
	var Emoji = class extends BaseAPI {
		list(params = {}) {
			return this._get("emoji.list", params);
		}
	};
	//#endregion
	//#region src/methods/Entity.ts
	var Entity = class extends BaseAPI {
		presentDetails(params = {}) {
			return this._post("entity.presentDetails", params);
		}
	};
	//#endregion
	//#region src/methods/Files.ts
	var FilesRemote = class extends BaseAPI {
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
	};
	var Files = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.remote = new FilesRemote(token, retries_limit);
		}
		delete(params = {}) {
			return this._post("files.delete", params);
		}
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
		uploadV2(params = {}) {
			var _ref;
			const { file, content, filename, snippet_type, alt_txt, title, ...completeArgs } = this._normalizeArgs(params, "params");
			if (file == null && content == null) throw new Error("Specify either file or content");
			const blob = file != null ? file : Utilities.newBlob(String(content));
			if (typeof blob.getBytes !== "function") throw new Error("file must be a Blob");
			const name = (_ref = filename !== null && filename !== void 0 ? filename : typeof blob.getName === "function" ? blob.getName() : null) !== null && _ref !== void 0 ? _ref : "file";
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
			if (uploadRes.getResponseCode() !== 200) return {
				ok: false,
				error: "upload_failed",
				raw: uploadRes.getContentText()
			};
			return this._post("files.completeUploadExternal", {
				files: [{
					id: urlRes.file_id,
					title: title !== null && title !== void 0 ? title : name
				}],
				...completeArgs
			});
		}
		getUploadURLExternal(params = {}) {
			return this._post_form("files.getUploadURLExternal", params);
		}
		completeUploadExternal(params = {}) {
			return this._post("files.completeUploadExternal", params);
		}
	};
	//#endregion
	//#region src/methods/Functions.ts
	var Functions = class extends BaseAPI {
		completeError(params = {}) {
			return this._post("functions.completeError", params);
		}
		completeSuccess(params = {}) {
			return this._post("functions.completeSuccess", params);
		}
	};
	//#endregion
	//#region src/methods/OAuth.ts
	var OAuth = class extends BaseAPI {
		access(params = {}) {
			return this._post_form("oauth.v2.access", params);
		}
	};
	//#endregion
	//#region src/methods/OpenID.ts
	var OpenIDConnectExchange = class extends BaseAPI {
		token(params = {}) {
			return this._post_form("openid.connect.token", params);
		}
	};
	var OpenIDConnect = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this._exchange = new OpenIDConnectExchange(null, retries_limit);
		}
		token(params = {}) {
			return this._exchange.token(params);
		}
		userInfo(params = {}) {
			return this._post("openid.connect.userInfo", params);
		}
	};
	var OpenID = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.connect = new OpenIDConnect(token, retries_limit);
		}
	};
	//#endregion
	//#region src/methods/Pins.ts
	var Pins = class extends BaseAPI {
		add(params = {}) {
			return this._post("pins.add", params);
		}
		list(params = {}) {
			return this._get("pins.list", params);
		}
		remove(params = {}) {
			return this._post("pins.remove", params);
		}
	};
	//#endregion
	//#region src/methods/Reactions.ts
	var Reactions = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Reminders.ts
	var Reminders = class extends BaseAPI {
		add(params = {}) {
			return this._post("reminders.add", params);
		}
		complete(params = {}) {
			return this._post("reminders.complete", params);
		}
		delete(params = {}) {
			return this._post("reminders.delete", params);
		}
		delete_(params = {}) {
			return this.delete(params);
		}
		info(params = {}) {
			return this._get("reminders.info", params);
		}
		list(params = {}) {
			return this._get("reminders.list", params);
		}
	};
	//#endregion
	//#region src/methods/Search.ts
	var Search = class extends BaseAPI {
		all(params = {}) {
			return this._get("search.all", params);
		}
		files(params = {}) {
			return this._get("search.files", params);
		}
		messages(params = {}) {
			return this._get("search.messages", params);
		}
	};
	//#endregion
	//#region src/methods/SlackLists.ts
	var SlackListsAccess = class extends BaseAPI {
		delete(params = {}) {
			return this._post("slackLists.access.delete", params);
		}
		delete_(params = {}) {
			return this.delete(params);
		}
		set(params = {}) {
			return this._post("slackLists.access.set", params);
		}
	};
	var SlackListsDownload = class extends BaseAPI {
		get(params = {}) {
			return this._get("slackLists.download.get", params);
		}
		start(params = {}) {
			return this._post("slackLists.download.start", params);
		}
	};
	var SlackListsItems = class extends BaseAPI {
		create(params = {}) {
			return this._post("slackLists.items.create", params);
		}
		delete(params = {}) {
			return this._post("slackLists.items.delete", params);
		}
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
	};
	var SlackLists = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Stars.ts
	var Stars = class extends BaseAPI {
		add(params = {}) {
			return this._post("stars.add", params);
		}
		list(params = {}) {
			return this._get("stars.list", params);
		}
		remove(params = {}) {
			return this._post("stars.remove", params);
		}
	};
	//#endregion
	//#region src/methods/Team.ts
	var TeamProfile = class extends BaseAPI {
		get(params = {}) {
			return this._get("team.profile.get", params);
		}
	};
	var TeamBilling = class extends BaseAPI {
		info(params = {}) {
			return this._get("team.billing.info", params);
		}
	};
	var TeamPreferences = class extends BaseAPI {
		list(params = {}) {
			return this._get("team.preferences.list", params);
		}
	};
	var TeamExternalTeams = class extends BaseAPI {
		disconnect(params = {}) {
			return this._post("team.externalTeams.disconnect", params);
		}
		list(params = {}) {
			return this._get("team.externalTeams.list", params);
		}
	};
	var Team = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Tooling.ts
	var ToolingTokens = class extends BaseAPI {
		rotate(params = {}) {
			return this._post_form("tooling.tokens.rotate", params);
		}
	};
	var Tooling = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.tokens = new ToolingTokens(token, retries_limit);
		}
	};
	//#endregion
	//#region src/methods/UserGroups.ts
	var UserGroupsUsers = class extends BaseAPI {
		list(params = {}) {
			return this._get("usergroups.users.list", params);
		}
		update(params = {}) {
			return this._post("usergroups.users.update", params);
		}
	};
	var UserGroups = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.users = new UserGroupsUsers(token, retries_limit);
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
	};
	//#endregion
	//#region src/methods/Users.ts
	var UsersProfile = class extends BaseAPI {
		get(params = {}) {
			return this._get("users.profile.get", params);
		}
		set(params = {}) {
			return this._post("users.profile.set", params);
		}
	};
	var UsersDiscoverableContacts = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("users.discoverableContacts.lookup", params);
		}
	};
	var Users = class extends BaseAPI {
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
			const { image, ...args } = this._normalizeArgs(params, "params");
			return this._post_file("users.setPhoto", { image }, args);
		}
		setPresence(params = {}) {
			return this._post("users.setPresence", params);
		}
	};
	//#endregion
	//#region src/methods/Views.ts
	var Views = class extends BaseAPI {
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
	};
	//#endregion
	//#region src/methods/Workflows.ts
	var WorkflowsFeatured = class extends BaseAPI {
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
	};
	var Workflows = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.featured = new WorkflowsFeatured(token, retries_limit);
		}
	};
	//#endregion
	//#region src/index.ts
	var Methods = class {
		constructor(token, retries_limit = 3) {
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
			this.openid = new OpenID(token, retries_limit);
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
		paginate(api, params = {}, method = "post", max_pages = 20) {
			return this.api.paginate(api, params, method, max_pages);
		}
	};
	/**
	* Creates a Slack Web API client.
	* @param {string|null} token Bot/User token (xoxb- / xoxp-). May be null if you only call token-free APIs.
	* @param {number} [retries_limit] Extra retry attempts on HTTP 429 (default 3)
	* @return {Object} A client with one property per category (chat, conversations, files, etc.)
	*/
	global.methods = (token, retries_limit = 3) => new Methods(token, retries_limit);
	//#endregion
	exports.Methods = Methods;
	return exports;
})({});
