import BaseAPI, { SlackParams } from './BaseAPI';
export default class Stars extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
