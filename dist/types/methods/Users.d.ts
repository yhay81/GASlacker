import BaseAPI, { SlackParams } from './BaseAPI';
declare class UsersProfile extends BaseAPI {
    get(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class UsersDiscoverableContacts extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Users extends BaseAPI {
    profile: UsersProfile;
    discoverableContacts: UsersDiscoverableContacts;
    constructor(token: string | null, retries_limit?: number);
    conversations(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deletePhoto(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getPresence(params?: SlackParams): import("./BaseAPI").SlackResponse;
    identity(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    lookupByEmail(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setActive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setPhoto(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setPresence(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
