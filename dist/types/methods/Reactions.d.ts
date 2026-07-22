import BaseAPI from './BaseAPI';
export default class Reactions extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    get(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    remove(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
