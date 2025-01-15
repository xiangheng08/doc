# EventEmitter

浏览器中可用的事件触发器

```ts
export type Off = () => void
type EventMap = Record<string, any[]> // 事件映射：事件名 -> 参数数组/元组
interface EventListener<T extends any[] = any[]> {
  fn: (...args: T) => void
  once: boolean
  context: any
}
type Listeners<T extends EventMap> = {
  [K in keyof T]?: Array<EventListener<T[K]>>
}

const listenersSymbol = Symbol('listeners')

export class EventEmitter<T extends EventMap = {}> {
  private [listenersSymbol]: Listeners<T> = {}

  // 监听事件
  on<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => void,
    context?: any,
    once = false,
  ): Off {
    if (!this[listenersSymbol][event]) {
      this[listenersSymbol][event] = []
    }
    this[listenersSymbol][event].push({
      fn: listener,
      once,
      context: context || this, // 默认使用当前实例作为上下文
    })

    // 返回取消监听函数
    return () => this.off(event, listener)
  }

  // 监听一次事件
  once<K extends keyof T>(event: K, listener: (...args: T[K]) => void, context?: any): Off {
    return this.on(event, listener, context, true)
  }

  // 取消监听
  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this[listenersSymbol][event]) return
    const index = this[listenersSymbol][event].findIndex((el) => el.fn === listener)
    if (index !== -1) {
      this[listenersSymbol][event].splice(index, 1)
      if (this[listenersSymbol][event].length === 0) {
        // 如果该事件没有任何监听器了，则删除该事件
        delete this[listenersSymbol][event]
      }
    }
  }

  // 触发事件
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    if (!this[listenersSymbol][event]) return
    const onceEventListeners: EventListener[] = []
    const eventListeners = [...this[listenersSymbol][event]] // 避免在事件处理函数中修改 listeners
    for (let i = 0; i < eventListeners.length; i++) {
      const { fn, once, context } = eventListeners[i]
      try {
        fn.apply(context, args)
      } catch (error) {
        console.error('Error in event handler:', error)
      }
      if (once) {
        onceEventListeners.push(eventListeners[i])
      }
    }
    // 移除只监听一次的监听器
    if (this[listenersSymbol][event]) {
      for (const listener of onceEventListeners) {
        this[listenersSymbol][event].splice(this[listenersSymbol][event].indexOf(listener), 1)
      }
    }
  }

  // 等待事件满足条件
  waitForEvent<K extends keyof T>(
    event: K,
    predicate: (...args: T[K]) => boolean,
    timeout?: number,
  ): Promise<T[K]> {
    return new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout | number | undefined

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
```
