type ThrottleOptions = {
  /**
   * 是否在节流开始时执行一次函数
   */
  leading?: boolean;
  /**
   * 是否在节流结束时执行一次函数
   */
  trailing?: boolean;
};

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 节流时间间隔
 * @param options 节流选项
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): (...args: Parameters<T>) => ReturnType<T> | void {
  let lastExecTime: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let storedArgs: Parameters<T> | undefined;
  let storedThis: any;

  // 处理默认选项并确保至少有一个触发选项
  let { leading = true, trailing = true } = options;
  if (!leading && !trailing) {
    trailing = true;
  }

  // 清理定时器并重置状态
  const clearTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  // 执行 trailing 调用
  const trailingExec = () => {
    lastExecTime = Date.now();
    clearTimer();
    if (trailing && storedArgs) {
      func.apply(storedThis, storedArgs);
      storedArgs = undefined;
      storedThis = undefined;
    }
  };

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
    const now = Date.now();

    // 计算剩余时间
    const remaining = lastExecTime === undefined
      ? 0
      : wait - (now - lastExecTime);

    // 保存当前调用的上下文和参数
    storedArgs = args;
    storedThis = this;

    if (remaining <= 0) {
      clearTimer();
      lastExecTime = now;
      if (leading) {
        return func.apply(storedThis, storedArgs);
      }
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(trailingExec, remaining);
    }

    // 非 leading 调用或无立即执行时返回 undefined
    return undefined;
  };
}
