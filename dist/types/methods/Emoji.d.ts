import BaseAPI from './BaseAPI';
export default class Emoji extends BaseAPI {
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
