// this.presence = new Presence(token, retries_limit);
// this.idpgroups = new IDPGroups(token, retries_limit);
// this.incomingwebhook = new IncomingWebhook(url);
function methods(token, retries_limit = _config__WEBPACK_IMPORTED_MODULE_25__['DEFAULT_RETRIES']) {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: DEFAULT_RETRIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RETRIES", function() { return DEFAULT_RETRIES; });
const DEFAULT_RETRIES = 3;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _methods_API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/API */ "./src/methods/API.ts");
/* harmony import */ var _methods_Apps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/Apps */ "./src/methods/Apps.ts");
/* harmony import */ var _methods_Auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/Auth */ "./src/methods/Auth.ts");
/* harmony import */ var _methods_Bots__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/Bots */ "./src/methods/Bots.ts");
/* harmony import */ var _methods_Channels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/Channels */ "./src/methods/Channels.ts");
/* harmony import */ var _methods_Chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methods/Chat */ "./src/methods/Chat.ts");
/* harmony import */ var _methods_Conversations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./methods/Conversations */ "./src/methods/Conversations.ts");
/* harmony import */ var _methods_Dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methods/Dialog */ "./src/methods/Dialog.ts");
/* harmony import */ var _methods_DND__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./methods/DND */ "./src/methods/DND.ts");
/* harmony import */ var _methods_Emoji__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./methods/Emoji */ "./src/methods/Emoji.ts");
/* harmony import */ var _methods_Files__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./methods/Files */ "./src/methods/Files.ts");
/* harmony import */ var _methods_Groups__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./methods/Groups */ "./src/methods/Groups.ts");
/* harmony import */ var _methods_IM__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./methods/IM */ "./src/methods/IM.ts");
/* harmony import */ var _methods_Migration__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./methods/Migration */ "./src/methods/Migration.ts");
/* harmony import */ var _methods_MPIM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./methods/MPIM */ "./src/methods/MPIM.ts");
/* harmony import */ var _methods_OAuth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./methods/OAuth */ "./src/methods/OAuth.ts");
/* harmony import */ var _methods_Pins__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./methods/Pins */ "./src/methods/Pins.ts");
/* harmony import */ var _methods_Reactions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./methods/Reactions */ "./src/methods/Reactions.ts");
/* harmony import */ var _methods_Reminders__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./methods/Reminders */ "./src/methods/Reminders.ts");
/* harmony import */ var _methods_RTM__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./methods/RTM */ "./src/methods/RTM.ts");
/* harmony import */ var _methods_Search__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./methods/Search */ "./src/methods/Search.ts");
/* harmony import */ var _methods_Stars__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./methods/Stars */ "./src/methods/Stars.ts");
/* harmony import */ var _methods_Team__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./methods/Team */ "./src/methods/Team.ts");
/* harmony import */ var _methods_UserGroups__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./methods/UserGroups */ "./src/methods/UserGroups.ts");
/* harmony import */ var _methods_Users__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./methods/Users */ "./src/methods/Users.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./config */ "./src/config.ts");


























