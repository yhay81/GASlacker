import BaseAPI from './BaseAPI';
export default class Reminders extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    complete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
