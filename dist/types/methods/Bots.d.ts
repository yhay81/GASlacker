import BaseAPI, { SlackParams } from './BaseAPI';
export default class Bots extends BaseAPI {
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
