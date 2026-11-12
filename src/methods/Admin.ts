import BaseAPI, { type SlackParams } from './BaseAPI'

// Legal Holds uses JSON arrays inside a form-encoded body.
function legalHoldParams(params: SlackParams, arrayField: string): SlackParams {
  const value = params?.[arrayField]
  return Array.isArray(value) ? { ...params, [arrayField]: JSON.stringify(value) } : params
}

class AdminAnalyticsMessages extends BaseAPI {
  public activity(params: SlackParams = {}) {
    return this._get('admin.analytics.messages.activity', params)
  }

  public metadata(params: SlackParams = {}) {
    return this._get('admin.analytics.messages.metadata', params)
  }
}

class AdminAnalyticsSlackbot extends BaseAPI {
  public skills(params: SlackParams = {}) {
    return this._get('admin.analytics.slackbot.skills', params)
  }

  public tools(params: SlackParams = {}) {
    return this._get('admin.analytics.slackbot.tools', params)
  }
}

class AdminAnalytics extends BaseAPI {
  public messages
  public slackbot
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.messages = new AdminAnalyticsMessages(token, retries_limit)
    this.slackbot = new AdminAnalyticsSlackbot(token, retries_limit)
  }

  public getFile(params: SlackParams = {}) {
    return this._get('admin.analytics.getFile', params, (response) => {
      const contentType = this._getHeader(response.getHeaders(), 'content-type')
      if (
        response.getResponseCode() === 200 &&
        contentType?.split(';')[0].trim().toLowerCase() === 'application/gzip'
      ) {
        return { ok: true, file: response.getBlob() }
      }
      return this._parseResponse(response.getContentText())
    })
  }
}

class AdminAppsActivities extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post_form('admin.apps.activities.list', params)
  }
}

class AdminAppsApproved extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('admin.apps.approved.list', params)
  }
}

class AdminAppsConfig extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('admin.apps.config.lookup', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('admin.apps.config.set', params)
  }
}

class AdminAppsMcpServersPermissions extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post('admin.apps.mcp.servers.permissions.list', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('admin.apps.mcp.servers.permissions.set', params)
  }
}

class AdminAppsMcpServers extends BaseAPI {
  public permissions
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.permissions = new AdminAppsMcpServersPermissions(token, retries_limit)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.apps.mcp.servers.list', params)
  }
}

class AdminAppsMcp extends BaseAPI {
  public servers
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.servers = new AdminAppsMcpServers(token, retries_limit)
  }
}

class AdminAppsPermissions extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('admin.apps.permissions.add', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.apps.permissions.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('admin.apps.permissions.remove', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('admin.apps.permissions.set', params)
  }
}

class AdminAppsRequests extends BaseAPI {
  public cancel(params: SlackParams = {}) {
    return this._post('admin.apps.requests.cancel', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('admin.apps.requests.list', params)
  }
}

class AdminAppsRestricted extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('admin.apps.restricted.list', params)
  }
}

class AdminApps extends BaseAPI {
  public activities
  public approved
  public config
  public mcp
  public permissions
  public requests
  public restricted
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.activities = new AdminAppsActivities(token, retries_limit)
    this.approved = new AdminAppsApproved(token, retries_limit)
    this.config = new AdminAppsConfig(token, retries_limit)
    this.mcp = new AdminAppsMcp(token, retries_limit)
    this.permissions = new AdminAppsPermissions(token, retries_limit)
    this.requests = new AdminAppsRequests(token, retries_limit)
    this.restricted = new AdminAppsRestricted(token, retries_limit)
  }

  public approve(params: SlackParams = {}) {
    return this._post('admin.apps.approve', params)
  }

  public clearResolution(params: SlackParams = {}) {
    return this._post('admin.apps.clearResolution', params)
  }

  public restrict(params: SlackParams = {}) {
    return this._post('admin.apps.restrict', params)
  }

  public uninstall(params: SlackParams = {}) {
    return this._post('admin.apps.uninstall', params)
  }
}

class AdminAuditAnomalyAllow extends BaseAPI {
  public getItem(params: SlackParams = {}) {
    return this._post('admin.audit.anomaly.allow.getItem', params)
  }

  public updateItem(params: SlackParams = {}) {
    return this._post('admin.audit.anomaly.allow.updateItem', params)
  }
}

