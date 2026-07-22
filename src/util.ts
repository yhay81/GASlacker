const isNil = (value: unknown): value is null | undefined => value === null || value === undefined

const normalizeFormValue = (value: unknown): string | null => {
  if (isNil(value)) return null
  if (Array.isArray(value)) return value.join(',')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Reference: https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py#L846
export const queryEncode = (params: Record<string, any> | null): string => {
  if (params == null) return ''
  const param_list: string[] = []
  for (const [key, rawValue] of Object.entries(params)) {
    const value = normalizeFormValue(rawValue)
    if (value === null) continue
    param_list.push(`${encodeURIComponent(String(key))}=${encodeURIComponent(value)}`)
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
    const value = normalizeFormValue(rawValue)
    if (value === null) continue
    payload[key] = value
  }
  return payload
}
