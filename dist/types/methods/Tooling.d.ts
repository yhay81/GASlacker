import BaseAPI from './BaseAPI';
declare class ToolingTokens extends BaseAPI {
    rotate(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Tooling extends BaseAPI {
    tokens: ToolingTokens;
    constructor(token: string | null, retries_limit?: number);
}
export {};
