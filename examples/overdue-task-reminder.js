// Attempt one Slack DM per day for each overdue task stored in a spreadsheet.
// Sheet columns: Task | Slack user ID | Due date | Status | Last reminder attempt
// Setup: add GASlacker, save SLACK_ACCESS_TOKEN, then add a daily trigger for remindOverdueTasks.
// Bot scopes: im:write and chat:write.

function remindOverdueTasks() {
  var lock = LockService.getScriptLock()
  if (!lock.tryLock(1000)) return

  try {
    var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
    var slack = GASlacker.methods(token)
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = spreadsheet.getSheetByName('Tasks')
    var lastRow = sheet.getLastRow()
    if (lastRow < 2) return

    var timeZone = spreadsheet.getSpreadsheetTimeZone()
    var now = new Date()
    var today = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd')
    var rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues()

    rows.forEach(function (row, index) {
      var task = row[0]
      var userId = row[1]
      var due = row[2]
      var status = String(row[3]).trim().toLowerCase()
      var lastAttempt =
        row[4] instanceof Date
          ? Utilities.formatDate(row[4], timeZone, 'yyyy-MM-dd')
          : String(row[4])

      if (
        !task ||
        !userId ||
        !(due instanceof Date) ||
        status === 'done' ||
        lastAttempt === today
      ) {
        return
      }

      var dueDate = Utilities.formatDate(due, timeZone, 'yyyy-MM-dd')
      if (dueDate >= today) return

      var opened = slack.conversations.open({ users: userId })
      if (!opened.ok) {
        Logger.log('conversations.open failed: ' + opened.error)
        return
      }

      // Record the attempt first: Slack may accept the message even if the request times out.
      sheet.getRange(index + 2, 5).setValue(now)
      SpreadsheetApp.flush()
      var posted = slack.chat.postMessage({
        channel: opened.channel.id,
        text: 'Overdue: ' + task + ' (due ' + dueDate + ')',
        mrkdwn: false,
      })
      if (!posted.ok) Logger.log('postMessage failed: ' + posted.error)
    })
  } finally {
    lock.releaseLock()
  }
}
