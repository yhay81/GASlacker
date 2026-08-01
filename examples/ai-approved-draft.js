// Post human-approved AI drafts from a spreadsheet, with a fail-closed execution boundary.
// Sheet columns: Draft | Slack channel ID | Approved | Posted at | Result
//
// Setup:
//   1. Add GASlacker and create a sheet named "AI drafts" with the columns above.
//   2. Save SLACK_ACCESS_TOKEN and a comma-separated SLACK_ALLOWED_CHANNEL_IDS in Script Properties.
//   3. Let a model integration call stageSlackDraft(), or paste its output into the sheet.
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
  var nextRow = Math.max(sheet.getLastRow() + 1, 2)
  var row = sheet.getRange(nextRow, 1, 1, 5)
  // Plain-text formatting prevents untrusted model output beginning with "=" from becoming a
  // spreadsheet formula before a person reviews it.
  row.getCell(1, 1).setNumberFormat('@').setValue(draft)
  row.getCell(1, 2).setNumberFormat('@').setValue(channelId)
  row.getCell(1, 3).setValue(false)
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
    var postedCount = 0

    rows.forEach(function (row, index) {
      if (postedCount >= MAX_POSTS_PER_RUN) return

      var draft = String(row[0] || '')
      var channelId = String(row[1] || '')
      var approved = row[2] === true
      var postedAt = row[3]
      var result = String(row[4] || '')
      if (!approved || postedAt || result) return

      var resultCell = sheet.getRange(index + 2, 5)
      if (!draft || draft.length > MAX_DRAFT_CHARACTERS) {
        resultCell.setValue('rejected: invalid draft length')
        return
      }
      if (allowedChannels.indexOf(channelId) === -1) {
        resultCell.setValue('rejected: destination is not allowlisted')
        return
      }

      // Persist an uncertain state before the external action. If execution stops after Slack
      // accepts the message, a later run will skip this row instead of posting it twice.
      resultCell.setValue('posting: manual review required if this state remains')
      SpreadsheetApp.flush()

      var response
      try {
        response = slack.chat.postMessage({ channel: channelId, text: draft })
      } catch (error) {
        resultCell.setValue('uncertain: ' + safeErrorName(error))
        return
      }

      if (!response.ok) {
        resultCell.setValue('error: ' + String(response.error || 'unknown_error'))
        return
      }

      sheet.getRange(index + 2, 4).setValue(new Date())
      resultCell.setValue('posted')
      postedCount += 1
    })
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

function safeErrorName(error) {
  if (error && error.name) return String(error.name)
  return 'request_failed'
}
