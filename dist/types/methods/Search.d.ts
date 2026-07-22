import BaseAPI, { SlackParams } from './BaseAPI';
export default class Search extends BaseAPI {
    all(params?: SlackParams): import("./BaseAPI").SlackResponse;
    files(params?: SlackParams): import("./BaseAPI").SlackResponse;
    messages(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
