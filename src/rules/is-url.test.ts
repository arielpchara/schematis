import { describe, expect, it } from 'vitest'
import { isUrl } from './is-url'

describe('isUrl', () => {
  it('allows http(s) urls', () => {
    expect(isUrl()('https://example.com')).toEqual([])
    expect(isUrl()('mailto:a@b.c')[0]?.code).toBe('url')
  })
})
