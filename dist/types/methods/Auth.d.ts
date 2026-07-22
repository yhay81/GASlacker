import BaseAPI, { SlackParams } from './BaseAPI';
declare class AuthTeams extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Auth extends BaseAPI {
    teams: AuthTeams;
    constructor(token: string | null, retries_limit?: number);
    revoke(params?: SlackParams): import("./BaseAPI").SlackResponse;
    test(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
