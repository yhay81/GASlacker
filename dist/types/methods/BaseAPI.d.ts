export declare const DEFAULT_RETRIES = 3;
export type SlackParams = Record<string, any>;
export interface SlackResponse {
    ok: boolean;
    error?: string;
    retry_after?: number;
    [key: string]: any;
}
type ResponseParser = (response: GoogleAppsScript.URL_Fetch.HTTPResponse) => SlackResponse;
export default class BaseAPI {
    protected _token: string | null;
    private _retries_limit;
    static API_ENDPOINT: string;
    constructor(_token?: string | null, _retries_limit?: number);
    protected _get(api: string, args?: SlackParams, parseResponse?: ResponseParser): SlackResponse;
    protected _post(api: string, args?: SlackParams, parseResponse?: ResponseParser): SlackResponse;
    protected _post_form(api: string, args?: SlackParams, parseResponse?: ResponseParser): SlackResponse;
    protected _post_file(api: string, file_args: SlackParams, args?: SlackParams): SlackResponse;
    private _request;
    protected _fetch(url: string, params?: Record<string, any>, parseResponse?: ResponseParser): SlackResponse;
    protected _getHeader(headers: Record<string, any>, name: string): string | null;
    protected _normalizeArgs(args: SlackParams, name: string): SlackParams;
    protected _parseResponse(text: string, isSuccess?: (parsed: any) => boolean): SlackResponse;
}
export {};
