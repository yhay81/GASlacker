import BaseAPI, { SlackParams } from './BaseAPI';
export default class RTM extends BaseAPI {
    connect(params?: SlackParams): import("./BaseAPI").SlackResponse;
    start(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
