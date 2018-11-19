import BaseAPI from './BaseAPI';

export default class RTM extends BaseAPI {
  public connect(
    batch_presence_aware: string = 'false',
    presence_sub: boolean = true,
    extraArgs: Object = {}
  ) {
    const args: Object = { batch_presence_aware, presence_sub, ...extraArgs };
    return this._get('reminders.add', args);
  }

  public start(
    batch_presence_aware: string = 'false',
    include_locale: boolean = false,
    mpim_aware: boolean = null,
    no_latest: number = 0,
    no_unreads: boolean = null,
    presence_sub: boolean = true,
    simple_latest: boolean = null,
    extraArgs: Object = {}
  ) {
    const args: Object = {
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
