import { describe, expect, it } from 'vitest'
import { isEnum } from './is-enum'

describe('isEnum', () => {
  const schema = isEnum(['Salmon', 'Tuna'] as const)()

  it('accepts enum members', () => {
    expect(schema('Salmon').isValid()).toBe(true)
  })

  it('rejects other strings', () => {
    expect(schema('Trout').isValid()).toBe(false)
  })
})
