import BaseAPI, { SlackParams } from './BaseAPI';
declare class WorkflowsFeatured extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Workflows extends BaseAPI {
    featured: WorkflowsFeatured;
    constructor(token: string | null, retries_limit?: number);
}
export {};
