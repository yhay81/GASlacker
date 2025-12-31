import Apps from '../src/methods/Apps'
import API from '../src/methods/API'
import Chat from '../src/methods/Chat'
import Conversations from '../src/methods/Conversations'
import Files from '../src/methods/Files'
import OAuth from '../src/methods/OAuth'
import Team from '../src/methods/Team'
import UserGroups from '../src/methods/UserGroups'
import Users from '../src/methods/Users'
import { describe, expect, it } from 'vitest'

type Call = {
  type: 'get' | 'post' | 'post_form' | 'post_file'
  api: string
  params?: Record<string, any>
  fileArgs?: Record<string, any>
}

class APISpy extends API {
  public calls: Call[] = []

  protected _get(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'get', api, params })
    return { ok: true }
  }

  protected _post(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'post', api, params })
    return { ok: true }
  }
}

class ChatSpy extends Chat {
  public calls: Call[] = []

  protected _get(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'get', api, params })
    return { ok: true }
  }

  protected _post(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'post', api, params })
    return { ok: true }
  }
}

class ConversationsSpy extends Conversations {
  public calls: Call[] = []

  protected _get(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'get', api, params })
    return { ok: true }
  }

  protected _post(api: string, params: Record<string, any> = {}): any {
    this.calls.push({ type: 'post', api, params })
    return { ok: true }
  }
}

class FilesSpy extends Files {
  public call: Call | null = null

  protected _post_file(
    api: string,
    fileArgs: Record<string, any>,
    params: Record<string, any> = {},
  ): any {
    this.call = { type: 'post_file', api, fileArgs, params }
    return { ok: true }
  }
}

class OAuthSpy extends OAuth {
  public call: Call | null = null

  protected _post_form(api: string, params: Record<string, any> = {}): any {
    this.call = { type: 'post_form', api, params }
    return { ok: true }
  }
}

class UsersSpy extends Users {
  public call: Call | null = null

  protected _post_file(
    api: string,
    fileArgs: Record<string, any>,
    params: Record<string, any> = {},
  ): any {
    this.call = { type: 'post_file', api, fileArgs, params }
    return { ok: true }
  }
}

