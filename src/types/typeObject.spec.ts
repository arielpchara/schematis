import types, { key } from './index'
import { IError, isRequired } from '../rules'

function getErrorOnList(
  errorType: string,
  list?: IError[] | null
): IError | undefined {
  if (list) {
    return list.find(err => err.type === errorType)
  }
}

describe('Test Schematic', () => {
  const typeObject = types.object()

  const objectKeys = [
    key('name')(types.string()(isRequired())),
    key('local')(types.string()(isRequired())),
    key('age')(types.number()(isRequired()))
  ]

  const checkObject = typeObject(...objectKeys)

  it('Should object is valid', () => {
    expect(
      checkObject({
        age: 35,
        local: 'place',
        name: 'Ariel Pchara'
      })
    ).toBeNull()
  })

  it('Should object invalid without message', () => {
    const objectChecker = types.object()(key('email')(types.string()()))
    expect(objectChecker('foo')).toMatchObject([
      { type: 'object', error: true }
    ])
  })
  it('Should object invalid with message', () => {
    const objectChecker = types.object('custom')(key('email')(types.string()()))
    expect(objectChecker('foo')).toMatchObject([
      { type: 'object', error: 'custom' }
    ])
  })

  it('Should error with undefined object', () => {
    const objectChecker = types.object('custom')(
      isRequired(),
      key('email')(types.string()())
    )
    expect(objectChecker(undefined)).toMatchObject([
      { type: 'required', error: true }
    ])
    expect(objectChecker(null)).toMatchObject([
      { type: 'required', error: true }
    ])
  })

  it('Should string is invalid object', () => {
    const list = checkObject({ name: 'Foo' })
    expect(getErrorOnList('key', list)).toMatchObject({
      ref: 'local',
      type: 'key'
    })
  })
})
