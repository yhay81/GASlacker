import BaseAPI, { SlackParams } from './BaseAPI';
export default class Entity extends BaseAPI {
    acknowledgeCommentAction(params?: SlackParams): import("./BaseAPI").SlackResponse;
    presentComments(params?: SlackParams): import("./BaseAPI").SlackResponse;
    presentDetails(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
