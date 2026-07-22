import API from './methods/API'
import Apps from './methods/Apps'
import Assistant from './methods/Assistant'
import Auth from './methods/Auth'
import Bookmarks from './methods/Bookmarks'
import Bots from './methods/Bots'
import Calls from './methods/Calls'
import Canvases from './methods/Canvases'
import Chat from './methods/Chat'
import Conversations from './methods/Conversations'
import Dialog from './methods/Dialog'
import DND from './methods/DND'
import Emoji from './methods/Emoji'
import Entity from './methods/Entity'
import Files from './methods/Files'
import Functions from './methods/Functions'
import OAuth from './methods/OAuth'
import OpenID from './methods/OpenID'
import Pins from './methods/Pins'
import Reactions from './methods/Reactions'
import Reminders from './methods/Reminders'
import Search from './methods/Search'
import SlackLists from './methods/SlackLists'
import Stars from './methods/Stars'
import Team from './methods/Team'
import Tooling from './methods/Tooling'
import UserGroups from './methods/UserGroups'
import Users from './methods/Users'
import Views from './methods/Views'
import Workflows from './methods/Workflows'

import { DEFAULT_RETRIES, type SlackParams } from './methods/BaseAPI'

export type { SlackParams, SlackResponse } from './methods/BaseAPI'

export class Methods {
  public api
  public apps
  public assistant
  public auth
  public bookmarks
  public bots
  public calls
  public canvases
  public chat
  public conversations
  public dialog
  public dnd
  public emoji
  public entity
  public files
  public functions
  public oauth
  public openid
  public pins
  public reactions
  public reminders
  public search
  public slackLists
  public stars
  public team
  public tooling
  public usergroups
  public users
  public views
  public workflows

  constructor(token: string | null, retries_limit: number = DEFAULT_RETRIES) {
    this.api = new API(token, retries_limit)
    this.apps = new Apps(token, retries_limit)
    this.assistant = new Assistant(token, retries_limit)
    this.auth = new Auth(token, retries_limit)
    this.bookmarks = new Bookmarks(token, retries_limit)
    this.bots = new Bots(token, retries_limit)
    this.calls = new Calls(token, retries_limit)
    this.canvases = new Canvases(token, retries_limit)
    this.chat = new Chat(token, retries_limit)
    this.conversations = new Conversations(token, retries_limit)
    this.dialog = new Dialog(token, retries_limit)
    this.dnd = new DND(token, retries_limit)
    this.emoji = new Emoji(token, retries_limit)
    this.entity = new Entity(token, retries_limit)
    this.files = new Files(token, retries_limit)
    this.functions = new Functions(token, retries_limit)
    // oauth.v2.access needs no token (it uses client_id / client_secret), so pass null
    this.oauth = new OAuth(null, retries_limit)
    // openid.connect.userInfo needs the user token; the code exchange stays token-free (OpenID.ts)
    this.openid = new OpenID(token, retries_limit)
    this.pins = new Pins(token, retries_limit)
    this.reactions = new Reactions(token, retries_limit)
    this.reminders = new Reminders(token, retries_limit)
    this.search = new Search(token, retries_limit)
    this.slackLists = new SlackLists(token, retries_limit)
    this.stars = new Stars(token, retries_limit)
    this.team = new Team(token, retries_limit)
    // tooling.tokens.rotate authenticates with refresh_token and rejects a bearer token
    this.tooling = new Tooling(null, retries_limit)
    this.usergroups = new UserGroups(token, retries_limit)
    this.users = new Users(token, retries_limit)
    this.views = new Views(token, retries_limit)
    this.workflows = new Workflows(token, retries_limit)
  }

  public call(api: string, params: SlackParams = {}, method: 'get' | 'post' | 'form' = 'post') {
    return this.api.call(api, params, method)
  }

  // Follows cursor pagination, returning one response per page
  public paginate(
    api: string,
    params: SlackParams = {},
    method: 'get' | 'post' = 'post',
    max_pages: number = 20,
  ) {
    return this.api.paginate(api, params, method, max_pages)
  }
}

declare const global: any

/**
 * Creates a Slack Web API client.
 * @param {string|null} token Bot/User token (xoxb- / xoxp-). May be null if you only call token-free APIs.
 * @param {number} [retries_limit] Extra retry attempts on HTTP 429 (integer 0-10; default 3)
 * @return {Object} A client with one property per category (chat, conversations, files, etc.)
 */
global.methods = (token: string | null, retries_limit: number = DEFAULT_RETRIES) =>
  new Methods(token, retries_limit)
