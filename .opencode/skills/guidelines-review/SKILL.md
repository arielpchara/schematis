---
name: guidelines-review
description: Use when reviewing code, a PR, a diff, or after implementing a type, rule, or tool. Checks against GUIDELINES.md. Use ONLY for review, not for implementing features.
---

# GUIDELINES review

Read `GUIDELINES.md` at the repo root. Review the current diff only. Do not edit files.

## Checklist

**Design**

- Schemas and rules are functions, not fluent objects
- Named exports only; no `export default`
- One function per file (type-only modules and barrels allowed)
- Domain dirs: `src/core`, `src/types`, `src/rules`, `src/tool`
- JSON first; required by default; `isOptional()` allows `undefined`
- Keys only via `map(key, schema | rule)`

**Naming** (camelCase)

- Predicate helper: `is` / `has` / `can` / `should` + noun
- Public type / rule builders: `is*` / `has*` returning `Schema` or `Rule`, not `boolean`
- Side effect: verb + noun
- Retrieval: `get` + noun
- Combinators: verb is enough (`map`, `transform`, `refine`)
- Specific names; paired antonyms (`hasMin` / `hasMax`)

**Types**

- `Schema<T>`: `(value: unknown) => Check<T>`
- `Rule`: `(value: unknown) => Issue[]` (empty = pass)
- Check methods: `isValid()`, `assert()`, `getParsed()`, `getErrors()`
- Public errors: `{ path: string, message: string }` with dotted paths
- `Issue.path` stays `Array<string | number>` internally

**Files**

- Colocated `*.test.ts`
- Re-export from `src/{types,rules,tool,index}.ts`
- Short JSDoc on every export
- Prettier: single quotes, no semicolons

**Do not**

- Fluent / chainable schema objects
- Default exports
- Options bags when a function argument will do
- Date, bigint, Map/Set, File, async refine, JSON Schema
- Comments that restate the code
- Runtime dependencies
- Renaming public Check methods

## Report

For each finding: `file:line`, severity (`block` / `nit`), GUIDELINES cite, one-line fix.

Lead with blockers. No drive-by refactors. If the diff is clean, say so in one sentence.