class Methods {
    constructor(token, retries_limit = _config__WEBPACK_IMPORTED_MODULE_25__["DEFAULT_RETRIES"]) {
        this.api = new _methods_API__WEBPACK_IMPORTED_MODULE_0__["default"](token, retries_limit);
        this.apps = new _methods_Apps__WEBPACK_IMPORTED_MODULE_1__["default"](token, retries_limit);
        this.auth = new _methods_Auth__WEBPACK_IMPORTED_MODULE_2__["default"](token, retries_limit);
        this.bots = new _methods_Bots__WEBPACK_IMPORTED_MODULE_3__["default"](token, retries_limit);
        this.channels = new _methods_Channels__WEBPACK_IMPORTED_MODULE_4__["default"](token, retries_limit);
        this.chat = new _methods_Chat__WEBPACK_IMPORTED_MODULE_5__["default"](token, retries_limit);
        this.conversations = new _methods_Conversations__WEBPACK_IMPORTED_MODULE_6__["default"](token, retries_limit);
        this.dialog = new _methods_Dialog__WEBPACK_IMPORTED_MODULE_7__["default"](token, retries_limit);
        this.dnd = new _methods_DND__WEBPACK_IMPORTED_MODULE_8__["default"](token, retries_limit);
        this.emoji = new _methods_Emoji__WEBPACK_IMPORTED_MODULE_9__["default"](token, retries_limit);
        this.files = new _methods_Files__WEBPACK_IMPORTED_MODULE_10__["default"](token, retries_limit);
        this.groups = new _methods_Groups__WEBPACK_IMPORTED_MODULE_11__["default"](token, retries_limit);
        this.im = new _methods_IM__WEBPACK_IMPORTED_MODULE_12__["default"](token, retries_limit);
        this.migration = new _methods_Migration__WEBPACK_IMPORTED_MODULE_13__["default"](token, retries_limit);
        this.mpim = new _methods_MPIM__WEBPACK_IMPORTED_MODULE_14__["default"](token, retries_limit);
        this.oauth = new _methods_OAuth__WEBPACK_IMPORTED_MODULE_15__["default"](token, retries_limit);
        this.pins = new _methods_Pins__WEBPACK_IMPORTED_MODULE_16__["default"](token, retries_limit);
        this.reactions = new _methods_Reactions__WEBPACK_IMPORTED_MODULE_17__["default"](token, retries_limit);
        this.reminders = new _methods_Reminders__WEBPACK_IMPORTED_MODULE_18__["default"](token, retries_limit);
        this.rtm = new _methods_RTM__WEBPACK_IMPORTED_MODULE_19__["default"](token, retries_limit);
        this.search = new _methods_Search__WEBPACK_IMPORTED_MODULE_20__["default"](token, retries_limit);
        this.stars = new _methods_Stars__WEBPACK_IMPORTED_MODULE_21__["default"](token, retries_limit);
        this.team = new _methods_Team__WEBPACK_IMPORTED_MODULE_22__["default"](token, retries_limit);
        this.usergroups = new _methods_UserGroups__WEBPACK_IMPORTED_MODULE_23__["default"](token, retries_limit);
        this.users = new _methods_Users__WEBPACK_IMPORTED_MODULE_24__["default"](token, retries_limit);
        // this.presence = new Presence(token, retries_limit);
        // this.idpgroups = new IDPGroups(token, retries_limit);
        // this.incomingwebhook = new IncomingWebhook(url);
    }
}
global.methods = (token, retries_limit = _config__WEBPACK_IMPORTED_MODULE_25__["DEFAULT_RETRIES"]) => new Methods(token, retries_limit);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/methods/API.ts":
/*!****************************!*\
  !*** ./src/methods/API.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return API; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class API extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    test(error = null, foo = null, extraArgs = {}) {
        const args = Object.assign({ error, foo }, extraArgs);
        return this._post('api.test', args);
    }
}


/***/ }),

/***/ "./src/methods/Apps.ts":
/*!*****************************!*\
  !*** ./src/methods/Apps.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Apps; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class AppsPermissions extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.resouces = new AppsPermissionsResouces(token, retries_limit);
        this.scopes = new AppsPermissionsScopes(token, retries_limit);
        this.users = new AppsPermissionsUsers(token, retries_limit);
    }
    info(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('apps.permissions.info', args);
    }
    request(scopes, trigger_id, extraArgs = {}) {
        const args = Object.assign({ scopes, trigger_id }, extraArgs);
        return this._get('apps.permissions.request', args);
    }
}
class AppsPermissionsResouces extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    list(cursor = null, limit = null, extraArgs = {}) {
        const args = Object.assign({ cursor, limit }, extraArgs);
        return this._get('apps.permissions.resouces.list', args);
    }
}
class AppsPermissionsScopes extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    list(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('apps.permissions.scopes.list', args);
    }
}
class AppsPermissionsUsers extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    list(cursor = null, limit = null, extraArgs = {}) {
        const args = Object.assign({ cursor, limit }, extraArgs);
        return this._get('apps.permissions.users.list', args);
    }
    request(scopes, trigger_id, user, extraArgs = {}) {
        const args = Object.assign({ scopes,
            trigger_id,
            user }, extraArgs);
        return this._get('apps.permissions.users.request', args);
    }
}
class Apps extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.permissions = new AppsPermissions(token, retries_limit);
    }
    uninstall(client_id, client_secret, options = {}) {
        const args = Object.assign({ client_id, client_secret }, options);
        return this._get('apps.permissions.users.request', args);
    }
}


/***/ }),

/***/ "./src/methods/Auth.ts":
/*!*****************************!*\
  !*** ./src/methods/Auth.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Auth; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Auth extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    revoke(test = null, extraArgs = {}) {
        const args = Object.assign({ test }, extraArgs);
        return this._get('auth.revoke', args);
    }
    test(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._post('auth.test', args);
    }
}


/***/ }),

