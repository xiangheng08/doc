import { hslToRgb } from './hsl-to-rgb'
import { rgbToHex } from './rgb-to-hex'

/**
 * HSL 转 HEX
 * @param hsl - HSL 颜色对象
 * @returns HEX 颜色值字符串，格式为 #RRGGBB
 */
export function hslToHex(hsl: { h: number; s: number; l: number }) {
  const rgb = hslToRgb(hsl)
  return rgbToHex(rgb)
}