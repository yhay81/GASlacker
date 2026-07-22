import BaseAPI, { SlackParams } from './BaseAPI';
export default class Reactions extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    get(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
