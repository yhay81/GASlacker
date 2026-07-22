import BaseAPI from './BaseAPI';
declare class OpenIDConnect extends BaseAPI {
    token(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    userInfo(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class OpenID extends BaseAPI {
    connect: OpenIDConnect;
    constructor(token: string | null, retries_limit?: number);
}
export {};