/***/ "./src/methods/BaseAPI.ts":
/*!********************************!*\
  !*** ./src/methods/BaseAPI.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseAPI; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");


class BaseAPI {
    constructor(_token = null, _retries_limit = _config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_RETRIES"]) {
        this._token = _token;
        this._retries_limit = _retries_limit;
    }
    _get(api, args = {}) {
        // https://github.com/requests/requests/blob/master/requests/models.py
        const encodedArgs = Object(_util__WEBPACK_IMPORTED_MODULE_0__["queryEncode"])(Object.assign({ token: this._token }, args));
        const url = `${BaseAPI.API_ENDPOINT}${api}?${encodedArgs}`;
        const params = {
            method: 'get',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return this._fetch(url, params);
    }
    _post(api, args = {}) {
        const payload = Object(_util__WEBPACK_IMPORTED_MODULE_0__["createPayload"])(Object.assign({}, args));
        const url = `${BaseAPI.API_ENDPOINT}${api}`;
        const params = {
            headers: { Authorization: `Bearer ${this._token}` },
            method: 'post',
            contentType: 'application/json; charset=UTF-8',
            payload: JSON.stringify(payload)
        };
        return this._fetch(url, params);
    }
    _post_file(api, file_args, args = {}) {
        const payload = Object(_util__WEBPACK_IMPORTED_MODULE_0__["createPayload"])(Object.assign({}, args));
        const url = `${BaseAPI.API_ENDPOINT}${api}?`;
        const params = {
            headers: { Authorization: `Bearer ${this._token}` },
            method: 'post',
            contentType: 'multipart/form-data; charset=UTF-8',
            payload: Object.assign(Object.assign({}, file_args), payload)
        };
        return this._fetch(url, params);
    }
    _fetch(url, params = null, headers = null) {
        let response = null;
        for (let retry = 0; retry < this._retries_limit; retry++) {
            try {
                response = UrlFetchApp.fetch(url, params);
            }
            catch (e) {
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
BaseAPI.API_ENDPOINT = 'https://slack.com/api/';


/***/ }),

/***/ "./src/methods/Bots.ts":
/*!*****************************!*\
  !*** ./src/methods/Bots.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bots; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Bots extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    info(bot = null, extraArgs = {}) {
        const args = Object.assign({ bot }, extraArgs);
        return this._get('bots.info', args);
    }
}


/***/ }),

/***/ "./src/methods/Channels.ts":
/*!*********************************!*\
  !*** ./src/methods/Channels.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Channels; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Channels extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    archive(channel, extraArgs) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('channels.archive', args);
    }
    create(name, validate = null, extraArgs) {
        const args = Object.assign({ name, validate }, extraArgs);
        return this._get('channels.create', args);
    }
    history(channel, count = 100, inclusive = '0', latest = 'now', oldest = 0, unreads = 0, extraArgs) {
        const args = Object.assign({ channel,
            count,
            inclusive,
            latest,
            oldest,
            unreads }, extraArgs);
        return this._get('channels.history', args);
    }
    info(channel, include_locale = false, extraArgs) {
        const args = Object.assign({ channel, include_locale }, extraArgs);
        return this._get('channels.info', args);
    }
    invite(channel, user, extraArgs) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('channels.invite', args);
    }
    join(name, validate = null, extraArgs) {
        const args = Object.assign({ name, validate }, extraArgs);
        return this._post('channels.join', args);
    }
    kick(channel, user, extraArgs) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('channels.kick', args);
    }
    leave(channel, extraArgs) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('channels.leave', args);
    }
    list(cursor = null, exclude_archived = false, exclude_members = false, limit = 0, extraArgs) {
        const args = Object.assign({ cursor,
            exclude_archived,
            exclude_members,
            limit }, extraArgs);
        return this._get('channels.list', args);
    }
    mark(channel, ts, extraArgs) {
        const args = Object.assign({ channel, ts }, extraArgs);
        return this._post('channels.mark', args);
    }
    rename(channel, name, validate = null, extraArgs) {
        const args = Object.assign({ channel, name, validate }, extraArgs);
        return this._get('channels.rename', args);
    }
    replies(channel, thread_ts, extraArgs) {
        const args = Object.assign({ channel, thread_ts }, extraArgs);
        return this._get('channels.replies', args);
    }
    setPurpose(channel, purpose, extraArgs) {
        const args = Object.assign({ channel, purpose }, extraArgs);
        return this._post('channels.setPurpose', args);
    }
    setTopic(channel, topic, extraArgs) {
        const args = Object.assign({ channel, topic }, extraArgs);
        return this._post('channels.setTopic', args);
    }
    unarchive(channel, extraArgs) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('channels.unarchive', args);
    }
}


/***/ }),

