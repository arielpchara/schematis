import type { Issue, Outcome } from './result'

/** Create an {@link Outcome} with a parsed value and issues. */
export function createOutcome<T>(value: T, issues: Issue[] = []): Outcome<T> {
  return { value, issues }
}
