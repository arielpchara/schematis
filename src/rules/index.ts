import Rule from './Rule';

export * from './required';

export function rules(...rules: Rule[]): Rule[] {
  return rules;
}
