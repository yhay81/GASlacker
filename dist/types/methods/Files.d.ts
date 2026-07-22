import BaseAPI, { SlackParams, SlackResponse } from './BaseAPI';
declare class FilesRemote extends BaseAPI {
    add(params?: SlackParams): SlackResponse;
    info(params?: SlackParams): SlackResponse;
    list(params?: SlackParams): SlackResponse;
    remove(params?: SlackParams): SlackResponse;
    share(params?: SlackParams): SlackResponse;
    update(params?: SlackParams): SlackResponse;
}
export default class Files extends BaseAPI {
    remote: FilesRemote;
    constructor(token: string | null, retries_limit?: number);
    delete(params?: SlackParams): SlackResponse;
    delete_(params?: SlackParams): SlackResponse;
    info(params?: SlackParams): SlackResponse;
    list(params?: SlackParams): SlackResponse;
    revokePublicURL(params?: SlackParams): SlackResponse;
    sharedPublicURL(params?: SlackParams): SlackResponse;
    uploadV2(params?: SlackParams): SlackResponse;
    getUploadURLExternal(params?: SlackParams): SlackResponse;
    completeUploadExternal(params?: SlackParams): SlackResponse;
}
export {};
