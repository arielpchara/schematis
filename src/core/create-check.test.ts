import { describe, expect, it } from 'vitest'
import { createCheck } from './create-check'
import { createOutcome } from './create-outcome'

describe('createCheck', () => {
  it('is valid when there are no issues', () => {
    const check = createCheck(createOutcome({ id: '1' }))
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toEqual({ id: '1' })
    expect(check.getErrors()).toEqual([])
    expect(() => check.assert()).not.toThrow()
  })

  it('formats errors and throws on assert', () => {
    const check = createCheck(
      createOutcome(
        { id: '1' },
        [
          { code: 'string', message: 'Expected string', path: ['address', 'place'] }
        ]
      )
    )
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: 'address.place', message: 'Expected string' }
    ])
    expect(() => check.assert()).toThrow('address.place: Expected string')
  })
})
