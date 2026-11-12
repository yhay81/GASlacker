// Upload a CSV report to Slack, and walk every channel with the pagination helper.
// Setup: add GASlacker and save SLACK_ACCESS_TOKEN and SLACK_CHANNEL_ID in Script Properties.
// Bot scopes: files:write for uploads and channels:read for listing public channels.

function uploadCsvReport() {
  var properties = PropertiesService.getScriptProperties()
  var slack = GASlacker.methods(properties.getProperty('SLACK_ACCESS_TOKEN'))

  var csv = 'date,signups\n2026-07-21,42\n2026-07-22,57\n'
  var blob = Utilities.newBlob(csv, 'text/csv', 'signups.csv')

  // files.uploadV2 wraps Slack's 3-step upload flow in one call
  var res = slack.files.uploadV2({
    channel_id: properties.getProperty('SLACK_CHANNEL_ID'),
    file: blob,
    initial_comment: 'Weekly signups report',
  })
  Logger.log(res.ok ? 'uploaded' : 'failed: ' + res.error)
}

function listAllChannels() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)

  // paginate follows response_metadata.next_cursor until every page is returned
  var pages = slack.paginate('conversations.list', { limit: 200, exclude_archived: true }, 'get')
  var channels = pages.flatMap(function (page) {
    if (!page.ok) throw new Error('conversations.list failed: ' + page.error)
    return page.channels
  })
  Logger.log(channels.length + ' channels')
}
