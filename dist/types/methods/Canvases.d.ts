import BaseAPI from './BaseAPI';
declare class CanvasesAccess extends BaseAPI {
    set(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class CanvasesSections extends BaseAPI {
    lookup(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Canvases extends BaseAPI {
    access: CanvasesAccess;
    sections: CanvasesSections;
    constructor(token: string | null, retries_limit?: number);
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    edit(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    delete_(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