class AdminAuditAnomaly extends BaseAPI {
  public allow
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.allow = new AdminAuditAnomalyAllow(token, retries_limit)
  }
}

class AdminAudit extends BaseAPI {
  public anomaly
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.anomaly = new AdminAuditAnomaly(token, retries_limit)
  }
}

class AdminAuthPolicy extends BaseAPI {
  public assignEntities(params: SlackParams = {}) {
    return this._post('admin.auth.policy.assignEntities', params)
  }

  public getEntities(params: SlackParams = {}) {
    return this._post('admin.auth.policy.getEntities', params)
  }

  public removeEntities(params: SlackParams = {}) {
    return this._post('admin.auth.policy.removeEntities', params)
  }
}

class AdminAuth extends BaseAPI {
  public policy
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.policy = new AdminAuthPolicy(token, retries_limit)
  }
}

class AdminBarriers extends BaseAPI {
  public create(params: SlackParams = {}) {
    return this._post_form('admin.barriers.create', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post_form('admin.barriers.delete', params)
  }

  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public list(params: SlackParams = {}) {
    return this._get('admin.barriers.list', params)
  }

  public update(params: SlackParams = {}) {
    return this._post_form('admin.barriers.update', params)
  }
}

class AdminConversationsEkm extends BaseAPI {
  public listOriginalConnectedChannelInfo(params: SlackParams = {}) {
    return this._post_form('admin.conversations.ekm.listOriginalConnectedChannelInfo', params)
  }
}

class AdminConversationsRestrictAccess extends BaseAPI {
  public addGroup(params: SlackParams = {}) {
    return this._get('admin.conversations.restrictAccess.addGroup', params)
  }

  public listGroups(params: SlackParams = {}) {
    return this._get('admin.conversations.restrictAccess.listGroups', params)
  }

  public removeGroup(params: SlackParams = {}) {
    return this._get('admin.conversations.restrictAccess.removeGroup', params)
  }
}

class AdminConversations extends BaseAPI {
  public ekm
  public restrictAccess
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.ekm = new AdminConversationsEkm(token, retries_limit)
    this.restrictAccess = new AdminConversationsRestrictAccess(token, retries_limit)
  }

  public archive(params: SlackParams = {}) {
    return this._post('admin.conversations.archive', params)
  }

  public bulkArchive(params: SlackParams = {}) {
    return this._post_form('admin.conversations.bulkArchive', params)
  }

  public bulkDelete(params: SlackParams = {}) {
    return this._post_form('admin.conversations.bulkDelete', params)
  }

  public bulkMove(params: SlackParams = {}) {
    return this._post_form('admin.conversations.bulkMove', params)
  }

  public bulkSetExcludeFromSlackAi(params: SlackParams = {}) {
    return this._get('admin.conversations.bulkSetExcludeFromSlackAi', params)
  }

  public bulkSetProperties(params: SlackParams = {}) {
    return this._post_form('admin.conversations.bulkSetProperties', params)
  }

  public convertToPrivate(params: SlackParams = {}) {
    return this._post('admin.conversations.convertToPrivate', params)
  }

  public convertToPublic(params: SlackParams = {}) {
    return this._post('admin.conversations.convertToPublic', params)
  }

  public create(params: SlackParams = {}) {
    return this._post('admin.conversations.create', params)
  }

  public createForObjects(params: SlackParams = {}) {
    return this._post('admin.conversations.createForObjects', params)
  }

  public delete(params: SlackParams = {}) {
    return this._post('admin.conversations.delete', params)
  }

  public delete_(params: SlackParams = {}) {
    return this.delete(params)
  }

  public disconnectShared(params: SlackParams = {}) {
    return this._post('admin.conversations.disconnectShared', params)
  }

  public getConversationPrefs(params: SlackParams = {}) {
    return this._post('admin.conversations.getConversationPrefs', params)
  }

  public getCustomRetention(params: SlackParams = {}) {
    return this._post('admin.conversations.getCustomRetention', params)
  }

  public getTeams(params: SlackParams = {}) {
    return this._post('admin.conversations.getTeams', params)
  }

  public invite(params: SlackParams = {}) {
    return this._post('admin.conversations.invite', params)
  }

  public kick(params: SlackParams = {}) {
    return this._post('admin.conversations.kick', params)
  }

