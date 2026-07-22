import BaseAPI, { SlackResponse } from './BaseAPI';
declare class FilesRemote extends BaseAPI {
    add(params?: Record<string, any>): SlackResponse;
    info(params?: Record<string, any>): SlackResponse;
    list(params?: Record<string, any>): SlackResponse;
    remove(params?: Record<string, any>): SlackResponse;
    share(params?: Record<string, any>): SlackResponse;
    update(params?: Record<string, any>): SlackResponse;
}
export default class Files extends BaseAPI {
    remote: FilesRemote;
    constructor(token: string | null, retries_limit?: number);
    delete(params?: Record<string, any>): SlackResponse;
    delete_(params?: Record<string, any>): SlackResponse;
    info(params?: Record<string, any>): SlackResponse;
    list(params?: Record<string, any>): SlackResponse;
    revokePublicURL(params?: Record<string, any>): SlackResponse;
    sharedPublicURL(params?: Record<string, any>): SlackResponse;
    uploadV2(params?: Record<string, any>): SlackResponse;
    getUploadURLExternal(params?: Record<string, any>): SlackResponse;
    completeUploadExternal(params?: Record<string, any>): SlackResponse;
}
export {};
