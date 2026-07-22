import BaseAPI from './BaseAPI';
declare class SlackListsAccess extends BaseAPI {
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    set(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class SlackListsDownload extends BaseAPI {
    get(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    start(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class SlackListsItems extends BaseAPI {
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    deleteMultiple(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class SlackLists extends BaseAPI {
    access: SlackListsAccess;
    download: SlackListsDownload;
    items: SlackListsItems;
    constructor(token: string | null, retries_limit?: number);
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    update(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