/***/ "./src/methods/Chat.ts":
/*!*****************************!*\
  !*** ./src/methods/Chat.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chat; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Chat extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    delete_(channel, ts, as_user = null, extraArgs = {}) {
        const args = Object.assign({ channel, ts, as_user }, extraArgs);
        return this._post('chat.delete', args);
    }
    getPermalink(channel, message_ts, extraArgs = {}) {
        const args = Object.assign({ channel, message_ts }, extraArgs);
        return this._get('chat.getPermalink', args);
    }
    meMessage(channel, text, extraArgs = {}) {
        const args = Object.assign({ channel, text }, extraArgs);
        return this._post('chat.meMessage', args);
    }
    postEphemeral(channel, text, user, as_user = false, attachements = null, link_names = false, parse = 'none', thread_ts = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            text,
            user,
            as_user,
            attachements,
            link_names,
            parse,
            thread_ts }, extraArgs);
        return this._post('chat.postEphemeral', args);
    }
    postMessage(channel, text, as_user = false, attachements = null, icon_emoji = null, icon_url = null, link_names = false, mrkdwn = true, parse = 'none', reply_broadcast = true, thread_ts = null, unfurl_links = null, unfurl_media = null, username = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            text,
            as_user,
            attachements,
            icon_emoji,
            icon_url,
            link_names,
            mrkdwn,
            parse,
            reply_broadcast,
            thread_ts,
            unfurl_links,
            unfurl_media,
            username }, extraArgs);
        return this._post('chat.postMessage', args);
    }
    unfurl(channel, ts, unfurls = null, user_auth_required = '0', user_auth_url = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            ts,
            unfurls,
            user_auth_required,
            user_auth_url }, extraArgs);
        return this._post('chat.unfurl', args);
    }
    update(channel, text, ts, attachements = null, link_names = false, parse = 'none', extraArgs = {}) {
        const args = Object.assign({ channel,
            text,
            ts,
            attachements,
            link_names,
            parse }, extraArgs);
        return this._post('chat.update', args);
    }
}


/***/ }),

/***/ "./src/methods/Conversations.ts":
/*!**************************************!*\
  !*** ./src/methods/Conversations.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Conversations; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Conversations extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    archive(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('conversations.archive', args);
    }
    close(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._get('conversations.close', args);
    }
    create(name, is_private = null, user_ids = null, extraArgs = {}) {
        const args = Object.assign({ name,
            is_private,
            user_ids }, extraArgs);
        return this._get('conversations.create', args);
    }
    history(channel, inclusive = null, latest = 'now', limit = 10, oldest = 0, extraArgs = {}) {
        const args = Object.assign({ channel,
            inclusive,
            latest,
            limit,
            oldest }, extraArgs);
        return this._get('conversations.history', args);
    }
    info(channel, include_locale = false, extraArgs = {}) {
        const args = Object.assign({ channel, include_locale }, extraArgs);
        return this._get('conversations.info', args);
    }
    invite(channel, user, extraArgs = {}) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('conversations.invite', args);
    }
    join(name, extraArgs = {}) {
        const args = Object.assign({ name }, extraArgs);
        return this._post('conversations.join', args);
    }
    kick(channel, user, extraArgs = {}) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('conversations.kick', args);
    }
    leave(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('conversations.leave', args);
    }
    list(cursor = null, exclude_archived = false, limit = 100, types = 'public_channel', extraArgs = {}) {
        const args = Object.assign({ cursor,
            exclude_archived,
            limit,
            types }, extraArgs);
        return this._get('conversations.list', args);
    }
    member(channel, cursor = null, limit = 100, extraArgs = {}) {
        const args = Object.assign({ channel, cursor, limit }, extraArgs);
        return this._post('conversations.member', args);
    }
    open(channel = null, return_im = null, users = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            return_im,
            users }, extraArgs);
        return this._post('conversations.open', args);
    }
    rename(channel, name, extraArgs = {}) {
        const args = Object.assign({ channel, name }, extraArgs);
        return this._post('conversations.rename', args);
    }
    replies(channel, ts, cursor = null, inclusive = null, latest = 'now', limit = 10, oldest = 0, extraArgs = {}) {
        const args = Object.assign({ channel,
            ts,
            cursor,
            inclusive,
            latest,
            limit,
            oldest }, extraArgs);
        return this._get('conversations.replies', args);
    }
    setPurpose(channel, purpose, extraArgs = {}) {
        const args = Object.assign({ channel, purpose }, extraArgs);
        return this._post('conversations.setPurpose', args);
    }
    setTopic(channel, topic, extraArgs = {}) {
        const args = Object.assign({ channel, topic }, extraArgs);
        return this._post('conversations.setTopic', args);
    }
    unarchive(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('conversations.unarchive', args);
    }
}


/***/ }),

/***/ "./src/methods/DND.ts":
/*!****************************!*\
  !*** ./src/methods/DND.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DND; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class DND extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    endDnd(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._post('dnd.endDnd', args);
    }
    endSnooze(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._post('dnd.endSnooze', args);
    }
    info(user = null, extraArgs = {}) {
        const args = Object.assign({ user }, extraArgs);
        return this._get('dnd.info', args);
    }
    setSnooze(num_minutes, extraArgs = {}) {
        const args = Object.assign({ num_minutes }, extraArgs);
        return this._get('dnd.setSnooze', args);
    }
    teamInfo(users = [], extraArgs = {}) {
        const args = Object.assign({ users }, extraArgs);
        return this._get('dnd.teamInfo', args);
    }
}


/***/ }),

/***/ "./src/methods/Dialog.ts":
/*!*******************************!*\
  !*** ./src/methods/Dialog.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dialog; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Dialog extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    open(dialog, trigger_id, extraArgs = {}) {
        const args = Object.assign({ dialog, trigger_id }, extraArgs);
        return this._post('conversations.unarchive', args);
    }
}


/***/ }),

