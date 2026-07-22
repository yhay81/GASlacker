import BaseAPI from './BaseAPI';
declare class UsergroupsUsers extends BaseAPI {
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class UserGroups extends BaseAPI {
    users: UsergroupsUsers;
    constructor(token: string | null, retries_limit?: number);
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    disable(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    enable(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
