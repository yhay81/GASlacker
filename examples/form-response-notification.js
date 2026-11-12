// Notify Slack when a Google Form writes a new response to a spreadsheet.
// Setup:
//   1. Open the response spreadsheet and add GASlacker as a library.
//   2. Save SLACK_ACCESS_TOKEN and SLACK_CHANNEL_ID in Script Properties.
//   3. Add an installable trigger: onFormSubmit -> From spreadsheet -> On form submit.

function onFormSubmit(e) {
  var properties = PropertiesService.getScriptProperties()
  var slack = GASlacker.methods(properties.getProperty('SLACK_ACCESS_TOKEN'))
  var channel = properties.getProperty('SLACK_CHANNEL_ID')

  var fields = Object.keys(e.namedValues).map(function (question) {
    return question + '\n' + e.namedValues[question].join(', ')
  })

  var answers = fields.join('\n\n') || 'No answers'
  var characters = Array.from(answers)
  if (characters.length > 3000) answers = characters.slice(0, 2999).join('') + '…'
  var res = slack.chat.postMessage({
    channel: channel,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: 'New form response' } },
      { type: 'section', text: { type: 'plain_text', text: answers } },
    ],
  })

  if (!res.ok) Logger.log('postMessage failed: ' + res.error)
}
