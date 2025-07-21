/**
 * 将任意类型的错误对象转换为可读的错误信息字符串
 * @param {unknown} error - catch捕获的错误对象
 * @returns {string} 可读的错误信息
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error !== null) {
    // 处理包含message属性的对象
    if ('message' in error && typeof error.message === 'string') {
      return error.message
    }

    // 尝试JSON序列化
    try {
      return JSON.stringify(error)
    } catch (_) {
      return String(error)
    }
  }

  // 处理基础类型和undefined/null
  return String(error ?? 'Unknown error')
}
