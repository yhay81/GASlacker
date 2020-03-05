function methods(token, retries_limit) {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RETRIES = 3;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = __webpack_require__(/*! ./methods/API */ "./src/methods/API.ts");
var Apps_1 = __webpack_require__(/*! ./methods/Apps */ "./src/methods/Apps.ts");
var Auth_1 = __webpack_require__(/*! ./methods/Auth */ "./src/methods/Auth.ts");
var Bots_1 = __webpack_require__(/*! ./methods/Bots */ "./src/methods/Bots.ts");
var Channels_1 = __webpack_require__(/*! ./methods/Channels */ "./src/methods/Channels.ts");
var Chat_1 = __webpack_require__(/*! ./methods/Chat */ "./src/methods/Chat.ts");
var Conversations_1 = __webpack_require__(/*! ./methods/Conversations */ "./src/methods/Conversations.ts");
var Dialog_1 = __webpack_require__(/*! ./methods/Dialog */ "./src/methods/Dialog.ts");
var DND_1 = __webpack_require__(/*! ./methods/DND */ "./src/methods/DND.ts");
var Emoji_1 = __webpack_require__(/*! ./methods/Emoji */ "./src/methods/Emoji.ts");
var Files_1 = __webpack_require__(/*! ./methods/Files */ "./src/methods/Files.ts");
var Groups_1 = __webpack_require__(/*! ./methods/Groups */ "./src/methods/Groups.ts");
var IM_1 = __webpack_require__(/*! ./methods/IM */ "./src/methods/IM.ts");
var Migration_1 = __webpack_require__(/*! ./methods/Migration */ "./src/methods/Migration.ts");
var MPIM_1 = __webpack_require__(/*! ./methods/MPIM */ "./src/methods/MPIM.ts");
var OAuth_1 = __webpack_require__(/*! ./methods/OAuth */ "./src/methods/OAuth.ts");
var Pins_1 = __webpack_require__(/*! ./methods/Pins */ "./src/methods/Pins.ts");
var Reactions_1 = __webpack_require__(/*! ./methods/Reactions */ "./src/methods/Reactions.ts");
var Reminders_1 = __webpack_require__(/*! ./methods/Reminders */ "./src/methods/Reminders.ts");
var RTM_1 = __webpack_require__(/*! ./methods/RTM */ "./src/methods/RTM.ts");
var Search_1 = __webpack_require__(/*! ./methods/Search */ "./src/methods/Search.ts");
var Stars_1 = __webpack_require__(/*! ./methods/Stars */ "./src/methods/Stars.ts");
var Team_1 = __webpack_require__(/*! ./methods/Team */ "./src/methods/Team.ts");
var UserGroups_1 = __webpack_require__(/*! ./methods/UserGroups */ "./src/methods/UserGroups.ts");
var Users_1 = __webpack_require__(/*! ./methods/Users */ "./src/methods/Users.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var Methods = /** @class */ (function () {
    function Methods(token, retries_limit) {
        if (retries_limit === void 0) { retries_limit = config_1.DEFAULT_RETRIES; }
        this.api = new API_1.default(token, retries_limit);
        this.apps = new Apps_1.default(token, retries_limit);
        this.auth = new Auth_1.default(token, retries_limit);
        this.bots = new Bots_1.default(token, retries_limit);
        this.channels = new Channels_1.default(token, retries_limit);
        this.chat = new Chat_1.default(token, retries_limit);
        this.conversations = new Conversations_1.default(token, retries_limit);
        this.dialog = new Dialog_1.default(token, retries_limit);
        this.dnd = new DND_1.default(token, retries_limit);
        this.emoji = new Emoji_1.default(token, retries_limit);
        this.files = new Files_1.default(token, retries_limit);
        this.groups = new Groups_1.default(token, retries_limit);
        this.im = new IM_1.default(token, retries_limit);
        this.migration = new Migration_1.default(token, retries_limit);
        this.mpim = new MPIM_1.default(token, retries_limit);
        this.oauth = new OAuth_1.default(token, retries_limit);
        this.pins = new Pins_1.default(token, retries_limit);
        this.reactions = new Reactions_1.default(token, retries_limit);
        this.reminders = new Reminders_1.default(token, retries_limit);
        this.rtm = new RTM_1.default(token, retries_limit);
        this.search = new Search_1.default(token, retries_limit);
        this.stars = new Stars_1.default(token, retries_limit);
        this.team = new Team_1.default(token, retries_limit);
        this.usergroups = new UserGroups_1.default(token, retries_limit);
        this.users = new Users_1.default(token, retries_limit);
        // this.presence = new Presence(token, retries_limit);
        // this.idpgroups = new IDPGroups(token, retries_limit);
        // this.incomingwebhook = new IncomingWebhook(url);
    }
    return Methods;
}());
global.methods = function (token, retries_limit) {
    if (retries_limit === void 0) { retries_limit = config_1.DEFAULT_RETRIES; }
    return new Methods(token, retries_limit);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/methods/API.ts":
/*!****************************!*\
  !*** ./src/methods/API.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    API.prototype.test = function (error, foo, extraArgs) {
        if (error === void 0) { error = null; }
        if (foo === void 0) { foo = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ error: error, foo: foo }, extraArgs);
        return this._post('api.test', args);
    };
    return API;
}(BaseAPI_1.default));
exports.default = API;


/***/ }),

/***/ "./src/methods/Apps.ts":
/*!*****************************!*\
  !*** ./src/methods/Apps.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var AppsPermissions = /** @class */ (function (_super) {
    __extends(AppsPermissions, _super);
    function AppsPermissions(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.resouces = new AppsPermissionsResouces(token, retries_limit);
        _this.scopes = new AppsPermissionsScopes(token, retries_limit);
        _this.users = new AppsPermissionsUsers(token, retries_limit);
        return _this;
    }
    AppsPermissions.prototype.info = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('apps.permissions.info', args);
    };
    AppsPermissions.prototype.request = function (scopes, trigger_id, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ scopes: scopes, trigger_id: trigger_id }, extraArgs);
        return this._get('apps.permissions.request', args);
    };
    return AppsPermissions;
}(BaseAPI_1.default));
var AppsPermissionsResouces = /** @class */ (function (_super) {
    __extends(AppsPermissionsResouces, _super);
    function AppsPermissionsResouces() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppsPermissionsResouces.prototype.list = function (cursor, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor, limit: limit }, extraArgs);
        return this._get('apps.permissions.resouces.list', args);
    };
    return AppsPermissionsResouces;
}(BaseAPI_1.default));
var AppsPermissionsScopes = /** @class */ (function (_super) {
    __extends(AppsPermissionsScopes, _super);
    function AppsPermissionsScopes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppsPermissionsScopes.prototype.list = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('apps.permissions.scopes.list', args);
    };
    return AppsPermissionsScopes;
}(BaseAPI_1.default));
var AppsPermissionsUsers = /** @class */ (function (_super) {
    __extends(AppsPermissionsUsers, _super);
    function AppsPermissionsUsers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppsPermissionsUsers.prototype.list = function (cursor, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor, limit: limit }, extraArgs);
        return this._get('apps.permissions.users.list', args);
    };
    AppsPermissionsUsers.prototype.request = function (scopes, trigger_id, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ scopes: scopes,
            trigger_id: trigger_id,
            user: user }, extraArgs);
        return this._get('apps.permissions.users.request', args);
    };
    return AppsPermissionsUsers;
}(BaseAPI_1.default));
var Apps = /** @class */ (function (_super) {
    __extends(Apps, _super);
    function Apps(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.permissions = new AppsPermissions(token, retries_limit);
        return _this;
    }
    Apps.prototype.uninstall = function (client_id, client_secret, options) {
        if (options === void 0) { options = {}; }
        var args = __assign({ client_id: client_id, client_secret: client_secret }, options);
        return this._get('apps.permissions.users.request', args);
    };
    return Apps;
}(BaseAPI_1.default));
exports.default = Apps;


