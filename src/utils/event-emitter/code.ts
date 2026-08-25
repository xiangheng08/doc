export type Off = () => void

interface EventListener<T extends unknown[] = unknown[]> {
  fn: (...args: T) => void
  once: boolean
  context: unknown
}

type Listeners<T extends { [K in keyof T]: unknown[] }> = {
  [K in keyof T]?: Array<EventListener<T[K]>>
}

const listenersSymbol = Symbol('listeners')

export class EventEmitter<T extends { [K in keyof T]: unknown[] } = {}> {
  // 事件监听器映射：事件名 -> 监听器数组
  // （使用 Symbol 私有化，同时避免属性冲突）
  private [listenersSymbol]: Listeners<T> = {}

  /**
   * 监听事件
   * @param event 事件名
   * @param listener 事件处理函数
   * @param context 执行上下文
   * @param once 是否只监听一次
   * @returns 取消监听函数
   */
  on<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => void,
    context?: unknown,
    once = false,
  ): Off {
    if (!this[listenersSymbol][event]) {
      this[listenersSymbol][event] = []
    }

    this[listenersSymbol][event].push({
      fn: listener,
      once,
      context: context ?? this, // 默认使用当前实例作为上下文
    })

    // 返回取消监听函数
    return () => this.off(event, listener)
  }

  /**
   * 监听一次事件
   * @param event 事件名
   * @param listener 事件处理函数
   * @param context 执行上下文
   * @returns 取消监听函数
   */
  once<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => void,
    context?: unknown,
  ): Off {
    return this.on(event, listener, context, true)
  }

  /**
   * 取消监听事件
   * @param event 事件名
   * @param listener 事件处理函数
   */
  off<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => void,
  ): void {
    if (!this[listenersSymbol][event]) return
    const index = this[listenersSymbol][event].findIndex(
      (el) => el.fn === listener,
    )
    if (index !== -1) {
      this[listenersSymbol][event].splice(index, 1)
      if (this[listenersSymbol][event].length === 0) {
        // 如果该事件没有任何监听器了，则删除该事件
        delete this[listenersSymbol][event]
      }
    }
  }

  /**
   * 触发事件
   * @param event 事件名
   * @param args 事件参数数组
   */
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const listeners = this[listenersSymbol][event]
    if (!listeners) return

    // 快照遍历，避免处理器内修改 listeners 导致的异常
    const snapshot = [...listeners]
    for (const listener of snapshot) {
      try {
        listener.fn.apply(listener.context, args)
      } catch (error) {
        console.error('Error in event handler:', error)
      }
    }

    // 移除只监听一次的监听器
    const toRemove = snapshot.filter((l) => l.once)
    if (toRemove.length > 0) {
      for (const listener of toRemove) {
        const index = listeners.indexOf(listener)
        if (index !== -1) listeners.splice(index, 1)
      }
      if (listeners.length === 0) {
        // 如果该事件没有任何监听器了，则删除该事件
        delete this[listenersSymbol][event]
      }
    }
  }

  /**
   * 清除所有事件监听
   */
  clear(): void {
    this[listenersSymbol] = {}
  }

  /**
   * 等待事件触发
   * @param event 事件名
   * @param predicate 事件触发条件函数
   * @param timeout 超时时间（毫秒）
   * @returns 事件触发时的参数数组
   */
  waitForEvent<K extends keyof T>(
    event: K,
    predicate: (...args: T[K]) => boolean = () => true,
    timeout?: number,
  ): Promise<T[K]> {
    return new Promise((resolve, reject) => {
      let timer: ReturnType<typeof setTimeout> | undefined

      // 监听指定事件
      const off = this.on(event, (...args: T[K]) => {
        try {
          if (predicate(...args)) {
            if (timer !== void 0) {
              clearTimeout(timer)
            }
            off()
            resolve(args) // 完成 Promise
          }
        } catch (error) {
          // predicate 抛出异常时，移除监听并拒绝 Promise
          if (timer !== void 0) {
            clearTimeout(timer)
          }
          off()
          reject(error)
        }
      })

      // 设置超时
      if (timeout !== void 0) {
        timer = setTimeout(() => {
          off() // 超时后移除监听
          reject(new Error(`Timeout waiting for event: ${String(event)}`))
        }, timeout)
      }
    })
  }
}
