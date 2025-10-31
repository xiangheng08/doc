import { hexToRgb } from './hex-to-rgb'
import { rgbToHsl } from './rgb-to-hsl'

/**
 * HEX 转 HSL
 * @param hex - HEX 颜色值，支持 #RGB、#RRGGBB 格式
 * @returns HSL 颜色对象
 */
export function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex)
  return rgbToHsl(rgb)
}