/***/ }),

/***/ "./src/methods/Auth.ts":
/*!*****************************!*\
  !*** ./src/methods/Auth.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.revoke = function (test, extraArgs) {
        if (test === void 0) { test = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ test: test }, extraArgs);
        return this._get('auth.revoke', args);
    };
    Auth.prototype.test = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._post('auth.test', args);
    };
    return Auth;
}(BaseAPI_1.default));
exports.default = Auth;


/***/ }),

/***/ "./src/methods/BaseAPI.ts":
/*!********************************!*\
  !*** ./src/methods/BaseAPI.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
var BaseAPI = /** @class */ (function () {
    function BaseAPI(_token, _retries_limit) {
        if (_token === void 0) { _token = null; }
        if (_retries_limit === void 0) { _retries_limit = config_1.DEFAULT_RETRIES; }
        this._token = _token;
        this._retries_limit = _retries_limit;
    }
    BaseAPI.prototype._get = function (api, args) {
        if (args === void 0) { args = {}; }
        // https://github.com/requests/requests/blob/master/requests/models.py
        var encodedArgs = util_1.queryEncode(__assign({ token: this._token }, args));
        var url = "" + BaseAPI.API_ENDPOINT + api + "?" + encodedArgs;
        var params = {
            method: 'get',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return this._fetch(url, params);
    };
    BaseAPI.prototype._post = function (api, args) {
        if (args === void 0) { args = {}; }
        var payload = util_1.createPayload(__assign({}, args));
        var url = "" + BaseAPI.API_ENDPOINT + api;
        var params = {
            headers: { Authorization: "Bearer " + this._token },
            method: 'post',
            contentType: 'application/json; charset=UTF-8',
            payload: JSON.stringify(payload)
        };
        return this._fetch(url, params);
    };
    BaseAPI.prototype._post_file = function (api, file_args, args) {
        if (args === void 0) { args = {}; }
        var payload = util_1.createPayload(__assign({}, args));
        var url = "" + BaseAPI.API_ENDPOINT + api + "?";
        var params = {
            headers: { Authorization: "Bearer " + this._token },
            method: 'post',
            contentType: 'multipart/form-data; charset=UTF-8',
            payload: __assign(__assign({}, file_args), payload)
        };
        return this._fetch(url, params);
    };
    BaseAPI.prototype._fetch = function (url, params) {
        if (params === void 0) { params = null; }
        var response = null;
        for (var retry = 0; retry < this._retries_limit; retry++) {
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
    };
    BaseAPI.API_ENDPOINT = 'https://slack.com/api/';
    return BaseAPI;
}());
exports.default = BaseAPI;


/***/ }),

/***/ "./src/methods/Bots.ts":
/*!*****************************!*\
  !*** ./src/methods/Bots.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Bots = /** @class */ (function (_super) {
    __extends(Bots, _super);
    function Bots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bots.prototype.info = function (bot, extraArgs) {
        if (bot === void 0) { bot = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ bot: bot }, extraArgs);
        return this._get('bots.info', args);
    };
    return Bots;
}(BaseAPI_1.default));
exports.default = Bots;


/***/ }),

/***/ "./src/methods/Channels.ts":
/*!*********************************!*\
  !*** ./src/methods/Channels.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Channels = /** @class */ (function (_super) {
    __extends(Channels, _super);
    function Channels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channels.prototype.archive = function (channel, extraArgs) {
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('channels.archive', args);
    };
    Channels.prototype.create = function (name, validate, extraArgs) {
        if (validate === void 0) { validate = null; }
        var args = __assign({ name: name, validate: validate }, extraArgs);
        return this._get('channels.create', args);
    };
    Channels.prototype.history = function (channel, count, inclusive, latest, oldest, unreads, extraArgs) {
        if (count === void 0) { count = 100; }
        if (inclusive === void 0) { inclusive = '0'; }
        if (latest === void 0) { latest = 'now'; }
        if (oldest === void 0) { oldest = 0; }
        if (unreads === void 0) { unreads = 0; }
        var args = __assign({ channel: channel,
            count: count,
            inclusive: inclusive,
            latest: latest,
            oldest: oldest,
            unreads: unreads }, extraArgs);
        return this._get('channels.history', args);
    };
    Channels.prototype.info = function (channel, include_locale, extraArgs) {
        if (include_locale === void 0) { include_locale = false; }
        var args = __assign({ channel: channel, include_locale: include_locale }, extraArgs);
        return this._get('channels.info', args);
    };
    Channels.prototype.invite = function (channel, user, extraArgs) {
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('channels.invite', args);
    };
    Channels.prototype.join = function (name, validate, extraArgs) {
        if (validate === void 0) { validate = null; }
        var args = __assign({ name: name, validate: validate }, extraArgs);
        return this._post('channels.join', args);
    };
    Channels.prototype.kick = function (channel, user, extraArgs) {
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('channels.kick', args);
    };
    Channels.prototype.leave = function (channel, extraArgs) {
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('channels.leave', args);
    };
    Channels.prototype.list = function (cursor, exclude_archived, exclude_members, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (exclude_archived === void 0) { exclude_archived = false; }
        if (exclude_members === void 0) { exclude_members = false; }
        if (limit === void 0) { limit = 0; }
        var args = __assign({ cursor: cursor,
            exclude_archived: exclude_archived,
            exclude_members: exclude_members,
            limit: limit }, extraArgs);
        return this._get('channels.list', args);
    };
    Channels.prototype.mark = function (channel, ts, extraArgs) {
        var args = __assign({ channel: channel, ts: ts }, extraArgs);
        return this._post('channels.mark', args);
    };
    Channels.prototype.rename = function (channel, name, validate, extraArgs) {
        if (validate === void 0) { validate = null; }
        var args = __assign({ channel: channel, name: name, validate: validate }, extraArgs);
        return this._get('channels.rename', args);
    };
    Channels.prototype.replies = function (channel, thread_ts, extraArgs) {
        var args = __assign({ channel: channel, thread_ts: thread_ts }, extraArgs);
        return this._get('channels.replies', args);
    };
    Channels.prototype.setPurpose = function (channel, purpose, extraArgs) {
        var args = __assign({ channel: channel, purpose: purpose }, extraArgs);
        return this._post('channels.setPurpose', args);
    };
    Channels.prototype.setTopic = function (channel, topic, extraArgs) {
        var args = __assign({ channel: channel, topic: topic }, extraArgs);
        return this._post('channels.setTopic', args);
    };
    Channels.prototype.unarchive = function (channel, extraArgs) {
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('channels.unarchive', args);
    };
    return Channels;
}(BaseAPI_1.default));
exports.default = Channels;


