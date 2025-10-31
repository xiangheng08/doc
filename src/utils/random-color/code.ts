/**
 * 随机 HEX 颜色
 */
export function randomHexColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  )
}

/**
 * 随机 RGB 颜色
 */
export function randomRGBColor(): string {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red}, ${green}, ${blue})`
}

/**
 * 随机 HSL 颜色
 * @param saturation 饱和度
 * @param lightness 亮度
 */
export function randomHSLColor(saturation?: number, lightness?: number): string {
  const hue = Math.floor(Math.random() * 360)
  if (saturation === void 0) {
    saturation = Math.floor(Math.random() * 101) // 0-100
  }
  if (lightness === void 0) {
    lightness = Math.floor(Math.random() * 101) // 0-100
  }
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
