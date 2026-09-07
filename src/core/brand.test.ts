import { describe, expect, it } from 'vitest'
import { FIELD, OUTCOME, RULE, SCHEMA, SHAPE } from './brand'

describe('brand', () => {
  it('uses global symbols so ESM and CJS copies match', () => {
    expect(SCHEMA).toBe(Symbol.for('schematis.schema'))
    expect(RULE).toBe(Symbol.for('schematis.rule'))
    expect(FIELD).toBe(Symbol.for('schematis.field'))
    expect(OUTCOME).toBe(Symbol.for('schematis.outcome'))
    expect(SHAPE).toBe(Symbol.for('schematis.shape'))
  })
})
