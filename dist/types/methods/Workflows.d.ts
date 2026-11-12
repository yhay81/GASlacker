import BaseAPI, { SlackParams } from './BaseAPI';
declare class WorkflowsFeatured extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Workflows extends BaseAPI {
    triggers: {
        create: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete_: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        permissions: {
            add: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            remove: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            set: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
        update: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    featured: WorkflowsFeatured;
    constructor(token: string | null, retries_limit?: number);
}
export {};
