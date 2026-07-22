import BaseAPI from './BaseAPI';
declare class AssistantThreads extends BaseAPI {
    setStatus(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setSuggestedPrompts(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setTitle(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Assistant extends BaseAPI {
    threads: AssistantThreads;
    constructor(token: string | null, retries_limit?: number);
}
export {};
