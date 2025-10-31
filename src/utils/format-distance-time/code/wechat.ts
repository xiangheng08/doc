/**
 * 格式化消息距离时间（微信消息时间格式）
 * @param timestamp 时间戳或时间字符串
 */
export function formatDistanceTime(timestamp: number | string) {
  const now = new Date()
  const date = new Date(timestamp)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period =
    hours < 6
      ? '凌晨'
      : hours < 12
      ? '上午'
      : hours < 13
      ? '中午'
      : hours < 18
      ? '下午'
      : '晚上'
  const baseTime = `${period}${hours}:${minutes
    .toString()
    .padStart(2, '0')}`

  // 当天
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return baseTime
  }

  // 昨天
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return '昨天 ' + baseTime
  }

  // 本周内
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() >= now.getDate() - now.getDay() &&
    date.getDate() < now.getDate()
  ) {
    return (
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
        date.getDay()
      ] +
      ' ' +
      baseTime
    )
  }

  // 本年内
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${baseTime}`
  }

  // 不是本年
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${baseTime}`
}

// 测试用例
console.log(formatDistanceTime(Date.now())) // 当天时间，例如："上午10:30"
console.log(formatDistanceTime(Date.now() - 24 * 60 * 60 * 1000)) // 昨天，例如："昨天 上午10:30"
console.log(formatDistanceTime(Date.now() - 2 * 24 * 60 * 60 * 1000)) // 本周内（假设今天是周三），例如："周一 上午10:30"
console.log(formatDistanceTime(Date.now() - 8 * 24 * 60 * 60 * 1000)) // 本周外但在本年内，例如："9月20日 上午10:30"
console.log(formatDistanceTime(new Date(2023, 5, 15).getTime())) // 去年，例如："2023年6月15日 上午10:30"

// 凌晨时间测试
console.log(formatDistanceTime(new Date().setHours(3, 30))) // "凌晨3:30"

// 中午时间测试
console.log(formatDistanceTime(new Date().setHours(12, 15))) // "上午12:15"

// 下午时间测试
console.log(formatDistanceTime(new Date().setHours(15, 45))) // "下午15:45"

// 晚上时间测试
console.log(formatDistanceTime(new Date().setHours(20, 20))) // "晚上20:20"
