import BaseAPI, { SlackParams } from './BaseAPI';
declare class CanvasesAccess extends BaseAPI {
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class CanvasesSections extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Canvases extends BaseAPI {
    access: CanvasesAccess;
    sections: CanvasesSections;
    constructor(token: string | null, retries_limit?: number);
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    edit(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
