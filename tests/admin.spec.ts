import { afterEach, describe, expect, it, vi } from 'vitest'
import Admin from '../src/methods/Admin'

describe('Admin API', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns the original gzip Blob after a rate-limit retry without decoding it as text', () => {
    const file = { getBytes: () => [31, -117, 8] }
    const getContentText = vi.fn()
    const fetch = vi
      .fn()
      .mockReturnValueOnce({
        getResponseCode: () => 429,
        getHeaders: () => ({ 'Retry-After': '2' }),
      })
      .mockReturnValueOnce({
        getResponseCode: () => 200,
        getHeaders: () => ({ 'Content-Type': 'application/gzip' }),
        getBlob: () => file,
        getContentText,
      })
    const sleep = vi.fn()
    vi.stubGlobal('UrlFetchApp', { fetch })
    vi.stubGlobal('Utilities', { sleep })

    const result = new Admin('org-token', 1).analytics.getFile({
      type: 'member',
      date: '2026-11-01',
    })

    expect(result.ok).toBe(true)
    expect(result.file).toBe(file)
    expect(getContentText).not.toHaveBeenCalled()
    expect(sleep).toHaveBeenCalledWith(2000)
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenLastCalledWith(
      'https://slack.com/api/admin.analytics.getFile?type=member&date=2026-11-01',
      expect.objectContaining({ method: 'get', headers: { Authorization: 'Bearer org-token' } }),
    )
  })

  it('preserves Slack JSON errors when an analytics file cannot be retrieved', () => {
    const getBlob = vi.fn()
    const error = { ok: false, error: 'missing_scope', needed: 'admin.analytics:read' }
    const fetch = vi.fn().mockReturnValue({
      getResponseCode: () => 200,
      getHeaders: () => ({ 'content-type': 'application/json; charset=utf-8' }),
      getContentText: () => JSON.stringify(error),
      getBlob,
    })
    vi.stubGlobal('UrlFetchApp', { fetch })

    expect(new Admin('org-token').analytics.getFile({ type: 'member' })).toEqual(error)
    expect(getBlob).not.toHaveBeenCalled()
  })

  it('form-encodes JSON arrays for Legal Holds and comma-separated IDs for bulk archive', () => {
    const fetch = vi.fn().mockReturnValue({
      getResponseCode: () => 200,
      getContentText: () => '{"ok":true}',
    })
    vi.stubGlobal('UrlFetchApp', { fetch })
    const admin = new Admin('org-token')
    const entities = [{ entity_type: 'USER', entity_id: 'U1' }]

    admin.legalHold.entities.add({ policy_id: 'H1', entities })
    admin.legalHold.entities.remove({ policy_id: 'H1', ids: ['He1', 'He2'] })
    admin.legalHold.policies.create({ name: 'hold', restrictions: ['ONLY_DMS'] })
    admin.conversations.bulkArchive({ channel_ids: ['C1', 'C2'] })
    expect(fetch.mock.calls.map(([, options]) => options.payload)).toEqual([
      { policy_id: 'H1', entities: JSON.stringify(entities) },
      { policy_id: 'H1', ids: '["He1","He2"]' },
      { name: 'hold', restrictions: '["ONLY_DMS"]' },
      { channel_ids: 'C1,C2' },
    ])
  })

  it.each([
    { Ftt01: { permission: 'named_entities', user_ids: ['U1'] } },
    { Ftt01: { permissions: [{ type: 'trigger_type', permission: 'no_one' }] } },
  ])('accepts documented trigger permission responses without an ok field', (permissions) => {
    const body = { permissions, metadata: {} }
    vi.stubGlobal('UrlFetchApp', {
      fetch: () => ({ getResponseCode: () => 200, getContentText: () => JSON.stringify(body) }),
    })
    expect(new Admin('token').workflows.triggers.types.permissions.lookup()).toEqual({
      ...body,
      ok: true,
    })
  })

  it.each([
    [200, { permissions: [] }],
    [200, { permissions: null }],
    [503, { permissions: {} }],
    [200, { ok: false, error: 'missing_scope', permissions: {} }],
  ])('does not treat malformed or failed permission lookups as successful', (status, body) => {
    vi.stubGlobal('UrlFetchApp', {
      fetch: () => ({ getResponseCode: () => status, getContentText: () => JSON.stringify(body) }),
    })
    expect(new Admin('token').workflows.triggers.types.permissions.lookup().ok).toBe(false)
  })
})