/***/ }),

/***/ "./src/methods/Chat.ts":
/*!*****************************!*\
  !*** ./src/methods/Chat.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chat.prototype.delete_ = function (channel, ts, as_user, // deprecated_arguments
    extraArgs) {
        if (as_user === void 0) { as_user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, ts: ts, as_user: as_user }, extraArgs);
        return this._post('chat.delete', args);
    };
    Chat.prototype.deleteScheduledMessage = function (channel, scheduled_message_id, as_user, // deprecated_arguments
    extraArgs) {
        if (as_user === void 0) { as_user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            scheduled_message_id: scheduled_message_id,
            as_user: as_user }, extraArgs);
        return this._post('chat.deleteScheduledMessage', args);
    };
    Chat.prototype.getPermalink = function (channel, message_ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, message_ts: message_ts }, extraArgs);
        return this._get('chat.getPermalink', args);
    };
    Chat.prototype.meMessage = function (channel, text, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, text: text }, extraArgs);
        return this._post('chat.meMessage', args);
    };
    Chat.prototype.postEphemeral = function (channel, text, user, blocks, icon_emoji, icon_url, link_names, parse, thread_ts, username, extraArgs) {
        if (blocks === void 0) { blocks = null; }
        if (icon_emoji === void 0) { icon_emoji = null; }
        if (icon_url === void 0) { icon_url = null; }
        if (link_names === void 0) { link_names = false; }
        if (parse === void 0) { parse = 'none'; }
        if (thread_ts === void 0) { thread_ts = null; }
        if (username === void 0) { username = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            text: text,
            user: user,
            blocks: blocks,
            icon_emoji: icon_emoji,
            icon_url: icon_url,
            link_names: link_names,
            parse: parse,
            thread_ts: thread_ts,
            username: username }, extraArgs);
        return this._post('chat.postEphemeral', args);
    };
    Chat.prototype.postMessage = function (channel, text, as_user, // deprecated_arguments
    attachements, blocks, icon_emoji, icon_url, link_names, mrkdwn, parse, reply_broadcast, thread_ts, unfurl_links, unfurl_media, username, extraArgs) {
        if (as_user === void 0) { as_user = null; }
        if (attachements === void 0) { attachements = null; }
        if (blocks === void 0) { blocks = null; }
        if (icon_emoji === void 0) { icon_emoji = null; }
        if (icon_url === void 0) { icon_url = null; }
        if (link_names === void 0) { link_names = false; }
        if (mrkdwn === void 0) { mrkdwn = true; }
        if (parse === void 0) { parse = 'none'; }
        if (reply_broadcast === void 0) { reply_broadcast = true; }
        if (thread_ts === void 0) { thread_ts = null; }
        if (unfurl_links === void 0) { unfurl_links = null; }
        if (unfurl_media === void 0) { unfurl_media = null; }
        if (username === void 0) { username = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            text: text,
            as_user: as_user,
            attachements: attachements,
            blocks: blocks,
            icon_emoji: icon_emoji,
            icon_url: icon_url,
            link_names: link_names,
            mrkdwn: mrkdwn,
            parse: parse,
            reply_broadcast: reply_broadcast,
            thread_ts: thread_ts,
            unfurl_links: unfurl_links,
            unfurl_media: unfurl_media,
            username: username }, extraArgs);
        return this._post('chat.postMessage', args);
    };
    Chat.prototype.scheduleMessage = function (channel, post_at, text, as_user, // deprecated_arguments
    attachements, blocks, link_names, mrkdwn, parse, reply_broadcast, thread_ts, unfurl_links, unfurl_media, username, extraArgs) {
        if (as_user === void 0) { as_user = null; }
        if (attachements === void 0) { attachements = null; }
        if (blocks === void 0) { blocks = null; }
        if (link_names === void 0) { link_names = false; }
        if (mrkdwn === void 0) { mrkdwn = true; }
        if (parse === void 0) { parse = 'none'; }
        if (reply_broadcast === void 0) { reply_broadcast = true; }
        if (thread_ts === void 0) { thread_ts = null; }
        if (unfurl_links === void 0) { unfurl_links = null; }
        if (unfurl_media === void 0) { unfurl_media = null; }
        if (username === void 0) { username = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            post_at: post_at,
            text: text,
            as_user: as_user,
            attachements: attachements,
            blocks: blocks,
            link_names: link_names,
            mrkdwn: mrkdwn,
            parse: parse,
            reply_broadcast: reply_broadcast,
            thread_ts: thread_ts,
            unfurl_links: unfurl_links,
            unfurl_media: unfurl_media,
            username: username }, extraArgs);
        return this._post('chat.scheduleMessage', args);
    };
    Chat.prototype.unfurl = function (channel, ts, unfurls, user_auth_message, user_auth_required, user_auth_url, extraArgs) {
        if (user_auth_message === void 0) { user_auth_message = null; }
        if (user_auth_required === void 0) { user_auth_required = '0'; }
        if (user_auth_url === void 0) { user_auth_url = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            ts: ts,
            unfurls: unfurls,
            user_auth_message: user_auth_message,
            user_auth_required: user_auth_required,
            user_auth_url: user_auth_url }, extraArgs);
        return this._post('chat.unfurl', args);
    };
    Chat.prototype.update = function (channel, text, ts, as_user, // deprecated_arguments
    blocks, attachements, link_names, parse, extraArgs) {
        if (as_user === void 0) { as_user = null; }
        if (blocks === void 0) { blocks = null; }
        if (attachements === void 0) { attachements = null; }
        if (link_names === void 0) { link_names = false; }
        if (parse === void 0) { parse = 'none'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            text: text,
            ts: ts,
            as_user: as_user,
            blocks: blocks,
            attachements: attachements,
            link_names: link_names,
            parse: parse }, extraArgs);
        return this._post('chat.update', args);
    };
    return Chat;
}(BaseAPI_1.default));
exports.default = Chat;


/***/ }),

