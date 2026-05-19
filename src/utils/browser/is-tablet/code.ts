const TabletRegex =
  /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch)))/i

/**
 * 检测当前设备是否为平板设备
 */
export function isTablet(): boolean {
  return TabletRegex.test(navigator.userAgent)
}
