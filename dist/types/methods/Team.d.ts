import BaseAPI, { SlackParams } from './BaseAPI';
declare class TeamProfile extends BaseAPI {
    get(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class TeamBilling extends BaseAPI {
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class TeamPreferences extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class TeamExternalTeams extends BaseAPI {
    disconnect(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Team extends BaseAPI {
    profile: TeamProfile;
    billing: TeamBilling;
    preferences: TeamPreferences;
    externalTeams: TeamExternalTeams;
    constructor(token: string | null, retries_limit?: number);
    accessLogs(params?: SlackParams): import("./BaseAPI").SlackResponse;
    billableInfo(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    integrationLogs(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
