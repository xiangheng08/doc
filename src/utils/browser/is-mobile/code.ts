const MobileRegex =
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i

/**
 * 检测当前设备是否为移动设备
 */
export function isMobile() {
  // 如果 UA 明确是移动设备，直接返回 true
  if (MobileRegex.test(navigator.userAgent)) return true

  const hasTouch =
    'maxTouchPoints' in navigator
      ? navigator.maxTouchPoints > 1
      : 'ontouchstart' in window

  // 如果 UA 不明确（如 iPadOS 隐藏 Mobile），但有高触点，也视为移动
  if (hasTouch && navigator.maxTouchPoints >= 5) return true

  return false
}
