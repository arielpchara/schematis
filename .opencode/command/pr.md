---
description: Open a GitHub pull request; bump semver only if origin/main diff warrants it
agent: build
---

Load the `commit-pr` skill and the `version-bump` skill, then open a pull request.

$ARGUMENTS

1. Follow `commit-pr`.
2. Follow `version-bump`: fetch `origin/main`, classify that diff. Bump only if `src/` or the public API changed. Do not bump for skills or OpenCode config.
3. Commit the version bump only if `package.json` actually changed (`Bump version to <new>`).
4. Open the PR. Return the URL.

Do not tag. Commit other files only if the user asked.
