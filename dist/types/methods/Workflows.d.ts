import BaseAPI from './BaseAPI';
declare class WorkflowsFeatured extends BaseAPI {
    add(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    remove(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    set(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Workflows extends BaseAPI {
    featured: WorkflowsFeatured;
    constructor(token: string | null, retries_limit?: number);
}
export {};
