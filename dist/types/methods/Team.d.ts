import BaseAPI from './BaseAPI';
declare class TeamProfile extends BaseAPI {
    get(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class TeamBilling extends BaseAPI {
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class TeamPreferences extends BaseAPI {
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class TeamExternalTeams extends BaseAPI {
    disconnect(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Team extends BaseAPI {
    profile: TeamProfile;
    billing: TeamBilling;
    preferences: TeamPreferences;
    externalTeams: TeamExternalTeams;
    constructor(token: string | null, retries_limit?: number);
    accessLogs(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    billableInfo(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    integrationLogs(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
