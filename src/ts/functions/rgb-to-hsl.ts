/**
 * RGB 转 HSL
 */
const rgbToHsl = (rgb: { r: number; g: number; b: number }) => {
  const { r, g, b } = rgb

  // 归一化
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  // 最大值、最小值、差值
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  // 亮度 L
  const l = (max + min) / 2

  // 饱和度 S
  let s = 0
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  // 色相 H
  let h = 0
  if (delta !== 0) {
    if (rNorm >= gNorm && rNorm >= bNorm) {
      h = ((gNorm - bNorm) / delta) % 6
    } else if (gNorm >= bNorm) {
      h = (bNorm - rNorm) / delta + 2
    } else {
      h = (rNorm - gNorm) / delta + 4
    }
    h *= 60
    if (h < 0) h += 360
  }

  // 返回整数格式
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}
