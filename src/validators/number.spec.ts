import { min, max, pair, odd } from './number'

describe('Test numbers rules', () => {
  const min10Message = min(10, 'Min 10')
  const min10 = min(10)
  it('should min valid', () => {
    expect(min10(12)).toMatchObject(['min', false])
    expect(min10(undefined)).toMatchObject(['min', false])
    expect(min10(null)).toMatchObject(['min', false])
  })
  it('should min invalid', () => {
    expect(min10(1)).toMatchObject(['min', true])
    expect(min10Message(1)).toMatchObject(['min', 'Min 10'])
  })

  const max10Message = max(10, 'Max 10')
  const max10 = max(10)
  it('should max valid', () => {
    expect(max10(9)).toMatchObject(['max', false])
    expect(max10(undefined)).toMatchObject(['max', false])
    expect(max10(null)).toMatchObject(['max', false])
  })
  it('should min invalid', () => {
    expect(max10(12)).toMatchObject(['max', true])
    expect(max10Message(12)).toMatchObject(['max', 'Max 10'])
  })

  const isPairMessage = pair('Should be pair')
  const isPair = pair()
  it('should be an odd number', () => {
    expect(isPair(8)).toBeTruthy()
    expect(isPair(undefined)).toBeTruthy()
    expect(isPair(null)).toBeTruthy()
  })
  it('should be not an odd number', () => {
    expect(isPair(11)).toMatchObject(['pair', true])
    expect(isPairMessage(11)).toMatchObject(['pair', 'Should be pair'])
  })

  const isOddMessage = odd('Should be odd')
  const isOdd = odd()
  it('should be an odd number', () => {
    expect(isOdd(9)).toBeTruthy()
    expect(isOdd(undefined)).toBeTruthy()
    expect(isOdd(null)).toBeTruthy()
  })
  it('should be not an odd number', () => {
    expect(isOdd(12)).toMatchObject(['odd', true])
    expect(isOddMessage(12)).toMatchObject(['odd', 'Should be odd'])
  })
})
