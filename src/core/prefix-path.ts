import type { Issue, Path } from './result'

export function prefixPath(issues: Issue[], key: Path[number]): Issue[] {
  return issues.map(issue => ({
    ...issue,
    path: [key, ...issue.path]
  }))
}
