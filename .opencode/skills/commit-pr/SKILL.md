---
name: commit-pr
description: Use when the user asks to commit, create a PR, open a pull request, write a commit message, or push. Enforces schematis git rules. Use ONLY for git commit and GitHub PR work.
---

# Commit and PR

Load this skill before any `git commit`, `git push`, or `gh pr create`.

## Never

- Commit unless the user explicitly asked
- Force-push
- Amend unless asked
- Skip hooks (`--no-verify`)
- Change git config
- Push unless asked
- Commit secrets, `.env`, or credentials
- Empty commits
- Conventional-commit prefixes (`feat:`, `fix:`)

## Commit

1. Inspect `git status`, `git diff`, and `git log --oneline -10`.
2. Stage only intended files. Never `git add -A` if unrelated changes exist.
3. Message: imperative sentence-case, matching this repo (`Add isEmail rule`, `Rename assertValid to assert`). No trailing period. No `Co-authored-by` unless asked.
4. Commit. Stop. Do not push.

## PR

1. Inspect status, diff vs `origin/main`, remote tracking, and commits on this branch.
2. Load `version-bump`. Fetch `origin/main` and classify that diff. Bump only if the published package changed. Skills and OpenCode config do not bump.
3. Commit the version bump only if `package.json` actually changed (`Bump version to <new>`).
4. `gh pr create` against `main`. Title from the branch's commits. Body: what/why, plus version if bumped.
5. Return the PR URL.
6. Do not merge, request reviewers, enable auto-merge, or tag unless asked.
