---
name: version-bump
description: Use when bumping package.json, /bump, or /pr. Classify from origin/main diff. major breaking, minor features, patch fixes. Do not bump for OpenCode skills or when the published package did not change.
---

# Version bump

Semver for `package.json` and `package-lock.json`. Do not create git tags.

Bump **only** from the remote main diff. Adding or editing a skill does not bump.

## Diff

1. `git fetch origin main`
2. Inspect `git diff origin/main...HEAD` (committed) plus uncommitted work if it will be in the PR.
3. If `package.json` `version` already differs from `origin/main`, stop.

## When not to bump

- Diff is only `.opencode/`, `opencode.json`, or AGENTS OpenCode flows
- No change under `src/`, public exports, or the published package
- User did not ask to bump and `/bump` / `/pr` found nothing bump-worthy

## Levels (from that diff)

| Level | When |
|---|---|
| **major** | Breaking public API: remove/rename export, change Check methods, invert defaults, change error shape |
| **minor** | New public type, rule, or tool |
| **patch** | Bug fix in `src/` |

While `version` is `0.x`, map **major** → **minor** so breaking stays in beta (`0.7.0` → `0.8.0`, not `1.0.0`).

If `$ARGUMENTS` or the user names `major`, `minor`, or `patch`, use that instead.

## Steps

1. Read current `version` in `package.json`.
2. Classify from `origin/main`. If nothing bump-worthy, say so and stop.
3. `npm version <level> --no-git-tag-version`
4. Say old → new and why.

Do not commit unless the caller says to.
