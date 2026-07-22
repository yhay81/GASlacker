import BaseAPI, { SlackParams } from './BaseAPI';
export default class DND extends BaseAPI {
    endDnd(params?: SlackParams): import("./BaseAPI").SlackResponse;
    endSnooze(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setSnooze(params?: SlackParams): import("./BaseAPI").SlackResponse;
    teamInfo(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
