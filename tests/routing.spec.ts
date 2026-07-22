import { Methods } from '../src/index'
import { describe, expect, it } from 'vitest'

type Call = { type: 'get' | 'post' | 'post_form' | 'post_file'; api: string }

// Methods 配下の全 BaseAPI インスタンスを再帰的に探し、送信メソッドをスパイに置き換える
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

// 各メソッドが期待どおりのエンドポイント名と HTTP 種別で送信されることの網羅表。
// エンドポイント名は 2026-07 時点で Slack API に実在することを確認済み
// (存在しないメソッド名には unknown_method が返ることを利用して照合)。
const CASES: Array<[string, (m: Methods) => any, Call['type'], string]> = [
  ['api.test', (m) => m.api.test(), 'get', 'api.test'],
  ['apps.uninstall', (m) => m.apps.uninstall(), 'post_form', 'apps.uninstall'],
  ['apps.connections.open', (m) => m.apps.connections.open(), 'post', 'apps.connections.open'],
  [
    'apps.eventAuthorizations.list',
    (m) => m.apps.eventAuthorizations.list(),
    'get',
    'apps.event.authorizations.list',
  ],
  [
    'assistant.threads.setStatus',
    (m) => m.assistant.threads.setStatus(),
    'post',
    'assistant.threads.setStatus',
  ],
  [
    'assistant.threads.setSuggestedPrompts',
    (m) => m.assistant.threads.setSuggestedPrompts(),
    'post',
    'assistant.threads.setSuggestedPrompts',
  ],
  [
    'assistant.threads.setTitle',
    (m) => m.assistant.threads.setTitle(),
    'post',
    'assistant.threads.setTitle',
  ],
  ['auth.revoke', (m) => m.auth.revoke(), 'post', 'auth.revoke'],
  ['auth.test', (m) => m.auth.test(), 'get', 'auth.test'],
  ['bookmarks.add', (m) => m.bookmarks.add(), 'post', 'bookmarks.add'],
  ['bookmarks.edit', (m) => m.bookmarks.edit(), 'post', 'bookmarks.edit'],
  ['bookmarks.list', (m) => m.bookmarks.list(), 'get', 'bookmarks.list'],
  ['bookmarks.remove', (m) => m.bookmarks.remove(), 'post', 'bookmarks.remove'],
  ['bots.info', (m) => m.bots.info(), 'get', 'bots.info'],
  ['canvases.create', (m) => m.canvases.create(), 'post', 'canvases.create'],
  ['canvases.edit', (m) => m.canvases.edit(), 'post', 'canvases.edit'],
  ['canvases.delete', (m) => m.canvases.delete_(), 'post', 'canvases.delete'],
  ['canvases.access.set', (m) => m.canvases.access.set(), 'post', 'canvases.access.set'],
  ['canvases.access.delete', (m) => m.canvases.access.delete_(), 'post', 'canvases.access.delete'],
  [
    'canvases.sections.lookup',
    (m) => m.canvases.sections.lookup(),
    'post',
    'canvases.sections.lookup',
  ],
  ['chat.delete', (m) => m.chat.delete_(), 'post', 'chat.delete'],
  [
    'chat.deleteScheduledMessage',
    (m) => m.chat.deleteScheduledMessage(),
    'post',
    'chat.deleteScheduledMessage',
  ],
  ['chat.getPermalink', (m) => m.chat.getPermalink(), 'get', 'chat.getPermalink'],
  ['chat.meMessage', (m) => m.chat.meMessage(), 'post', 'chat.meMessage'],
  ['chat.postEphemeral', (m) => m.chat.postEphemeral(), 'post', 'chat.postEphemeral'],
  ['chat.postMessage', (m) => m.chat.postMessage(), 'post', 'chat.postMessage'],
  ['chat.scheduleMessage', (m) => m.chat.scheduleMessage(), 'post', 'chat.scheduleMessage'],
  [
    'chat.scheduledMessagesList',
    (m) => m.chat.scheduledMessagesList(),
    'get',
    'chat.scheduledMessages.list',
  ],
  ['chat.unfurl', (m) => m.chat.unfurl(), 'post', 'chat.unfurl'],
  ['chat.update', (m) => m.chat.update(), 'post', 'chat.update'],
  ['conversations.archive', (m) => m.conversations.archive(), 'post', 'conversations.archive'],
  [
    'conversations.canvases.create',
    (m) => m.conversations.canvases.create(),
    'post',
    'conversations.canvases.create',
  ],
  ['conversations.close', (m) => m.conversations.close(), 'post', 'conversations.close'],
  ['conversations.create', (m) => m.conversations.create(), 'post', 'conversations.create'],
  ['conversations.history', (m) => m.conversations.history(), 'get', 'conversations.history'],
  ['conversations.info', (m) => m.conversations.info(), 'get', 'conversations.info'],
  ['conversations.invite', (m) => m.conversations.invite(), 'post', 'conversations.invite'],
  ['conversations.join', (m) => m.conversations.join(), 'post', 'conversations.join'],
  ['conversations.kick', (m) => m.conversations.kick(), 'post', 'conversations.kick'],
  ['conversations.leave', (m) => m.conversations.leave(), 'post', 'conversations.leave'],
  ['conversations.list', (m) => m.conversations.list(), 'get', 'conversations.list'],
  ['conversations.mark', (m) => m.conversations.mark(), 'post', 'conversations.mark'],
  ['conversations.members', (m) => m.conversations.members(), 'get', 'conversations.members'],
  ['conversations.open', (m) => m.conversations.open(), 'post', 'conversations.open'],
  ['conversations.rename', (m) => m.conversations.rename(), 'post', 'conversations.rename'],
  ['conversations.replies', (m) => m.conversations.replies(), 'get', 'conversations.replies'],
  [
    'conversations.setPurpose',
    (m) => m.conversations.setPurpose(),
    'post',
    'conversations.setPurpose',
  ],
  ['conversations.setTopic', (m) => m.conversations.setTopic(), 'post', 'conversations.setTopic'],
  [
    'conversations.unarchive',
    (m) => m.conversations.unarchive(),
    'post',
    'conversations.unarchive',
  ],
  ['dialog.open', (m) => m.dialog.open(), 'post', 'dialog.open'],
  ['dnd.endDnd', (m) => m.dnd.endDnd(), 'post', 'dnd.endDnd'],
  ['dnd.endSnooze', (m) => m.dnd.endSnooze(), 'post', 'dnd.endSnooze'],
  ['dnd.info', (m) => m.dnd.info(), 'get', 'dnd.info'],
  ['dnd.setSnooze', (m) => m.dnd.setSnooze(), 'post', 'dnd.setSnooze'],
  ['dnd.teamInfo', (m) => m.dnd.teamInfo(), 'get', 'dnd.teamInfo'],
  ['emoji.list', (m) => m.emoji.list(), 'get', 'emoji.list'],
  ['files.delete', (m) => m.files.delete_(), 'post', 'files.delete'],
  ['files.info', (m) => m.files.info(), 'get', 'files.info'],
  ['files.list', (m) => m.files.list(), 'get', 'files.list'],
  ['files.revokePublicURL', (m) => m.files.revokePublicURL(), 'post', 'files.revokePublicURL'],
  ['files.sharedPublicURL', (m) => m.files.sharedPublicURL(), 'post', 'files.sharedPublicURL'],
  [
    'files.getUploadURLExternal',
    (m) => m.files.getUploadURLExternal(),
    'post_form',
    'files.getUploadURLExternal',
  ],
  [
    'files.completeUploadExternal',
    (m) => m.files.completeUploadExternal(),
    'post',
    'files.completeUploadExternal',
  ],
  ['files.remote.add', (m) => m.files.remote.add(), 'post', 'files.remote.add'],
  ['files.remote.info', (m) => m.files.remote.info(), 'get', 'files.remote.info'],
  ['files.remote.list', (m) => m.files.remote.list(), 'get', 'files.remote.list'],
  ['files.remote.remove', (m) => m.files.remote.remove(), 'post', 'files.remote.remove'],
  ['files.remote.share', (m) => m.files.remote.share(), 'post', 'files.remote.share'],
  ['files.remote.update', (m) => m.files.remote.update(), 'post', 'files.remote.update'],
  ['oauth.access', (m) => m.oauth.access(), 'post_form', 'oauth.v2.access'],
  ['pins.add', (m) => m.pins.add(), 'post', 'pins.add'],
  ['pins.list', (m) => m.pins.list(), 'get', 'pins.list'],
  ['pins.remove', (m) => m.pins.remove(), 'post', 'pins.remove'],
  ['reactions.add', (m) => m.reactions.add(), 'post', 'reactions.add'],
  ['reactions.get', (m) => m.reactions.get(), 'get', 'reactions.get'],
  ['reactions.list', (m) => m.reactions.list(), 'get', 'reactions.list'],
  ['reactions.remove', (m) => m.reactions.remove(), 'post', 'reactions.remove'],
  ['reminders.add', (m) => m.reminders.add(), 'post', 'reminders.add'],
  ['reminders.complete', (m) => m.reminders.complete(), 'post', 'reminders.complete'],
  ['reminders.delete', (m) => m.reminders.delete_(), 'post', 'reminders.delete'],
  ['reminders.info', (m) => m.reminders.info(), 'get', 'reminders.info'],
  ['reminders.list', (m) => m.reminders.list(), 'get', 'reminders.list'],
  ['search.all', (m) => m.search.all(), 'get', 'search.all'],
  ['search.files', (m) => m.search.files(), 'get', 'search.files'],
  ['search.messages', (m) => m.search.messages(), 'get', 'search.messages'],
  ['stars.add', (m) => m.stars.add(), 'post', 'stars.add'],
  ['stars.list', (m) => m.stars.list(), 'get', 'stars.list'],
  ['stars.remove', (m) => m.stars.remove(), 'post', 'stars.remove'],
  ['team.accessLogs', (m) => m.team.accessLogs(), 'get', 'team.accessLogs'],
  ['team.billableInfo', (m) => m.team.billableInfo(), 'get', 'team.billableInfo'],
  ['team.info', (m) => m.team.info(), 'get', 'team.info'],
  ['team.integrationLogs', (m) => m.team.integrationLogs(), 'get', 'team.integrationLogs'],
  ['team.profile.get', (m) => m.team.profile.get(), 'get', 'team.profile.get'],
  ['usergroups.create', (m) => m.usergroups.create(), 'post', 'usergroups.create'],
  ['usergroups.disable', (m) => m.usergroups.disable(), 'post', 'usergroups.disable'],
  ['usergroups.enable', (m) => m.usergroups.enable(), 'post', 'usergroups.enable'],
  ['usergroups.list', (m) => m.usergroups.list(), 'get', 'usergroups.list'],
  ['usergroups.update', (m) => m.usergroups.update(), 'post', 'usergroups.update'],
  ['usergroups.users.list', (m) => m.usergroups.users.list(), 'get', 'usergroups.users.list'],
  [
    'usergroups.users.update',
    (m) => m.usergroups.users.update(),
    'post',
    'usergroups.users.update',
  ],
  ['users.conversations', (m) => m.users.conversations(), 'get', 'users.conversations'],
  ['users.deletePhoto', (m) => m.users.deletePhoto(), 'post', 'users.deletePhoto'],
  ['users.getPresence', (m) => m.users.getPresence(), 'get', 'users.getPresence'],
  ['users.identity', (m) => m.users.identity(), 'get', 'users.identity'],
  ['users.info', (m) => m.users.info(), 'get', 'users.info'],
  ['users.list', (m) => m.users.list(), 'get', 'users.list'],
  ['users.lookupByEmail', (m) => m.users.lookupByEmail(), 'get', 'users.lookupByEmail'],
  ['users.setActive', (m) => m.users.setActive(), 'post', 'users.setActive'],
  ['users.setPhoto', (m) => m.users.setPhoto({ image: 'blob' }), 'post_file', 'users.setPhoto'],
  ['users.setPresence', (m) => m.users.setPresence(), 'post', 'users.setPresence'],
  ['users.profile.get', (m) => m.users.profile.get(), 'get', 'users.profile.get'],
  ['users.profile.set', (m) => m.users.profile.set(), 'post', 'users.profile.set'],
  ['views.open', (m) => m.views.open(), 'post', 'views.open'],
  ['views.publish', (m) => m.views.publish(), 'post', 'views.publish'],
  ['views.push', (m) => m.views.push(), 'post', 'views.push'],
  ['views.update', (m) => m.views.update(), 'post', 'views.update'],
]

describe('routing', () => {
  it.each(CASES)('%s', (_name, invoke, type, api) => {
    const methods = new Methods('token')
    const calls = spyAll(methods)
    invoke(methods)
    expect(calls).toEqual([{ type, api }])
  })
})