  public linkObjects(params: SlackParams = {}) {
    return this._post('admin.conversations.linkObjects', params)
  }

  public lookup(params: SlackParams = {}) {
    return this._post_form('admin.conversations.lookup', params)
  }

  public removeCustomRetention(params: SlackParams = {}) {
    return this._post('admin.conversations.removeCustomRetention', params)
  }

  public rename(params: SlackParams = {}) {
    return this._post('admin.conversations.rename', params)
  }

  public search(params: SlackParams = {}) {
    return this._post('admin.conversations.search', params)
  }

  public setConversationPrefs(params: SlackParams = {}) {
    return this._post('admin.conversations.setConversationPrefs', params)
  }

  public setCustomRetention(params: SlackParams = {}) {
    return this._post('admin.conversations.setCustomRetention', params)
  }

  public setTeams(params: SlackParams = {}) {
    return this._post('admin.conversations.setTeams', params)
  }

  public unarchive(params: SlackParams = {}) {
    return this._post('admin.conversations.unarchive', params)
  }

  public unlinkObjects(params: SlackParams = {}) {
    return this._post('admin.conversations.unlinkObjects', params)
  }
}

class AdminEmoji extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._get('admin.emoji.add', params)
  }

  public addAlias(params: SlackParams = {}) {
    return this._get('admin.emoji.addAlias', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('admin.emoji.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._get('admin.emoji.remove', params)
  }

  public rename(params: SlackParams = {}) {
    return this._get('admin.emoji.rename', params)
  }
}

class AdminFunctionsPermissions extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('admin.functions.permissions.lookup', params)
  }

  public set(params: SlackParams = {}) {
    return this._post('admin.functions.permissions.set', params)
  }
}

class AdminFunctions extends BaseAPI {
  public permissions
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.permissions = new AdminFunctionsPermissions(token, retries_limit)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.functions.list', params)
  }
}

class AdminInviteRequestsApproved extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post('admin.inviteRequests.approved.list', params)
  }
}

class AdminInviteRequestsDenied extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post('admin.inviteRequests.denied.list', params)
  }
}

class AdminInviteRequests extends BaseAPI {
  public approved
  public denied
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.approved = new AdminInviteRequestsApproved(token, retries_limit)
    this.denied = new AdminInviteRequestsDenied(token, retries_limit)
  }

  public approve(params: SlackParams = {}) {
    return this._post('admin.inviteRequests.approve', params)
  }

  public deny(params: SlackParams = {}) {
    return this._post('admin.inviteRequests.deny', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.inviteRequests.list', params)
  }
}

class AdminLegalHoldEntities extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.entities.add', legalHoldParams(params, 'entities'))
  }

  public list(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.entities.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.entities.remove', legalHoldParams(params, 'ids'))
  }
}

class AdminLegalHoldPolicies extends BaseAPI {
  public activate(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.policies.activate', params)
  }

  public create(params: SlackParams = {}) {
    return this._post_form(
      'admin.legalHold.policies.create',
      legalHoldParams(params, 'restrictions'),
    )
  }

  public info(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.policies.info', params)
  }

  public list(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.policies.list', params)
  }

  public release(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.policies.release', params)
  }

  public set(params: SlackParams = {}) {
    return this._post_form('admin.legalHold.policies.set', params)
  }
}

class AdminLegalHold extends BaseAPI {
  public entities
  public policies
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.entities = new AdminLegalHoldEntities(token, retries_limit)
    this.policies = new AdminLegalHoldPolicies(token, retries_limit)
  }
}

class AdminRoles extends BaseAPI {
  public addAssignments(params: SlackParams = {}) {
    return this._post('admin.roles.addAssignments', params)
  }

  public listAssignments(params: SlackParams = {}) {
    return this._get('admin.roles.listAssignments', params)
  }

  public removeAssignments(params: SlackParams = {}) {
    return this._post('admin.roles.removeAssignments', params)
  }
}

class AdminSlackbotSkills extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._post('admin.slackbot.skills.list', params)
  }

  public publish(params: SlackParams = {}) {
    return this._post('admin.slackbot.skills.publish', params)
  }

  public setAutoEnabled(params: SlackParams = {}) {
    return this._post('admin.slackbot.skills.setAutoEnabled', params)
  }

  public unpublish(params: SlackParams = {}) {
    return this._post('admin.slackbot.skills.unpublish', params)
  }
}

