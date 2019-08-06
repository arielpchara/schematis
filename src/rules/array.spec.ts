import { elementType } from './array'
import types from '../types'
import { max } from './number'

describe('Array Rules', () => {
  it('Should be an array without errors', () => {
    const items = [1, 2, 3, 4]
    const checkArrayTypes = elementType(types.number()())
    expect(checkArrayTypes(items)).toMatchObject([
      'elementType',
      false,
      undefined
    ])
  })

  it('Should be ok for empty values', () => {
    const items = undefined
    const checkArrayTypes = elementType(types.number()())
    expect(checkArrayTypes(items)).toMatchObject([
      'elementType',
      false,
      undefined
    ])
  })

  it('Should be an array without errors', () => {
    const items = ['foo']
    const checkArrayTypes = elementType(types.string()())
    expect(checkArrayTypes(items)).toMatchObject([
      'elementType',
      false,
      undefined
    ])
  })

  it('Should be an array with errors', () => {
    const items = [1, 2, 'asd', 4]
    const checkArrayTypes = elementType(types.number()())
    expect(checkArrayTypes(items)).toMatchObject([
      'elementType',
      [{ type: 'number', error: true }],
      'asd'
    ])
  })

  it('Should error element bigger then 50', () => {
    const items = [1, 2, 100, 4]
    const checkArrayTypes = elementType(types.number()(max(50)))
    expect(checkArrayTypes(items)).toMatchObject([
      'elementType',
      [{ type: 'max', error: true }],
      100
    ])
  })
})