/***/ "./src/methods/Emoji.ts":
/*!******************************!*\
  !*** ./src/methods/Emoji.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Emoji; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Emoji extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    list(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('emoji.list', args);
    }
}


/***/ }),

/***/ "./src/methods/Files.ts":
/*!******************************!*\
  !*** ./src/methods/Files.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Files; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class FilesComments extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(comment, file, extraArgs = {}) {
        const args = { comment, file };
        return this._post('files.comments.add', args);
    }
    delete_(file, id, extraArgs = {}) {
        const args = { file, id };
        return this._post('files.comments.delete', args);
    }
    edit(comment, file, id, extraArgs = {}) {
        const args = { comment, file, id };
        return this._post('files.comments.edit', args);
    }
}
class Files extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.comments = new FilesComments(token, retries_limit);
    }
    delete_(file, extraArgs = {}) {
        const args = Object.assign({ file }, extraArgs);
        return this._post('files.delete', args);
    }
    info(file, count = 100, cursor = null, limit = 0, page = 1, extraArgs = {}) {
        const args = Object.assign({ file,
            count,
            cursor,
            limit,
            page }, extraArgs);
        return this._get('files.info', args);
    }
    list(channel, count = 100, page = 1, ts_from = 0, ts_to = 'now', types = 'all', user = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            count,
            page,
            ts_from,
            ts_to,
            types,
            user }, extraArgs);
        return this._get('files.list', args);
    }
    revokePublicURL(file, extraArgs = {}) {
        const args = Object.assign({ file }, extraArgs);
        return this._post('files.revokePublicURL', args);
    }
    sharedPublicURL(file, extraArgs = {}) {
        const args = Object.assign({ file }, extraArgs);
        return this._post('files.sharedPublicURL', args);
    }
    upload(channel, content = null, file = null, filename = null, filetype = null, initial_comment = null, thread_ts = null, title = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            filename,
            filetype,
            initial_comment,
            thread_ts,
            title }, extraArgs);
        return this._post_file('files.upload', { content, file }, args);
    }
}


/***/ }),

/***/ "./src/methods/Groups.ts":
/*!*******************************!*\
  !*** ./src/methods/Groups.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Groups; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Groups extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    archive(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('groups.archive', args);
    }
    create(name, validate = null, extraArgs = {}) {
        const args = Object.assign({ name, validate }, extraArgs);
        return this._get('groups.create', args);
    }
    createChild(channel, count = 100, inclusive = '0', latest = 'now', oldest = 0, unreads = '0', extraArgs = {}) {
        const args = Object.assign({ channel,
            count,
            inclusive,
            latest,
            oldest,
            unreads }, extraArgs);
        return this._get('groups.createChild', args);
    }
    history(channel, count = 100, inclusive = '0', latest = 'now', oldest = 0, unreads = '0', extraArgs = {}) {
        const args = Object.assign({ channel,
            count,
            inclusive,
            latest,
            oldest,
            unreads }, extraArgs);
        return this._get('groups.history', args);
    }
    info(channel, include_locale = false, extraArgs = {}) {
        const args = Object.assign({ channel, include_locale }, extraArgs);
        return this._get('groups.info', args);
    }
    invite(channel, user, extraArgs = {}) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('groups.invite', args);
    }
    kick(channel, user, extraArgs = {}) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('groups.kick', args);
    }
    leave(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('groups.leave', args);
    }
    list(options = {}, cursor = null, exclude_archived = '0', exclude_members = false, limit = 0, extraArgs = {}) {
        const args = Object.assign({ cursor,
            exclude_archived,
            exclude_members,
            limit }, extraArgs);
        return this._get('groups.list', args);
    }
    mark(channel, ts, extraArgs = {}) {
        const args = Object.assign({ channel, ts }, extraArgs);
        return this._post('groups.mark', args);
    }
    open(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('groups.mark', args);
    }
    rename(channel, name, validate = null, extraArgs = {}) {
        const args = Object.assign({ channel, name, validate }, extraArgs);
        return this._get('groups.rename', args);
    }
    replies(channel, thread_ts, extraArgs = {}) {
        const args = Object.assign({ channel, thread_ts }, extraArgs);
        return this._get('groups.replies', args);
    }
    setPurpose(channel, purpose, extraArgs = {}) {
        const args = Object.assign({ channel, purpose }, extraArgs);
        return this._post('groups.setPurpose', args);
    }
    setTopic(channel, topic, extraArgs = {}) {
        const args = Object.assign({ channel, topic }, extraArgs);
        return this._post('groups.setTopic', args);
    }
    unarchive(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('groups.unarchive', args);
    }
}


/***/ }),

