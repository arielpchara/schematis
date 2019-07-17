import Rule from "./rules/Rule";

type Tuple = [string, string[]]

export class Contract {

  constructor(
    private rules: {[key: string]: Rule[]}
  ) {}

  fromEntries(entries: Array<Tuple>): {[key: string]: Array<string>} {
    return entries.reduce( (obj, entrie) => {
      return {
        ...obj,
        [entrie[0]]: entrie[1]
      }
    }, {})
  }

  check(payload: any) {
    const valid:Tuple[] = Object.keys(this.rules)
      .map(
        (criteria: string) => [criteria, ['asd']]
          // [criteria, this.rules[criteria].map( rule => 
          //     rule.check(payload[criteria]) 
          //   )]
        )
    console.log(this.fromEntries(valid))
  }
  
}
