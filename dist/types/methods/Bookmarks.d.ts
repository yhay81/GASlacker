import BaseAPI, { SlackParams } from './BaseAPI';
export default class Bookmarks extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    edit(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
