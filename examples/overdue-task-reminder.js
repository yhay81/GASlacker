// Send one Slack DM per day for overdue tasks stored in a spreadsheet.
// Sheet columns: Task | Slack user ID | Due date | Status | Last reminded
// Setup: add GASlacker, save SLACK_ACCESS_TOKEN, then add a daily trigger for remindOverdueTasks.

function remindOverdueTasks() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slack = GASlacker.methods(token)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks')
  var lastRow = sheet.getLastRow()
  if (lastRow < 2) return

  var timeZone = Session.getScriptTimeZone()
  var today = Utilities.formatDate(new Date(), timeZone, 'yyyy-MM-dd')
  var rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues()

  rows.forEach(function (row, index) {
    var task = row[0]
    var userId = row[1]
    var due = row[2]
    var status = String(row[3]).toLowerCase()
    var lastReminded =
      row[4] instanceof Date ? Utilities.formatDate(row[4], timeZone, 'yyyy-MM-dd') : String(row[4])

    if (!task || !userId || !(due instanceof Date) || status === 'done' || lastReminded === today) {
      return
    }

    var dueDate = Utilities.formatDate(due, timeZone, 'yyyy-MM-dd')
    if (dueDate >= today) return

    var opened = slack.conversations.open({ users: userId })
    if (!opened.ok) {
      Logger.log('conversations.open failed: ' + opened.error)
      return
    }

    var posted = slack.chat.postMessage({
      channel: opened.channel.id,
      text: ':warning: *Overdue:* ' + task + ' (due ' + dueDate + ')',
    })
    if (posted.ok) {
      sheet.getRange(index + 2, 5).setValue(new Date())
    } else {
      Logger.log('postMessage failed: ' + posted.error)
    }
  })
}
