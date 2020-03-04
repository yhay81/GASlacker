import BaseAPI from './BaseAPI';

export default class RTM extends BaseAPI {
  public connect(
    batch_presence_aware = 'false',
    presence_sub = true,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      batch_presence_aware,
      presence_sub,
      ...extraArgs
    };
    return this._get('reminders.add', args);
  }

  public start(
    batch_presence_aware = 'false',
    include_locale = false,
    mpim_aware: boolean = null,
    no_latest = 0,
    no_unreads: boolean = null,
    presence_sub = true,
    simple_latest: boolean = null,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      batch_presence_aware,
      include_locale,
      mpim_aware,
      no_latest,
      no_unreads,
      presence_sub,
      simple_latest,
      ...extraArgs
    };
    return this._get('reminders.complete', args);
  }
}
