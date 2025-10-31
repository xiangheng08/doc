export type IntersectionCallbackFu = (
  entry: IntersectionObserverEntry,
) => void

export type ObserveFn = (
  el: Element,
  callback: IntersectionCallbackFu,
) => () => void

export class ObserveIntersection {
  /**
   * IntersectionObserver 实例
   */
  private observer: IntersectionObserver

  /**
   * 被观察的元素列表
   */
  private observedElements: Map<Element, IntersectionCallbackFu>

  constructor(options?: IntersectionObserverInit) {
    this.observedElements = new Map()
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
