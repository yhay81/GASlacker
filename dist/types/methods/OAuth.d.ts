import BaseAPI, { SlackParams } from './BaseAPI';
export default class OAuth extends BaseAPI {
    access(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
