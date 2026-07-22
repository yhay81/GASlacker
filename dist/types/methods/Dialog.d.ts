import BaseAPI from './BaseAPI';
export default class Dialog extends BaseAPI {
    open(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
