import BaseAPI, { SlackParams } from './BaseAPI';
export default class Migration extends BaseAPI {
    exchange(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
