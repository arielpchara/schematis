# Guidelines

How to write code in this repo. Function catalogs live in [`docs/`](docs/README.md).

## Design

- Functional composition. Schemas and rules are functions, not fluent objects.
- Named exports only. No `export default`.
- One function per file. Type-only modules and re-export barrels are allowed.
- Directories by domain: `src/core`, `src/types`, `src/rules`, `src/tool`.
- JSON first. Optional by default; `isRequired()` fails only on `undefined`.
- Keys only via `map(key, schema | rule)`.

## Naming

camelCase.

| Kind | Pattern | Examples |
|---|---|---|
| Boolean / predicate helper | `is` / `has` / `can` / `should` + noun | `isPresent`, `isPlainObject` |
| Public type / rule builders | `is*` / `has*` (return `Schema` or `Rule`, not `boolean`) | `isString`, `hasMin` |
| Side effect | verb + noun | `runRules`, `defineType`, `assert` |
| Retrieval | `get` + noun | `getParsed`, `getErrors`, `getOutcome` |
| Combinators | verb is enough | `map`, `transform`, `refine` |

Be specific. No `doWork`, `processData`, `run`. Keep antonyms paired (`ok` / issues, `hasMin` / `hasMax`).

## Types

- `Schema<T>`: `(value: unknown) => Check<T>`
- `Rule`: `(value: unknown) => Issue[]` (empty = pass)
- `Check`: `isValid()`, `assert()`, `getParsed()`, `getErrors()`
- Public errors: `{ path: string, message: string }` with dotted paths (`address.place`, `tags.0`)
- Keep `Issue.path` as `Array<string | number>` internally

## Files

- Colocate tests as `*.test.ts` next to the function
- Re-export from `src/{types,rules,tool,index}.ts`
- Short JSDoc on every exported function
- Prettier: single quotes, no semicolons

## Do not

- Fluent / chainable schema objects (`schema.min(2).email()`)
- Default exports
- Options bags when a function argument will do
- Date, bigint, Map/Set, File, async refine, JSON Schema (out of scope)
- Comments that restate the code
