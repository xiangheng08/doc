/**
 * HEX 转 RGB
 * @param hex - HEX 颜色值，支持 #RGB、#RRGGBB 格式
 * @returns RGB 颜色对象
 */
export function hexToRgb(hex: string) {
  // 移除 # 前缀
  const normalizedHex = hex.replace('#', '')

  // 处理 #RGB 格式（简写）
  if (normalizedHex.length === 3) {
    const r = parseInt(normalizedHex[0] + normalizedHex[0], 16)
    const g = parseInt(normalizedHex[1] + normalizedHex[1], 16)
    const b = parseInt(normalizedHex[2] + normalizedHex[2], 16)
    return { r, g, b }
  }
  // 处理 #RRGGBB 格式
  else if (normalizedHex.length === 6) {
    const r = parseInt(normalizedHex.substring(0, 2), 16)
    const g = parseInt(normalizedHex.substring(2, 4), 16)
    const b = parseInt(normalizedHex.substring(4, 6), 16)
    return { r, g, b }
  }
  // 无效格式
  else {
    throw new Error(`Invalid HEX color format: ${hex}`)
  }
}