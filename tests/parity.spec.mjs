import { describe, expect, it } from 'vitest'
import { missingMethods, parseMethodIndex } from '../scripts/check-parity.mjs'

const header = '| Name | Description |\n|------|-------------|'
const row = (name) =>
  `| [${name}](https://docs.slack.dev/reference/methods/${name.toLowerCase()}.md) | Description |`
const rows = Array.from({ length: 300 }, (_, i) => row(`existing.method${i}`))
const index = [header, ...rows].join('\n')

describe('Slack Web API parity', () => {
  it('detects new admin and general methods using their case-sensitive link labels', () => {
    const methods = parseMethodIndex(
      [index, row('admin.tools.getItem'), row('new.method')].join('\n'),
    )
    const supported = new Set([...parseMethodIndex(index), 'admin.tools.getitem'])
    expect(missingMethods(methods, supported)).toEqual(['admin.tools.getItem', 'new.method'])
  })

  it('exempts only the exact retired methods, including when another name starts the same way', () => {
    const names = ['users.setActive', 'files.upload', 'files.uploadNew', 'files.comments.delete']
    expect(missingMethods(names, new Set())).toEqual(['files.comments.delete', 'files.uploadNew'])
  })

  it('rejects an empty response, a partial index and an unrecognized or duplicate row', () => {
    expect(() => parseMethodIndex('')).toThrow()
    expect(() => parseMethodIndex([header, row('api.test')].join('\n'))).toThrow()
    expect(() => parseMethodIndex(index + '\n| admin.future | Changed format |')).toThrow()
    expect(() => parseMethodIndex(index + '\n' + row('existing.method1'))).toThrow()
    expect(() => parseMethodIndex(index + '\n' + header + '\n' + row('hidden.method'))).toThrow()
  })
})
