---
description: Open a GitHub pull request using schematis git rules
agent: build
---

Load the `commit-pr` skill, then open a pull request.

$ARGUMENTS

Follow the skill. Commit first only if the user asked and there are uncommitted changes. Return the PR URL.
