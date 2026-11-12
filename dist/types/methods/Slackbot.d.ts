import BaseAPI, { SlackParams } from './BaseAPI';
export default class Slackbot extends BaseAPI {
    skills: {
        create: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        delete_: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        info: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        library: {
            add: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            remove: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
        list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        update: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
}