/***/ "./src/methods/Conversations.ts":
/*!**************************************!*\
  !*** ./src/methods/Conversations.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Conversations = /** @class */ (function (_super) {
    __extends(Conversations, _super);
    function Conversations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Conversations.prototype.archive = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('conversations.archive', args);
    };
    Conversations.prototype.close = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._get('conversations.close', args);
    };
    Conversations.prototype.create = function (name, is_private, user_ids, extraArgs) {
        if (is_private === void 0) { is_private = null; }
        if (user_ids === void 0) { user_ids = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name,
            is_private: is_private,
            user_ids: user_ids }, extraArgs);
        return this._get('conversations.create', args);
    };
    Conversations.prototype.history = function (channel, inclusive, latest, limit, oldest, extraArgs) {
        if (inclusive === void 0) { inclusive = null; }
        if (latest === void 0) { latest = 'now'; }
        if (limit === void 0) { limit = 10; }
        if (oldest === void 0) { oldest = 0; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            inclusive: inclusive,
            latest: latest,
            limit: limit,
            oldest: oldest }, extraArgs);
        return this._get('conversations.history', args);
    };
    Conversations.prototype.info = function (channel, include_locale, extraArgs) {
        if (include_locale === void 0) { include_locale = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, include_locale: include_locale }, extraArgs);
        return this._get('conversations.info', args);
    };
    Conversations.prototype.invite = function (channel, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('conversations.invite', args);
    };
    Conversations.prototype.join = function (name, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name }, extraArgs);
        return this._post('conversations.join', args);
    };
    Conversations.prototype.kick = function (channel, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('conversations.kick', args);
    };
    Conversations.prototype.leave = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('conversations.leave', args);
    };
    Conversations.prototype.list = function (cursor, exclude_archived, limit, types, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (exclude_archived === void 0) { exclude_archived = false; }
        if (limit === void 0) { limit = 100; }
        if (types === void 0) { types = 'public_channel'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor,
            exclude_archived: exclude_archived,
            limit: limit,
            types: types }, extraArgs);
        return this._get('conversations.list', args);
    };
    Conversations.prototype.member = function (channel, cursor, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = 100; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, cursor: cursor, limit: limit }, extraArgs);
        return this._post('conversations.member', args);
    };
    Conversations.prototype.open = function (channel, return_im, users, extraArgs) {
        if (channel === void 0) { channel = null; }
        if (return_im === void 0) { return_im = null; }
        if (users === void 0) { users = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            return_im: return_im,
            users: users }, extraArgs);
        return this._post('conversations.open', args);
    };
    Conversations.prototype.rename = function (channel, name, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, name: name }, extraArgs);
        return this._post('conversations.rename', args);
    };
    Conversations.prototype.replies = function (channel, ts, cursor, inclusive, latest, limit, oldest, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (inclusive === void 0) { inclusive = null; }
        if (latest === void 0) { latest = 'now'; }
        if (limit === void 0) { limit = 10; }
        if (oldest === void 0) { oldest = 0; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            ts: ts,
            cursor: cursor,
            inclusive: inclusive,
            latest: latest,
            limit: limit,
            oldest: oldest }, extraArgs);
        return this._get('conversations.replies', args);
    };
    Conversations.prototype.setPurpose = function (channel, purpose, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, purpose: purpose }, extraArgs);
        return this._post('conversations.setPurpose', args);
    };
    Conversations.prototype.setTopic = function (channel, topic, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, topic: topic }, extraArgs);
        return this._post('conversations.setTopic', args);
    };
    Conversations.prototype.unarchive = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('conversations.unarchive', args);
    };
    return Conversations;
}(BaseAPI_1.default));
exports.default = Conversations;


/***/ }),

/***/ "./src/methods/DND.ts":
/*!****************************!*\
  !*** ./src/methods/DND.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var DND = /** @class */ (function (_super) {
    __extends(DND, _super);
    function DND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DND.prototype.endDnd = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._post('dnd.endDnd', args);
    };
    DND.prototype.endSnooze = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._post('dnd.endSnooze', args);
    };
    DND.prototype.info = function (user, extraArgs) {
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ user: user }, extraArgs);
        return this._get('dnd.info', args);
    };
    DND.prototype.setSnooze = function (num_minutes, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ num_minutes: num_minutes }, extraArgs);
        return this._get('dnd.setSnooze', args);
    };
    DND.prototype.teamInfo = function (users, extraArgs) {
        if (users === void 0) { users = []; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ users: users }, extraArgs);
        return this._get('dnd.teamInfo', args);
    };
    return DND;
}(BaseAPI_1.default));
exports.default = DND;


/***/ }),

/***/ "./src/methods/Dialog.ts":
/*!*******************************!*\
  !*** ./src/methods/Dialog.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dialog.prototype.open = function (dialog, trigger_id, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ dialog: dialog, trigger_id: trigger_id }, extraArgs);
        return this._post('conversations.unarchive', args);
    };
    return Dialog;
}(BaseAPI_1.default));
exports.default = Dialog;


/***/ }),

/***/ "./src/methods/Emoji.ts":
/*!******************************!*\
  !*** ./src/methods/Emoji.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Emoji = /** @class */ (function (_super) {
    __extends(Emoji, _super);
    function Emoji() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Emoji.prototype.list = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('emoji.list', args);
    };
    return Emoji;
}(BaseAPI_1.default));
exports.default = Emoji;


/***/ }),

