import BaseAPI from './BaseAPI';
export default class Chat extends BaseAPI {
    appendStream(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    startStream(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    stopStream(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    deleteScheduledMessage(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    getPermalink(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    meMessage(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    postEphemeral(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    postMessage(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    scheduleMessage(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    scheduledMessagesList(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    unfurl(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
