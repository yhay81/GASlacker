var GASlacker = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	// src/util.ts
	var isNil = (value) => value === null || value === void 0;
	var normalizeFormValue = (key, value) => {
		if (isNil(value)) return null;
		if (Array.isArray(value) && key !== "blocks" && key !== "attachments" && !value.some((item) => item !== null && typeof item === "object")) return value.join(",");
		if (typeof value === "object") return JSON.stringify(value);
		return String(value);
	};
	var queryEncode = (params) => {
		if (params == null) return "";
		const param_list = [];
		for (const [key, rawValue] of Object.entries(params)) {
			const value = normalizeFormValue(key, rawValue);
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
			const value = normalizeFormValue(key, rawValue);
			if (value === null) continue;
			payload[key] = value;
		}
		return payload;
	};
	// src/methods/BaseAPI.ts
	var _BaseAPI;
	var MAX_RETRIES = 10;
	var MAX_TOTAL_SLEEP_MILLISECONDS = 3e5;
	var BaseAPI = class BaseAPI {
		constructor(_token = null, _retries_limit = 3) {
			this._token = _token;
			this._retries_limit = _retries_limit;
			if (!Number.isInteger(this._retries_limit) || this._retries_limit < 0 || this._retries_limit > MAX_RETRIES) throw new Error(`retries_limit must be an integer between 0 and ${MAX_RETRIES}`);
		}
		_get(api, args = {}, parseResponse) {
			const encodedArgs = queryEncode(this._normalizeArgs(args, "params"));
			const query = encodedArgs ? `?${encodedArgs}` : "";
			return this._request(api, {
				method: "get",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8"
			}, query, parseResponse);
		}
		_post(api, args = {}, parseResponse) {
			const payload = createPayload(this._normalizeArgs(args, "params"));
			return this._request(api, {
				method: "post",
				contentType: "application/json; charset=UTF-8",
				payload: JSON.stringify(payload)
			}, "", parseResponse);
		}
		_post_form(api, args = {}, parseResponse) {
			const payload = createFormPayload(this._normalizeArgs(args, "params"));
			return this._request(api, {
				method: "post",
				contentType: "application/x-www-form-urlencoded",
				payload
			}, "", parseResponse);
		}
		_post_file(api, file_args, args = {}) {
			const safeArgs = this._normalizeArgs(args, "params");
			const safeFileArgs = this._normalizeArgs(file_args, "file_params");
			const payload = createFormPayload(safeArgs);
			const filePayload = createPayload(safeFileArgs);
			return this._request(api, {
				method: "post",
				payload: {
					...filePayload,
					...payload
				}
			});
		}
		_request(api, params, query = "", parseResponse) {
			if (typeof api !== "string" || !/^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(api)) throw new Error("api must be a Slack method name");
			return this._fetch(`${BaseAPI.API_ENDPOINT}${api}${query}`, {
				...params,
				headers: this._token ? { Authorization: `Bearer ${this._token}` } : {},
				followRedirects: false
			}, parseResponse);
		}
		_fetch(url, params = {}, parseResponse = (response) => this._parseResponse(response.getContentText())) {
			var _params$muteHttpExcep;
			const requestParams = {
				...params,
				muteHttpExceptions: (_params$muteHttpExcep = params === null || params === void 0 ? void 0 : params.muteHttpExceptions) !== null && _params$muteHttpExcep !== void 0 ? _params$muteHttpExcep : true
			};
			let totalSleepMilliseconds = 0;
			for (let attempt = 0;; attempt++) {
				const response = UrlFetchApp.fetch(url, requestParams);
				if (response.getResponseCode() !== 429) return parseResponse(response);
				const retryAfterHeader = this._getHeader(response.getHeaders(), "retry-after");
				const parsedRetryAfter = Number(retryAfterHeader);
				const retryAfter = retryAfterHeader != null && retryAfterHeader.trim() !== "" && Number.isFinite(parsedRetryAfter) && parsedRetryAfter >= 0 ? parsedRetryAfter : 1;
				const waitMilliseconds = Math.ceil(retryAfter * 1e3);
				if (attempt === this._retries_limit || totalSleepMilliseconds + waitMilliseconds > MAX_TOTAL_SLEEP_MILLISECONDS) return {
					...this._parseResponse(response.getContentText()),
					ok: false,
					error: "ratelimited",
					retry_after: retryAfter
				};
				Utilities.sleep(waitMilliseconds);
				totalSleepMilliseconds += waitMilliseconds;
			}
		}
		_getHeader(headers, name) {
			if (!headers) return null;
			const found = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
			if (!found) return null;
			return String(headers[found]);
		}
		_normalizeArgs(args, name) {
			if (args == null) return {};
			if (typeof args !== "object" || Array.isArray(args)) throw new Error(`${name} must be an object`);
			return args;
		}
		_parseResponse(text, isSuccess) {
			if (!text) return {
				ok: false,
				error: "empty_response"
			};
			try {
				const parsed = JSON.parse(text);
				if (typeof (parsed === null || parsed === void 0 ? void 0 : parsed.ok) === "boolean") return parsed;
				if ((parsed === null || parsed === void 0 ? void 0 : parsed.ok) === void 0 && !(parsed === null || parsed === void 0 ? void 0 : parsed.error) && (isSuccess === null || isSuccess === void 0 ? void 0 : isSuccess(parsed))) return {
					...parsed,
					ok: true
				};
				return {
					ok: false,
					error: "invalid_response",
					raw: text
				};
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
	// src/methods/Admin.ts
	function legalHoldParams(params, arrayField) {
		const value = params === null || params === void 0 ? void 0 : params[arrayField];
		return Array.isArray(value) ? {
			...params,
			[arrayField]: JSON.stringify(value)
		} : params;
	}
	var AdminAnalyticsMessages = class extends BaseAPI {
		activity(params = {}) {
			return this._get("admin.analytics.messages.activity", params);
		}
		metadata(params = {}) {
			return this._get("admin.analytics.messages.metadata", params);
		}
	};
	var AdminAnalyticsSlackbot = class extends BaseAPI {
		skills(params = {}) {
			return this._get("admin.analytics.slackbot.skills", params);
		}
		tools(params = {}) {
			return this._get("admin.analytics.slackbot.tools", params);
		}
	};
	var AdminAnalytics = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.messages = new AdminAnalyticsMessages(token, retries_limit);
			this.slackbot = new AdminAnalyticsSlackbot(token, retries_limit);
		}
		getFile(params = {}) {
			return this._get("admin.analytics.getFile", params, (response) => {
				const contentType = this._getHeader(response.getHeaders(), "content-type");
				if (response.getResponseCode() === 200 && (contentType === null || contentType === void 0 ? void 0 : contentType.split(";")[0].trim().toLowerCase()) === "application/gzip") return {
					ok: true,
					file: response.getBlob()
				};
				return this._parseResponse(response.getContentText());
			});
		}
	};
	var AdminAppsActivities = class extends BaseAPI {
		list(params = {}) {
			return this._post_form("admin.apps.activities.list", params);
		}
	};
	var AdminAppsApproved = class extends BaseAPI {
		list(params = {}) {
			return this._get("admin.apps.approved.list", params);
		}
	};
	var AdminAppsConfig = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("admin.apps.config.lookup", params);
		}
		set(params = {}) {
			return this._post("admin.apps.config.set", params);
		}
	};
	var AdminAppsMcpServersPermissions = class extends BaseAPI {
		list(params = {}) {
			return this._post("admin.apps.mcp.servers.permissions.list", params);
		}
		set(params = {}) {
			return this._post("admin.apps.mcp.servers.permissions.set", params);
		}
	};
	var AdminAppsMcpServers = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.permissions = new AdminAppsMcpServersPermissions(token, retries_limit);
		}
		list(params = {}) {
			return this._post("admin.apps.mcp.servers.list", params);
		}
	};
	var AdminAppsMcp = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.servers = new AdminAppsMcpServers(token, retries_limit);
		}
	};
	var AdminAppsPermissions = class extends BaseAPI {
		add(params = {}) {
			return this._post("admin.apps.permissions.add", params);
		}
		list(params = {}) {
			return this._post("admin.apps.permissions.list", params);
		}
		remove(params = {}) {
			return this._post("admin.apps.permissions.remove", params);
		}
		set(params = {}) {
			return this._post("admin.apps.permissions.set", params);
		}
	};
	var AdminAppsRequests = class extends BaseAPI {
		cancel(params = {}) {
			return this._post("admin.apps.requests.cancel", params);
		}
		list(params = {}) {
			return this._get("admin.apps.requests.list", params);
		}
	};
	var AdminAppsRestricted = class extends BaseAPI {
		list(params = {}) {
			return this._get("admin.apps.restricted.list", params);
		}
	};
	var AdminApps = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.activities = new AdminAppsActivities(token, retries_limit);
			this.approved = new AdminAppsApproved(token, retries_limit);
			this.config = new AdminAppsConfig(token, retries_limit);
			this.mcp = new AdminAppsMcp(token, retries_limit);
			this.permissions = new AdminAppsPermissions(token, retries_limit);
			this.requests = new AdminAppsRequests(token, retries_limit);
			this.restricted = new AdminAppsRestricted(token, retries_limit);
		}
		approve(params = {}) {
			return this._post("admin.apps.approve", params);
		}
		clearResolution(params = {}) {
			return this._post("admin.apps.clearResolution", params);
		}
		restrict(params = {}) {
			return this._post("admin.apps.restrict", params);
		}
		uninstall(params = {}) {
			return this._post("admin.apps.uninstall", params);
		}
	};
	var AdminAuditAnomalyAllow = class extends BaseAPI {
		getItem(params = {}) {
			return this._post("admin.audit.anomaly.allow.getItem", params);
		}
		updateItem(params = {}) {
			return this._post("admin.audit.anomaly.allow.updateItem", params);
		}
	};
	var AdminAuditAnomaly = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.allow = new AdminAuditAnomalyAllow(token, retries_limit);
		}
	};
	var AdminAudit = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.anomaly = new AdminAuditAnomaly(token, retries_limit);
		}
	};
	var AdminAuthPolicy = class extends BaseAPI {
		assignEntities(params = {}) {
			return this._post("admin.auth.policy.assignEntities", params);
		}
		getEntities(params = {}) {
			return this._post("admin.auth.policy.getEntities", params);
		}
		removeEntities(params = {}) {
			return this._post("admin.auth.policy.removeEntities", params);
		}
	};
	var AdminAuth = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.policy = new AdminAuthPolicy(token, retries_limit);
		}
	};
	var AdminBarriers = class extends BaseAPI {
		create(params = {}) {
			return this._post_form("admin.barriers.create", params);
		}
		delete(params = {}) {
			return this._post_form("admin.barriers.delete", params);
		}
		delete_(params = {}) {
			return this.delete(params);
		}
		list(params = {}) {
			return this._get("admin.barriers.list", params);
		}
		update(params = {}) {
			return this._post_form("admin.barriers.update", params);
		}
	};
	var AdminConversationsEkm = class extends BaseAPI {
		listOriginalConnectedChannelInfo(params = {}) {
			return this._post_form("admin.conversations.ekm.listOriginalConnectedChannelInfo", params);
		}
	};
	var AdminConversationsRestrictAccess = class extends BaseAPI {
		addGroup(params = {}) {
			return this._get("admin.conversations.restrictAccess.addGroup", params);
		}
		listGroups(params = {}) {
			return this._get("admin.conversations.restrictAccess.listGroups", params);
		}
		removeGroup(params = {}) {
			return this._get("admin.conversations.restrictAccess.removeGroup", params);
		}
	};
	var AdminConversations = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.ekm = new AdminConversationsEkm(token, retries_limit);
			this.restrictAccess = new AdminConversationsRestrictAccess(token, retries_limit);
		}
		archive(params = {}) {
			return this._post("admin.conversations.archive", params);
		}
		bulkArchive(params = {}) {
			return this._post_form("admin.conversations.bulkArchive", params);
		}
		bulkDelete(params = {}) {
			return this._post_form("admin.conversations.bulkDelete", params);
		}
		bulkMove(params = {}) {
			return this._post_form("admin.conversations.bulkMove", params);
		}
		bulkSetExcludeFromSlackAi(params = {}) {
			return this._get("admin.conversations.bulkSetExcludeFromSlackAi", params);
		}
		bulkSetProperties(params = {}) {
			return this._post_form("admin.conversations.bulkSetProperties", params);
		}
		convertToPrivate(params = {}) {
			return this._post("admin.conversations.convertToPrivate", params);
		}
		convertToPublic(params = {}) {
			return this._post("admin.conversations.convertToPublic", params);
		}
		create(params = {}) {
			return this._post("admin.conversations.create", params);
		}
		createForObjects(params = {}) {
			return this._post("admin.conversations.createForObjects", params);
		}
		delete(params = {}) {
			return this._post("admin.conversations.delete", params);
		}
		delete_(params = {}) {
			return this.delete(params);
		}
		disconnectShared(params = {}) {
			return this._post("admin.conversations.disconnectShared", params);
		}
		getConversationPrefs(params = {}) {
			return this._post("admin.conversations.getConversationPrefs", params);
		}
		getCustomRetention(params = {}) {
			return this._post("admin.conversations.getCustomRetention", params);
		}
		getTeams(params = {}) {
			return this._post("admin.conversations.getTeams", params);
		}
		invite(params = {}) {
			return this._post("admin.conversations.invite", params);
		}
		kick(params = {}) {
			return this._post("admin.conversations.kick", params);
		}
		linkObjects(params = {}) {
			return this._post("admin.conversations.linkObjects", params);
		}
		lookup(params = {}) {
			return this._post_form("admin.conversations.lookup", params);
		}
		removeCustomRetention(params = {}) {
			return this._post("admin.conversations.removeCustomRetention", params);
		}
		rename(params = {}) {
			return this._post("admin.conversations.rename", params);
		}
		search(params = {}) {
			return this._post("admin.conversations.search", params);
		}
		setConversationPrefs(params = {}) {
			return this._post("admin.conversations.setConversationPrefs", params);
		}
		setCustomRetention(params = {}) {
			return this._post("admin.conversations.setCustomRetention", params);
		}
		setTeams(params = {}) {
			return this._post("admin.conversations.setTeams", params);
		}
		unarchive(params = {}) {
			return this._post("admin.conversations.unarchive", params);
		}
		unlinkObjects(params = {}) {
			return this._post("admin.conversations.unlinkObjects", params);
		}
	};
	var AdminEmoji = class extends BaseAPI {
		add(params = {}) {
			return this._get("admin.emoji.add", params);
		}
		addAlias(params = {}) {
			return this._get("admin.emoji.addAlias", params);
		}
		list(params = {}) {
			return this._get("admin.emoji.list", params);
		}
		remove(params = {}) {
			return this._get("admin.emoji.remove", params);
		}
		rename(params = {}) {
			return this._get("admin.emoji.rename", params);
		}
	};
	var AdminFunctionsPermissions = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("admin.functions.permissions.lookup", params);
		}
		set(params = {}) {
			return this._post("admin.functions.permissions.set", params);
		}
	};
	var AdminFunctions = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.permissions = new AdminFunctionsPermissions(token, retries_limit);
		}
		list(params = {}) {
			return this._post("admin.functions.list", params);
		}
	};
	var AdminInviteRequestsApproved = class extends BaseAPI {
		list(params = {}) {
			return this._post("admin.inviteRequests.approved.list", params);
		}
	};
	var AdminInviteRequestsDenied = class extends BaseAPI {
		list(params = {}) {
			return this._post("admin.inviteRequests.denied.list", params);
		}
	};
	var AdminInviteRequests = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.approved = new AdminInviteRequestsApproved(token, retries_limit);
			this.denied = new AdminInviteRequestsDenied(token, retries_limit);
		}
		approve(params = {}) {
			return this._post("admin.inviteRequests.approve", params);
		}
		deny(params = {}) {
			return this._post("admin.inviteRequests.deny", params);
		}
		list(params = {}) {
			return this._post("admin.inviteRequests.list", params);
		}
	};
	var AdminLegalHoldEntities = class extends BaseAPI {
		add(params = {}) {
			return this._post_form("admin.legalHold.entities.add", legalHoldParams(params, "entities"));
		}
		list(params = {}) {
			return this._post_form("admin.legalHold.entities.list", params);
		}
		remove(params = {}) {
			return this._post_form("admin.legalHold.entities.remove", legalHoldParams(params, "ids"));
		}
	};
	var AdminLegalHoldPolicies = class extends BaseAPI {
		activate(params = {}) {
			return this._post_form("admin.legalHold.policies.activate", params);
		}
		create(params = {}) {
			return this._post_form("admin.legalHold.policies.create", legalHoldParams(params, "restrictions"));
		}
		info(params = {}) {
			return this._post_form("admin.legalHold.policies.info", params);
		}
		list(params = {}) {
			return this._post_form("admin.legalHold.policies.list", params);
		}
		release(params = {}) {
			return this._post_form("admin.legalHold.policies.release", params);
		}
		set(params = {}) {
			return this._post_form("admin.legalHold.policies.set", params);
		}
	};
	var AdminLegalHold = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.entities = new AdminLegalHoldEntities(token, retries_limit);
			this.policies = new AdminLegalHoldPolicies(token, retries_limit);
		}
	};
	var AdminRoles = class extends BaseAPI {
		addAssignments(params = {}) {
			return this._post("admin.roles.addAssignments", params);
		}
		listAssignments(params = {}) {
			return this._get("admin.roles.listAssignments", params);
		}
		removeAssignments(params = {}) {
			return this._post("admin.roles.removeAssignments", params);
		}
	};
	var AdminSlackbotSkills = class extends BaseAPI {
		list(params = {}) {
			return this._post("admin.slackbot.skills.list", params);
		}
		publish(params = {}) {
			return this._post("admin.slackbot.skills.publish", params);
		}
		setAutoEnabled(params = {}) {
			return this._post("admin.slackbot.skills.setAutoEnabled", params);
		}
		unpublish(params = {}) {
			return this._post("admin.slackbot.skills.unpublish", params);
		}
	};
	var AdminSlackbot = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.skills = new AdminSlackbotSkills(token, retries_limit);
		}
	};
	var AdminTeamsAdmins = class extends BaseAPI {
		list(params = {}) {
			return this._get("admin.teams.admins.list", params);
		}
	};
	var AdminTeamsOwners = class extends BaseAPI {
		list(params = {}) {
			return this._get("admin.teams.owners.list", params);
		}
	};
	var AdminTeamsSettings = class extends BaseAPI {
		info(params = {}) {
			return this._post("admin.teams.settings.info", params);
		}
		setDefaultChannels(params = {}) {
			return this._get("admin.teams.settings.setDefaultChannels", params);
		}
		setDescription(params = {}) {
			return this._post("admin.teams.settings.setDescription", params);
		}
		setDiscoverability(params = {}) {
			return this._post("admin.teams.settings.setDiscoverability", params);
		}
		setIcon(params = {}) {
			return this._get("admin.teams.settings.setIcon", params);
		}
		setName(params = {}) {
			return this._post("admin.teams.settings.setName", params);
		}
	};
	var AdminTeams = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.admins = new AdminTeamsAdmins(token, retries_limit);
			this.owners = new AdminTeamsOwners(token, retries_limit);
			this.settings = new AdminTeamsSettings(token, retries_limit);
		}
		create(params = {}) {
			return this._post("admin.teams.create", params);
		}
		list(params = {}) {
			return this._post("admin.teams.list", params);
		}
	};
	var AdminUsergroups = class extends BaseAPI {
		addChannels(params = {}) {
			return this._post("admin.usergroups.addChannels", params);
		}
		addTeams(params = {}) {
			return this._post("admin.usergroups.addTeams", params);
		}
		addUsers(params = {}) {
			return this._post("admin.usergroups.addUsers", params);
		}
		create(params = {}) {
			return this._post("admin.usergroups.create", params);
		}
		fetch(params = {}) {
			return this._post("admin.usergroups.fetch", params);
		}
		listChannels(params = {}) {
			return this._post("admin.usergroups.listChannels", params);
		}
		removeChannels(params = {}) {
			return this._post("admin.usergroups.removeChannels", params);
		}
		removeTeams(params = {}) {
			return this._post("admin.usergroups.removeTeams", params);
		}
		removeUsers(params = {}) {
			return this._post("admin.usergroups.removeUsers", params);
		}
		update(params = {}) {
			return this._post("admin.usergroups.update", params);
		}
		uploadUsers(params = {}) {
			return this._post("admin.usergroups.uploadUsers", params);
		}
	};
	var AdminUsersAccess = class extends BaseAPI {
		pause(params = {}) {
			return this._post("admin.users.access.pause", params);
		}
		resume(params = {}) {
			return this._post("admin.users.access.resume", params);
		}
	};
	var AdminUsersSession = class extends BaseAPI {
		clearSettings(params = {}) {
			return this._post("admin.users.session.clearSettings", params);
		}
		getSettings(params = {}) {
			return this._post("admin.users.session.getSettings", params);
		}
		invalidate(params = {}) {
			return this._post("admin.users.session.invalidate", params);
		}
		list(params = {}) {
			return this._post("admin.users.session.list", params);
		}
		reset(params = {}) {
			return this._post("admin.users.session.reset", params);
		}
		resetBulk(params = {}) {
			return this._post("admin.users.session.resetBulk", params);
		}
		setSettings(params = {}) {
			return this._post("admin.users.session.setSettings", params);
		}
	};
	var AdminUsersUnsupportedVersions = class extends BaseAPI {
		export(params = {}) {
			return this._post_form("admin.users.unsupportedVersions.export", params);
		}
	};
	var AdminUsers = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.access = new AdminUsersAccess(token, retries_limit);
			this.session = new AdminUsersSession(token, retries_limit);
			this.unsupportedVersions = new AdminUsersUnsupportedVersions(token, retries_limit);
		}
		assign(params = {}) {
			return this._post("admin.users.assign", params);
		}
		deactivate(params = {}) {
			return this._post("admin.users.deactivate", params);
		}
		getExpiration(params = {}) {
			return this._get("admin.users.getExpiration", params);
		}
		invite(params = {}) {
			return this._post("admin.users.invite", params);
		}
		list(params = {}) {
			return this._post("admin.users.list", params);
		}
		remove(params = {}) {
			return this._post("admin.users.remove", params);
		}
		setAdmin(params = {}) {
			return this._post("admin.users.setAdmin", params);
		}
		setExpiration(params = {}) {
			return this._post("admin.users.setExpiration", params);
		}
		setOwner(params = {}) {
			return this._post("admin.users.setOwner", params);
		}
		setRegular(params = {}) {
			return this._post("admin.users.setRegular", params);
		}
	};
	var AdminWorkflowsCollaborators = class extends BaseAPI {
		add(params = {}) {
			return this._post("admin.workflows.collaborators.add", params);
		}
		remove(params = {}) {
			return this._post("admin.workflows.collaborators.remove", params);
		}
	};
	var AdminWorkflowsPermissions = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("admin.workflows.permissions.lookup", params);
		}
	};
	var AdminWorkflowsTriggersTypesPermissions = class extends BaseAPI {
		lookup(params = {}) {
			return this._post("admin.workflows.triggers.types.permissions.lookup", params, (response) => this._parseResponse(response.getContentText(), (data) => response.getResponseCode() === 200 && (data === null || data === void 0 ? void 0 : data.permissions) !== null && typeof (data === null || data === void 0 ? void 0 : data.permissions) === "object" && !Array.isArray(data.permissions)));
		}
		set(params = {}) {
			return this._post("admin.workflows.triggers.types.permissions.set", params);
		}
	};
	var AdminWorkflowsTriggersTypes = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.permissions = new AdminWorkflowsTriggersTypesPermissions(token, retries_limit);
		}
	};
	var AdminWorkflowsTriggers = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.types = new AdminWorkflowsTriggersTypes(token, retries_limit);
		}
	};
	var AdminWorkflows = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.collaborators = new AdminWorkflowsCollaborators(token, retries_limit);
			this.permissions = new AdminWorkflowsPermissions(token, retries_limit);
			this.triggers = new AdminWorkflowsTriggers(token, retries_limit);
		}
		search(params = {}) {
			return this._post("admin.workflows.search", params);
		}
		unpublish(params = {}) {
			return this._post("admin.workflows.unpublish", params);
		}
	};
	var Admin = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.analytics = new AdminAnalytics(token, retries_limit);
			this.apps = new AdminApps(token, retries_limit);
			this.audit = new AdminAudit(token, retries_limit);
			this.auth = new AdminAuth(token, retries_limit);
			this.barriers = new AdminBarriers(token, retries_limit);
			this.conversations = new AdminConversations(token, retries_limit);
			this.emoji = new AdminEmoji(token, retries_limit);
			this.functions = new AdminFunctions(token, retries_limit);
			this.inviteRequests = new AdminInviteRequests(token, retries_limit);
			this.legalHold = new AdminLegalHold(token, retries_limit);
			this.roles = new AdminRoles(token, retries_limit);
			this.slackbot = new AdminSlackbot(token, retries_limit);
			this.teams = new AdminTeams(token, retries_limit);
			this.usergroups = new AdminUsergroups(token, retries_limit);
			this.users = new AdminUsers(token, retries_limit);
			this.workflows = new AdminWorkflows(token, retries_limit);
		}
	};
	// src/methods/Agents.ts
	var AgentsConversations = class extends BaseAPI {
		archive(params = {}) {
			return this._post("agents.conversations.archive", params);
		}
		create(params = {}) {
			return this._post("agents.conversations.create", params);
		}
		getCanvas(params = {}) {
			return this._post("agents.conversations.getCanvas", params);
		}
		listViews(params = {}) {
			return this._post("agents.conversations.listViews", params);
		}
		removeView(params = {}) {
			return this._post("agents.conversations.removeView", params);
		}
		setCanvasContent(params = {}) {
			return this._post("agents.conversations.setCanvasContent", params);
		}
		setCommands(params = {}) {
			return this._post("agents.conversations.setCommands", params);
		}
		setProperties(params = {}) {
			return this._post("agents.conversations.setProperties", params);
		}
		setView(params = {}) {
			return this._post("agents.conversations.setView", params);
		}
	};
	var AgentsSessions = class extends BaseAPI {
		rename(params = {}) {
			return this._post("agents.sessions.rename", params);
		}
		setStatus(params = {}) {
			return this._post("agents.sessions.setStatus", params);
		}
	};
	var Agents = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.conversations = new AgentsConversations(token, retries_limit);
			this.sessions = new AgentsSessions(token, retries_limit);
		}
	};
	// src/methods/API.ts
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
			if (method === "post") return this._post(api, params);
			throw new Error("method must be get, post, or form");
		}
		paginate(api, params = {}, method = "post", max_pages) {
			if (max_pages !== void 0 && (!Number.isInteger(max_pages) || max_pages < 1)) throw new Error("max_pages must be a positive integer");
			const pages = [];
			const requestedCursors = /* @__PURE__ */ new Set();
			let pageParams = params;
			while (max_pages === void 0 || pages.length < max_pages) {
				var _res$response_metadat;
				const cursor = pageParams === null || pageParams === void 0 ? void 0 : pageParams.cursor;
				if (cursor) {
					if (requestedCursors.has(cursor)) throw new Error("Slack returned a repeated pagination cursor");
					requestedCursors.add(cursor);
				}
				const res = this.call(api, pageParams, method);
				pages.push(res);
				const nextCursor = (_res$response_metadat = res.response_metadata) === null || _res$response_metadat === void 0 ? void 0 : _res$response_metadat.next_cursor;
				if (!res.ok || !nextCursor) break;
				pageParams = {
					...params,
					cursor: nextCursor
				};
			}
			return pages;
		}
		test(params = {}) {
			return this._post_form("api.test", params);
		}
	};
	// src/methods/Apps.ts
	var AppsConnections = class extends BaseAPI {
		open(params = {}) {
			return this._post("apps.connections.open", params);
		}
	};
	var AppsEventAuthorizations = class extends BaseAPI {
		list(params = {}) {
			return this._post("apps.event.authorizations.list", params);
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
			return this._post("apps.manifest.export", params);
		}
		update(params = {}) {
			return this._post("apps.manifest.update", params);
		}
		validate(params = {}) {
			return this._post("apps.manifest.validate", params);
		}
	};
	var AppsUserConnection = class extends BaseAPI {
		bulkUpdate(params = {}) {
			return this._post_form("apps.user.connection.bulkUpdate", params);
		}
		requestAuth(params = {}) {
			return this._post_form("apps.user.connection.requestAuth", params);
		}
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
			this.activities = { list: (params = {}) => this._post_form("apps.activities.list", params) };
			this.auth = { external: {
				delete: (params = {}) => this._post("apps.auth.external.delete", params),
				delete_: (params = {}) => this.auth.external.delete(params),
				get: (params = {}) => this._post("apps.auth.external.get", params)
			} };
			this.datastore = {
				bulkDelete: (params = {}) => this._post("apps.datastore.bulkDelete", params),
				bulkGet: (params = {}) => this._post("apps.datastore.bulkGet", params),
				bulkPut: (params = {}) => this._post("apps.datastore.bulkPut", params),
				count: (params = {}) => this._post("apps.datastore.count", params),
				delete: (params = {}) => this._post("apps.datastore.delete", params),
				delete_: (params = {}) => this.datastore.delete(params),
				get: (params = {}) => this._post("apps.datastore.get", params),
				put: (params = {}) => this._post("apps.datastore.put", params),
				query: (params = {}) => this._post("apps.datastore.query", params),
				update: (params = {}) => this._post("apps.datastore.update", params)
			};
			this.icon = { set: (params = {}) => {
				const { file, ...fields } = this._normalizeArgs(params, "params");
				return this._post_file("apps.icon.set", { file }, fields);
			} };
			this.links = { toggle: (params = {}) => this._post_form("apps.links.toggle", params) };
			this.managed = { permissions: { set: (params = {}) => this._post("apps.managed.permissions.set", params) } };
			this.connections = new AppsConnections(token, retries_limit);
			this.eventAuthorizations = new AppsEventAuthorizations(token, retries_limit);
			this.event = { authorizations: this.eventAuthorizations };
			this.manifest = new AppsManifest(token, retries_limit);
			this.user = new AppsUser(token, retries_limit);
		}
		uninstall(params = {}) {
			return this._post_form("apps.uninstall", params);
		}
	};
	// src/methods/Assistant.ts
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
			this.search = {
				context: (params = {}) => this._post("assistant.search.context", params),
				info: (params = {}) => this._post("assistant.search.info", params)
			};
			this.threads = new AssistantThreads(token, retries_limit);
		}
	};
	// src/methods/Auth.ts
	var AuthTeams = class extends BaseAPI {
		list(params = {}) {
			return this._post_form("auth.teams.list", params);
		}
	};
	var Auth = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.teams = new AuthTeams(token, retries_limit);
		}
		revoke(params = {}) {
			return this._get("auth.revoke", params);
		}
		test(params = {}) {
			return this._post("auth.test", params);
		}
	};
	// src/methods/Blocks.ts
	var Blocks = class extends BaseAPI {
		validate(params = {}) {
			return this._post_form("blocks.validate", params);
		}
	};
	// src/methods/Bookmarks.ts
	var Bookmarks = class extends BaseAPI {
		add(params = {}) {
			return this._post("bookmarks.add", params);
		}
		edit(params = {}) {
			return this._post("bookmarks.edit", params);
		}
		list(params = {}) {
			return this._post("bookmarks.list", params);
		}
		remove(params = {}) {
			return this._post("bookmarks.remove", params);
		}
	};
	// src/methods/Bots.ts
	var Bots = class extends BaseAPI {
		info(params = {}) {
			return this._get("bots.info", params);
		}
	};
	// src/methods/Calls.ts
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
			return this._post("calls.info", params);
		}
		update(params = {}) {
			return this._post("calls.update", params);
		}
	};
	// src/methods/Canvases.ts
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
		getContent(params = {}) {
			return this._post("canvases.getContent", params);
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
	// src/methods/Chat.ts
	var ChatScheduledMessages = class extends BaseAPI {
		list(params = {}) {
			return this._post("chat.scheduledMessages.list", params);
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
	// src/methods/Conversations.ts
	var ConversationsCanvases = class extends BaseAPI {
		create(params = {}) {
			return this._post("conversations.canvases.create", params);
		}
	};
	var ConversationsExternalInvitePermissions = class extends BaseAPI {
		set(params = {}) {
			return this._post_form("conversations.externalInvitePermissions.set", params);
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
			return this._post("conversations.requestSharedInvite.list", params);
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
			return this._get("conversations.declineSharedInvite", params);
		}
		inviteShared(params = {}) {
			return this._post("conversations.inviteShared", params);
		}
		listConnectInvites(params = {}) {
			return this._post("conversations.listConnectInvites", params);
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
	// src/methods/Dialog.ts
	var Dialog = class extends BaseAPI {
		open(params = {}) {
			return this._post("dialog.open", params);
		}
	};
	// src/methods/DND.ts
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
	// src/methods/Emoji.ts
	var Emoji = class extends BaseAPI {
		list(params = {}) {
			return this._get("emoji.list", params);
		}
	};
	// src/methods/Enterprise.ts
	var Enterprise = class extends BaseAPI {
		constructor(..._args) {
			super(..._args);
			this.auth = { idpconfig: {
				apply: (params = {}) => this._post_form("enterprise.auth.idpconfig.apply", params),
				get: (params = {}) => this._post_form("enterprise.auth.idpconfig.get", params),
				list: (params = {}) => this._post_form("enterprise.auth.idpconfig.list", params),
				remove: (params = {}) => this._post_form("enterprise.auth.idpconfig.remove", params),
				set: (params = {}) => this._post_form("enterprise.auth.idpconfig.set", params)
			} };
		}
	};
	// src/methods/Entity.ts
	var Entity = class extends BaseAPI {
		acknowledgeCommentAction(params = {}) {
			return this._post("entity.acknowledgeCommentAction", params);
		}
		presentComments(params = {}) {
			return this._post("entity.presentComments", params);
		}
		presentDetails(params = {}) {
			return this._post("entity.presentDetails", params);
		}
	};
	// src/methods/Files.ts
	var FilesRemote = class extends BaseAPI {
		add(params = {}) {
			const { preview_image, indexable_file_contents, ...fields } = this._normalizeArgs(params, "params");
			return this._post_file("files.remote.add", {
				preview_image,
				indexable_file_contents
			}, fields);
		}
		info(params = {}) {
			return this._get("files.remote.info", params);
		}
		list(params = {}) {
			return this._get("files.remote.list", params);
		}
		remove(params = {}) {
			return this._post_form("files.remote.remove", params);
		}
		share(params = {}) {
			return this._get("files.remote.share", params);
		}
		update(params = {}) {
			const { preview_image, indexable_file_contents, ...fields } = this._normalizeArgs(params, "params");
			return this._post_file("files.remote.update", {
				preview_image,
				indexable_file_contents
			}, fields);
		}
	};
	var Files = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.comments = {
				delete: (params = {}) => this._post("files.comments.delete", params),
				delete_: (params = {}) => this.comments.delete(params),
				get: (params = {}) => this._get("files.comments.get", params)
			};
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
			const { file, content, filename, snippet_type, alt_txt, title, highlight_type, ...completeArgs } = this._normalizeArgs(params, "params");
			if (file == null && content == null) throw new Error("Specify either file or content");
			const blob = file != null ? file : Utilities.newBlob(String(content));
			if (typeof blob.getBytes !== "function") throw new Error("file must be a Blob");
			const name = (_ref = filename !== null && filename !== void 0 ? filename : typeof blob.getName === "function" ? blob.getName() : null) !== null && _ref !== void 0 ? _ref : "file";
			const urlRes = this.getUploadURLExternal({
				filename: name,
				length: blob.getBytes().length,
				snippet_type,
				alt_txt
			});
			if (!urlRes.ok) return urlRes;
			if (!urlRes.upload_url || !urlRes.file_id) return {
				ok: false,
				error: "invalid_response"
			};
			const uploadRes = this._fetch(urlRes.upload_url, {
				method: "post",
				payload: blob
			}, (response) => response.getResponseCode() === 200 ? { ok: true } : {
				ok: false,
				error: "upload_failed",
				raw: response.getContentText()
			});
			if (!uploadRes.ok) return uploadRes;
			return this.completeUploadExternal({
				...completeArgs,
				files: [{
					id: urlRes.file_id,
					title: title !== null && title !== void 0 ? title : name,
					highlight_type
				}]
			});
		}
		getUploadURLExternal(params = {}) {
			return this._post_form("files.getUploadURLExternal", params);
		}
		completeUploadExternal(params = {}) {
			return this._post("files.completeUploadExternal", params);
		}
	};
	// src/methods/Functions.ts
	var Functions = class extends BaseAPI {
		constructor(..._args) {
			super(..._args);
			this.distributions = { permissions: {
				add: (params = {}) => this._post("functions.distributions.permissions.add", params),
				list: (params = {}) => this._post("functions.distributions.permissions.list", params),
				remove: (params = {}) => this._post("functions.distributions.permissions.remove", params),
				set: (params = {}) => this._post("functions.distributions.permissions.set", params)
			} };
			this.workflows = { steps: {
				list: (params = {}) => this._post("functions.workflows.steps.list", params),
				responses: { export: (params = {}) => this._post("functions.workflows.steps.responses.export", params) }
			} };
		}
		completeError(params = {}) {
			return this._post("functions.completeError", params);
		}
		completeSuccess(params = {}) {
			return this._post("functions.completeSuccess", params);
		}
	};
	// src/methods/Links.ts
	var Links = class extends BaseAPI {
		accountLinkedResult(params = {}) {
			return this._post("links.accountLinkedResult", params);
		}
	};
	// src/methods/Migration.ts
	var Migration = class extends BaseAPI {
		exchange(params = {}) {
			return this._get("migration.exchange", params);
		}
	};
	// src/methods/OAuth.ts
	var OAuthTokenRotation = class extends BaseAPI {
		send(api, params) {
			return this._post_form(api, params);
		}
	};
	var OAuth = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(null, retries_limit);
			this.v1 = { access: (params = {}) => this._post_form("oauth.access", params, (response) => this._parseResponse(response.getContentText(), (parsed) => response.getResponseCode() === 200 && typeof (parsed === null || parsed === void 0 ? void 0 : parsed.access_token) === "string" && parsed.access_token.length > 0)) };
			this.v2 = {
				access: (params = {}) => this.access(params),
				beginShortTokenRotation: (params = {}) => this.rotate("oauth.v2.beginShortTokenRotation", params),
				completeShortTokenRotation: (params = {}) => this.rotate("oauth.v2.completeShortTokenRotation", params),
				exchange: (params = {}) => this.rotate("oauth.v2.exchange", params),
				user: { access: (params = {}) => this._post_form("oauth.v2.user.access", params) }
			};
			this.rotation = new OAuthTokenRotation(token, retries_limit);
		}
		rotate(api, params) {
			const fields = this._normalizeArgs(params, "params");
			return fields.token == null ? this.rotation.send(api, fields) : this._post_form(api, fields);
		}
		access(params = {}) {
			return this._post_form("oauth.v2.access", params);
		}
	};
	// src/methods/OpenID.ts
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
			return this._post_form("openid.connect.userInfo", params);
		}
	};
	var OpenID = class extends BaseAPI {
		constructor(token, retries_limit) {
			super(token, retries_limit);
			this.connect = new OpenIDConnect(token, retries_limit);
		}
	};
	// src/methods/Oversight.ts
	var Oversight = class extends BaseAPI {
		constructor(..._args) {
			super(..._args);
			this.chat = {
				delete: (params = {}) => this._post_form("oversight.chat.delete", params),
				delete_: (params = {}) => this.chat.delete(params),
				info: (params = {}) => this._post_form("oversight.chat.info", params),
				restore: (params = {}) => this._post_form("oversight.chat.restore", params),
				tombstone: (params = {}) => this._post_form("oversight.chat.tombstone", params),
				update: (params = {}) => this._post_form("oversight.chat.update", params)
			};
			this.conversations = {
				info: (params = {}) => this._post_form("oversight.conversations.info", params),
				list: (params = {}) => this._post_form("oversight.conversations.list", params),
				members: (params = {}) => this._post_form("oversight.conversations.members", params)
			};
			this.enterprise = { info: (params = {}) => this._post_form("oversight.enterprise.info", params) };
			this.user = {
				conversations: (params = {}) => this._post_form("oversight.user.conversations", params),
				info: (params = {}) => this._post_form("oversight.user.info", params)
			};
			this.users = { list: (params = {}) => this._post_form("oversight.users.list", params) };
		}
	};
	// src/methods/Pins.ts
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
	// src/methods/Reactions.ts
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
	// src/methods/Reminders.ts
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
	// src/methods/RTM.ts
	var RTM = class extends BaseAPI {
		connect(params = {}) {
			return this._get("rtm.connect", params);
		}
		start(params = {}) {
			return this._get("rtm.start", params);
		}
	};
	// src/methods/Search.ts
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
	// src/methods/Slackbot.ts
	var Slackbot = class extends BaseAPI {
		constructor(..._args) {
			super(..._args);
			this.skills = {
				create: (params = {}) => this._post("slackbot.skills.create", params),
				delete: (params = {}) => this._post("slackbot.skills.delete", params),
				delete_: (params = {}) => this.skills.delete(params),
				info: (params = {}) => this._post("slackbot.skills.info", params),
				library: {
					add: (params = {}) => this._post("slackbot.skills.library.add", params),
					remove: (params = {}) => this._post("slackbot.skills.library.remove", params)
				},
				list: (params = {}) => this._post("slackbot.skills.list", params),
				update: (params = {}) => this._post("slackbot.skills.update", params)
			};
		}
	};
	// src/methods/SlackLists.ts
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
			return this._post("slackLists.download.get", params);
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
			return this._post("slackLists.items.info", params);
		}
		list(params = {}) {
			return this._post("slackLists.items.list", params);
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
	// src/methods/Stars.ts
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
	// src/methods/Team.ts
	var TeamProfile = class extends BaseAPI {
		get(params = {}) {
			return this._get("team.profile.get", params);
		}
	};
	var TeamBilling = class extends BaseAPI {
		info(params = {}) {
			return this._post_form("team.billing.info", params);
		}
	};
	var TeamPreferences = class extends BaseAPI {
		list(params = {}) {
			return this._post_form("team.preferences.list", params);
		}
	};
	var TeamExternalTeams = class extends BaseAPI {
		disconnect(params = {}) {
			return this._post_form("team.externalTeams.disconnect", params);
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
	// src/methods/Tooling.ts
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
	// src/methods/UserGroups.ts
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
	// src/methods/Users.ts
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
			return this._get("users.deletePhoto", params);
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
		setPhoto(params = {}) {
			const { image, ...args } = this._normalizeArgs(params, "params");
			return this._post_file("users.setPhoto", { image }, args);
		}
		setPresence(params = {}) {
			return this._post("users.setPresence", params);
		}
	};
	// src/methods/Views.ts
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
	// src/methods/Workflows.ts
	var WorkflowsFeatured = class extends BaseAPI {
		add(params = {}) {
			return this._post("workflows.featured.add", params);
		}
		list(params = {}) {
			return this._post("workflows.featured.list", params);
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
			this.triggers = {
				create: (params = {}) => this._post("workflows.triggers.create", params),
				delete: (params = {}) => this._post("workflows.triggers.delete", params),
				delete_: (params = {}) => this.triggers.delete(params),
				info: (params = {}) => this._post("workflows.triggers.info", params),
				list: (params = {}) => this._post("workflows.triggers.list", params),
				permissions: {
					add: (params = {}) => this._post("workflows.triggers.permissions.add", params),
					list: (params = {}) => this._post("workflows.triggers.permissions.list", params),
					remove: (params = {}) => this._post("workflows.triggers.permissions.remove", params),
					set: (params = {}) => this._post("workflows.triggers.permissions.set", params)
				},
				update: (params = {}) => this._post("workflows.triggers.update", params)
			};
			this.featured = new WorkflowsFeatured(token, retries_limit);
		}
	};
	// src/index.ts
	var Methods = class {
		constructor(token, retries_limit = 3) {
			this.admin = new Admin(token, retries_limit);
			this.agents = new Agents(token, retries_limit);
			this.api = new API(token, retries_limit);
			this.apps = new Apps(token, retries_limit);
			this.assistant = new Assistant(token, retries_limit);
			this.auth = new Auth(token, retries_limit);
			this.blocks = new Blocks(token, retries_limit);
			this.bookmarks = new Bookmarks(token, retries_limit);
			this.bots = new Bots(token, retries_limit);
			this.calls = new Calls(token, retries_limit);
			this.canvases = new Canvases(token, retries_limit);
			this.chat = new Chat(token, retries_limit);
			this.conversations = new Conversations(token, retries_limit);
			this.dialog = new Dialog(token, retries_limit);
			this.dnd = new DND(token, retries_limit);
			this.emoji = new Emoji(token, retries_limit);
			this.enterprise = new Enterprise(token, retries_limit);
			this.entity = new Entity(token, retries_limit);
			this.files = new Files(token, retries_limit);
			this.functions = new Functions(token, retries_limit);
			this.links = new Links(token, retries_limit);
			this.migration = new Migration(token, retries_limit);
			this.oauth = new OAuth(token, retries_limit);
			this.openid = new OpenID(token, retries_limit);
			this.oversight = new Oversight(token, retries_limit);
			this.pins = new Pins(token, retries_limit);
			this.reactions = new Reactions(token, retries_limit);
			this.reminders = new Reminders(token, retries_limit);
			this.rtm = new RTM(token, retries_limit);
			this.search = new Search(token, retries_limit);
			this.slackbot = new Slackbot(token, retries_limit);
			this.slackLists = new SlackLists(token, retries_limit);
			this.stars = new Stars(token, retries_limit);
			this.team = new Team(token, retries_limit);
			this.tooling = new Tooling(null, retries_limit);
			this.usergroups = new UserGroups(token, retries_limit);
			this.users = new Users(token, retries_limit);
			this.views = new Views(token, retries_limit);
			this.workflows = new Workflows(token, retries_limit);
		}
		call(api, params = {}, method = "post") {
			return this.api.call(api, params, method);
		}
		paginate(api, params = {}, method = "post", max_pages) {
			return this.api.paginate(api, params, method, max_pages);
		}
	};
	/**
	* Creates a Slack Web API client.
	* @param {string|null} token Access token with the scopes required by the method, or null for token-free APIs.
	* @param {number} [retries_limit] Extra retry attempts on HTTP 429 (integer 0-10; default 3)
	* @return {Object} A client with one property per category (chat, conversations, files, etc.)
	*/
	function methods(token, retries_limit = 3) {
		return new Methods(token, retries_limit);
	}
	exports.Methods = Methods;
	exports.methods = methods;
	return exports;
})({});
/**
* Creates a Slack Web API client.
* @param {string|null} token Slack access token, or null for token-free methods.
* @param {number} [retries_limit] Extra attempts on HTTP 429 (0–10, default 3).
* @return {Object} The Slack client.
*/
function methods(token, retries_limit) {
	return GASlacker.methods(token, retries_limit);
}
