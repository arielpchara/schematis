import { required } from "./required";
import Rule from "./Rule";

describe('Test required rule', () => {
  test('Should required return an instance of Rule', () => {
    expect(required('Invalid')).toBeInstanceOf(Rule)
  })
})
