import types, { key } from './index'
import { IError, isRequired, elementType, minLength } from '../validators'
import { max, min } from '../validators/number'

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
    const objectValidator = types.object()(key('email')(types.string()()))
    expect(objectValidator('foo')).toMatchObject([
      { type: 'object', error: true }
    ])
  })
  it('Should object invalid with message', () => {
    const objectValidator = types.object('custom')(
      key('email')(types.string()())
    )
    expect(objectValidator('foo')).toMatchObject([
      { type: 'object', error: 'custom' }
    ])
  })

  it('Should error with undefined object', () => {
    const objectValidator = types.object('custom')(
      isRequired(),
      key('email')(types.string()())
    )
    expect(objectValidator(undefined)).toMatchObject([
      { type: 'required', error: true }
    ])
    expect(objectValidator(null)).toMatchObject([
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

  it('Should error in complex object', () => {
    const addressScheme = types.object()(
      key('place')(types.string()()),
      key('number')(types.number()())
    )

    const userScheme = types.object()(
      key('name')(types.string()(isRequired(), minLength(2))),
      key('scores')(
        types.array()(elementType(types.number()(min(0), max(10))))
      ),
      key('createdAt')(types.date()(isRequired())),
      key('subscribe')(types.boolean()(isRequired())),
      key('parkingLot')(types.number()(min(100), max(999))),
      key('address')(addressScheme)
    )

    const newUser = {
      name: 'F Silva',
      createdAt: new Date('2019-01-01'),
      scores: [0, 9, 7.5, 10],
      subscribe: false,
      parkingLot: 110,
      address: {
        place: 'St Broadway',
        number: 1009
      }
    }

    expect(userScheme(newUser)).toBeNull()
  })
})
