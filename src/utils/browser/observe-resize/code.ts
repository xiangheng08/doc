export type ResizeCallbackFn = (
  contentRect: DOMRectReadOnly,
  target: HTMLElement,
) => void

/**
 * ResizeObserver 实例
 */
let resizeObserverInstance: ResizeObserver | null = null

/**
 * 存储回调函数的 WeakMap
 */
const resizeCallbackMap = new WeakMap<HTMLElement, ResizeCallbackFn>()

/**
 * 观察元素大小的变化
 */
export function observeResize(
  element: HTMLElement,
  callback: ResizeCallbackFn,
) {
  if (!resizeObserverInstance) {
    resizeObserverInstance = new ResizeObserver((entries) => {
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
