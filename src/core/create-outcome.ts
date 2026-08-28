import type { Issue, Outcome } from './result'

export function createOutcome<T>(value: T, issues: Issue[] = []): Outcome<T> {
  return { value, issues }
}
