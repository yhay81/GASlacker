import BaseAPI, { SlackParams } from './BaseAPI';
export default class Functions extends BaseAPI {
    completeError(params?: SlackParams): import("./BaseAPI").SlackResponse;
    completeSuccess(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
