import BaseAPI, { SlackParams } from './BaseAPI';
export default class Functions extends BaseAPI {
    distributions: {
        permissions: {
            add: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            remove: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            set: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
    };
    workflows: {
        steps: {
            list: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            responses: {
                export: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
            };
        };
    };
    completeError(params?: SlackParams): import("./BaseAPI").SlackResponse;
    completeSuccess(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
