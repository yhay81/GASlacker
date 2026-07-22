import BaseAPI, { SlackParams } from './BaseAPI';
declare class AppsConnections extends BaseAPI {
    open(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AppsEventAuthorizations extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AppsManifest extends BaseAPI {
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    export(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
    validate(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AppsUserConnection extends BaseAPI {
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AppsUser extends BaseAPI {
    connection: AppsUserConnection;
    constructor(token: string | null, retries_limit?: number);
}
export default class Apps extends BaseAPI {
    connections: AppsConnections;
    eventAuthorizations: AppsEventAuthorizations;
    manifest: AppsManifest;
    user: AppsUser;
    constructor(token: string | null, retries_limit?: number);
    uninstall(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
