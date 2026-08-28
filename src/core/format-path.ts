import type { Path } from './result'

/** Join a path to a dotted string (`['tags', 0]` → `'tags.0'`). */
export function formatPath(path: Path): string {
  return path.map(String).join('.')
}
