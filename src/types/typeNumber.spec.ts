import types from '.'
import { isRequired } from '../rules'

describe('Test Number Type checker', () => {
  const numberType = types.number('Should be a number')
  const numberTypeChecker = numberType()
  it('Should valid value check', () => {
    expect(numberTypeChecker(1)).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberTypeChecker('foo')).toMatchObject([{ type: 'number' }])
  })
  it('Should nullable value check', () => {
    expect(numberTypeChecker()).toBeNull()
  })

  const numberRequiredChecker = numberType(isRequired())
  it('Should valid value check', () => {
    expect(numberRequiredChecker(1)).toBeNull()
  })
  it('Should invalid value check', () => {
    expect(numberRequiredChecker('foo')).toMatchObject([{ type: 'number' }])
  })
  it('Should nullable value check', () => {
    expect(numberRequiredChecker(null)).toMatchObject([{ type: 'required' }])
  })
})
