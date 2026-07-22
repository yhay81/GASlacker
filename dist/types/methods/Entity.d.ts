import BaseAPI, { SlackParams } from './BaseAPI';
export default class Entity extends BaseAPI {
    presentDetails(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
