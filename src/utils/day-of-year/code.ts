/**
 * 获取指定日期是所在年的第几天
 */
export function dayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24,
  )
}
