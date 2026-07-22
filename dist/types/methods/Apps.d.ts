import BaseAPI from './BaseAPI';
declare class AppsConnections extends BaseAPI {
    open(params?: Record<string, any>): any;
}
declare class AppsEventAuthorizations extends BaseAPI {
    list(params?: Record<string, any>): any;
}
declare class AppsManifest extends BaseAPI {
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    export(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    validate(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class AppsUserConnection extends BaseAPI {
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
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
    uninstall(params?: Record<string, any>): any;
}
export {};
