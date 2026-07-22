import BaseAPI, { SlackParams } from './BaseAPI';
declare class AssistantThreads extends BaseAPI {
    setStatus(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setSuggestedPrompts(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setTitle(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Assistant extends BaseAPI {
    threads: AssistantThreads;
    constructor(token: string | null, retries_limit?: number);
}
export {};
