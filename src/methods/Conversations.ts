import BaseAPI, { SlackParams } from './BaseAPI'

class ConversationsCanvases extends BaseAPI {
  public create(params: SlackParams = {}) {
    return this._post('conversations.canvases.create', params)
  }
}

class ConversationsExternalInvitePermissions extends BaseAPI {
  public set(params: SlackParams = {}) {
    return this._post('conversations.externalInvitePermissions.set', params)
  }
}

class ConversationsRequestSharedInvite extends BaseAPI {
  public approve(params: SlackParams = {}) {
    return this._post('conversations.requestSharedInvite.approve', params)
  }

  public deny(params: SlackParams = {}) {
    return this._post('conversations.requestSharedInvite.deny', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('conversations.requestSharedInvite.list', params)
  }
}

export default class Conversations extends BaseAPI {
  public canvases
  public externalInvitePermissions
  public requestSharedInvite
  constructor(token: string | null, retries_limit?: number) {
    super(token, retries_limit)
    this.canvases = new ConversationsCanvases(token, retries_limit)
    this.externalInvitePermissions = new ConversationsExternalInvitePermissions(
      token,
      retries_limit,
    )
    this.requestSharedInvite = new ConversationsRequestSharedInvite(token, retries_limit)
  }

  // Slack Connect (externally shared channels)
  public acceptSharedInvite(params: SlackParams = {}) {
    return this._post('conversations.acceptSharedInvite', params)
  }

  public approveSharedInvite(params: SlackParams = {}) {
    return this._post('conversations.approveSharedInvite', params)
  }

  public declineSharedInvite(params: SlackParams = {}) {
    return this._post('conversations.declineSharedInvite', params)
  }

  public inviteShared(params: SlackParams = {}) {
    return this._post('conversations.inviteShared', params)
  }

  public listConnectInvites(params: SlackParams = {}) {
    return this._get('conversations.listConnectInvites', params)
  }

  public archive(params: SlackParams = {}) {
    return this._post('conversations.archive', params)
  }

  public close(params: SlackParams = {}) {
    return this._post('conversations.close', params)
  }

  public create(params: SlackParams = {}) {
    return this._post('conversations.create', params)
  }

  public history(params: SlackParams = {}) {
    return this._get('conversations.history', params)
  }

  public info(params: SlackParams = {}) {
    return this._get('conversations.info', params)
  }

  public invite(params: SlackParams = {}) {
    return this._post('conversations.invite', params)
  }

  public join(params: SlackParams = {}) {
    return this._post('conversations.join', params)
  }

  public kick(params: SlackParams = {}) {
    return this._post('conversations.kick', params)
  }

  public leave(params: SlackParams = {}) {
    return this._post('conversations.leave', params)
  }

  public list(params: SlackParams = {}) {
    return this._get('conversations.list', params)
  }

  public mark(params: SlackParams = {}) {
    return this._post('conversations.mark', params)
  }

  public members(params: SlackParams = {}) {
    return this._get('conversations.members', params)
  }

  public open(params: SlackParams = {}) {
    return this._post('conversations.open', params)
  }

  public rename(params: SlackParams = {}) {
    return this._post('conversations.rename', params)
  }

  public replies(params: SlackParams = {}) {
    return this._get('conversations.replies', params)
  }

  public setPurpose(params: SlackParams = {}) {
    return this._post('conversations.setPurpose', params)
  }

  public setTopic(params: SlackParams = {}) {
    return this._post('conversations.setTopic', params)
  }

  public unarchive(params: SlackParams = {}) {
    return this._post('conversations.unarchive', params)
  }
}
