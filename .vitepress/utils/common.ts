export function debounce<T extends any[], R, THIS>(
	this: THIS,
  fn: (...args: T) => R,
  wait?: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: THIS, ...args: T) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