describe('methods', () => {
  it('API.call routes to get/post', () => {
    const api = new APISpy('token')
    api.call('conversations.list', { limit: 1 }, 'get')
    api.call('chat.postMessage', { channel: 'C123', text: 'Hi' }, 'post')

    expect(api.calls).toEqual([
      { type: 'get', api: 'conversations.list', params: { limit: 1 } },
      {
        type: 'post',
        api: 'chat.postMessage',
        params: { channel: 'C123', text: 'Hi' },
      },
    ])
  })

  it('Chat.postMessage uses chat.postMessage', () => {
    const chat = new ChatSpy('token')
    chat.postMessage({ channel: 'C123', text: 'Hi' })

    expect(chat.calls).toEqual([
      {
        type: 'post',
        api: 'chat.postMessage',
        params: { channel: 'C123', text: 'Hi' },
      },
    ])
  })

  it('Chat routes methods to correct endpoints', () => {
    const chat = new ChatSpy('token')
    chat.delete_({ channel: 'C123', ts: '1' })
    chat.deleteScheduledMessage({ channel: 'C123', scheduled_message_id: 'S123' })
    chat.getPermalink({ channel: 'C123', message_ts: '1' })
    chat.meMessage({ channel: 'C123', text: 'Hi' })
    chat.postEphemeral({ channel: 'C123', text: 'Hi', user: 'U123' })
    chat.postMessage({ channel: 'C123', text: 'Hi' })
    chat.scheduleMessage({ channel: 'C123', text: 'Hi', post_at: 123 })
    chat.scheduledMessagesList({ channel: 'C123' })
    chat.unfurl({ channel: 'C123', ts: '1', unfurls: { key: 'value' } })
    chat.update({ channel: 'C123', ts: '1', text: 'Update' })

    expect(chat.calls).toEqual([
      { type: 'post', api: 'chat.delete', params: { channel: 'C123', ts: '1' } },
      {
        type: 'post',
        api: 'chat.deleteScheduledMessage',
        params: { channel: 'C123', scheduled_message_id: 'S123' },
      },
      {
        type: 'get',
        api: 'chat.getPermalink',
        params: { channel: 'C123', message_ts: '1' },
      },
      { type: 'post', api: 'chat.meMessage', params: { channel: 'C123', text: 'Hi' } },
      {
        type: 'post',
        api: 'chat.postEphemeral',
        params: { channel: 'C123', text: 'Hi', user: 'U123' },
      },
      { type: 'post', api: 'chat.postMessage', params: { channel: 'C123', text: 'Hi' } },
      {
        type: 'post',
        api: 'chat.scheduleMessage',
        params: { channel: 'C123', text: 'Hi', post_at: 123 },
      },
      {
        type: 'get',
        api: 'chat.scheduledMessages.list',
        params: { channel: 'C123' },
      },
      {
        type: 'post',
        api: 'chat.unfurl',
        params: { channel: 'C123', ts: '1', unfurls: { key: 'value' } },
      },
      {
        type: 'post',
        api: 'chat.update',
        params: { channel: 'C123', ts: '1', text: 'Update' },
      },
    ])
  })

  it('Chat.postMessage throws on non-object params', () => {
    const chat = new Chat('token')
    expect(() =>
      chat.postMessage('C123' as unknown as Record<string, any>),
    ).toThrow('params はオブジェクトで指定してください')
  })

  it('Conversations.list uses conversations.list', () => {
    const conversations = new ConversationsSpy('token')
    conversations.list({ limit: 20 })

    expect(conversations.calls).toEqual([
      {
        type: 'get',
        api: 'conversations.list',
        params: { limit: 20 },
      },
    ])
  })

  it('Conversations routes methods to correct endpoints', () => {
    const conversations = new ConversationsSpy('token')
    conversations.archive({ channel: 'C123' })
    conversations.close({ channel: 'C123' })
    conversations.create({ name: 'general' })
    conversations.history({ channel: 'C123' })
    conversations.info({ channel: 'C123' })
    conversations.invite({ channel: 'C123', users: 'U123' })
    conversations.join({ channel: 'C123' })
    conversations.kick({ channel: 'C123', user: 'U123' })
    conversations.leave({ channel: 'C123' })
    conversations.list({ limit: 20 })
    conversations.mark({ channel: 'C123', ts: '1' })
    conversations.members({ channel: 'C123' })
    conversations.open({ users: 'U123' })
    conversations.rename({ channel: 'C123', name: 'random' })
    conversations.replies({ channel: 'C123', ts: '1' })
    conversations.setPurpose({ channel: 'C123', purpose: 'purpose' })
    conversations.setTopic({ channel: 'C123', topic: 'topic' })
    conversations.unarchive({ channel: 'C123' })

    expect(conversations.calls).toEqual([
      { type: 'post', api: 'conversations.archive', params: { channel: 'C123' } },
      { type: 'post', api: 'conversations.close', params: { channel: 'C123' } },
      { type: 'post', api: 'conversations.create', params: { name: 'general' } },
      { type: 'get', api: 'conversations.history', params: { channel: 'C123' } },
      { type: 'get', api: 'conversations.info', params: { channel: 'C123' } },
      {
        type: 'post',
        api: 'conversations.invite',
        params: { channel: 'C123', users: 'U123' },
      },
      { type: 'post', api: 'conversations.join', params: { channel: 'C123' } },
      {
        type: 'post',
        api: 'conversations.kick',
        params: { channel: 'C123', user: 'U123' },
      },
      { type: 'post', api: 'conversations.leave', params: { channel: 'C123' } },
      { type: 'get', api: 'conversations.list', params: { limit: 20 } },
      {
        type: 'post',
        api: 'conversations.mark',
        params: { channel: 'C123', ts: '1' },
      },
      { type: 'get', api: 'conversations.members', params: { channel: 'C123' } },
      { type: 'post', api: 'conversations.open', params: { users: 'U123' } },
      {
        type: 'post',
        api: 'conversations.rename',
        params: { channel: 'C123', name: 'random' },
      },
      {
        type: 'get',
        api: 'conversations.replies',
        params: { channel: 'C123', ts: '1' },
      },
      {
        type: 'post',
        api: 'conversations.setPurpose',
        params: { channel: 'C123', purpose: 'purpose' },
      },
      {
        type: 'post',
        api: 'conversations.setTopic',
        params: { channel: 'C123', topic: 'topic' },
      },
      { type: 'post', api: 'conversations.unarchive', params: { channel: 'C123' } },
    ])
  })

  it('Conversations.list throws on non-object params', () => {
    const conversations = new Conversations('token')
    expect(() =>
      conversations.list('C123' as unknown as Record<string, any>),
    ).toThrow('params はオブジェクトで指定してください')
  })

  it('Files.uploadV2 extracts file and content', () => {
    const files = new FilesSpy('token')
    files.uploadV2({
      channel_id: 'C123',
      file: 'blob',
      content: 'hello',
      title: 't',
    })

    expect(files.call).toEqual({
      type: 'post_file',
      api: 'files.uploadV2',
      fileArgs: { file: 'blob', content: 'hello' },
      params: { channel_id: 'C123', title: 't' },
    })
  })

  it('Files.remote.share uses files.remote.share with POST', () => {
    const files = new Files('token')
    const remote = files.remote as unknown as {
      share: (params: Record<string, any>) => any
      _post: (api: string, params: Record<string, any>) => any
      _get: (api: string, params: Record<string, any>) => any
    }
    const calls: Call[] = []
    remote._post = (api: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'post', api, params })
      return { ok: true }
    }
    remote._get = (api: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'get', api, params })
      return { ok: true }
    }

    remote.share({ file: 'F123' })

    expect(calls).toEqual([
      { type: 'post', api: 'files.remote.share', params: { file: 'F123' } },
    ])
  })

  it('Files.uploadV2 throws on non-object', () => {
    const files = new FilesSpy('token')
    expect(() => files.uploadV2('C123' as unknown as Record<string, any>)).toThrow(
      'params はオブジェクトで指定してください',
    )
  })

  it('OAuth.access uses oauth.v2.access', () => {
    const oauth = new OAuthSpy('token')
    oauth.access({ client_id: 'client', client_secret: 'secret' })

    expect(oauth.call).toEqual({
      type: 'post_form',
      api: 'oauth.v2.access',
      params: { client_id: 'client', client_secret: 'secret' },
    })
  })

  it('Users.setPhoto splits image into file payload', () => {
    const users = new UsersSpy('token', 1)
    users.setPhoto({ image: 'blob', crop_w: 100, user: 'U123' })

    expect(users.call).toEqual({
      type: 'post_file',
      api: 'users.setPhoto',
      fileArgs: { image: 'blob' },
      params: { crop_w: 100, user: 'U123' },
    })
  })

  it('Apps.permissions.resources.list uses apps.permissions.resources.list', () => {
    const apps = new Apps('token', 1)
    const resources = apps.permissions.resources as unknown as {
      list: (params: Record<string, any>) => any
      _get: (api: string, params: Record<string, any>) => any
    }
    const calls: Call[] = []
    resources._get = (api: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'get', api, params })
      return { ok: true }
    }

    resources.list({ limit: 1 })

    expect(calls).toEqual([
      { type: 'get', api: 'apps.permissions.resources.list', params: { limit: 1 } },
    ])
  })

  it('Team.profile.get uses team.profile.get', () => {
    const team = new Team('token', 1)
    const profile = team.profile as unknown as {
      get: (params: Record<string, any>) => any
      _get: (api: string, params: Record<string, any>) => any
    }
    const calls: Call[] = []
    profile._get = (api: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'get', api, params })
      return { ok: true }
    }

    profile.get({ fields: 'title' })

    expect(calls).toEqual([
      { type: 'get', api: 'team.profile.get', params: { fields: 'title' } },
    ])
  })

  it('UserGroups.users.update uses usergroups.users.update', () => {
    const usergroups = new UserGroups('token', 1)
    const users = usergroups.users as unknown as {
      update: (params: Record<string, any>) => any
      _post: (api: string, params: Record<string, any>) => any
    }
    const calls: Call[] = []
    users._post = (api: string, params: Record<string, any> = {}) => {
      calls.push({ type: 'post', api, params })
      return { ok: true }
    }

    users.update({ usergroup: 'S123', users: 'U123' })

    expect(calls).toEqual([
      {
        type: 'post',
        api: 'usergroups.users.update',
        params: { usergroup: 'S123', users: 'U123' },
      },
    ])
  })
})
