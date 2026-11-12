import BaseAPI, { SlackParams } from './BaseAPI';
export default class OAuth extends BaseAPI {
    private rotation;
    constructor(token: string | null, retries_limit?: number);
    v1: {
        access: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
    };
    v2: {
        access: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        beginShortTokenRotation: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        completeShortTokenRotation: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        exchange: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        user: {
            access: (params?: SlackParams) => import("./BaseAPI").SlackResponse;
        };
    };
    private rotate;
    access(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
