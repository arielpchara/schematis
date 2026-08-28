import type { Issue, Path } from './result'

/** Prefix each issue path with an object key or array index. */
export function prefixPath(issues: Issue[], key: Path[number]): Issue[] {
  return issues.map(issue => ({
    ...issue,
    path: [key, ...issue.path]
  }))
}
