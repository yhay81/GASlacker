import BaseAPI, { SlackParams } from './BaseAPI';
declare class ConversationsCanvases extends BaseAPI {
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class ConversationsExternalInvitePermissions extends BaseAPI {
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class ConversationsRequestSharedInvite extends BaseAPI {
    approve(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deny(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Conversations extends BaseAPI {
    canvases: ConversationsCanvases;
    externalInvitePermissions: ConversationsExternalInvitePermissions;
    requestSharedInvite: ConversationsRequestSharedInvite;
    constructor(token: string | null, retries_limit?: number);
    acceptSharedInvite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    approveSharedInvite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    declineSharedInvite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    inviteShared(params?: SlackParams): import("./BaseAPI").SlackResponse;
    listConnectInvites(params?: SlackParams): import("./BaseAPI").SlackResponse;
    archive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    close(params?: SlackParams): import("./BaseAPI").SlackResponse;
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    history(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    invite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    join(params?: SlackParams): import("./BaseAPI").SlackResponse;
    kick(params?: SlackParams): import("./BaseAPI").SlackResponse;
    leave(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    mark(params?: SlackParams): import("./BaseAPI").SlackResponse;
    members(params?: SlackParams): import("./BaseAPI").SlackResponse;
    open(params?: SlackParams): import("./BaseAPI").SlackResponse;
    rename(params?: SlackParams): import("./BaseAPI").SlackResponse;
    replies(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setPurpose(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setTopic(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unarchive(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export {};
