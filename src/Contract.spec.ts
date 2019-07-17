import { Contract } from "./Contract";
import { required, rules } from "./rules";

describe('Teste contract function', () => {

  test('Create new contract instance', () => {
    const requiredContract = new Contract({
      name: rules(
        required()
      )
    })
    expect( requiredContract ).toBeInstanceOf(Contract)
    console.log( requiredContract.check({}) )
  })

})
