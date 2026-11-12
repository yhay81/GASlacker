import BaseAPI, { SlackParams } from './BaseAPI';
export default class Blocks extends BaseAPI {
    validate(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
