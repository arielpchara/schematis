# Agents

Instructions for coding agents working on schematis.

## What this is

Zero-dep functional JSON validator. Types and rules are functions. Bind keys with `map`. A schema call returns a check object, not `{ ok, value }`.

Read [`GUIDELINES.md`](GUIDELINES.md) and [`docs/`](docs/README.md) before changing API.

## Commands

```
npm test          # vitest
npm run typecheck
npm run lint
npm run build     # vite lib, ESM
```

Node LTS (`lts/*`, engines `>=24`). Package is ESM (`"type": "module"`).

## Layout

```
src/core/     pipeline, Check, brands
src/types/    isString, isObject, isUnion, …
src/rules/    isOptional, hasMin, isEmail, …
src/tool/     map, transform, refine, strict, coerce*
docs/         function reference (types, rules, tools, core)
```

Public entry: `schematis` plus subpaths `schematis/types`, `schematis/rules`, `schematis/tool`.

## How to add something

1. One new file, one exported function, kebab-case filename (`is-email.ts` → `isEmail`).
2. JSDoc on the export.
3. Colocated `*.test.ts` using the check API (`isValid`, `assert`, `getParsed`, `getErrors`).
4. Named re-export from the domain `index.ts` and `src/index.ts`.
5. Document in the matching `docs/*.md` page.
6. Run `typecheck`, `lint`, `test`.

**Type** (`src/types`): use `defineType` for primitives; `brandSchema` + `getOutcome` for composition.

**Rule** (`src/rules`): `brandRule`, skip wrong-typed values, skip `undefined`. `isOptional` is a marker the pipeline reads.

**Tool** (`src/tool`): wrap or bind schemas (`map`, `transform`, `nullable`, `strict`).

## Pipeline (`defineType`)

1. `undefined` → if `isOptional`, pass; else one required issue; stop.
2. Guard fails → one type issue; stop.
3. Run rules; keep parsed input even if they fail.
4. Apply `transform`s in order.

## Constraints

- No `export default`.
- No fluent builders.
- Do not commit unless asked. Do not force-push.
- Do not add runtime dependencies.
- Keep the public check method names: `isValid`, `assert`, `getParsed`, `getErrors`.

## OpenCode flows

- `/commit` — commit current work (never unless asked)
- `/pr` — bump semver if needed, then open a pull request
- `/bump` — bump `package.json` (major / minor / patch)
- `/docs` — sync function catalog after API changes
- `/review` — GUIDELINES review (read-only)
