/**
 * 判断给定日期是否为昨天
 */
export function isYesterday(date: Date) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(date, yesterday)
}

/**
 * 判断给定日期是否为今天
 */
export function isToday(date: Date) {
  const today = new Date()
  return isSameDay(date, today)
}

/**
 * 判断给定日期是否为明天
 */
export function isTomorrow(date: Date) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return isSameDay(date, tomorrow)
}

/**
 * 判断两个日期是否为同一天
 */
export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}
