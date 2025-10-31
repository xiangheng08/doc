/**
 * 获取 tan 角度
 */
export function getTanDeg(deg: number) {
  const rad = (deg * Math.PI) / 180
  return Math.tan(rad)
}
