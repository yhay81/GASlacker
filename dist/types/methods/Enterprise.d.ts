import BaseAPI, { type SlackParams } from './BaseAPI';
export default class Enterprise extends BaseAPI {
    auth: {
        idpconfig: {
            apply: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            get: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            remove: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            set: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
    };
}
