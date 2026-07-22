import BaseAPI from './BaseAPI';
declare class CallsParticipants extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    remove(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Calls extends BaseAPI {
    participants: CallsParticipants;
    constructor(token: string | null, retries_limit?: number);
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    end(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
