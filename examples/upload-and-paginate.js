// Upload a CSV report to Slack, and walk every channel with the pagination helper.
// Setup: add GASlacker as a library and save SLACK_ACCESS_TOKEN in Script Properties.

function uploadCsvReport() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)

  var csv = 'date,signups\n2026-07-21,42\n2026-07-22,57\n'
  var blob = Utilities.newBlob(csv, 'text/csv', 'signups.csv')

  // files.uploadV2 wraps Slack's 3-step upload flow in one call
  var res = slack.files.uploadV2({
    channel_id: 'C0123456789',
    file: blob,
    initial_comment: 'Weekly signups report',
  })
  Logger.log(res.ok ? 'uploaded' : 'failed: ' + res.error)
}

function listAllChannels() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)

  // paginate follows response_metadata.next_cursor (up to 20 pages by default)
  var pages = slack.paginate('conversations.list', { limit: 200, exclude_archived: true }, 'get')
  var channels = pages.flatMap(function (page) {
    return page.channels || []
  })
  Logger.log(channels.length + ' channels')
}
