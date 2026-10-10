import BaseAPI, { SlackParams } from './BaseAPI';
declare class AgentsConversations extends BaseAPI {
    archive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getCanvas(params?: SlackParams): import("./BaseAPI").SlackResponse;
    listViews(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeView(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setCanvasContent(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setCommands(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setProperties(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setView(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AgentsSessions extends BaseAPI {
    rename(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setStatus(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Agents extends BaseAPI {
    conversations: AgentsConversations;
    sessions: AgentsSessions;
    constructor(token: string | null, retries_limit?: number);
}
export {};
