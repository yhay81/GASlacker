import BaseAPI from './BaseAPI';
declare class UsersDiscoverableContacts extends BaseAPI {
    lookup(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Users extends BaseAPI {
    profile: UsersProfile;
    discoverableContacts: UsersDiscoverableContacts;
    constructor(token: string | null, retries_limit?: number);
    conversations(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    deletePhoto(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    getPresence(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    identity(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    lookupByEmail(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setActive(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setPhoto(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setPresence(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class UsersProfile extends BaseAPI {
    get(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    set(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
