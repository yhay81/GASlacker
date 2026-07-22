import BaseAPI, { SlackParams } from './BaseAPI';
export default class Emoji extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