/***/ "./src/methods/IM.ts":
/*!***************************!*\
  !*** ./src/methods/IM.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IM; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class IM extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    close(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('im.close', args);
    }
    history(channel, count = 100, inclusive = '0', latest = 'now', oldest = 0, extraArgs = {}) {
        const args = Object.assign({ channel,
            count,
            inclusive,
            latest,
            oldest }, extraArgs);
        return this._get('im.history', args);
    }
    list(cursor = null, limit = null, extraArgs = {}) {
        const args = Object.assign({ cursor, limit }, extraArgs);
        return this._get('im.list', args);
    }
    mark(channel, ts, extraArgs = {}) {
        const args = Object.assign({ channel, ts }, extraArgs);
        return this._post('im.mark', args);
    }
    open(channel, user, include_locale = false, return_im = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            user,
            include_locale,
            return_im }, extraArgs);
        return this._post('im.mark', args);
    }
    replies(channel, thread_ts, extraArgs = {}) {
        const args = Object.assign({ channel, thread_ts }, extraArgs);
        return this._get('im.replies', args);
    }
}


/***/ }),

/***/ "./src/methods/MPIM.ts":
/*!*****************************!*\
  !*** ./src/methods/MPIM.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MPIM; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class MPIM extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    close(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('mpim.close', args);
    }
    history(channel, count = 100, inclusive = '0', latest = 'now', oldest = 0, unreads = '0', extraArgs = {}) {
        const args = Object.assign({ channel,
            count,
            inclusive,
            latest,
            oldest,
            unreads }, extraArgs);
        return this._get('mpim.history', args);
    }
    list(cursor = null, limit = 0, extraArgs = {}) {
        const args = Object.assign({ cursor, limit }, extraArgs);
        return this._get('mpim.list', args);
    }
    mark(channel, ts, extraArgs = {}) {
        const args = Object.assign({ channel, ts }, extraArgs);
        return this._post('mpim.mark', args);
    }
    open(channel, user, extraArgs = {}) {
        const args = Object.assign({ channel, user }, extraArgs);
        return this._post('mpim.mark', args);
    }
    replies(channel, thread_ts, extraArgs = {}) {
        const args = Object.assign({ channel, thread_ts }, extraArgs);
        return this._get('mpim.replies', args);
    }
}


/***/ }),

/***/ "./src/methods/Migration.ts":
/*!**********************************!*\
  !*** ./src/methods/Migration.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Migration; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Migration extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    exchange(users, to_old = false, extraArgs = {}) {
        const args = Object.assign({ users, to_old }, extraArgs);
        return this._get('migration.exchange', args);
    }
}


/***/ }),

/***/ "./src/methods/OAuth.ts":
/*!******************************!*\
  !*** ./src/methods/OAuth.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OAuth; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");


class OAuth extends _BaseAPI__WEBPACK_IMPORTED_MODULE_1__["default"] {
    access(client_id, client_secret, code, redirect_uri = null, single_channel = false, extraArgs = {}) {
        const args = Object.assign({ client_id,
            client_secret,
            code,
            redirect_uri,
            single_channel }, extraArgs);
        const encodedParams = Object(_util__WEBPACK_IMPORTED_MODULE_0__["queryEncode"])(args);
        const url = `${_BaseAPI__WEBPACK_IMPORTED_MODULE_1__["default"].API_ENDPOINT}oauth.access?${encodedParams}`;
        return this._fetch(url, { method: 'POST' });
    }
    token(client_id, client_secret, code, redirect_uri = null, single_channel = false, extraArgs = {}) {
        const args = Object.assign({ client_id,
            client_secret,
            code,
            redirect_uri,
            single_channel }, extraArgs);
        return this._get('oauth.token', args);
    }
}


/***/ }),

/***/ "./src/methods/Pins.ts":
/*!*****************************!*\
  !*** ./src/methods/Pins.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pins; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Pins extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(channel, file, file_comment, timestamp, extraArgs = {}) {
        const args = Object.assign({ channel,
            file,
            file_comment,
            timestamp }, extraArgs);
        return this._post('pins.add', args);
    }
    list(channel, extraArgs = {}) {
        const args = Object.assign({ channel }, extraArgs);
        return this._post('pins.add', args);
    }
    remove(channel, file, file_comment, timestamp, extraArgs = {}) {
        const args = Object.assign({ channel,
            file,
            file_comment,
            timestamp }, extraArgs);
        return this._post('pins.remove', args);
    }
}


/***/ }),

/***/ "./src/methods/RTM.ts":
/*!****************************!*\
  !*** ./src/methods/RTM.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RTM; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class RTM extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    connect(batch_presence_aware = 'false', presence_sub = true, extraArgs = {}) {
        const args = Object.assign({ batch_presence_aware,
            presence_sub }, extraArgs);
        return this._get('reminders.add', args);
    }
    start(batch_presence_aware = 'false', include_locale = false, mpim_aware = null, no_latest = 0, no_unreads = null, presence_sub = true, simple_latest = null, extraArgs = {}) {
        const args = Object.assign({ batch_presence_aware,
            include_locale,
            mpim_aware,
            no_latest,
            no_unreads,
            presence_sub,
            simple_latest }, extraArgs);
        return this._get('reminders.complete', args);
    }
}


/***/ }),

