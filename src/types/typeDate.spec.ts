import types from '.'
import { isRequired } from '../validators'

describe('Test Number Type Validator', () => {
  const numberType = types.date('Should be a date')
  const numberTypeValidator = numberType()
  it('Should valid value check', () => {
    expect(numberTypeValidator(new Date())).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberTypeValidator('foo')).toMatchObject([{ type: 'date' }])
  })
  it('Should nullable value check', () => {
    expect(numberTypeValidator()).toBeNull()
  })

  const numberRequiredValidator = numberType(isRequired())
  it('Should valid value check', () => {
    expect(numberRequiredValidator(new Date())).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberRequiredValidator('foo')).toMatchObject([{ type: 'date' }])
  })
  it('Should nullable value check', () => {
    expect(numberRequiredValidator(null)).toMatchObject([{ type: 'required' }])
  })

  it('Should test number without message', () => {
    expect(types.date()(isRequired())('foo')).toMatchObject([{ type: 'date' }])
  })
})
