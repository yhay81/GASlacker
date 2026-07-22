import BaseAPI from './BaseAPI';
export default class Views extends BaseAPI {
    open(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    publish(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    push(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