/***/ "./src/methods/Files.ts":
/*!******************************!*\
  !*** ./src/methods/Files.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var FilesComments = /** @class */ (function (_super) {
    __extends(FilesComments, _super);
    function FilesComments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilesComments.prototype.add = function (comment, file, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = { comment: comment, file: file };
        return this._post('files.comments.add', args);
    };
    FilesComments.prototype.delete_ = function (file, id, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = { file: file, id: id };
        return this._post('files.comments.delete', args);
    };
    FilesComments.prototype.edit = function (comment, file, id, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = { comment: comment, file: file, id: id };
        return this._post('files.comments.edit', args);
    };
    return FilesComments;
}(BaseAPI_1.default));
var Files = /** @class */ (function (_super) {
    __extends(Files, _super);
    function Files(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.comments = new FilesComments(token, retries_limit);
        return _this;
    }
    Files.prototype.delete_ = function (file, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ file: file }, extraArgs);
        return this._post('files.delete', args);
    };
    Files.prototype.info = function (file, count, cursor, limit, page, extraArgs) {
        if (count === void 0) { count = 100; }
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = 0; }
        if (page === void 0) { page = 1; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ file: file,
            count: count,
            cursor: cursor,
            limit: limit,
            page: page }, extraArgs);
        return this._get('files.info', args);
    };
    Files.prototype.list = function (channel, count, page, ts_from, ts_to, types, user, extraArgs) {
        if (count === void 0) { count = 100; }
        if (page === void 0) { page = 1; }
        if (ts_from === void 0) { ts_from = 0; }
        if (ts_to === void 0) { ts_to = 'now'; }
        if (types === void 0) { types = 'all'; }
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            count: count,
            page: page,
            ts_from: ts_from,
            ts_to: ts_to,
            types: types,
            user: user }, extraArgs);
        return this._get('files.list', args);
    };
    Files.prototype.revokePublicURL = function (file, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ file: file }, extraArgs);
        return this._post('files.revokePublicURL', args);
    };
    Files.prototype.sharedPublicURL = function (file, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ file: file }, extraArgs);
        return this._post('files.sharedPublicURL', args);
    };
    Files.prototype.upload = function (channel, content, file, filename, filetype, initial_comment, thread_ts, title, extraArgs) {
        if (content === void 0) { content = null; }
        if (file === void 0) { file = null; }
        if (filename === void 0) { filename = null; }
        if (filetype === void 0) { filetype = null; }
        if (initial_comment === void 0) { initial_comment = null; }
        if (thread_ts === void 0) { thread_ts = null; }
        if (title === void 0) { title = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            filename: filename,
            filetype: filetype,
            initial_comment: initial_comment,
            thread_ts: thread_ts,
            title: title }, extraArgs);
        return this._post_file('files.upload', { content: content, file: file }, args);
    };
    return Files;
}(BaseAPI_1.default));
exports.default = Files;


/***/ }),

/***/ "./src/methods/Groups.ts":
/*!*******************************!*\
  !*** ./src/methods/Groups.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Groups = /** @class */ (function (_super) {
    __extends(Groups, _super);
    function Groups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Groups.prototype.archive = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('groups.archive', args);
    };
    Groups.prototype.create = function (name, validate, extraArgs) {
        if (validate === void 0) { validate = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name, validate: validate }, extraArgs);
        return this._get('groups.create', args);
    };
    Groups.prototype.createChild = function (channel, count, inclusive, latest, oldest, unreads, extraArgs) {
        if (count === void 0) { count = 100; }
        if (inclusive === void 0) { inclusive = '0'; }
        if (latest === void 0) { latest = 'now'; }
        if (oldest === void 0) { oldest = 0; }
        if (unreads === void 0) { unreads = '0'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            count: count,
            inclusive: inclusive,
            latest: latest,
            oldest: oldest,
            unreads: unreads }, extraArgs);
        return this._get('groups.createChild', args);
    };
    Groups.prototype.history = function (channel, count, inclusive, latest, oldest, unreads, extraArgs) {
        if (count === void 0) { count = 100; }
        if (inclusive === void 0) { inclusive = '0'; }
        if (latest === void 0) { latest = 'now'; }
        if (oldest === void 0) { oldest = 0; }
        if (unreads === void 0) { unreads = '0'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            count: count,
            inclusive: inclusive,
            latest: latest,
            oldest: oldest,
            unreads: unreads }, extraArgs);
        return this._get('groups.history', args);
    };
    Groups.prototype.info = function (channel, include_locale, extraArgs) {
        if (include_locale === void 0) { include_locale = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, include_locale: include_locale }, extraArgs);
        return this._get('groups.info', args);
    };
    Groups.prototype.invite = function (channel, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('groups.invite', args);
    };
    Groups.prototype.kick = function (channel, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('groups.kick', args);
    };
    Groups.prototype.leave = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('groups.leave', args);
    };
    Groups.prototype.list = function (options, cursor, exclude_archived, exclude_members, limit, extraArgs) {
        if (options === void 0) { options = {}; }
        if (cursor === void 0) { cursor = null; }
        if (exclude_archived === void 0) { exclude_archived = '0'; }
        if (exclude_members === void 0) { exclude_members = false; }
        if (limit === void 0) { limit = 0; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor,
            exclude_archived: exclude_archived,
            exclude_members: exclude_members,
            limit: limit }, extraArgs);
        return this._get('groups.list', args);
    };
    Groups.prototype.mark = function (channel, ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, ts: ts }, extraArgs);
        return this._post('groups.mark', args);
    };
    Groups.prototype.open = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('groups.mark', args);
    };
    Groups.prototype.rename = function (channel, name, validate, extraArgs) {
        if (validate === void 0) { validate = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, name: name, validate: validate }, extraArgs);
        return this._get('groups.rename', args);
    };
    Groups.prototype.replies = function (channel, thread_ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, thread_ts: thread_ts }, extraArgs);
        return this._get('groups.replies', args);
    };
    Groups.prototype.setPurpose = function (channel, purpose, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, purpose: purpose }, extraArgs);
        return this._post('groups.setPurpose', args);
    };
    Groups.prototype.setTopic = function (channel, topic, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, topic: topic }, extraArgs);
        return this._post('groups.setTopic', args);
    };
    Groups.prototype.unarchive = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('groups.unarchive', args);
    };
    return Groups;
}(BaseAPI_1.default));
exports.default = Groups;


/***/ }),

/***/ "./src/methods/IM.ts":
/*!***************************!*\
  !*** ./src/methods/IM.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var IM = /** @class */ (function (_super) {
    __extends(IM, _super);
    function IM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IM.prototype.close = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('im.close', args);
    };
    IM.prototype.history = function (channel, count, inclusive, latest, oldest, extraArgs) {
        if (count === void 0) { count = 100; }
        if (inclusive === void 0) { inclusive = '0'; }
        if (latest === void 0) { latest = 'now'; }
        if (oldest === void 0) { oldest = 0; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            count: count,
            inclusive: inclusive,
            latest: latest,
            oldest: oldest }, extraArgs);
        return this._get('im.history', args);
    };
    IM.prototype.list = function (cursor, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor, limit: limit }, extraArgs);
        return this._get('im.list', args);
    };
    IM.prototype.mark = function (channel, ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, ts: ts }, extraArgs);
        return this._post('im.mark', args);
    };
    IM.prototype.open = function (channel, user, include_locale, return_im, extraArgs) {
        if (include_locale === void 0) { include_locale = false; }
        if (return_im === void 0) { return_im = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            user: user,
            include_locale: include_locale,
            return_im: return_im }, extraArgs);
        return this._post('im.mark', args);
    };
    IM.prototype.replies = function (channel, thread_ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, thread_ts: thread_ts }, extraArgs);
        return this._get('im.replies', args);
    };
    return IM;
}(BaseAPI_1.default));
exports.default = IM;


