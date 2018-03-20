import { API } from './slack';

declare const global: any;

global.api = (token: string) => new API(token);

global.testApiTest = () => {
  const slack = global.api();
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
  const slack = global.api(token);
  let result = null;

  result = slack.bots.info();
  Logger.log(result);

  result = slack.bots.info('B12345678');
  Logger.log(result);
};
