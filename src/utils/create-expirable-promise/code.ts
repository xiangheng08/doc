/**
 * 创建一个可过期的 Promise 包装器
 *
 * 该函数接收一个返回 Promise 的函数，并返回一个新的函数。
 * 新函数在被多次调用时，会使之前未完成的 Promise 过期，确保只处理最新的请求结果。
 *
 * @example
 * const expirableFetch = createExpirablePromise(fetchData);
 * const result1 = expirableFetch('/api/data1');
 * const result2 = expirableFetch('/api/data2');
 * // result1 的 expired 将会是 true，因为 result2 后调用
 * // 只有 result2 的 result 会被使用
 */
export function createExpirablePromise<P extends any[] = any[], R = any>(
  fn: (...args: P) => Promise<R>,
): () => Promise<{ result: R; expired: boolean }> {
  let setExpired: (() => void) | undefined

  return async (...args: P) => {
    if (setExpired) {
      // 设置上一个 Promise 已过期
      setExpired()
    }

    let expired = false
    setExpired = () => {
      expired = true
    }

    try {
      const result = await fn(...args)

      // 清理引用避免内存泄漏
      setExpired = void 0

      return {
        result,
        expired,
      }
    } catch (error) {
      // 发生错误时也清理引用
      setExpired = void 0
      throw error
    }
  }
}