class AdminSlackbot extends BaseAPI {
  public skills
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.skills = new AdminSlackbotSkills(token, retries_limit)
  }
}

class AdminTeamsAdmins extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('admin.teams.admins.list', params)
  }
}

class AdminTeamsOwners extends BaseAPI {
  public list(params: SlackParams = {}) {
    return this._get('admin.teams.owners.list', params)
  }
}

class AdminTeamsSettings extends BaseAPI {
  public info(params: SlackParams = {}) {
    return this._post('admin.teams.settings.info', params)
  }

  public setDefaultChannels(params: SlackParams = {}) {
    return this._get('admin.teams.settings.setDefaultChannels', params)
  }

  public setDescription(params: SlackParams = {}) {
    return this._post('admin.teams.settings.setDescription', params)
  }

  public setDiscoverability(params: SlackParams = {}) {
    return this._post('admin.teams.settings.setDiscoverability', params)
  }

  public setIcon(params: SlackParams = {}) {
    return this._get('admin.teams.settings.setIcon', params)
  }

  public setName(params: SlackParams = {}) {
    return this._post('admin.teams.settings.setName', params)
  }
}

class AdminTeams extends BaseAPI {
  public admins
  public owners
  public settings
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.admins = new AdminTeamsAdmins(token, retries_limit)
    this.owners = new AdminTeamsOwners(token, retries_limit)
    this.settings = new AdminTeamsSettings(token, retries_limit)
  }

  public create(params: SlackParams = {}) {
    return this._post('admin.teams.create', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.teams.list', params)
  }
}

class AdminUsergroups extends BaseAPI {
  public addChannels(params: SlackParams = {}) {
    return this._post('admin.usergroups.addChannels', params)
  }

  public addTeams(params: SlackParams = {}) {
    return this._post('admin.usergroups.addTeams', params)
  }

  public addUsers(params: SlackParams = {}) {
    return this._post('admin.usergroups.addUsers', params)
  }

  public create(params: SlackParams = {}) {
    return this._post('admin.usergroups.create', params)
  }

  public fetch(params: SlackParams = {}) {
    return this._post('admin.usergroups.fetch', params)
  }

  public listChannels(params: SlackParams = {}) {
    return this._post('admin.usergroups.listChannels', params)
  }

  public removeChannels(params: SlackParams = {}) {
    return this._post('admin.usergroups.removeChannels', params)
  }

  public removeTeams(params: SlackParams = {}) {
    return this._post('admin.usergroups.removeTeams', params)
  }

  public removeUsers(params: SlackParams = {}) {
    return this._post('admin.usergroups.removeUsers', params)
  }

  public update(params: SlackParams = {}) {
    return this._post('admin.usergroups.update', params)
  }

  public uploadUsers(params: SlackParams = {}) {
    return this._post('admin.usergroups.uploadUsers', params)
  }
}

class AdminUsersAccess extends BaseAPI {
  public pause(params: SlackParams = {}) {
    return this._post('admin.users.access.pause', params)
  }

  public resume(params: SlackParams = {}) {
    return this._post('admin.users.access.resume', params)
  }
}

class AdminUsersSession extends BaseAPI {
  public clearSettings(params: SlackParams = {}) {
    return this._post('admin.users.session.clearSettings', params)
  }

  public getSettings(params: SlackParams = {}) {
    return this._post('admin.users.session.getSettings', params)
  }

  public invalidate(params: SlackParams = {}) {
    return this._post('admin.users.session.invalidate', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.users.session.list', params)
  }

  public reset(params: SlackParams = {}) {
    return this._post('admin.users.session.reset', params)
  }

  public resetBulk(params: SlackParams = {}) {
    return this._post('admin.users.session.resetBulk', params)
  }

  public setSettings(params: SlackParams = {}) {
    return this._post('admin.users.session.setSettings', params)
  }
}

class AdminUsersUnsupportedVersions extends BaseAPI {
  public export(params: SlackParams = {}) {
    return this._post_form('admin.users.unsupportedVersions.export', params)
  }
}

class AdminUsers extends BaseAPI {
  public access
  public session
  public unsupportedVersions
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.access = new AdminUsersAccess(token, retries_limit)
    this.session = new AdminUsersSession(token, retries_limit)
    this.unsupportedVersions = new AdminUsersUnsupportedVersions(token, retries_limit)
  }

