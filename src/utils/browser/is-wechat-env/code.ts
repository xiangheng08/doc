/**
 * 判断当前是否在微信环境（包括微信内置浏览器和微信小程序 WebView）
 */
export function isWechatEnv() {
  return /micromessenger/i.test(navigator.userAgent)
}

/**
 * 判断当前是否在微信小程序的 WebView 环境中
 */
export function isWechatMiniProgram() {
  const ua = navigator.userAgent
  // 先确保在微信环境中
  if (!/micromessenger/i.test(ua)) {
    return false
  }
  // 优先使用微信 7.0.0+ 注入的环境变量（官方推荐）
  if (Reflect.get(window, '__wxjs_environment') === 'miniprogram') {
    return true
  }
  // 后备方案：检测 UA 中的 miniprogram 字段
  return /miniprogram/i.test(ua)
}
