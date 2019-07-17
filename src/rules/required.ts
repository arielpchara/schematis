import Rule from "./Rule";

export function required(errorMessage: string = 'Invalid') {
  return new Rule(errorMessage)
}
