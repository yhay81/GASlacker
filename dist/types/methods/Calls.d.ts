import BaseAPI, { SlackParams } from './BaseAPI';
declare class CallsParticipants extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Calls extends BaseAPI {
    participants: CallsParticipants;
    constructor(token: string | null, retries_limit?: number);
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    end(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
