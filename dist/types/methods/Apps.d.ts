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
    bulkUpdate(params?: SlackParams): import("./BaseAPI").SlackResponse;
    requestAuth(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AppsUser extends BaseAPI {
    connection: AppsUserConnection;
    constructor(token: string | null, retries_limit?: number);
}
export default class Apps extends BaseAPI {
    activities: {
        list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    auth: {
        external: {
            delete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            delete_: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            get: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
    };
    datastore: {
        bulkDelete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        bulkGet: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        bulkPut: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        count: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete_: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        get: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        put: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        query: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        update: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    icon: {
        set: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    links: {
        toggle: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    managed: {
        permissions: {
            set: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
    };
    connections: AppsConnections;
    event: {
        authorizations: AppsEventAuthorizations;
    };
    eventAuthorizations: AppsEventAuthorizations;
    manifest: AppsManifest;
    user: AppsUser;
    constructor(token: string | null, retries_limit?: number);
    uninstall(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
