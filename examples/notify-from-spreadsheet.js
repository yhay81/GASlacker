// Post a daily summary from a spreadsheet to Slack.
// Setup:
//   1. Add GASlacker as a library (see README) in a container-bound script of your sheet.
//   2. Save your bot token in Script Properties as SLACK_ACCESS_TOKEN.
//   3. Add a time-driven trigger for dailySummary (e.g. every morning).

function dailySummary() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('KPI')
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues()
  var lines = rows.map(function (row) {
    return '• ' + row[0] + ': *' + row[1] + '*'
  })

  var res = slack.chat.postMessage({
    channel: 'C0123456789',
    text: 'Daily summary',
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: 'Daily summary' } },
      { type: 'section', text: { type: 'mrkdwn', text: lines.join('\n') } },
    ],
  })
  if (!res.ok) {
    // Slack returns machine-readable errors: channel_not_found, not_in_channel, ...
    Logger.log('postMessage failed: ' + res.error)
  }
}
