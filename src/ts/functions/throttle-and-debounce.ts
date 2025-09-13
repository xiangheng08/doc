/**
 * 节流和防抖函数，结合了 throttle（节流）和 debounce（防抖）的特性
 *
 * 该函数确保在指定的时间间隔内，第一次调用会立即执行（throttle 特性），
 * 在等待期间的后续调用会被防抖，只在最后一次调用后延迟执行（debounce 特性）
 *
 * @see {@link https://github.com/vuejs/vitepress/blob/v1.6.3/src/client/theme-default/support/utils.ts#L5-L17}
 *
 * 来自 VitePress 源码，并进行了一些修改
 */
export const throttleAndDebounce = <P extends any[]>(
  fn: (...args: P) => any,
  delay: number,
): (() => void) => {
  let timeoutId: string | number | NodeJS.Timeout
  let called = false

  return (...args: P): void => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn(...args)
      ;(called = true) && setTimeout(() => (called = false), delay)
    } else timeoutId = setTimeout(fn, delay)
  }
}
