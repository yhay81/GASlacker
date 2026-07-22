import BaseAPI from './BaseAPI';
export default class Bookmarks extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    edit(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    remove(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
