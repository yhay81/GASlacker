import BaseAPI from './BaseAPI';
declare class AuthTeams extends BaseAPI {
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Auth extends BaseAPI {
    teams: AuthTeams;
    constructor(token: string | null, retries_limit?: number);
    revoke(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    test(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
