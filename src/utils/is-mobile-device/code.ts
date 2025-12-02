/**
 * 判断当前设备是否为移动设备
 */
export function isMobileDevice() {
  // 方法1：User-Agent（主判断）
  const ua = navigator.userAgent
  const isMobileUA =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
      ua,
    )

  // 方法2：maxTouchPoints（辅助）
  const hasTouch =
    'maxTouchPoints' in navigator
      ? navigator.maxTouchPoints > 1
      : 'ontouchstart' in window

  // 如果 UA 明确是移动设备，直接返回 true
  if (isMobileUA) return true

  // 如果 UA 不明确（如 iPadOS 隐藏 Mobile），但有高触点，也视为移动
  if (hasTouch && navigator.maxTouchPoints >= 5) return true

  return false
}
