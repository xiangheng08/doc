/**
 * 兼容 [`Promise.withResolvers`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)
 *
 * 如果当前环境支持原生 `Promise.withResolvers`，则直接使用；
 * 否则使用 polyfill 实现以确保兼容性。
 */
export function withResolvers<T = unknown>() {
  if (typeof Promise.withResolvers === 'function') {
    return Promise.withResolvers<T>()
  } else {
    // 兼容处理
    let resolve!: (value: T | PromiseLike<T>) => void
    let reject!: (reason?: any) => void
    const promise = new Promise<T>((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}
