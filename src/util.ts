const isNil = (value: unknown): value is null | undefined => value === null || value === undefined

const normalizeFormValue = (key: string, value: unknown): string | null => {
  if (isNil(value)) return null
  // Slack takes simple lists such as scopes as CSV, but Block Kit and other structured
  // arguments are JSON. In particular an empty blocks/attachments array clears a message.
  if (
    Array.isArray(value) &&
    key !== 'blocks' &&
    key !== 'attachments' &&
    !value.some((item) => item !== null && typeof item === 'object')
  ) {
    return value.join(',')
  }
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Builds a percent-encoded query string, dropping null / undefined entries
export const queryEncode = (params: Record<string, any> | null): string => {
  if (params == null) return ''
  const param_list: string[] = []
  for (const [key, rawValue] of Object.entries(params)) {
    const value = normalizeFormValue(key, rawValue)
    if (value === null) continue
    param_list.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  return param_list.join('&')
}

export const createPayload = (params: Record<string, any> | null): Record<string, any> => {
  if (params == null) return {}
  const payload: Record<string, any> = {}
  for (const [key, value] of Object.entries(params)) {
    if (isNil(value)) continue
    payload[key] = value
  }
  return payload
}

export const createFormPayload = (params: Record<string, any> | null): Record<string, string> => {
  if (params == null) return {}
  const payload: Record<string, any> = {}
  for (const [key, rawValue] of Object.entries(params)) {
    const value = normalizeFormValue(key, rawValue)
    if (value === null) continue
    payload[key] = value
  }
  return payload
}
