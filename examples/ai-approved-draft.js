// Post human-approved AI drafts from a spreadsheet, with a fail-closed execution boundary.
// Sheet columns: Draft | Slack channel ID | Approved | Posted at | Result
//
// Setup:
//   1. Add GASlacker and create a sheet named "AI drafts" with the columns above.
//   2. Save SLACK_ACCESS_TOKEN and a comma-separated SLACK_ALLOWED_CHANNEL_IDS in Script Properties.
//   3. Give the model integration access only to stageSlackDraft(), not sheet editing or posting.
//   4. Review the exact draft and destination, select Approved, then run postApprovedSlackDrafts().

var AI_DRAFT_SHEET_NAME = 'AI drafts'
var MAX_POSTS_PER_RUN = 10
var MAX_DRAFT_CHARACTERS = 4000

function stageSlackDraft(draft, channelId) {
  if (typeof draft !== 'string' || !draft.trim()) throw new Error('draft must be non-empty text')
  if (draft.length > MAX_DRAFT_CHARACTERS) throw new Error('draft is too long')
  if (typeof channelId !== 'string' || !channelId.trim()) {
    throw new Error('channelId must be non-empty text')
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(AI_DRAFT_SHEET_NAME)
  if (!sheet) throw new Error('Create a sheet named "' + AI_DRAFT_SHEET_NAME + '" first')
  var lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    var nextRow = Math.max(sheet.getLastRow() + 1, 2)
    if (nextRow > sheet.getMaxRows()) sheet.insertRowAfter(nextRow - 1)
    // Rich text stores literal strings, including drafts that begin with a formula marker.
    var values = [draft, channelId.trim()].map(function (text) {
      return SpreadsheetApp.newRichTextValue().setText(text).build()
    })
    sheet.getRange(nextRow, 1, 1, 2).setRichTextValues([values])
    sheet.getRange(nextRow, 3).insertCheckboxes()
    SpreadsheetApp.flush()
  } finally {
    lock.releaseLock()
  }
}

function postApprovedSlackDrafts() {
  var lock = LockService.getScriptLock()
  if (!lock.tryLock(1000)) return

  try {
    var properties = PropertiesService.getScriptProperties()
    var token = properties.getProperty('SLACK_ACCESS_TOKEN')
    var allowedChannels = parseAllowedChannels(properties.getProperty('SLACK_ALLOWED_CHANNEL_IDS'))
    if (!token) throw new Error('Set SLACK_ACCESS_TOKEN in Script Properties')
    if (!allowedChannels.length) {
      throw new Error('Set at least one SLACK_ALLOWED_CHANNEL_IDS entry')
    }

    var slack = GASlacker.methods(token)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(AI_DRAFT_SHEET_NAME)
    if (!sheet) throw new Error('Create a sheet named "' + AI_DRAFT_SHEET_NAME + '" first')
    var lastRow = sheet.getLastRow()
    if (lastRow < 2) return

    var rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues()
    var attempts = 0

    for (var index = 0; index < rows.length && attempts < MAX_POSTS_PER_RUN; index++) {
      var row = rows[index]
      var draft = String(row[0] || '')
      var channelId = String(row[1] || '')
      var approved = row[2] === true
      var postedAt = row[3]
      var result = String(row[4] || '')
      if (!approved || postedAt || result) continue

      // The script lock serializes runs, but a reviewer can still edit or move a sheet row.
      var current = sheet.getRange(index + 2, 1, 1, 5).getValues()[0]
      if (
        row.some(function (value, column) {
          return value !== current[column]
        })
      )
        continue

      var resultCell = sheet.getRange(index + 2, 5)
      if (!draft.trim() || draft.length > MAX_DRAFT_CHARACTERS) {
        resultCell.setValue('rejected: invalid draft length')
        continue
      }
      if (allowedChannels.indexOf(channelId) === -1) {
        resultCell.setValue('rejected: destination is not allowlisted')
        continue
      }

      // Persist an uncertain state before the external action. If execution stops after Slack
      // accepts the message, a later run will skip this row instead of posting it twice.
      resultCell.setValue('posting: manual review required if this state remains')
      SpreadsheetApp.flush()

      var response
      attempts += 1
      try {
        response = slack.chat.postMessage({ channel: channelId, text: draft, mrkdwn: false })
      } catch (error) {
        resultCell.setValue('uncertain: ' + (error && error.name ? error.name : 'request_failed'))
        continue
      }

      if (!response.ok) {
        resultCell.setValue('error: ' + String(response.error || 'unknown_error'))
        continue
      }

      sheet.getRange(index + 2, 4).setValue(new Date())
      resultCell.setValue('posted')
    }
    SpreadsheetApp.flush()
  } finally {
    lock.releaseLock()
  }
}

function parseAllowedChannels(value) {
  return String(value || '')
    .split(',')
    .map(function (channelId) {
      return channelId.trim()
    })
    .filter(function (channelId) {
      return channelId !== ''
    })
}
