import { Methods } from '../src/index'
import { describe, expect, it } from 'vitest'

type Call = { type: 'get' | 'post' | 'post_form' | 'post_file'; api: string }

// Recursively find every BaseAPI instance under Methods and replace its send methods with spies
const spyAll = (root: any): Call[] => {
  const calls: Call[] = []
  const seen = new Set<any>()
  const visit = (obj: any) => {
    if (!obj || typeof obj !== 'object' || seen.has(obj)) return
    seen.add(obj)
    if (typeof obj._get === 'function') {
      obj._get = (api: string) => {
        calls.push({ type: 'get', api })
        return { ok: true }
      }
      obj._post = (api: string) => {
        calls.push({ type: 'post', api })
        return { ok: true }
      }
      obj._post_form = (api: string) => {
        calls.push({ type: 'post_form', api })
        return { ok: true }
      }
      obj._post_file = (api: string) => {
        calls.push({ type: 'post_file', api })
        return { ok: true }
      }
    }
    for (const value of Object.values(obj)) visit(value)
  }
  visit(root)
  return calls
}

// Exhaustive table asserting each method sends with the expected endpoint name and HTTP style.
// Endpoint names were confirmed to exist on the live Slack API as of 2026-07
// (checked by confirming that nonexistent method names answer unknown_method).
// [method path, invocation, HTTP style, endpoint name (omitted when it equals the method path)]
const CASES: Array<[string, (m: Methods) => any, Call['type'], string?]> = [
  ['api.test', (m) => m.api.test(), 'get'],
  ['apps.uninstall', (m) => m.apps.uninstall(), 'post_form'],
  ['apps.manifest.create', (m) => m.apps.manifest.create(), 'post'],
  ['apps.manifest.delete', (m) => m.apps.manifest.delete(), 'post'],
  ['apps.manifest.export', (m) => m.apps.manifest.export(), 'get'],
  ['apps.manifest.update', (m) => m.apps.manifest.update(), 'post'],
  ['apps.manifest.validate', (m) => m.apps.manifest.validate(), 'post'],
  ['apps.user.connection.update', (m) => m.apps.user.connection.update(), 'post'],
  ['apps.connections.open', (m) => m.apps.connections.open(), 'post'],
  [
    'apps.eventAuthorizations.list',
    (m) => m.apps.eventAuthorizations.list(),
    'get',
    'apps.event.authorizations.list',
  ],
  ['assistant.threads.setStatus', (m) => m.assistant.threads.setStatus(), 'post'],
  [
    'assistant.threads.setSuggestedPrompts',
    (m) => m.assistant.threads.setSuggestedPrompts(),
    'post',
  ],
  ['assistant.threads.setTitle', (m) => m.assistant.threads.setTitle(), 'post'],
  ['auth.revoke', (m) => m.auth.revoke(), 'post'],
  ['auth.test', (m) => m.auth.test(), 'get'],
  ['auth.teams.list', (m) => m.auth.teams.list(), 'get'],
  ['bookmarks.add', (m) => m.bookmarks.add(), 'post'],
  ['bookmarks.edit', (m) => m.bookmarks.edit(), 'post'],
  ['bookmarks.list', (m) => m.bookmarks.list(), 'get'],
  ['bookmarks.remove', (m) => m.bookmarks.remove(), 'post'],
  ['bots.info', (m) => m.bots.info(), 'get'],
  ['calls.add', (m) => m.calls.add(), 'post'],
  ['calls.end', (m) => m.calls.end(), 'post'],
  ['calls.info', (m) => m.calls.info(), 'get'],
  ['calls.update', (m) => m.calls.update(), 'post'],
  ['calls.participants.add', (m) => m.calls.participants.add(), 'post'],
  ['calls.participants.remove', (m) => m.calls.participants.remove(), 'post'],
  ['canvases.create', (m) => m.canvases.create(), 'post'],
  ['canvases.edit', (m) => m.canvases.edit(), 'post'],
  ['canvases.delete', (m) => m.canvases.delete(), 'post'],
  ['canvases.access.set', (m) => m.canvases.access.set(), 'post'],
  ['canvases.access.delete', (m) => m.canvases.access.delete(), 'post'],
  ['canvases.sections.lookup', (m) => m.canvases.sections.lookup(), 'post'],
  ['chat.delete', (m) => m.chat.delete(), 'post'],
  ['chat.appendStream', (m) => m.chat.appendStream(), 'post'],
  ['chat.startStream', (m) => m.chat.startStream(), 'post'],
  ['chat.stopStream', (m) => m.chat.stopStream(), 'post'],
  ['chat.deleteScheduledMessage', (m) => m.chat.deleteScheduledMessage(), 'post'],
  ['chat.getPermalink', (m) => m.chat.getPermalink(), 'get'],
  ['chat.meMessage', (m) => m.chat.meMessage(), 'post'],
  ['chat.postEphemeral', (m) => m.chat.postEphemeral(), 'post'],
  ['chat.postMessage', (m) => m.chat.postMessage(), 'post'],
  ['chat.scheduleMessage', (m) => m.chat.scheduleMessage(), 'post'],
  [
    'chat.scheduledMessagesList',
    (m) => m.chat.scheduledMessagesList(),
    'get',
    'chat.scheduledMessages.list',
  ],
  ['chat.unfurl', (m) => m.chat.unfurl(), 'post'],
  ['chat.update', (m) => m.chat.update(), 'post'],
  ['conversations.archive', (m) => m.conversations.archive(), 'post'],
  ['conversations.canvases.create', (m) => m.conversations.canvases.create(), 'post'],
  ['conversations.acceptSharedInvite', (m) => m.conversations.acceptSharedInvite(), 'post'],
  ['conversations.approveSharedInvite', (m) => m.conversations.approveSharedInvite(), 'post'],
  ['conversations.declineSharedInvite', (m) => m.conversations.declineSharedInvite(), 'post'],
  [
    'conversations.externalInvitePermissions.set',
    (m) => m.conversations.externalInvitePermissions.set(),
    'post',
  ],
  ['conversations.inviteShared', (m) => m.conversations.inviteShared(), 'post'],
  ['conversations.listConnectInvites', (m) => m.conversations.listConnectInvites(), 'get'],
  [
    'conversations.requestSharedInvite.approve',
    (m) => m.conversations.requestSharedInvite.approve(),
    'post',
  ],
  [
    'conversations.requestSharedInvite.deny',
    (m) => m.conversations.requestSharedInvite.deny(),
    'post',
  ],
  [
    'conversations.requestSharedInvite.list',
    (m) => m.conversations.requestSharedInvite.list(),
    'get',
  ],
  ['conversations.close', (m) => m.conversations.close(), 'post'],
  ['conversations.create', (m) => m.conversations.create(), 'post'],
  ['conversations.history', (m) => m.conversations.history(), 'get'],
  ['conversations.info', (m) => m.conversations.info(), 'get'],
  ['conversations.invite', (m) => m.conversations.invite(), 'post'],
  ['conversations.join', (m) => m.conversations.join(), 'post'],
  ['conversations.kick', (m) => m.conversations.kick(), 'post'],
  ['conversations.leave', (m) => m.conversations.leave(), 'post'],
  ['conversations.list', (m) => m.conversations.list(), 'get'],
  ['conversations.mark', (m) => m.conversations.mark(), 'post'],
  ['conversations.members', (m) => m.conversations.members(), 'get'],
  ['conversations.open', (m) => m.conversations.open(), 'post'],
  ['conversations.rename', (m) => m.conversations.rename(), 'post'],
  ['conversations.replies', (m) => m.conversations.replies(), 'get'],
  ['conversations.setPurpose', (m) => m.conversations.setPurpose(), 'post'],
  ['conversations.setTopic', (m) => m.conversations.setTopic(), 'post'],
  ['conversations.unarchive', (m) => m.conversations.unarchive(), 'post'],
  ['dialog.open', (m) => m.dialog.open(), 'post'],
  ['dnd.endDnd', (m) => m.dnd.endDnd(), 'post'],
  ['dnd.endSnooze', (m) => m.dnd.endSnooze(), 'post'],
  ['dnd.info', (m) => m.dnd.info(), 'get'],
  ['dnd.setSnooze', (m) => m.dnd.setSnooze(), 'post'],
  ['dnd.teamInfo', (m) => m.dnd.teamInfo(), 'get'],
  ['emoji.list', (m) => m.emoji.list(), 'get'],
  ['entity.presentDetails', (m) => m.entity.presentDetails(), 'post'],
  ['files.delete', (m) => m.files.delete(), 'post'],
  ['files.info', (m) => m.files.info(), 'get'],
  ['files.list', (m) => m.files.list(), 'get'],
  ['files.revokePublicURL', (m) => m.files.revokePublicURL(), 'post'],
  ['files.sharedPublicURL', (m) => m.files.sharedPublicURL(), 'post'],
  ['files.getUploadURLExternal', (m) => m.files.getUploadURLExternal(), 'post_form'],
  ['files.completeUploadExternal', (m) => m.files.completeUploadExternal(), 'post'],
  ['files.remote.add', (m) => m.files.remote.add(), 'post'],
  ['files.remote.info', (m) => m.files.remote.info(), 'get'],
  ['files.remote.list', (m) => m.files.remote.list(), 'get'],
  ['files.remote.remove', (m) => m.files.remote.remove(), 'post'],
  ['files.remote.share', (m) => m.files.remote.share(), 'post'],
  ['files.remote.update', (m) => m.files.remote.update(), 'post'],
  ['functions.completeError', (m) => m.functions.completeError(), 'post'],
  ['functions.completeSuccess', (m) => m.functions.completeSuccess(), 'post'],
  ['oauth.access', (m) => m.oauth.access(), 'post_form', 'oauth.v2.access'],
  ['openid.connect.token', (m) => m.openid.connect.token(), 'post_form'],
  ['openid.connect.userInfo', (m) => m.openid.connect.userInfo(), 'post'],
  ['pins.add', (m) => m.pins.add(), 'post'],
  ['pins.list', (m) => m.pins.list(), 'get'],
  ['pins.remove', (m) => m.pins.remove(), 'post'],
  ['reactions.add', (m) => m.reactions.add(), 'post'],
  ['reactions.get', (m) => m.reactions.get(), 'get'],
  ['reactions.list', (m) => m.reactions.list(), 'get'],
  ['reactions.remove', (m) => m.reactions.remove(), 'post'],
  ['reminders.add', (m) => m.reminders.add(), 'post'],
  ['reminders.complete', (m) => m.reminders.complete(), 'post'],
  ['reminders.delete', (m) => m.reminders.delete(), 'post'],
  ['reminders.info', (m) => m.reminders.info(), 'get'],
  ['reminders.list', (m) => m.reminders.list(), 'get'],
  ['search.all', (m) => m.search.all(), 'get'],
  ['search.files', (m) => m.search.files(), 'get'],
  ['search.messages', (m) => m.search.messages(), 'get'],
  ['slackLists.create', (m) => m.slackLists.create(), 'post'],
  ['slackLists.update', (m) => m.slackLists.update(), 'post'],
  ['slackLists.access.set', (m) => m.slackLists.access.set(), 'post'],
  ['slackLists.access.delete', (m) => m.slackLists.access.delete(), 'post'],
  ['slackLists.download.get', (m) => m.slackLists.download.get(), 'get'],
  ['slackLists.download.start', (m) => m.slackLists.download.start(), 'post'],
  ['slackLists.items.create', (m) => m.slackLists.items.create(), 'post'],
  ['slackLists.items.delete', (m) => m.slackLists.items.delete(), 'post'],
  ['slackLists.items.deleteMultiple', (m) => m.slackLists.items.deleteMultiple(), 'post'],
  ['slackLists.items.info', (m) => m.slackLists.items.info(), 'get'],
  ['slackLists.items.list', (m) => m.slackLists.items.list(), 'get'],
  ['slackLists.items.update', (m) => m.slackLists.items.update(), 'post'],
  ['stars.add', (m) => m.stars.add(), 'post'],
  ['stars.list', (m) => m.stars.list(), 'get'],
  ['stars.remove', (m) => m.stars.remove(), 'post'],
  ['team.accessLogs', (m) => m.team.accessLogs(), 'get'],
  ['team.billableInfo', (m) => m.team.billableInfo(), 'get'],
  ['team.info', (m) => m.team.info(), 'get'],
  ['team.integrationLogs', (m) => m.team.integrationLogs(), 'get'],
  ['team.profile.get', (m) => m.team.profile.get(), 'get'],
  ['team.billing.info', (m) => m.team.billing.info(), 'get'],
  ['team.preferences.list', (m) => m.team.preferences.list(), 'get'],
  ['team.externalTeams.disconnect', (m) => m.team.externalTeams.disconnect(), 'post'],
  ['team.externalTeams.list', (m) => m.team.externalTeams.list(), 'get'],
  ['tooling.tokens.rotate', (m) => m.tooling.tokens.rotate(), 'post_form'],
  ['usergroups.create', (m) => m.usergroups.create(), 'post'],
  ['usergroups.disable', (m) => m.usergroups.disable(), 'post'],
  ['usergroups.enable', (m) => m.usergroups.enable(), 'post'],
  ['usergroups.list', (m) => m.usergroups.list(), 'get'],
  ['usergroups.update', (m) => m.usergroups.update(), 'post'],
  ['usergroups.users.list', (m) => m.usergroups.users.list(), 'get'],
  ['usergroups.users.update', (m) => m.usergroups.users.update(), 'post'],
  ['users.conversations', (m) => m.users.conversations(), 'get'],
  ['users.deletePhoto', (m) => m.users.deletePhoto(), 'post'],
  ['users.getPresence', (m) => m.users.getPresence(), 'get'],
  ['users.identity', (m) => m.users.identity(), 'get'],
  ['users.info', (m) => m.users.info(), 'get'],
  ['users.list', (m) => m.users.list(), 'get'],
  ['users.lookupByEmail', (m) => m.users.lookupByEmail(), 'get'],
  ['users.setActive', (m) => m.users.setActive(), 'post'],
  ['users.setPhoto', (m) => m.users.setPhoto({ image: 'blob' }), 'post_file'],
  ['users.setPresence', (m) => m.users.setPresence(), 'post'],
  ['users.profile.get', (m) => m.users.profile.get(), 'get'],
  ['users.profile.set', (m) => m.users.profile.set(), 'post'],
  ['users.discoverableContacts.lookup', (m) => m.users.discoverableContacts.lookup(), 'post'],
  ['views.open', (m) => m.views.open(), 'post'],
  ['views.publish', (m) => m.views.publish(), 'post'],
  ['views.push', (m) => m.views.push(), 'post'],
  ['views.update', (m) => m.views.update(), 'post'],
  ['workflows.featured.add', (m) => m.workflows.featured.add(), 'post'],
  ['workflows.featured.list', (m) => m.workflows.featured.list(), 'get'],
  ['workflows.featured.remove', (m) => m.workflows.featured.remove(), 'post'],
  ['workflows.featured.set', (m) => m.workflows.featured.set(), 'post'],
]

describe('routing', () => {
  it.each(CASES)('%s', (name, invoke, type, endpoint) => {
    const methods = new Methods('token')
    const calls = spyAll(methods)
    invoke(methods)
    expect(calls).toEqual([{ type, api: endpoint ?? name }])
  })
})
