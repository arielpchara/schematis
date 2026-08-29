import type { FIELD, OUTCOME, RULE, SCHEMA, TRANSFORM } from './brand'

/** Nested path segments used internally (`['address', 0]`). */
export type Path = Array<string | number>

/** Internal validation issue with a code and array path. */
export type Issue = {
  code: string
  message: string
  path: Path
}

/** Public error from `getErrors()` — dotted path, no code. */
export type PublicError = {
  path: string
  message: string
}

/** Parsed value plus accumulated issues. */
export type Outcome<T> = {
  value: T
  issues: Issue[]
}

/** Result of running a schema: validity, parsed value, and errors. */
export type Check<T> = {
  isValid: () => boolean
  assert: () => void
  getParsed: () => T
  getErrors: () => PublicError[]
  readonly [OUTCOME]: Outcome<T>
}

/** Function that validates `unknown` and returns a {@link Check}. */
export type Schema<T> = ((value: unknown) => Check<T>) & {
  readonly [SCHEMA]: true
}

/** Small check that returns issues (empty = pass). */
export type Rule = ((value: unknown) => Issue[]) & {
  readonly [RULE]: true
}

/** Named field produced by `map`. */
export type Field<K extends string | number, T> = {
  readonly [FIELD]: true
  readonly key: K
  readonly schema: Schema<T>
}

/** Convert-then-validate step produced by `transform`. */
export type Transform<A, B> = {
  readonly [TRANSFORM]: true
  readonly convert: (value: A) => B
  readonly schema: Schema<unknown>
}

/** Output type of a {@link Schema}. */
export type Infer<S> = S extends Schema<infer T> ? T : never
