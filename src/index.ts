import API from './methods/API';
import Apps from './methods/Apps';
import Auth from './methods/Auth';
import Bots from './methods/Bots';
import Channels from './methods/Channels';
import Chat from './methods/Chat';
import Conversations from './methods/Conversations';
import Dialog from './methods/Dialog';
import DND from './methods/DND';
import Emoji from './methods/Emoji';
import Files from './methods/Files';
import Groups from './methods/Groups';
import IM from './methods/IM';
import Migration from './methods/Migration';
import MPIM from './methods/MPIM';
import OAuth from './methods/OAuth';
import Pins from './methods/Pins';
import Reactions from './methods/Reactions';
import Reminders from './methods/Reminders';
import RTM from './methods/RTM';
import Search from './methods/Search';
import Stars from './methods/Stars';
import Team from './methods/Team';
import UserGroups from './methods/UserGroups';
import Users from './methods/Users';

import { DEFAULT_RETRIES } from './config';

class Methods {
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

  constructor(token: string, retries_limit: number = DEFAULT_RETRIES) {
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
    this.usergroups = new UserGroups(token, retries_limit);
    this.users = new Users(token, retries_limit);

    // this.presence = new Presence(token, retries_limit);
    // this.idpgroups = new IDPGroups(token, retries_limit);
    // this.incomingwebhook = new IncomingWebhook(url);
  }
}

declare const global: any;

global.methods = (token: string, retries_limit: number = DEFAULT_RETRIES) =>
  new Methods(token, retries_limit);
