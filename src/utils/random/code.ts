/**
 * 获取一个随机数
 * @param min 最小值
 * @param max 最大值
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
