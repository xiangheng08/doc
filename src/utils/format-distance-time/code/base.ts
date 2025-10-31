/**
 * 格式化消息距离时间
 * @param timestamp 时间戳或时间字符串
 */
export function formatDistanceTime(timestamp: number | string) {
  const now = Date.now()
  const targetDate = new Date(timestamp)
  const timeDiff = now - targetDate.getTime()
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth() + 1
    const day = targetDate.getDate()
    return `${year}/${month}/${day}`
  }
}

// 测试用例
console.log(formatDistanceTime(Date.now())) // "刚刚"
console.log(formatDistanceTime(Date.now() - 30 * 1000)) // "刚刚" (30秒前)
console.log(formatDistanceTime(Date.now() - 5 * 60 * 1000)) // "5分钟前"
console.log(formatDistanceTime(Date.now() - 59 * 60 * 1000)) // "59分钟前"
console.log(formatDistanceTime(Date.now() - 2 * 60 * 60 * 1000)) // "2小时前"
console.log(formatDistanceTime(Date.now() - 23 * 60 * 60 * 1000)) // "23小时前"
console.log(formatDistanceTime(Date.now() - 24 * 60 * 60 * 1000)) // "昨天"
console.log(formatDistanceTime(Date.now() - 2 * 24 * 60 * 60 * 1000)) // "2天前"
console.log(formatDistanceTime(Date.now() - 6 * 24 * 60 * 60 * 1000)) // "6天前"
console.log(formatDistanceTime(Date.now() - 7 * 24 * 60 * 60 * 1000)) // "YYYY/M/D" (7天前，显示具体日期)
console.log(formatDistanceTime(Date.now() - 30 * 24 * 60 * 60 * 1000)) // "YYYY/M/D" (30天前，显示具体日期)
console.log(formatDistanceTime('2023-01-01T00:00:00')) // "YYYY/M/D" (具体日期字符串)
console.log(formatDistanceTime(1672531200000)) // "YYYY/M/D" (时间戳)
console.log(formatDistanceTime(new Date(2023, 0, 1).getTime())) // "YYYY/M/D" (指定日期)
