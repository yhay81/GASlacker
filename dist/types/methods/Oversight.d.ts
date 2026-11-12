import BaseAPI, { type SlackParams } from './BaseAPI';
export default class Oversight extends BaseAPI {
    chat: {
        delete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete_: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        restore: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        tombstone: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        update: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    conversations: {
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        members: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    enterprise: {
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    user: {
        conversations: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    users: {
        list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
}