/***/ }),

/***/ "./src/methods/MPIM.ts":
/*!*****************************!*\
  !*** ./src/methods/MPIM.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var MPIM = /** @class */ (function (_super) {
    __extends(MPIM, _super);
    function MPIM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MPIM.prototype.close = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('mpim.close', args);
    };
    MPIM.prototype.history = function (channel, count, inclusive, latest, oldest, unreads, extraArgs) {
        if (count === void 0) { count = 100; }
        if (inclusive === void 0) { inclusive = '0'; }
        if (latest === void 0) { latest = 'now'; }
        if (oldest === void 0) { oldest = 0; }
        if (unreads === void 0) { unreads = '0'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            count: count,
            inclusive: inclusive,
            latest: latest,
            oldest: oldest,
            unreads: unreads }, extraArgs);
        return this._get('mpim.history', args);
    };
    MPIM.prototype.list = function (cursor, limit, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = 0; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor, limit: limit }, extraArgs);
        return this._get('mpim.list', args);
    };
    MPIM.prototype.mark = function (channel, ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, ts: ts }, extraArgs);
        return this._post('mpim.mark', args);
    };
    MPIM.prototype.open = function (channel, user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, user: user }, extraArgs);
        return this._post('mpim.mark', args);
    };
    MPIM.prototype.replies = function (channel, thread_ts, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel, thread_ts: thread_ts }, extraArgs);
        return this._get('mpim.replies', args);
    };
    return MPIM;
}(BaseAPI_1.default));
exports.default = MPIM;


/***/ }),

/***/ "./src/methods/Migration.ts":
/*!**********************************!*\
  !*** ./src/methods/Migration.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Migration = /** @class */ (function (_super) {
    __extends(Migration, _super);
    function Migration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Migration.prototype.exchange = function (users, to_old, extraArgs) {
        if (to_old === void 0) { to_old = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ users: users, to_old: to_old }, extraArgs);
        return this._get('migration.exchange', args);
    };
    return Migration;
}(BaseAPI_1.default));
exports.default = Migration;


/***/ }),

/***/ "./src/methods/OAuth.ts":
/*!******************************!*\
  !*** ./src/methods/OAuth.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var OAuth = /** @class */ (function (_super) {
    __extends(OAuth, _super);
    function OAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OAuth.prototype.access = function (client_id, client_secret, code, redirect_uri, single_channel, extraArgs) {
        if (redirect_uri === void 0) { redirect_uri = null; }
        if (single_channel === void 0) { single_channel = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
            single_channel: single_channel }, extraArgs);
        var encodedParams = util_1.queryEncode(args);
        var url = BaseAPI_1.default.API_ENDPOINT + "oauth.access?" + encodedParams;
        return this._fetch(url, { method: 'POST' });
    };
    OAuth.prototype.token = function (client_id, client_secret, code, redirect_uri, single_channel, extraArgs) {
        if (redirect_uri === void 0) { redirect_uri = null; }
        if (single_channel === void 0) { single_channel = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
            single_channel: single_channel }, extraArgs);
        return this._get('oauth.token', args);
    };
    return OAuth;
}(BaseAPI_1.default));
exports.default = OAuth;


/***/ }),

/***/ "./src/methods/Pins.ts":
/*!*****************************!*\
  !*** ./src/methods/Pins.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Pins = /** @class */ (function (_super) {
    __extends(Pins, _super);
    function Pins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pins.prototype.add = function (channel, file, file_comment, timestamp, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            file: file,
            file_comment: file_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('pins.add', args);
    };
    Pins.prototype.list = function (channel, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel }, extraArgs);
        return this._post('pins.add', args);
    };
    Pins.prototype.remove = function (channel, file, file_comment, timestamp, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            file: file,
            file_comment: file_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('pins.remove', args);
    };
    return Pins;
}(BaseAPI_1.default));
exports.default = Pins;


/***/ }),

/***/ "./src/methods/RTM.ts":
/*!****************************!*\
  !*** ./src/methods/RTM.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var RTM = /** @class */ (function (_super) {
    __extends(RTM, _super);
    function RTM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTM.prototype.connect = function (batch_presence_aware, presence_sub, extraArgs) {
        if (batch_presence_aware === void 0) { batch_presence_aware = 'false'; }
        if (presence_sub === void 0) { presence_sub = true; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ batch_presence_aware: batch_presence_aware,
            presence_sub: presence_sub }, extraArgs);
        return this._get('reminders.add', args);
    };
    RTM.prototype.start = function (batch_presence_aware, include_locale, mpim_aware, no_latest, no_unreads, presence_sub, simple_latest, extraArgs) {
        if (batch_presence_aware === void 0) { batch_presence_aware = 'false'; }
        if (include_locale === void 0) { include_locale = false; }
        if (mpim_aware === void 0) { mpim_aware = null; }
        if (no_latest === void 0) { no_latest = 0; }
        if (no_unreads === void 0) { no_unreads = null; }
        if (presence_sub === void 0) { presence_sub = true; }
        if (simple_latest === void 0) { simple_latest = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ batch_presence_aware: batch_presence_aware,
            include_locale: include_locale,
            mpim_aware: mpim_aware,
            no_latest: no_latest,
            no_unreads: no_unreads,
            presence_sub: presence_sub,
            simple_latest: simple_latest }, extraArgs);
        return this._get('reminders.complete', args);
    };
    return RTM;
}(BaseAPI_1.default));
exports.default = RTM;


/***/ }),

/***/ "./src/methods/Reactions.ts":
/*!**********************************!*\
  !*** ./src/methods/Reactions.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Reactions = /** @class */ (function (_super) {
    __extends(Reactions, _super);
    function Reactions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reactions.prototype.add = function (name, file, channel, channel_comment, timestamp, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name,
            file: file,
            channel: channel,
            channel_comment: channel_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('reactions.add', args);
    };
    Reactions.prototype.get = function (channel, file, file_comment, full, timestamp, extraArgs) {
        if (channel === void 0) { channel = null; }
        if (file === void 0) { file = null; }
        if (file_comment === void 0) { file_comment = null; }
        if (full === void 0) { full = null; }
        if (timestamp === void 0) { timestamp = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            file: file,
            file_comment: file_comment,
            full: full,
            timestamp: timestamp }, extraArgs);
        return this._get('reactions.get', args);
    };
    Reactions.prototype.list = function (count, cursor, full, limit, page, user, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (full === void 0) { full = null; }
        if (limit === void 0) { limit = 0; }
        if (page === void 0) { page = 1; }
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ count: count,
            cursor: cursor,
            full: full,
            limit: limit,
            page: page,
            user: user }, extraArgs);
        return this._get('reactions.list', args);
    };
    Reactions.prototype.remove = function (name, channel, file, file_comment, timestamp, extraArgs) {
        if (name === void 0) { name = null; }
        if (channel === void 0) { channel = null; }
        if (file === void 0) { file = null; }
        if (file_comment === void 0) { file_comment = null; }
        if (timestamp === void 0) { timestamp = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name,
            channel: channel,
            file: file,
            file_comment: file_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('reactions.remove', args);
    };
    return Reactions;
}(BaseAPI_1.default));
exports.default = Reactions;


