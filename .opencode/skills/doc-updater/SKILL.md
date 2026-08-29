---
name: doc-updater
description: Use when adding, renaming, or changing a public type, rule, tool, or Check API. Updates docs/types.md, docs/rules.md, docs/tools.md, docs/core.md and matching HTML. Use ONLY when public API or docs change, not for internal-only refactors.
---

# Doc updater

Public API changes must land in the function catalog **and** the docs site. Re-exports and tests are covered by AGENTS.md; this skill is docs only.

## Domain → files

| Change in | Markdown catalog | HTML site |
|---|---|---|
| `src/types` | `docs/types.md` | `docs/types.html` |
| `src/rules` | `docs/rules.md` | `docs/rules.html` |
| `src/tool` | `docs/tools.md` | `docs/tools.html` |
| Check / pipeline / `src/core` | `docs/core.md` | `docs/core.html` |

Do not add new catalog pages. Touch `docs/README.md` only if a page is added or renamed. Touch `README.md` only if the landing function list needs a name.

## Markdown first

Match the page already there:

- Tables with the same columns (`Function` / `Accepts` / `Fails when` / `Role` / `Notes`)
- Short `**Example** (Title)` fenced `ts` blocks
- Call-out quotes for design notes
- Cheatsheet row if the page has a Cheatsheet

Keep rows one line. Show the call shape (`isEmail(message?)`, `hasMin(n, message?)`).

## Then HTML

Mirror the new row, example, or section in the matching `.html` article.

- Same table copy as markdown
- New `h2` → add it to the on-this-page TOC and the in-page sidebar group
- Do not restyle the shell (topbar, footer, `css/site.css`)

## Rename / remove

Update every catalog mention: section table, example, cheatsheet, and the HTML twin. Leave historical git log and unrelated examples alone.
