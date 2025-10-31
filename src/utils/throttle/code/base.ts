/**
 * 节流
 *
 * @param fn 要节流的函数
 * @param delay 两次调用之间的最小时间间隔，以毫秒为单位
 * @param start 第一次是否执行
 * @returns 节流后的函数
 */
export function throttle<T extends any[]>(
  fn: (...args: T) => any,
  delay: number,
  start = true,
) {
  let last: number

  /**
   * @param {...any} args - 传递给节流函数的参数。
   */
  return function (...args: T) {
    let now = Date.now()
    if ((start && !last) || now - last > delay) {
      fn(...args)
      last = now
    }
  }
}
