/**
 * 防抖
 * @param fn 要防抖的函数
 * @param delay 延迟时间（ms）
 */
export function debounce<T extends any[]>(
  fn: (...args: T) => any,
  delay?: number,
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any, ...args: T) {
    if (timer !== void 0) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
