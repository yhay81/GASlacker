import BaseAPI from './BaseAPI';
export default class DND extends BaseAPI {
    endDnd(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    endSnooze(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setSnooze(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    teamInfo(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
