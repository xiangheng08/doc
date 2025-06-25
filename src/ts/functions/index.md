# 常用函数

## 观察元素大小的变化

```ts
/* observer-resize.ts */

export type ResizeCallbackFn = (
  contentRect: DOMRectReadOnly,
  target: HTMLElement,
) => void

let resizeObserverInstance: ResizeObserver | null = null
const resizeCallbackMap = new WeakMap<HTMLElement, ResizeCallbackFn>()

/**
 * 观察元素大小的变化
 */
export function observeResize(element: HTMLElement, callback: ResizeCallbackFn) {
  if (!resizeObserverInstance) {
    resizeObserverInstance = new ResizeObserver(entries => {
      for (const entry of entries) {
        const target = entry.target
        const callbackFn = resizeCallbackMap.get(target as HTMLElement)
        if (callbackFn) {
          callbackFn(entry.contentRect, target as HTMLElement)
        }
      }
    })
  }

  resizeObserverInstance.observe(element)
  resizeCallbackMap.set(element, callback)

  // 返回一个取消观察的函数
  return () => {
    resizeObserverInstance?.unobserve(element)
    resizeCallbackMap.delete(element)
  }
}

/**
 * 停止观察元素大小的变化
 */
export function unobserveResize(element: HTMLElement) {
  if (resizeObserverInstance) {
    resizeObserverInstance.unobserve(element)
    resizeCallbackMap.delete(element)
  }
}
```

## 观察元素可见性的变化

```ts
/* observer-intersection.ts */
export type IntersectionCallbackFu = (entry: IntersectionObserverEntry) => void

export type ObserveFn = (
  el: Element,
  callback: IntersectionCallbackFu
) => () => void

export class ObserverIntersection {
  private observer: IntersectionObserver
  private observedElements: Map<Element, IntersectionCallbackFu>

  constructor(options?: IntersectionObserverInit) {
    this.observedElements = new Map()
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const callback = this.observedElements.get(entry.target)
        if (callback) {
          callback(entry)
        }
      })
    }, options)
  }

  observe(el: Element, callback: IntersectionCallbackFu): () => void {
    if (this.observedElements.has(el)) {
      console.warn('Element is already being observed.')
      return () => this.unobserve(el)
    }

    this.observedElements.set(el, callback)
    this.observer.observe(el)

    return () => this.unobserve(el)
  }

  unobserve(el: Element): void {
    if (this.observedElements.has(el)) {
      this.observedElements.delete(el)
      this.observer.unobserve(el)
    } else {
      console.warn('Element is not being observed.')
    }
  }

  disconnectAll(): void {
    this.observer.disconnect()
    this.observedElements.clear()
  }
}
```

## 防抖

```ts
export function debounce<T extends any[], R, THIS>(
  this: THIS,
  fn: (...args: T) => R,
  wait?: number
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: THIS, ...args: T) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
```

## lodash 版节流

```ts
type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

function throttle<T extends (...args: any[]) => any>(
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
```

## hasOwnProperty

```ts
const rawHasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwnProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): boolean => rawHasOwnProperty.call(obj, key)

export const hasOwnProperties = <T extends object, K extends PropertyKey>(
  obj: T,
  keys: K[],
): boolean => keys.every(key => hasOwnProperty(obj, key))

export const hasOwnOrProperties = <T extends object, K extends PropertyKey>(
  obj: T,
  keys: K[],
): boolean => keys.some(key => hasOwnProperty(obj, key))
```

## 挑选属性 Pick

```ts
export const pickProperties = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const uniqueKeys = Array.from(new Set(keys))
  return uniqueKeys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key]
      }
      return acc
    },
    {} as Pick<T, K>,
  )
}
```

## 排除属性 Omit

```ts
export const omitProperties = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const uniqueKeys = Array.from(new Set(keys))
  return uniqueKeys.reduce(
    (acc, key) => {
      delete acc[key]
      return acc
    },
    Object.assign({}, obj),
  ) as Omit<T, K>
}
```

## 修改所有属性的值 Record

```ts
export const record = <T extends Record<string | number | symbol, any>, V>(
  obj: T,
  value: V,
): Record<keyof T, V> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key as keyof T] = value
      return acc
    },
    {} as Record<keyof T, V>,
  )
}
```

## 获取错误信息字符串

```ts
/**
 * 将任意类型的错误对象转换为可读的错误信息字符串
 * @param {unknown} error - catch捕获的错误对象
 * @returns {string} 可读的错误信息
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null) {
    // 处理包含message属性的对象
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    // 尝试JSON序列化
    try {
      return JSON.stringify(error);
    } catch (_) {
      return String(error);
    }
  }
  
  // 处理基础类型和undefined/null
  return String(error ?? 'Unknown error');
}
```

## 格式化金额

```ts
export interface FormatAmountOptions {
  /**
   * 货币符号
   */
  currency?: string;
  /**
   * 小数位数
   */
  decimal?: number;
  /**
   * NaN 的显示值
   */
  nanValue?: string;
  /**
   * 0 的显示值
   */
  zeroValue?: string;
  /**
   * 是否显示千分位
   */
  thousand?: boolean;
  /**
   * 是否四舍五入（默认false）
   */
  rounding?: boolean;
  /**
   * 是否优先使用真实小数位（默认true）
   */
  keepOriginalDecimal?: boolean;
}

/**
 * 格式化金额
 */
export const formatAmount = (
  amount: unknown,
  {
    currency = '',
    decimal = 2,
    nanValue = '--',
    zeroValue,
    thousand = true,
    rounding = false,
    keepOriginalDecimal = true,
  }: FormatAmountOptions = {}
): string => {
  // 类型转换和清理
  const numericValue = convertToNumber(amount);

  if (isNaN(numericValue)) return nanValue;
  if (numericValue === 0 && zeroValue !== undefined) return zeroValue;

  // 处理小数位
  const actualDecimal = calculateActualDecimal(numericValue, decimal, keepOriginalDecimal);
  let formatted = processDecimal(numericValue, actualDecimal, rounding);

  // 千分位处理
  if (thousand) {
    formatted = addThousandSeparator(formatted, actualDecimal);
  }

  return currency ? `${currency}${formatted}` : formatted;
};

// 辅助函数分解
const convertToNumber = (amount: unknown): number => {
  if (typeof amount === 'string') {
    // 处理科学计数法
    if (/e/i.test(amount)) return Number(Number(amount).toFixed(20));
    return Number(amount.replace(/,/g, ''));
  }
  return Number(amount);
};

const calculateActualDecimal = (num: number, decimal: number, keepOriginal: boolean): number => {
  if (!keepOriginal) return decimal;

  const str = num.toString();
  const decimalIndex = str.indexOf('.');
  const originalDecimals = decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;

  return originalDecimals > decimal ? originalDecimals : decimal;
};

const processDecimal = (num: number, decimal: number, rounding: boolean): string => {
  const factor = 10 ** decimal;
  const fixed = rounding ? Math.round(num * factor) / factor : Math.floor(num * factor) / factor;

  return fixed.toLocaleString('en-US', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
    useGrouping: false,
  });
};

const addThousandSeparator = (numStr: string, decimal: number): string => {
  const [integerPart, decimalPart] = numStr.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal > 0 ? `${formattedInteger}.${decimalPart || '0'.repeat(decimal)}` : formattedInteger;
};
```

## 格式化字节

[另一个](/nodejs/functions#格式化字节)

<<< ./format-bytes.ts

## 选择文件

[js 实现](/js/functions/#选择文件)

<<< ./select-file.ts