/***/ "./src/methods/Reactions.ts":
/*!**********************************!*\
  !*** ./src/methods/Reactions.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Reactions; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Reactions extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(name, file, channel, channel_comment, timestamp, extraArgs = {}) {
        const args = Object.assign({ name,
            file,
            channel,
            channel_comment,
            timestamp }, extraArgs);
        return this._post('reactions.add', args);
    }
    get(channel = null, file = null, file_comment = null, full = null, timestamp = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            file,
            file_comment,
            full,
            timestamp }, extraArgs);
        return this._get('reactions.get', args);
    }
    list(count, cursor = null, full = null, limit = 0, page = 1, user = null, extraArgs = {}) {
        const args = Object.assign({ count,
            cursor,
            full,
            limit,
            page,
            user }, extraArgs);
        return this._get('reactions.list', args);
    }
    remove(name = null, channel = null, file = null, file_comment = null, timestamp = null, extraArgs = {}) {
        const args = Object.assign({ name,
            channel,
            file,
            file_comment,
            timestamp }, extraArgs);
        return this._post('reactions.remove', args);
    }
}


/***/ }),

/***/ "./src/methods/Reminders.ts":
/*!**********************************!*\
  !*** ./src/methods/Reminders.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Reminders; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Reminders extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(text, time, user = null, extraArgs = {}) {
        const args = Object.assign({ text, time, user }, extraArgs);
        return this._post('reminders.add', args);
    }
    complete(reminder, extraArgs = {}) {
        const args = Object.assign({ reminder }, extraArgs);
        return this._post('reminders.complete', args);
    }
    delete_(reminder, extraArgs = {}) {
        const args = Object.assign({ reminder }, extraArgs);
        return this._post('reminders.delete', args);
    }
    info(reminder, extraArgs = {}) {
        const args = Object.assign({ reminder }, extraArgs);
        return this._get('reminders.info', args);
    }
    list(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('reminders.list', args);
    }
}


/***/ }),

/***/ "./src/methods/Search.ts":
/*!*******************************!*\
  !*** ./src/methods/Search.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Search extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    all(query, count = 20, highlight = null, page = 1, sort = 'score', sort_dir = 'desc', extraArgs = {}) {
        const args = Object.assign({ query,
            count,
            highlight,
            page,
            sort,
            sort_dir }, extraArgs);
        return this._get('search.add', args);
    }
    files(query, count = 20, highlight = null, page = 1, sort = 'score', sort_dir = 'desc', extraArgs = {}) {
        const args = Object.assign({ query,
            count,
            highlight,
            page,
            sort,
            sort_dir }, extraArgs);
        return this._get('search.files', args);
    }
    messages(query, count = 20, highlight = null, page = 1, sort = 'score', sort_dir = 'desc', extraArgs = {}) {
        const args = Object.assign({ query,
            count,
            highlight,
            page,
            sort,
            sort_dir }, extraArgs);
        return this._get('search.messages', args);
    }
}


/***/ }),

/***/ "./src/methods/Stars.ts":
/*!******************************!*\
  !*** ./src/methods/Stars.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stars; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Stars extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(channel = null, file = null, file_comment = null, timestamp = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            file,
            file_comment,
            timestamp }, extraArgs);
        return this._post('stars.add', args);
    }
    list(count = 100, cursor = null, limit = null, page = 1, extraArgs = {}) {
        const args = Object.assign({ count,
            cursor,
            limit,
            page }, extraArgs);
        return this._post('stars.list', args);
    }
    remove(channel = null, file = null, file_comment = null, timestamp = null, extraArgs = {}) {
        const args = Object.assign({ channel,
            file,
            file_comment,
            timestamp }, extraArgs);
        return this._post('stars.remove', args);
    }
}


/***/ }),

/***/ "./src/methods/Team.ts":
/*!*****************************!*\
  !*** ./src/methods/Team.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Team; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class TeamProfile extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get(visibility = null, extraArgs = {}) {
        const args = Object.assign({ visibility }, extraArgs);
        return this._get('team.profile.get', args);
    }
}
class Team extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.profile = new TeamProfile(token, retries_limit);
    }
    accessLogs(before = 'now', count = 100, page = 1, extraArgs = {}) {
        const args = Object.assign({ before, count, page }, extraArgs);
        return this._get('team.accessLogs', args);
    }
    billableInfo(user = null, extraArgs = {}) {
        const args = Object.assign({ user }, extraArgs);
        return this._get('team.billableInfo', args);
    }
    info(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('team.info', args);
    }
    integrationLogs(app_id = null, change_type = null, count = 100, page = 1, service_id = null, user = null, extraArgs = {}) {
        const args = Object.assign({ app_id,
            change_type,
            count,
            page,
            service_id,
            user }, extraArgs);
        return this._get('team.integrationLogs', args);
    }
}


/***/ }),

