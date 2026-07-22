import BaseAPI from './BaseAPI';
export default class Functions extends BaseAPI {
    completeError(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    completeSuccess(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
