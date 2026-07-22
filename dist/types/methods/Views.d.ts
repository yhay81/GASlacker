import BaseAPI, { SlackParams } from './BaseAPI';
export default class Views extends BaseAPI {
    open(params?: SlackParams): import("./BaseAPI").SlackResponse;
    publish(params?: SlackParams): import("./BaseAPI").SlackResponse;
    push(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
