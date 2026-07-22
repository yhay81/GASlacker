import BaseAPI from './BaseAPI';
export default class Stars extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    remove(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
