import { isRequired, minLength, maxLength, IError } from './index'
import types, { key } from './index'

function getErrorOnList(
  errorType: string,
  list?: IError[] | null
): IError | undefined {
  if (list) {
    return list.find(err => err.type === errorType)
  }
}

describe('Test Schematic', () => {
  const checkString = types.string('must be string')
  const checkRequiredString = checkString(isRequired())

  const checkObject = types.object('must be an object')(
    key('name')(types.string()(isRequired())),
    key('local')(types.string()(isRequired()))
  )

  it('Should object is valid', () => {
    const checked = checkObject({ name: 'Ariel Pchara', local: 'place' })
    expect(checked).toBeNull()
  })

  it('Should string is invalid object', () => {
    const checked = checkObject('foo')
    if (checked !== null) {
      const objectError: any = checked.find(error => error.type === 'object')
      expect(objectError.error).toEqual('must be an object')
    }
  })

  it('Should string is invalid object', () => {
    const list = checkObject({ name: 'Foo' })
    expect(getErrorOnList('key', list)).toMatchObject({
      ref: 'local',
      type: 'key'
    })
  })

  it('should valid required string name', () => {
    expect(checkRequiredString('Ariel Pchara')).toBeNull()
  })

  it('should invalid string type', () => {
    const list = types.string()()(123)
    expect(getErrorOnList('string', list)).toMatchObject({
      type: 'string'
    })
  })

  it('should valid without validations', () => {
    expect(checkString()('Foo')).toBeNull()
  })

  it('should invalid required string name', () => {
    const list = types.string()(isRequired())(undefined)
    expect(getErrorOnList('required', list)).toMatchObject({
      type: 'required'
    })
  })

  it('Should string must minimum 10 characters', () => {
    const list = types.string()(minLength(10, 'Min length must be 10'))('foo')
    expect(getErrorOnList('minLength', list)).toMatchObject({
      error: 'Min length must be 10',
      type: 'minLength'
    })
  })

  it('Should string must maximum 10 characters', () => {
    const list = types.string()(maxLength(2, 'Max length 2'))('foo')
    expect(getErrorOnList('maxLength', list)).toMatchObject({
      error: 'Max length 2',
      type: 'maxLength'
    })
  })

  it('Should string must minimum 10 characters', () => {
    const list = types.string()(minLength(10))('foo')
    expect(getErrorOnList('minLength', list)).toMatchObject({
      error: true,
      type: 'minLength'
    })
  })

  it('Should string must maximum 10 characters', () => {
    const list = types.string()(maxLength(2))('foo')
    expect(getErrorOnList('maxLength', list)).toMatchObject({
      error: true,
      type: 'maxLength'
    })
  })
})
