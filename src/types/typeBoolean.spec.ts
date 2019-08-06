import types from '.'
import { isRequired } from '../validators'

describe('Type Boolean', () => {
  const typeBool = types.boolean()
  const checkBool = typeBool()
  const checkRequired = typeBool(isRequired())

  const errorMessage = 'Should be bool value'
  const typeBoolMessage = types.boolean(errorMessage)
  const checkBooleMessage = typeBoolMessage()

  it('Should value is boolean', () => {
    expect(checkBool(true)).toBeNull()
    expect(checkBool(false)).toBeNull()
    expect(checkBooleMessage(true)).toBeNull()
    expect(checkBooleMessage(false)).toBeNull()
  })

  it('Should value is not boolean', () => {
    expect(checkBool('true')).toMatchObject([{ type: 'boolean', error: true }])
    expect(checkBooleMessage('false')).toMatchObject([
      { type: 'boolean', error: errorMessage }
    ])
  })

  it('Should return error for undefined or null value', () => {
    expect(checkRequired()).toMatchObject([{ type: 'required', error: true }])
    expect(checkRequired(undefined)).toMatchObject([
      { type: 'required', error: true }
    ])
    expect(checkRequired(null)).toMatchObject([
      { type: 'required', error: true }
    ])
  })
})
