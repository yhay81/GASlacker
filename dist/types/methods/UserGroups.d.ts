import BaseAPI, { SlackParams } from './BaseAPI';
declare class UserGroupsUsers extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class UserGroups extends BaseAPI {
    users: UserGroupsUsers;
    constructor(token: string | null, retries_limit?: number);
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    disable(params?: SlackParams): import("./BaseAPI").SlackResponse;
    enable(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
