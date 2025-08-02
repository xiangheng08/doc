/**
 * 用于防止重复处理同一错误的Symbol标记
 * 当错误被处理后，会在错误对象上设置此标记以避免重复处理
 */
const ERROR_PROCESSED = Symbol('errorProcessed')

/**
 * 安全地处理错误，避免重复处理同一错误实例
 *
 * 此函数确保每个错误只会被处理一次，防止在错误冒泡过程中
 * 多个捕获点对同一错误进行重复处理和提示
 *
 * @param error - 要处理的错误对象
 * @param handler - 实际处理错误的回调函数
 *
 * @example
 * ```typescript
 * try {
 *   // some code that might throw
 * } catch (error) {
 *   handleUniqueError(error, (err) => {
 *     // 显示错误提示给用户
 *     console.error('Error occurred:', err.message);
 *   });
 * }
 * ```
 */
const handleUniqueError = (
  error: unknown,
  handler: (error: Error) => void,
) => {
  if (error instanceof Error && !Reflect.get(error, ERROR_PROCESSED)) {
    Reflect.set(error, ERROR_PROCESSED, true)
    handler(error)
  }
}
