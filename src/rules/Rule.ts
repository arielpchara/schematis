export default class Rule {
  constructor(
    private errorMessage: string = ''
  ) {}
  check(value: any) {
    return !value && this.errorMessage
  }
}
