export interface SlackResponse {
    ok: boolean;
    error?: string;
    [key: string]: any;
}
export default class BaseAPI {
    protected _token: string | null;
    private _retries_limit;
    static API_ENDPOINT: string;
    constructor(_token?: string | null, _retries_limit?: number);
    protected _get(api: string, args?: Record<string, any>): SlackResponse;
    protected _post(api: string, args?: Record<string, any>): SlackResponse;
    protected _post_form(api: string, args?: Record<string, any>): SlackResponse;
    protected _post_file(api: string, file_args: Record<string, any>, args?: Record<string, any>): SlackResponse;
    protected _fetch(url: string, params?: Record<string, any>): SlackResponse;
    private _getHeader;
    private _buildHeaders;
    protected _normalizeArgs(args: Record<string, any>, name: string): Record<string, any>;
    private _parseResponse;
}
