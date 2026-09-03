/**
 * 判断当前是否在支付宝环境（包括支付宝内置浏览器和支付宝小程序 WebView）
 */
function isAlipayEnv() {
  return /alipayclient/i.test(navigator.userAgent)
}

/**
 * 判断当前是否在支付宝小程序的 WebView 环境中
 */
function isAlipayMiniProgram() {
  const ua = navigator.userAgent
  // 先确保在支付宝环境中
  if (!/alipayclient/i.test(ua)) return false
  // 支付宝小程序 WebView 的 UA 中通常包含 miniprogram 字段
  return /miniprogram/i.test(ua)
}