/***/ }),

/***/ "./src/methods/Reminders.ts":
/*!**********************************!*\
  !*** ./src/methods/Reminders.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Reminders = /** @class */ (function (_super) {
    __extends(Reminders, _super);
    function Reminders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reminders.prototype.add = function (text, time, user, extraArgs) {
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ text: text, time: time, user: user }, extraArgs);
        return this._post('reminders.add', args);
    };
    Reminders.prototype.complete = function (reminder, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ reminder: reminder }, extraArgs);
        return this._post('reminders.complete', args);
    };
    Reminders.prototype.delete_ = function (reminder, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ reminder: reminder }, extraArgs);
        return this._post('reminders.delete', args);
    };
    Reminders.prototype.info = function (reminder, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ reminder: reminder }, extraArgs);
        return this._get('reminders.info', args);
    };
    Reminders.prototype.list = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('reminders.list', args);
    };
    return Reminders;
}(BaseAPI_1.default));
exports.default = Reminders;


/***/ }),

/***/ "./src/methods/Search.ts":
/*!*******************************!*\
  !*** ./src/methods/Search.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Search.prototype.all = function (query, count, highlight, page, sort, sort_dir, extraArgs) {
        if (count === void 0) { count = 20; }
        if (highlight === void 0) { highlight = null; }
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = 'score'; }
        if (sort_dir === void 0) { sort_dir = 'desc'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ query: query,
            count: count,
            highlight: highlight,
            page: page,
            sort: sort,
            sort_dir: sort_dir }, extraArgs);
        return this._get('search.add', args);
    };
    Search.prototype.files = function (query, count, highlight, page, sort, sort_dir, extraArgs) {
        if (count === void 0) { count = 20; }
        if (highlight === void 0) { highlight = null; }
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = 'score'; }
        if (sort_dir === void 0) { sort_dir = 'desc'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ query: query,
            count: count,
            highlight: highlight,
            page: page,
            sort: sort,
            sort_dir: sort_dir }, extraArgs);
        return this._get('search.files', args);
    };
    Search.prototype.messages = function (query, count, highlight, page, sort, sort_dir, extraArgs) {
        if (count === void 0) { count = 20; }
        if (highlight === void 0) { highlight = null; }
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = 'score'; }
        if (sort_dir === void 0) { sort_dir = 'desc'; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ query: query,
            count: count,
            highlight: highlight,
            page: page,
            sort: sort,
            sort_dir: sort_dir }, extraArgs);
        return this._get('search.messages', args);
    };
    return Search;
}(BaseAPI_1.default));
exports.default = Search;


/***/ }),

/***/ "./src/methods/Stars.ts":
/*!******************************!*\
  !*** ./src/methods/Stars.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Stars = /** @class */ (function (_super) {
    __extends(Stars, _super);
    function Stars() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stars.prototype.add = function (channel, file, file_comment, timestamp, extraArgs) {
        if (channel === void 0) { channel = null; }
        if (file === void 0) { file = null; }
        if (file_comment === void 0) { file_comment = null; }
        if (timestamp === void 0) { timestamp = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            file: file,
            file_comment: file_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('stars.add', args);
    };
    Stars.prototype.list = function (count, cursor, limit, page, extraArgs) {
        if (count === void 0) { count = 100; }
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = null; }
        if (page === void 0) { page = 1; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ count: count,
            cursor: cursor,
            limit: limit,
            page: page }, extraArgs);
        return this._post('stars.list', args);
    };
    Stars.prototype.remove = function (channel, file, file_comment, timestamp, extraArgs) {
        if (channel === void 0) { channel = null; }
        if (file === void 0) { file = null; }
        if (file_comment === void 0) { file_comment = null; }
        if (timestamp === void 0) { timestamp = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ channel: channel,
            file: file,
            file_comment: file_comment,
            timestamp: timestamp }, extraArgs);
        return this._post('stars.remove', args);
    };
    return Stars;
}(BaseAPI_1.default));
exports.default = Stars;


/***/ }),

/***/ "./src/methods/Team.ts":
/*!*****************************!*\
  !*** ./src/methods/Team.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var TeamProfile = /** @class */ (function (_super) {
    __extends(TeamProfile, _super);
    function TeamProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamProfile.prototype.get = function (visibility, extraArgs) {
        if (visibility === void 0) { visibility = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ visibility: visibility }, extraArgs);
        return this._get('team.profile.get', args);
    };
    return TeamProfile;
}(BaseAPI_1.default));
var Team = /** @class */ (function (_super) {
    __extends(Team, _super);
    function Team(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.profile = new TeamProfile(token, retries_limit);
        return _this;
    }
    Team.prototype.accessLogs = function (before, count, page, extraArgs) {
        if (before === void 0) { before = 'now'; }
        if (count === void 0) { count = 100; }
        if (page === void 0) { page = 1; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ before: before, count: count, page: page }, extraArgs);
        return this._get('team.accessLogs', args);
    };
    Team.prototype.billableInfo = function (user, extraArgs) {
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ user: user }, extraArgs);
        return this._get('team.billableInfo', args);
    };
    Team.prototype.info = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('team.info', args);
    };
    Team.prototype.integrationLogs = function (app_id, change_type, count, page, service_id, user, extraArgs) {
        if (app_id === void 0) { app_id = null; }
        if (change_type === void 0) { change_type = null; }
        if (count === void 0) { count = 100; }
        if (page === void 0) { page = 1; }
        if (service_id === void 0) { service_id = null; }
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ app_id: app_id,
            change_type: change_type,
            count: count,
            page: page,
            service_id: service_id,
            user: user }, extraArgs);
        return this._get('team.integrationLogs', args);
    };
    return Team;
}(BaseAPI_1.default));
exports.default = Team;


/***/ }),

