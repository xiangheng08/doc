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
