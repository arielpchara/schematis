import { brandRule } from '../core/brand-rule'

/** String must be an `http:` or `https:` URL. */
export function isUrl() {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    try {
      const url = new URL(value)
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return []
      }
    } catch {
      return [{ code: 'url', message: 'Invalid url', path: [] }]
    }
    return [{ code: 'url', message: 'Invalid url', path: [] }]
  })
}
