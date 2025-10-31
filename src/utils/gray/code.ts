/**
 * 将 rgb 颜色灰度化（基于光感加权平均）
 */
export function gray(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
