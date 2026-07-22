import BaseAPI from './BaseAPI';
export default class Search extends BaseAPI {
    all(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    files(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    messages(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
