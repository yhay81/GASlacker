import BaseAPI, { SlackParams } from './BaseAPI';
export default class Reminders extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    complete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
