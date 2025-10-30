export function debounce<T extends any[], R, THIS>(
  this: THIS,
  fn: (...args: T) => R,
  wait?: number,
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: THIS, ...args: T) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
