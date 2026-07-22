import BaseAPI, { SlackParams } from './BaseAPI';
export default class Dialog extends BaseAPI {
    open(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
