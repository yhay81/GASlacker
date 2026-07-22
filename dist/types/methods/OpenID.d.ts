import BaseAPI, { SlackParams } from './BaseAPI';
declare class OpenIDConnect extends BaseAPI {
    private _exchange;
    constructor(token: string | null, retries_limit?: number);
    token(params?: SlackParams): import("./BaseAPI").SlackResponse;
    userInfo(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class OpenID extends BaseAPI {
    connect: OpenIDConnect;
    constructor(token: string | null, retries_limit?: number);
}
export {};