/***/ "./src/methods/UserGroups.ts":
/*!***********************************!*\
  !*** ./src/methods/UserGroups.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var UsergroupsUsers = /** @class */ (function (_super) {
    __extends(UsergroupsUsers, _super);
    function UsergroupsUsers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsergroupsUsers.prototype.list = function (usergroup, include_disabled, extraArgs) {
        if (include_disabled === void 0) { include_disabled = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            include_disabled: include_disabled }, extraArgs);
        return this._get('usergroups.users.list', args);
    };
    UsergroupsUsers.prototype.update = function (usergroup, users, include_count, extraArgs) {
        if (include_count === void 0) { include_count = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            users: users,
            include_count: include_count }, extraArgs);
        return this._post('usergroups.users.update', args);
    };
    return UsergroupsUsers;
}(BaseAPI_1.default));
var UserGroups = /** @class */ (function (_super) {
    __extends(UserGroups, _super);
    function UserGroups(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.users = new UsergroupsUsers(token, retries_limit);
        return _this;
    }
    UserGroups.prototype.create = function (name, channels, description, handle, include_disabled, extraArgs) {
        if (channels === void 0) { channels = null; }
        if (description === void 0) { description = null; }
        if (handle === void 0) { handle = null; }
        if (include_disabled === void 0) { include_disabled = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name,
            channels: channels,
            description: description,
            handle: handle,
            include_disabled: include_disabled }, extraArgs);
        return this._post('usergroups.create', args);
    };
    UserGroups.prototype.disable = function (usergroup, include_count, extraArgs) {
        if (include_count === void 0) { include_count = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            include_count: include_count }, extraArgs);
        return this._post('usergroups.disable', args);
    };
    UserGroups.prototype.enable = function (usergroup, include_count, extraArgs) {
        if (include_count === void 0) { include_count = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            include_count: include_count }, extraArgs);
        return this._post('usergroups.enable', args);
    };
    UserGroups.prototype.list = function (usergroup, include_count, include_disabled, include_users, extraArgs) {
        if (include_count === void 0) { include_count = null; }
        if (include_disabled === void 0) { include_disabled = null; }
        if (include_users === void 0) { include_users = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            include_count: include_count,
            include_disabled: include_disabled,
            include_users: include_users }, extraArgs);
        return this._get('usergroups.list', args);
    };
    UserGroups.prototype.update = function (usergroup, channels, description, handle, include_disabled, name, extraArgs) {
        if (channels === void 0) { channels = null; }
        if (description === void 0) { description = null; }
        if (handle === void 0) { handle = null; }
        if (include_disabled === void 0) { include_disabled = null; }
        if (name === void 0) { name = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ usergroup: usergroup,
            channels: channels,
            description: description,
            handle: handle,
            include_disabled: include_disabled,
            name: name }, extraArgs);
        return this._post('usergroups.create', args);
    };
    return UserGroups;
}(BaseAPI_1.default));
exports.default = UserGroups;


/***/ }),

/***/ "./src/methods/Users.ts":
/*!******************************!*\
  !*** ./src/methods/Users.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAPI_1 = __webpack_require__(/*! ./BaseAPI */ "./src/methods/BaseAPI.ts");
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users(token, retries_limit) {
        var _this = _super.call(this, token, retries_limit) || this;
        _this.profile = new UsersProfile(token, retries_limit);
        return _this;
    }
    Users.prototype.conversations = function (cursor, exclude_archived, limit, types, user, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (exclude_archived === void 0) { exclude_archived = true; }
        if (limit === void 0) { limit = 100; }
        if (types === void 0) { types = 'public_channel'; }
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor,
            exclude_archived: exclude_archived,
            limit: limit,
            types: types,
            user: user }, extraArgs);
        return this._get('users.conversations', args);
    };
    Users.prototype.deletePhoto = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('users.deletePhoto', args);
    };
    Users.prototype.getPresence = function (user, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ user: user }, extraArgs);
        return this._get('users.getPresence', args);
    };
    Users.prototype.identity = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._get('users.identity', args);
    };
    Users.prototype.info = function (user, include_locale, extraArgs) {
        if (include_locale === void 0) { include_locale = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ user: user, include_locale: include_locale }, extraArgs);
        return this._get('users.info', args);
    };
    Users.prototype.list = function (cursor, include_locale, limit, presence, extraArgs) {
        if (cursor === void 0) { cursor = null; }
        if (include_locale === void 0) { include_locale = false; }
        if (limit === void 0) { limit = 0; }
        if (presence === void 0) { presence = false; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ cursor: cursor,
            include_locale: include_locale,
            limit: limit,
            presence: presence }, extraArgs);
        return this._get('users.list', args);
    };
    Users.prototype.lookupByEmail = function (email, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ email: email }, extraArgs);
        return this._get('users.lookupByEmail', args);
    };
    Users.prototype.setActive = function (extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        return this._post('users.lookupByEmail', extraArgs);
    };
    Users.prototype.setPhoto = function (image, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({}, extraArgs);
        return this._post_file('users.setPhoto', { image: image }, args);
    };
    Users.prototype.setPresence = function (presence, extraArgs) {
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ presence: presence }, extraArgs);
        return this._post('users.setPresence', args);
    };
    return Users;
}(BaseAPI_1.default));
exports.default = Users;
var UsersProfile = /** @class */ (function (_super) {
    __extends(UsersProfile, _super);
    function UsersProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersProfile.prototype.get = function (include_labels, user, extraArgs) {
        if (include_labels === void 0) { include_labels = false; }
        if (user === void 0) { user = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ include_labels: include_labels, user: user }, extraArgs);
        return this._get('users.profile.get', args);
    };
    UsersProfile.prototype.set = function (name, profile, user, value, extraArgs) {
        if (name === void 0) { name = null; }
        if (profile === void 0) { profile = null; }
        if (user === void 0) { user = null; }
        if (value === void 0) { value = null; }
        if (extraArgs === void 0) { extraArgs = {}; }
        var args = __assign({ name: name,
            profile: profile,
            user: user,
            value: value }, extraArgs);
        return this._post('users.profile.set', args);
    };
    return UsersProfile;
}(BaseAPI_1.default));


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// ref) https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py#L846
exports.queryEncode = function (params) {
    var param_list = [];
    for (var key in params) {
        var param = params[key];
        if (param === null)
            continue;
        if (Array.isArray(param))
            param = param.join(',');
        else if (typeof param == 'object')
            param = JSON.stringify(param);
        param_list.push(key + "=" + param);
    }
    return param_list.join('&');
};
exports.createPayload = function (params) {
    var payload = __assign({}, params);
    for (var key in payload) {
        var param = payload[key];
        if (param == null)
            delete payload[key];
        else if (typeof param !== 'string')
            payload[key] = JSON.stringify(param);
    }
    return payload;
};


/***/ })

/******/ });