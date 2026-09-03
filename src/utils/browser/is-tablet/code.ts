/**
 * 检测当前设备是否为平板设备
 */
export function isTablet(): boolean {
  return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch)))/i.test(
    navigator.userAgent,
  )
}
