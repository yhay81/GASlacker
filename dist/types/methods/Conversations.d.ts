import BaseAPI from './BaseAPI';
declare class ConversationsCanvases extends BaseAPI {
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class ConversationsExternalInvitePermissions extends BaseAPI {
    set(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
declare class ConversationsRequestSharedInvite extends BaseAPI {
    approve(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    deny(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export default class Conversations extends BaseAPI {
    canvases: ConversationsCanvases;
    externalInvitePermissions: ConversationsExternalInvitePermissions;
    requestSharedInvite: ConversationsRequestSharedInvite;
    constructor(token: string | null, retries_limit?: number);
    acceptSharedInvite(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    approveSharedInvite(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    declineSharedInvite(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    inviteShared(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    listConnectInvites(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    archive(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    close(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    create(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    history(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    info(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    invite(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    join(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    kick(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    leave(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    list(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    mark(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    members(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    open(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    rename(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    replies(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setPurpose(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    setTopic(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
    unarchive(params?: Record<string, any>): import("./BaseAPI").SlackResponse;
}
export {};
