// Post today's Google Calendar agenda to Slack every morning.
// Setup:
//   1. Add GASlacker as a library and save SLACK_ACCESS_TOKEN / SLACK_CHANNEL_ID.
//   2. Add a time-driven trigger for postDailyAgenda (e.g. every day at 8:00).

function postDailyAgenda() {
  var properties = PropertiesService.getScriptProperties()
  var slack = GASlacker.methods(properties.getProperty('SLACK_ACCESS_TOKEN'))
  var channel = properties.getProperty('SLACK_CHANNEL_ID')
  var timeZone = Session.getScriptTimeZone()
  var now = new Date()
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(now)

  var lines = events.map(function (event) {
    if (event.isAllDayEvent()) return '• All day — *' + event.getTitle() + '*'
    var start = Utilities.formatDate(event.getStartTime(), timeZone, 'HH:mm')
    var end = Utilities.formatDate(event.getEndTime(), timeZone, 'HH:mm')
    return '• ' + start + '–' + end + ' — *' + event.getTitle() + '*'
  })

  var date = Utilities.formatDate(now, timeZone, 'EEE, MMM d')
  var agenda = lines.length ? lines.join('\n') : 'No events today :sparkles:'
  var res = slack.chat.postMessage({
    channel: channel,
    text: 'Agenda for ' + date,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: 'Today · ' + date } },
      { type: 'section', text: { type: 'mrkdwn', text: agenda } },
    ],
  })

  if (!res.ok) Logger.log('postMessage failed: ' + res.error)
}
