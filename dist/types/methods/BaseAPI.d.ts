export declare const DEFAULT_RETRIES = 3;
export type SlackParams = Record<string, any>;
export interface SlackResponse {
    ok: boolean;
    error?: string;
    retry_after?: number;
    [key: string]: any;
}
export default class BaseAPI {
    protected _token: string | null;
    private _retries_limit;
    static API_ENDPOINT: string;
    constructor(_token?: string | null, _retries_limit?: number);
    protected _get(api: string, args?: SlackParams): SlackResponse;
    protected _post(api: string, args?: SlackParams): SlackResponse;
    protected _post_form(api: string, args?: SlackParams): SlackResponse;
    protected _post_file(api: string, file_args: SlackParams, args?: SlackParams): SlackResponse;
    protected _fetch(url: string, params?: Record<string, any>): SlackResponse;
    private _getHeader;
    private _buildHeaders;
    protected _normalizeArgs(args: SlackParams, name: string): SlackParams;
    private _parseResponse;
}
