/**
 * 格式化用时
 */
export function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`
  }

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const displaySeconds = seconds % 60
  const displayMinutes = minutes % 60
  const displayHours = hours

  let result = ''

  if (displayHours > 0) {
    result += `${displayHours}h `
  }
  if (displayMinutes > 0 || displayHours > 0) {
    result += `${displayMinutes}m `
  }
  if (displaySeconds > 0 || displayMinutes > 0 || displayHours > 0) {
    result += `${displaySeconds}s`
  }

  return result.trim()
}

// 返回值示例
// 545ms
// 45s
// 1m 5s
// 1h 2m 5s
