# Core

Internals in `src/core`. Not a public export path. Schemas still return a **check** object.

## Check

Calling any schema with a value returns:

| Method | Role |
|---|---|
| `isValid()` | `true` when there are no issues |
| `assert()` | throw `Error` if invalid (`path: message` lines) |
| `getParsed()` | parsed value even when invalid |
| `getErrors()` | `{ path, message }[]` — dotted paths (`address.place`, `tags.0`) |

## Types

| Type | Role |
|---|---|
| `Schema<T>` | `(value: unknown) => Check<T>` |
| `Rule` | `(value: unknown) => Issue[]` |
| `Field<K, T>` | `{ key, schema }` from `map` |
| `Transform<A, B>` | `{ convert, schema }` from `transform` |
| `Issue` | `{ code, message, path[] }` internal |
| `PublicError` | `{ path: string, message }` |
| `Outcome<T>` | `{ value, issues }` internal |
| `Infer<S>` | output type of a schema |

## Pipeline (`defineType`)

1. `undefined` → skip the type guard; run rules only (`isRequired`).
2. Type guard fails → one type issue; stop.
3. Run rules; if any fail, return them (parsed value is still the input).
4. Run `transform`s in order.

## Functions

| Function | Role |
|---|---|
| `defineType(code, guard, message)` | factory for primitive types |
| `brandSchema(run)` | wrap `Outcome` → `Schema` / `Check` |
| `brandRule(fn)` | mark a function as a `Rule` |
| `createOutcome(value, issues?)` | `{ value, issues }` |
| `createCheck(outcome)` | public check object |
| `getOutcome(check)` | read internal `Outcome` |
| `runRules(rules, value)` | concat `Issue[]` |
| `prefixPath(issues, key)` | nest paths |
| `formatPath(path)` | `['a', 0]` → `'a.0'` |
| `toPublicError(issue)` | drop `code`, stringify path |
| `applyTransforms(value, transforms)` | convert + validate chain |
| `asSchema(rule)` | lift a rule to a schema |
| `isPlainObject(value)` | JSON object (not array / null / Date) |
| `isPresent(value)` | `value !== undefined` |
| `isSchema` / `isRule` / `isField` / `isTransform` | brands |
| `getShape(schema)` | object field keys (`strict`) |
| `toIndex(key)` | `'0'` → `0` for arrays |