/***/ "./src/methods/UserGroups.ts":
/*!***********************************!*\
  !*** ./src/methods/UserGroups.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserGroups; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class UsergroupsUsers extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    list(usergroup, include_disabled = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            include_disabled }, extraArgs);
        return this._get('usergroups.users.list', args);
    }
    update(usergroup, users, include_count = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            users,
            include_count }, extraArgs);
        return this._post('usergroups.users.update', args);
    }
}
class UserGroups extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.users = new UsergroupsUsers(token, retries_limit);
    }
    create(name, channels = null, description = null, handle = null, include_disabled = null, extraArgs = {}) {
        const args = Object.assign({ name,
            channels,
            description,
            handle,
            include_disabled }, extraArgs);
        return this._post('usergroups.create', args);
    }
    disable(usergroup, include_count = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            include_count }, extraArgs);
        return this._post('usergroups.disable', args);
    }
    enable(usergroup, include_count = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            include_count }, extraArgs);
        return this._post('usergroups.enable', args);
    }
    list(usergroup, include_count = null, include_disabled = null, include_users = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            include_count,
            include_disabled,
            include_users }, extraArgs);
        return this._get('usergroups.list', args);
    }
    update(usergroup, channels = null, description = null, handle = null, include_disabled = null, name = null, extraArgs = {}) {
        const args = Object.assign({ usergroup,
            channels,
            description,
            handle,
            include_disabled,
            name }, extraArgs);
        return this._post('usergroups.create', args);
    }
}


/***/ }),

/***/ "./src/methods/Users.ts":
/*!******************************!*\
  !*** ./src/methods/Users.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Users; });
/* harmony import */ var _BaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");

class Users extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(token, retries_limit) {
        super(token, retries_limit);
        this.profile = new UsersProfile(token, retries_limit);
    }
    conversations(cursor = null, exclude_archived = true, limit = 100, types = 'public_channel', user = null, extraArgs = {}) {
        const args = Object.assign({ cursor,
            exclude_archived,
            limit,
            types,
            user }, extraArgs);
        return this._get('users.conversations', args);
    }
    deletePhoto(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('users.deletePhoto', args);
    }
    getPresence(user, extraArgs = {}) {
        const args = Object.assign({ user }, extraArgs);
        return this._get('users.getPresence', args);
    }
    identity(extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._get('users.identity', args);
    }
    info(user, include_locale = false, extraArgs = {}) {
        const args = Object.assign({ user, include_locale }, extraArgs);
        return this._get('users.info', args);
    }
    list(cursor = null, include_locale = false, limit = 0, presence = false, extraArgs = {}) {
        const args = Object.assign({ cursor,
            include_locale,
            limit,
            presence }, extraArgs);
        return this._get('users.list', args);
    }
    lookupByEmail(email, extraArgs = {}) {
        const args = Object.assign({ email }, extraArgs);
        return this._get('users.lookupByEmail', args);
    }
    setActive(extraArgs = {}) {
        return this._post('users.lookupByEmail', extraArgs);
    }
    setPhoto(image, extraArgs = {}) {
        const args = Object.assign({}, extraArgs);
        return this._post_file('users.setPhoto', { image }, args);
    }
    setPresence(presence, extraArgs = {}) {
        const args = Object.assign({ presence }, extraArgs);
        return this._post('users.setPresence', args);
    }
}
class UsersProfile extends _BaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get(include_labels = false, user = null, extraArgs = {}) {
        const args = Object.assign({ include_labels, user }, extraArgs);
        return this._get('users.profile.get', args);
    }
    set(name = null, profile = null, user = null, value = null, extraArgs = {}) {
        const args = Object.assign({ name,
            profile,
            user,
            value }, extraArgs);
        return this._post('users.profile.set', args);
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: queryEncode, createPayload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryEncode", function() { return queryEncode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPayload", function() { return createPayload; });
// ref) https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py#L846
const queryEncode = (params) => {
    const param_list = [];
    for (const key in params) {
        let param = params[key];
        if (param === null)
            continue;
        if (Array.isArray(param))
            param = param.join(',');
        else if (typeof param == 'object')
            param = JSON.stringify(param);
        param_list.push(`${key}=${param}`);
    }
    return param_list.join('&');
};
const createPayload = (params) => {
    const payload = Object.assign({}, params);
    for (const key in payload) {
        const param = payload[key];
        if (param == null)
            delete payload[key];
        else if (typeof param !== 'string')
            payload[key] = JSON.stringify(param);
    }
    return payload;
};


/***/ })

/******/ });