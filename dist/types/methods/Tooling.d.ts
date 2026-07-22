import BaseAPI, { SlackParams } from './BaseAPI';
declare class ToolingTokens extends BaseAPI {
    rotate(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Tooling extends BaseAPI {
    tokens: ToolingTokens;
    constructor(token: string | null, retries_limit?: number);
}
export {};
