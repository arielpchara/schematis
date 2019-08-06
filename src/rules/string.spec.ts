import { min, max, pair, odd } from './number'
import { regular } from './string'

describe('Test string rules', () => {
  const validRegularABC = regular(new RegExp('^ABC.+x$'))
  const validRegularNumbers = regular(/^\d+$/gi, 'only numbers')
  it('Should regular expression is valid', () => {
    expect(validRegularABC('ABC___x')).toMatchObject([
      'regularExpression',
      false
    ])
    expect(validRegularNumbers('08376496859364')).toMatchObject([
      'regularExpression',
      false
    ])
  })
  it('Should regular expression is invalid', () => {
    expect(validRegularABC('ABC___B')).toMatchObject([
      'regularExpression',
      true
    ])
    expect(validRegularNumbers('0837a6496859364')).toMatchObject([
      'regularExpression',
      'only numbers'
    ])
  })

  it('Shold be no errors for empty value', () => {
    expect(validRegularNumbers()).toMatchObject(['regularExpression', false])
  })
})
