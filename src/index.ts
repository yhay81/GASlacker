import Admin from './methods/Admin'
import Agents from './methods/Agents'
import API from './methods/API'
import Apps from './methods/Apps'
import Assistant from './methods/Assistant'
import Auth from './methods/Auth'
import Blocks from './methods/Blocks'
import Bookmarks from './methods/Bookmarks'
import Bots from './methods/Bots'
import Calls from './methods/Calls'
import Canvases from './methods/Canvases'
import Chat from './methods/Chat'
import Conversations from './methods/Conversations'
import Dialog from './methods/Dialog'
import DND from './methods/DND'
import Emoji from './methods/Emoji'
import Enterprise from './methods/Enterprise'
import Entity from './methods/Entity'
import Files from './methods/Files'
import Functions from './methods/Functions'
import Links from './methods/Links'
import Migration from './methods/Migration'
import OAuth from './methods/OAuth'
import OpenID from './methods/OpenID'
import Oversight from './methods/Oversight'
import Pins from './methods/Pins'
import Reactions from './methods/Reactions'
import Reminders from './methods/Reminders'
import RTM from './methods/RTM'
import Search from './methods/Search'
import Slackbot from './methods/Slackbot'
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
  public admin
  public agents
  public api
  public apps
  public assistant
  public auth
  public blocks
  public bookmarks
  public bots
  public calls
  public canvases
  public chat
  public conversations
  public dialog
  public dnd
  public emoji
  public enterprise
  public entity
  public files
  public functions
  public links
  public migration
  public oauth
  public openid
  public oversight
  public pins
  public reactions
  public reminders
  public rtm
  public search
  public slackbot
  public slackLists
  public stars
  public team
  public tooling
  public usergroups
  public users
  public views
  public workflows

  constructor(token: string | null, retries_limit: number = DEFAULT_RETRIES) {
    this.admin = new Admin(token, retries_limit)
    this.agents = new Agents(token, retries_limit)
    this.api = new API(token, retries_limit)
    this.apps = new Apps(token, retries_limit)
    this.assistant = new Assistant(token, retries_limit)
    this.auth = new Auth(token, retries_limit)
    this.blocks = new Blocks(token, retries_limit)
    this.bookmarks = new Bookmarks(token, retries_limit)
    this.bots = new Bots(token, retries_limit)
    this.calls = new Calls(token, retries_limit)
    this.canvases = new Canvases(token, retries_limit)
    this.chat = new Chat(token, retries_limit)
    this.conversations = new Conversations(token, retries_limit)
    this.dialog = new Dialog(token, retries_limit)
    this.dnd = new DND(token, retries_limit)
    this.emoji = new Emoji(token, retries_limit)
    this.enterprise = new Enterprise(token, retries_limit)
    this.entity = new Entity(token, retries_limit)
    this.files = new Files(token, retries_limit)
    this.functions = new Functions(token, retries_limit)
    this.links = new Links(token, retries_limit)
    this.migration = new Migration(token, retries_limit)
    // OAuth code exchanges omit the bearer token. Token rotation can use it.
    this.oauth = new OAuth(token, retries_limit)
    // openid.connect.userInfo needs the user token; the code exchange stays token-free (OpenID.ts)
    this.openid = new OpenID(token, retries_limit)
    this.oversight = new Oversight(token, retries_limit)
    this.pins = new Pins(token, retries_limit)
    this.reactions = new Reactions(token, retries_limit)
    this.reminders = new Reminders(token, retries_limit)
    this.rtm = new RTM(token, retries_limit)
    this.search = new Search(token, retries_limit)
    this.slackbot = new Slackbot(token, retries_limit)
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
    method: 'get' | 'post' | 'form' = 'post',
    max_pages?: number,
  ) {
    return this.api.paginate(api, params, method, max_pages)
  }
}

/**
 * Creates a Slack Web API client.
 * @param {string|null} token Access token with the scopes required by the method, or null for token-free APIs.
 * @param {number} [retries_limit] Extra retry attempts on HTTP 429 (integer 0-10; default 3)
 * @return {Object} A client with one property per category (chat, conversations, files, etc.)
 */
export function methods(token: string | null, retries_limit: number = DEFAULT_RETRIES): Methods {
  return new Methods(token, retries_limit)
}
