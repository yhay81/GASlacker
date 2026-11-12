import BaseAPI, { type SlackParams } from './BaseAPI';
declare class AdminAnalyticsMessages extends BaseAPI {
    activity(params?: SlackParams): import("./BaseAPI").SlackResponse;
    metadata(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAnalyticsSlackbot extends BaseAPI {
    skills(params?: SlackParams): import("./BaseAPI").SlackResponse;
    tools(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAnalytics extends BaseAPI {
    messages: AdminAnalyticsMessages;
    slackbot: AdminAnalyticsSlackbot;
    constructor(token: string | null, retries_limit?: number);
    getFile(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsActivities extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsApproved extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsConfig extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsMcpServersPermissions extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsMcpServers extends BaseAPI {
    permissions: AdminAppsMcpServersPermissions;
    constructor(token: string | null, retries_limit?: number);
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsMcp extends BaseAPI {
    servers: AdminAppsMcpServers;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminAppsPermissions extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsRequests extends BaseAPI {
    cancel(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAppsRestricted extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminApps extends BaseAPI {
    activities: AdminAppsActivities;
    approved: AdminAppsApproved;
    config: AdminAppsConfig;
    mcp: AdminAppsMcp;
    permissions: AdminAppsPermissions;
    requests: AdminAppsRequests;
    restricted: AdminAppsRestricted;
    constructor(token: string | null, retries_limit?: number);
    approve(params?: SlackParams): import("./BaseAPI").SlackResponse;
    clearResolution(params?: SlackParams): import("./BaseAPI").SlackResponse;
    restrict(params?: SlackParams): import("./BaseAPI").SlackResponse;
    uninstall(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAuditAnomalyAllow extends BaseAPI {
    getItem(params?: SlackParams): import("./BaseAPI").SlackResponse;
    updateItem(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAuditAnomaly extends BaseAPI {
    allow: AdminAuditAnomalyAllow;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminAudit extends BaseAPI {
    anomaly: AdminAuditAnomaly;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminAuthPolicy extends BaseAPI {
    assignEntities(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getEntities(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeEntities(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminAuth extends BaseAPI {
    policy: AdminAuthPolicy;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminBarriers extends BaseAPI {
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminConversationsEkm extends BaseAPI {
    listOriginalConnectedChannelInfo(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminConversationsRestrictAccess extends BaseAPI {
    addGroup(params?: SlackParams): import("./BaseAPI").SlackResponse;
    listGroups(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeGroup(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminConversations extends BaseAPI {
    ekm: AdminConversationsEkm;
    restrictAccess: AdminConversationsRestrictAccess;
    constructor(token: string | null, retries_limit?: number);
    archive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    bulkArchive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    bulkDelete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    bulkMove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    bulkSetExcludeFromSlackAi(params?: SlackParams): import("./BaseAPI").SlackResponse;
    bulkSetProperties(params?: SlackParams): import("./BaseAPI").SlackResponse;
    convertToPrivate(params?: SlackParams): import("./BaseAPI").SlackResponse;
    convertToPublic(params?: SlackParams): import("./BaseAPI").SlackResponse;
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    createForObjects(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete(params?: SlackParams): import("./BaseAPI").SlackResponse;
    delete_(params?: SlackParams): import("./BaseAPI").SlackResponse;
    disconnectShared(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getConversationPrefs(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getCustomRetention(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getTeams(params?: SlackParams): import("./BaseAPI").SlackResponse;
    invite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    kick(params?: SlackParams): import("./BaseAPI").SlackResponse;
    linkObjects(params?: SlackParams): import("./BaseAPI").SlackResponse;
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeCustomRetention(params?: SlackParams): import("./BaseAPI").SlackResponse;
    rename(params?: SlackParams): import("./BaseAPI").SlackResponse;
    search(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setConversationPrefs(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setCustomRetention(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setTeams(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unarchive(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unlinkObjects(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminEmoji extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    addAlias(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    rename(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminFunctionsPermissions extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminFunctions extends BaseAPI {
    permissions: AdminFunctionsPermissions;
    constructor(token: string | null, retries_limit?: number);
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminInviteRequestsApproved extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminInviteRequestsDenied extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminInviteRequests extends BaseAPI {
    approved: AdminInviteRequestsApproved;
    denied: AdminInviteRequestsDenied;
    constructor(token: string | null, retries_limit?: number);
    approve(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deny(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminLegalHoldEntities extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminLegalHoldPolicies extends BaseAPI {
    activate(params?: SlackParams): import("./BaseAPI").SlackResponse;
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    release(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminLegalHold extends BaseAPI {
    entities: AdminLegalHoldEntities;
    policies: AdminLegalHoldPolicies;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminRoles extends BaseAPI {
    addAssignments(params?: SlackParams): import("./BaseAPI").SlackResponse;
    listAssignments(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeAssignments(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminSlackbotSkills extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    publish(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setAutoEnabled(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unpublish(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminSlackbot extends BaseAPI {
    skills: AdminSlackbotSkills;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminTeamsAdmins extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminTeamsOwners extends BaseAPI {
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminTeamsSettings extends BaseAPI {
    info(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setDefaultChannels(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setDescription(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setDiscoverability(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setIcon(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setName(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminTeams extends BaseAPI {
    admins: AdminTeamsAdmins;
    owners: AdminTeamsOwners;
    settings: AdminTeamsSettings;
    constructor(token: string | null, retries_limit?: number);
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminUsergroups extends BaseAPI {
    addChannels(params?: SlackParams): import("./BaseAPI").SlackResponse;
    addTeams(params?: SlackParams): import("./BaseAPI").SlackResponse;
    addUsers(params?: SlackParams): import("./BaseAPI").SlackResponse;
    create(params?: SlackParams): import("./BaseAPI").SlackResponse;
    fetch(params?: SlackParams): import("./BaseAPI").SlackResponse;
    listChannels(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeChannels(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeTeams(params?: SlackParams): import("./BaseAPI").SlackResponse;
    removeUsers(params?: SlackParams): import("./BaseAPI").SlackResponse;
    update(params?: SlackParams): import("./BaseAPI").SlackResponse;
    uploadUsers(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminUsersAccess extends BaseAPI {
    pause(params?: SlackParams): import("./BaseAPI").SlackResponse;
    resume(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminUsersSession extends BaseAPI {
    clearSettings(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getSettings(params?: SlackParams): import("./BaseAPI").SlackResponse;
    invalidate(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    reset(params?: SlackParams): import("./BaseAPI").SlackResponse;
    resetBulk(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setSettings(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminUsersUnsupportedVersions extends BaseAPI {
    export(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminUsers extends BaseAPI {
    access: AdminUsersAccess;
    session: AdminUsersSession;
    unsupportedVersions: AdminUsersUnsupportedVersions;
    constructor(token: string | null, retries_limit?: number);
    assign(params?: SlackParams): import("./BaseAPI").SlackResponse;
    deactivate(params?: SlackParams): import("./BaseAPI").SlackResponse;
    getExpiration(params?: SlackParams): import("./BaseAPI").SlackResponse;
    invite(params?: SlackParams): import("./BaseAPI").SlackResponse;
    list(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setAdmin(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setExpiration(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setOwner(params?: SlackParams): import("./BaseAPI").SlackResponse;
    setRegular(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminWorkflowsCollaborators extends BaseAPI {
    add(params?: SlackParams): import("./BaseAPI").SlackResponse;
    remove(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminWorkflowsPermissions extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminWorkflowsTriggersTypesPermissions extends BaseAPI {
    lookup(params?: SlackParams): import("./BaseAPI").SlackResponse;
    set(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
declare class AdminWorkflowsTriggersTypes extends BaseAPI {
    permissions: AdminWorkflowsTriggersTypesPermissions;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminWorkflowsTriggers extends BaseAPI {
    types: AdminWorkflowsTriggersTypes;
    constructor(token: string | null, retries_limit?: number);
}
declare class AdminWorkflows extends BaseAPI {
    collaborators: AdminWorkflowsCollaborators;
    permissions: AdminWorkflowsPermissions;
    triggers: AdminWorkflowsTriggers;
    constructor(token: string | null, retries_limit?: number);
    search(params?: SlackParams): import("./BaseAPI").SlackResponse;
    unpublish(params?: SlackParams): import("./BaseAPI").SlackResponse;
}
export default class Admin extends BaseAPI {
    analytics: AdminAnalytics;
    apps: AdminApps;
    audit: AdminAudit;
    auth: AdminAuth;
    barriers: AdminBarriers;
    conversations: AdminConversations;
    emoji: AdminEmoji;
    functions: AdminFunctions;
    inviteRequests: AdminInviteRequests;
    legalHold: AdminLegalHold;
    roles: AdminRoles;
    slackbot: AdminSlackbot;
    teams: AdminTeams;
    usergroups: AdminUsergroups;
    users: AdminUsers;
    workflows: AdminWorkflows;
    constructor(token: string | null, retries_limit?: number);
}
export {};
