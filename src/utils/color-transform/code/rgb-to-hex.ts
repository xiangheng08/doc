/**
 * RGB 转 HEX
 * @param rgb - RGB 颜色对象
 * @returns HEX 颜色值字符串，格式为 #RRGGBB
 */
export function rgbToHex(rgb: { r: number; g: number; b: number }) {
  const { r, g, b } = rgb

  // 确保值在 0-255 范围内
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)))

  // 转换为十六进制字符串并补零
  const toHex = (value: number) => {
    const hex = clamp(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}