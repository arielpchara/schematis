import { describe, expect, it } from 'vitest'
import { isBase64 } from './is-base64'

describe('isBase64', () => {
  it('accepts padded base64', () => {
    expect(isBase64()('YWJj')).toEqual([])
    expect(isBase64()('abc')[0]?.code).toBe('base64')
  })
})
