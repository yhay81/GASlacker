// A minimal Events API bot: replies in a thread when someone mentions "hello".
// Setup:
//   1. Deploy this script as a Web App (execute as you, accessible to anyone).
//   2. Set the Web App URL as the Request URL of your Slack app's Event Subscriptions
//      (subscribe to message.channels), then install the app to your workspace.
//   3. Save your bot token in Script Properties as SLACK_ACCESS_TOKEN.
// Note: verify the request signature in production
// (https://docs.slack.dev/authentication/verifying-requests-from-slack).

var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
var slack = GASlacker.methods(token)

function doPost(e) {
  var body = JSON.parse(e.postData.contents)

  // Endpoint URL verification during Events API setup
  if (body.type === 'url_verification') {
    return ContentService.createTextOutput(body.challenge)
  }

  var event = body.event
  if (
    event &&
    event.type === 'message' &&
    !event.bot_id &&
    event.text &&
    /hello/i.test(event.text)
  ) {
    slack.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: 'Hello <@' + event.user + '>!',
    })
  }
  return ContentService.createTextOutput('')
}
