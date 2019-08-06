import types from '.'
import { minLength, maxLength, elementType, max } from '../validators'

describe('Array Type', () => {
  const typeArray = types.array()
  const checkArray = typeArray()

  it('Should be an Array', () => {
    expect(checkArray(['a', 'b', 'c'])).toBeNull()
    expect(checkArray(new Array('a', 'b', 'c'))).toBeNull()
    expect(checkArray(new Array(10))).toBeNull()
  })

  it('Should be an invalid array', () => {
    const expectError = [{ type: 'array', error: true }]
    expect(checkArray({})).toMatchObject(expectError)
    expect(checkArray('["a", "b"]')).toMatchObject(expectError)
    expect(checkArray(true)).toMatchObject(expectError)
    expect(checkArray(100)).toMatchObject(expectError)
  })

  const arrayTypeErrorMessage = 'Should be a array'
  const checkArrayMessage = types.array(arrayTypeErrorMessage)()

  it('Should invalid array error return a custom message', () => {
    expect(checkArrayMessage({})).toMatchObject([
      { type: 'array', error: arrayTypeErrorMessage }
    ])
  })

  it('Should not error for undefined or null value', () => {
    expect(checkArray()).toBeNull()
    expect(checkArray(null)).toBeNull()
    expect(checkArray(undefined)).toBeNull()
  })

  const checkArrayMinLength = typeArray(minLength(2))
  it('Should valid array with minLength(2)', () => {
    expect(checkArrayMinLength([1, 2, 3])).toBeNull()
  })
  it('Should invalid array with minLength(2)', () => {
    expect(checkArrayMinLength([])).toMatchObject([
      { type: 'minLength', error: true }
    ])
  })

  const checkArrayMaxLength = typeArray(maxLength(3))
  it('Should valid array with maxLength(3)', () => {
    expect(checkArrayMaxLength([1, 2, 3])).toBeNull()
  })
  it('Should invalid array with maxLength(3)', () => {
    expect(checkArrayMaxLength([1, 2, 3, 4])).toMatchObject([
      { type: 'maxLength', error: true }
    ])
  })

  const checkArrayItemType = typeArray(elementType(types.string()()))
  it('Should array of string is valid', () => {
    expect(checkArrayItemType(['a'])).toBeNull()
  })

  const validateArrayOfNumberMax10 = typeArray(
    elementType(types.number()(max(10)))
  )
  it('Should array is invalid for number bigger then 10', () => {
    expect(validateArrayOfNumberMax10([10, -100, 11])).toMatchObject([
      {
        error: [
          {
            error: true,
            type: 'max'
          }
        ],
        type: 'elementType'
      }
    ])
  })
})
