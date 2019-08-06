import types from '.'
import { isRequired } from '../rules'

describe('Test Number Type Validator', () => {
  const numberType = types.number('Should be a number')
  const numberTypeValidator = numberType()
  it('Should valid value check', () => {
    expect(numberTypeValidator(1)).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberTypeValidator('foo')).toMatchObject([{ type: 'number' }])
  })
  it('Should nullable value check', () => {
    expect(numberTypeValidator()).toBeNull()
  })

  const numberRequiredValidator = numberType(isRequired())
  it('Should valid value check', () => {
    expect(numberRequiredValidator(1)).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberRequiredValidator('foo')).toMatchObject([{ type: 'number' }])
  })
  it('Should nullable value check', () => {
    expect(numberRequiredValidator(null)).toMatchObject([{ type: 'required' }])
  })

  it('Should test number without message', () => {
    expect(types.number()(isRequired())('foo')).toMatchObject([
      { type: 'number' }
    ])
  })
})
