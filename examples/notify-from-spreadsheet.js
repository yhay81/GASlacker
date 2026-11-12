// Post a daily summary from a spreadsheet to Slack.
// Setup:
//   1. Add GASlacker as a library (see README) in a container-bound script of your sheet.
//   2. Save SLACK_ACCESS_TOKEN and SLACK_CHANNEL_ID in Script Properties.
//      Create a KPI sheet with a header, metric names in column A and values in B.
//   3. Add a time-driven trigger for dailySummary (e.g. every morning).

function dailySummary() {
  var properties = PropertiesService.getScriptProperties()
  var slack = GASlacker.methods(properties.getProperty('SLACK_ACCESS_TOKEN'))

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('KPI')
  var lastRow = sheet.getLastRow()
  if (lastRow < 2) return // no data rows below the header yet
  var rows = sheet.getRange(2, 1, lastRow - 1, 2).getDisplayValues()
  var lines = rows.map(function (row) {
    return '• ' + row[0] + ': ' + row[1]
  })

  var summary = lines.join('\n')
  var characters = Array.from(summary)
  if (characters.length > 3000) summary = characters.slice(0, 2999).join('') + '…'
  var res = slack.chat.postMessage({
    channel: properties.getProperty('SLACK_CHANNEL_ID'),
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: 'Daily summary' } },
      { type: 'section', text: { type: 'plain_text', text: summary } },
    ],
  })
  if (!res.ok) {
    // Slack returns machine-readable errors: channel_not_found, not_in_channel, ...
    Logger.log('postMessage failed: ' + res.error)
  }
}
