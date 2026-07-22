import BaseAPI, { SlackParams } from './BaseAPI';
declare class ChatScheduledMessages extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Chat extends BaseAPI {
    scheduledMessages: ChatScheduledMessages;
    constructor(token: string | null, retries_limit?: number);
    appendStream(params?: SlackParams): import("./BaseAPI").SlackResponse;
    startStream(params?: SlackParams): import("./BaseAPI").SlackResponse;
    stopStream(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deleteScheduledMessage(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getPermalink(params?: SlackParams): import("./BaseAPI").SlackResponse;
    meMessage(params?: SlackParams): import("./BaseAPI").SlackResponse;
    postEphemeral(params?: SlackParams): import("./BaseAPI").SlackResponse;
    postMessage(params?: SlackParams): import("./BaseAPI").SlackResponse;
    scheduleMessage(params?: SlackParams): import("./BaseAPI").SlackResponse;
    scheduledMessagesList(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unfurl(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
