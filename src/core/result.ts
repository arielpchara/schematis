import type { FIELD, OUTCOME, RULE, SCHEMA, TRANSFORM } from './brand'

export type Path = Array<string | number>

export type Issue = {
  code: string
  message: string
  path: Path
}

export type PublicError = {
  path: string
  message: string
}

export type Outcome<T> = {
  value: T
  issues: Issue[]
}

export type Check<T> = {
  isValid: () => boolean
  assertValid: () => void
  getParsed: () => T
  getErrors: () => PublicError[]
  readonly [OUTCOME]: Outcome<T>
}

export type Schema<T> = ((value: unknown) => Check<T>) & {
  readonly [SCHEMA]: true
}

export type Rule = ((value: unknown) => Issue[]) & {
  readonly [RULE]: true
}

export type Field<K extends string | number, T> = {
  readonly [FIELD]: true
  readonly key: K
  readonly schema: Schema<T>
}

export type Transform<A, B> = {
  readonly [TRANSFORM]: true
  readonly convert: (value: A) => B
  readonly schema: Schema<unknown>
}

export type Infer<S> = S extends Schema<infer T> ? T : never
