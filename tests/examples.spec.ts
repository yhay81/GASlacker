import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const readExample = (name: string) =>
  readFileSync(new URL(`../examples/${name}.js`, import.meta.url), 'utf8')
const aiDraft = readExample('ai-approved-draft')

describe('approved draft example', () => {
  it('stages formula-like text literally and creates an unchecked approval under lock', () => {
    const setRichTextValues = vi.fn()
    const insertCheckboxes = vi.fn()
    const waitLock = vi.fn()
    const flush = vi.fn()
    const releaseLock = vi.fn()
    const sheet = {
      getLastRow: () => 1,
      getMaxRows: () => 1,
      insertRowAfter: vi.fn(),
      getRange: () => ({ setRichTextValues, insertCheckboxes }),
    }

    runInNewContext(aiDraft + "\nstageSlackDraft('=1+1', ' C1 ')", {
      LockService: { getScriptLock: () => ({ waitLock, releaseLock }) },
      SpreadsheetApp: {
        getActiveSpreadsheet: () => ({ getSheetByName: () => sheet }),
        newRichTextValue: () => ({ setText: (text: string) => ({ build: () => text }) }),
        flush,
      },
    })

    expect(setRichTextValues).toHaveBeenCalledWith([['=1+1', 'C1']])
    expect(sheet.insertRowAfter).toHaveBeenCalledWith(1)
    expect(waitLock).toHaveBeenCalledBefore(setRichTextValues)
    expect(insertCheckboxes).toHaveBeenCalledBefore(flush)
    expect(flush).toHaveBeenCalledBefore(releaseLock)
  })

  it('enforces approvals, destinations and the attempt cap even after ambiguous failures', () => {
    const revoked = ['revoked', 'C1', true, '', '']
    const edited = ['edited', 'C1', true, '', '']
    const rows = [
      ['unapproved', 'C1', false, '', ''],
      ['blocked', 'C2', true, '', ''],
      ['   ', 'C1', true, '', ''],
      ['done', 'C1', true, new Date(), ''],
      ['pending', 'C1', true, '', 'posting'],
      ['0', 'C1', true, '', ''],
      revoked,
      edited,
      ...Array.from({ length: 11 }, (_, i) => [String(i + 1), 'C1', true, '', '']),
    ]
    const sheet = {
      getLastRow: () => rows.length + 1,
      getRange: (row: number, column: number, height: number) => ({
        getValues: () => rows.slice(row - 2, row - 2 + height).map((r) => [...r]),
        setValue: (value: string) => {
          rows[row - 2][column - 1] = value
        },
      }),
    }
    const flush = vi.fn()
    const states: string[] = []
    const postMessage = vi.fn(({ text }: { text: string }) => {
      states.push(String(rows.find(([draft]) => draft === text)?.[4]))
      if (text === '0') {
        revoked[2] = false
        edited[0] = 'revised'
        throw new Error('delivery unknown')
      }
      return { ok: false, error: 'missing_scope' }
    })
    const context = {
      LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock: vi.fn() }) },
      SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet }), flush },
      PropertiesService: {
        getScriptProperties: () => ({
          getProperty: (key: string) => (key === 'SLACK_ACCESS_TOKEN' ? 'token' : ' C1 '),
        }),
      },
      GASlacker: { methods: () => ({ chat: { postMessage } }) },
    }

    runInNewContext(aiDraft + '\npostApprovedSlackDrafts()', context)
    expect(postMessage.mock.calls.map(([message]) => message.text)).toEqual(
      Array.from({ length: 10 }, (_, i) => String(i)),
    )
    expect(flush).toHaveBeenCalledBefore(postMessage)
    expect(states.every((state) => state.startsWith('posting:'))).toBe(true)
    expect(rows[5][4]).toBe('uncertain: Error')
    expect(revoked[4]).toBe('')
    expect(edited[4]).toBe('')
    edited[2] = false
    runInNewContext('postApprovedSlackDrafts()', context)
    expect(postMessage.mock.calls.slice(10).map(([message]) => message.text)).toEqual(['10', '11'])
  })
})

it('sends long form responses as a bounded, Unicode-safe plain-text preview', () => {
  const postMessage = vi.fn(() => ({ ok: true }))
  runInNewContext(readExample('form-response-notification') + '\nonFormSubmit(event)', {
    event: { namedValues: { Question: ['<!channel>' + '🐈'.repeat(3000)] } },
    GASlacker: { methods: () => ({ chat: { postMessage } }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'example' }) },
  })
  expect(postMessage).toHaveBeenCalledWith({
    channel: 'example',
    blocks: [
      expect.anything(),
      {
        type: 'section',
        text: { type: 'plain_text', text: 'Question\n<!channel>' + '🐈'.repeat(2980) + '…' },
      },
    ],
  })
})

it('runs the same landing-page sheet example for every language and skips an empty sheet', () => {
  const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8')
  const snippet = html
    .match(/<pre\s+id="code-notify"\s*>([\s\S]*?)<\/pre>/)![1]
    .replace(/<[^>]+>/g, '')
    .replaceAll('&lt;', '<')
  const getRange = vi.fn()
  const postMessage = vi.fn(() => ({ ok: true }))
  const sheet = { getLastRow: () => 1, getRange }
  const context = {
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet }) },
    GASlacker: { methods: () => ({ chat: { postMessage } }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'token' }) },
  }

  expect(html.match(/function dailySummary\(\)/g)).toHaveLength(1)
  runInNewContext(snippet + '\ndailySummary()', context)
  expect(getRange).not.toHaveBeenCalled()
  sheet.getLastRow = () => 2
  getRange.mockReturnValue({ getDisplayValues: () => [['Inflation', '2%']] })
  runInNewContext('dailySummary()', context)
  expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ text: '• Inflation: 2%' }))
})

it('does not repeat an overdue DM after a timeout and uses the spreadsheet date', () => {
  const row = ['task', 'U1', new Date('2020-01-01T12:00:00Z'), 'open', '']
  const flush = vi.fn()
  const postMessage = vi.fn(() => {
    throw new Error('connection lost')
  })
  const releaseLock = vi.fn()
  const context = {
    Date,
    GASlacker: {
      methods: () => ({
        conversations: { open: () => ({ ok: true, channel: { id: 'D1' } }) },
        chat: { postMessage },
      }),
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSpreadsheetTimeZone: () => 'Pacific/Honolulu',
        getSheetByName: () => ({
          getLastRow: () => 2,
          getRange: () => ({
            getValues: () => [row],
            setValue: (v: Date) => {
              row[4] = v
            },
          }),
        }),
      }),
      flush,
    },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'token' }) },
    Utilities: {
      formatDate: (date: Date, tz: string) => {
        expect(tz).toBe('Pacific/Honolulu')
        return date.toLocaleDateString('en-CA', { timeZone: tz })
      },
    },
  }

  expect(() =>
    runInNewContext(readExample('overdue-task-reminder') + '\nremindOverdueTasks()', context),
  ).toThrow('connection lost')
  runInNewContext('remindOverdueTasks()', context)
  expect(flush).toHaveBeenCalledBefore(postMessage)
  expect(postMessage).toHaveBeenCalledTimes(1)
  expect(releaseLock).toHaveBeenCalledTimes(2)
})
