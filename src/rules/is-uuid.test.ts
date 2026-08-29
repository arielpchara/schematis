import { describe, expect, it } from 'vitest'
import { isUuid } from './is-uuid'

describe('isUuid', () => {
  it('validates uuid v4-style ids', () => {
    expect(isUuid()('550e8400-e29b-41d4-a716-446655440000')).toEqual([])
    expect(isUuid()('not-a-uuid')[0]?.code).toBe('uuid')
  })
})
