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
