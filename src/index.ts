import API from './methods/API'
import Apps from './methods/Apps'
import Assistant from './methods/Assistant'
import Auth from './methods/Auth'
import Bookmarks from './methods/Bookmarks'
import Bots from './methods/Bots'
import Canvases from './methods/Canvases'
import Chat from './methods/Chat'
import Conversations from './methods/Conversations'
import Dialog from './methods/Dialog'
import DND from './methods/DND'
import Emoji from './methods/Emoji'
import Files from './methods/Files'
import OAuth from './methods/OAuth'
import Pins from './methods/Pins'
import Reactions from './methods/Reactions'
import Reminders from './methods/Reminders'
import Search from './methods/Search'
import Stars from './methods/Stars'
import Team from './methods/Team'
import UserGroups from './methods/UserGroups'
import Users from './methods/Users'
import Views from './methods/Views'

import { DEFAULT_RETRIES } from './config'

export class Methods {
  public api
  public apps
  public assistant
  public auth
  public bookmarks
  public bots
  public canvases
  public chat
  public conversations
  public dialog
  public dnd
  public emoji
  public files
  public oauth
  public pins
  public reactions
  public reminders
  public search
  public stars
  public team
  public usergroups
  public users
  public views

  constructor(token: string, retries_limit: number = DEFAULT_RETRIES) {
    this.api = new API(token, retries_limit)
    this.apps = new Apps(token, retries_limit)
    this.assistant = new Assistant(token, retries_limit)
    this.auth = new Auth(token, retries_limit)
    this.bookmarks = new Bookmarks(token, retries_limit)
    this.bots = new Bots(token, retries_limit)
    this.canvases = new Canvases(token, retries_limit)
    this.chat = new Chat(token, retries_limit)
    this.conversations = new Conversations(token, retries_limit)
    this.dialog = new Dialog(token, retries_limit)
    this.dnd = new DND(token, retries_limit)
    this.emoji = new Emoji(token, retries_limit)
    this.files = new Files(token, retries_limit)
    // oauth.v2.access はトークン不要(client_id / client_secret を使う)ため null を渡す
    this.oauth = new OAuth(null, retries_limit)
    this.pins = new Pins(token, retries_limit)
    this.reactions = new Reactions(token, retries_limit)
    this.reminders = new Reminders(token, retries_limit)
    this.search = new Search(token, retries_limit)
    this.stars = new Stars(token, retries_limit)
    this.team = new Team(token, retries_limit)
    this.usergroups = new UserGroups(token, retries_limit)
    this.users = new Users(token, retries_limit)
    this.views = new Views(token, retries_limit)
  }

  public call(api: string, params: Record<string, any> = {}, method: 'get' | 'post' = 'post') {
    return this.api.call(api, params, method)
  }
}

declare const global: any

global.methods = (token: string, retries_limit: number = DEFAULT_RETRIES) =>
  new Methods(token, retries_limit)