  public assign(params: SlackParams = {}) {
    return this._post('admin.users.assign', params)
  }

  public deactivate(params: SlackParams = {}) {
    return this._post('admin.users.deactivate', params)
  }

  public getExpiration(params: SlackParams = {}) {
    return this._get('admin.users.getExpiration', params)
  }

  public invite(params: SlackParams = {}) {
    return this._post('admin.users.invite', params)
  }

  public list(params: SlackParams = {}) {
    return this._post('admin.users.list', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('admin.users.remove', params)
  }

  public setAdmin(params: SlackParams = {}) {
    return this._post('admin.users.setAdmin', params)
  }

  public setExpiration(params: SlackParams = {}) {
    return this._post('admin.users.setExpiration', params)
  }

  public setOwner(params: SlackParams = {}) {
    return this._post('admin.users.setOwner', params)
  }

  public setRegular(params: SlackParams = {}) {
    return this._post('admin.users.setRegular', params)
  }
}

class AdminWorkflowsCollaborators extends BaseAPI {
  public add(params: SlackParams = {}) {
    return this._post('admin.workflows.collaborators.add', params)
  }

  public remove(params: SlackParams = {}) {
    return this._post('admin.workflows.collaborators.remove', params)
  }
}

class AdminWorkflowsPermissions extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('admin.workflows.permissions.lookup', params)
  }
}

class AdminWorkflowsTriggersTypesPermissions extends BaseAPI {
  public lookup(params: SlackParams = {}) {
    return this._post('admin.workflows.triggers.types.permissions.lookup', params, (response) =>
      this._parseResponse(
        response.getContentText(),
        (data) =>
          response.getResponseCode() === 200 &&
          data?.permissions !== null &&
          typeof data?.permissions === 'object' &&
          !Array.isArray(data.permissions),
      ),
    )
  }

  public set(params: SlackParams = {}) {
    return this._post('admin.workflows.triggers.types.permissions.set', params)
  }
}

class AdminWorkflowsTriggersTypes extends BaseAPI {
  public permissions
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.permissions = new AdminWorkflowsTriggersTypesPermissions(token, retries_limit)
  }
}

class AdminWorkflowsTriggers extends BaseAPI {
  public types
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.types = new AdminWorkflowsTriggersTypes(token, retries_limit)
  }
}

class AdminWorkflows extends BaseAPI {
  public collaborators
  public permissions
  public triggers
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.collaborators = new AdminWorkflowsCollaborators(token, retries_limit)
    this.permissions = new AdminWorkflowsPermissions(token, retries_limit)
    this.triggers = new AdminWorkflowsTriggers(token, retries_limit)
  }

  public search(params: SlackParams = {}) {
    return this._post('admin.workflows.search', params)
  }

  public unpublish(params: SlackParams = {}) {
    return this._post('admin.workflows.unpublish', params)
  }
}

export default class Admin extends BaseAPI {
  public analytics
  public apps
  public audit
  public auth
  public barriers
  public conversations
  public emoji
  public functions
  public inviteRequests
  public legalHold
  public roles
  public slackbot
  public teams
  public usergroups
  public users
  public workflows
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.analytics = new AdminAnalytics(token, retries_limit)
    this.apps = new AdminApps(token, retries_limit)
    this.audit = new AdminAudit(token, retries_limit)
    this.auth = new AdminAuth(token, retries_limit)
    this.barriers = new AdminBarriers(token, retries_limit)
    this.conversations = new AdminConversations(token, retries_limit)
    this.emoji = new AdminEmoji(token, retries_limit)
    this.functions = new AdminFunctions(token, retries_limit)
    this.inviteRequests = new AdminInviteRequests(token, retries_limit)
    this.legalHold = new AdminLegalHold(token, retries_limit)
    this.roles = new AdminRoles(token, retries_limit)
    this.slackbot = new AdminSlackbot(token, retries_limit)
    this.teams = new AdminTeams(token, retries_limit)
    this.usergroups = new AdminUsergroups(token, retries_limit)
    this.users = new AdminUsers(token, retries_limit)
    this.workflows = new AdminWorkflows(token, retries_limit)
  }
}
