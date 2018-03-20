import { Methods } from './api';

declare const global: any;

global.slack = (token: string) => new Methods(token);

global.testApiTest = () => {
  const slack = global.slack();
  let result = null;

  result = slack.api.test();
  Logger.log(result);

  result = slack.api.test('my_error');
  Logger.log(result);

  result = slack.api.test(null, { foo: 'bar' });
  Logger.log(result);
};

global.testBotsInfo = () => {
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  const slack = global.slack(token);
  let result = null;

  result = slack.bots.info();
  Logger.log(result);

  result = slack.bots.info('B12345678');
  Logger.log(result);
};

global.testAppsPermissions = () => {
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  const slack = global.slack(token);
  let result = null;

  result = slack.apps.permissions.info();
  Logger.log(result);

  result = slack.apps.permissions.request(['1', '2'], '3');
  Logger.log(result);
};
