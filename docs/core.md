# Core

Internals in `src/core`. Not a public export path. Schemas still return a **check** object.

> **A check, not a result bag**
>
> Keep the public method names: `isValid`, `assert`, `getParsed`, `getErrors`.

## `isValid`

`true` when there are no issues.

**Example** (Pass and fail)

```ts
isString()('ok').isValid()
isNumber()('no').isValid()
```

## `assert`

Throw `Error` if invalid (`path: message` lines).

## `getParsed`

Parsed value even when invalid. Transforms only apply after type and rules pass.

## `getErrors`

`{ path, message }[]` — dotted paths (`address.place`, `tags.0`).

## Pipeline (`defineType`)

1. `undefined` → if `isOptional`, pass; else one required issue; stop.
2. Type guard fails → one type issue; stop.
3. Run rules; if any fail, return them (parsed value is still the input).
4. Run `transform`s in order.

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

## Cheatsheet

| API | Given | Result |
|---|---|---|
| `isValid` | check | `boolean` |
| `assert` | check | void or throw |
| `getParsed` | check | parsed value |
| `getErrors` | check | `{ path, message }[]` |

## Functions

| Function | Role |
|---|---|
| `defineType(code, guard, message)` | factory for primitive types |
| `brandSchema(run)` | wrap `Outcome` → `Schema` / `Check` |
| `brandRule(fn)` | mark a function as a `Rule` |
| `createOutcome(value, issues?)` | `{ value, issues }` |
| `createMissingOutcome(rules?)` | pass if `isOptional`, else required |
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
