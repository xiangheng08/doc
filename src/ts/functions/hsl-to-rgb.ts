/**
 * HSL 转 RGB
 */
const hslToRgb = (hsl: { h: number; s: number; l: number }) => {
  const { h, s, l } = hsl

  // 归一化 HSL 值
  const H = h / 60 // 将 0~360 转换为 0~6
  const S = s / 100
  const L = l / 100

  // 计算中间值
  const C = (1 - Math.abs(2 * L - 1)) * S
  const X = C * (1 - Math.abs((H % 2) - 1))
  const m = L - C / 2

  // 根据 H 的区间确定 RGB 分量
  let r, g, b

  if (H >= 0 && H < 1) {
    r = C
    g = X
    b = 0
  } else if (H >= 1 && H < 2) {
    r = X
    g = C
    b = 0
  } else if (H >= 2 && H < 3) {
    r = 0
    g = C
    b = X
  } else if (H >= 3 && H < 4) {
    r = 0
    g = X
    b = C
  } else if (H >= 4 && H < 5) {
    r = X
    g = 0
    b = C
  } else if (H >= 5 && H < 6) {
    r = C
    g = 0
    b = X
  } else {
    // 处理 H = 360 的情况（即 H = 0）
    r = 0
    g = 0
    b = 0
  }

  // 应用偏移量 m，转换为 0~1 范围
  r += m
  g += m
  b += m

  // 转换为 0~255 的整数范围
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}
