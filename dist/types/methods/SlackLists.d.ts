import BaseAPI, { SlackParams } from './BaseAPI';
declare class SlackListsAccess extends BaseAPI {
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class SlackListsDownload extends BaseAPI {
    get(params?: SlackParams): import("./BaseAPI").SlackResponse;
    start(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class SlackListsItems extends BaseAPI {
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deleteMultiple(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class SlackLists extends BaseAPI {
    access: SlackListsAccess;
    download: SlackListsDownload;
    items: SlackListsItems;
    constructor(token: string | null, retries_limit?: number);
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
