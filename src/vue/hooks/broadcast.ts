// broadcast.ts

import { provide, inject, onUnmounted } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * 广播处理函数
 */
type BroadcastHandler<T = unknown> = (data?: T) => void

/**
 * 广播器
 */
class Broadcaster {
  private readonly listeners = new Map<string, Set<BroadcastHandler>>()

  on(type: string, handler: BroadcastHandler<any>) {
    let handlers = this.listeners.get(type)
    if (!handlers) {
      handlers = new Set()
      this.listeners.set(type, handlers)
    }
    handlers.add(handler)
  }

  off(type: string, handler: BroadcastHandler<any>) {
    const handlers = this.listeners.get(type)
    if (!handlers) return
    handlers.delete(handler)
    if (handlers.size === 0) {
      this.listeners.delete(type)
    }
  }

  emit(type: string, data?: unknown) {
    const handlers = this.listeners.get(type)
    if (!handlers) return
    // 复制一份 handlers 避免在迭代过程中被修改
    Array.from(handlers).forEach((handler) => {
      try {
        handler(data)
      } catch (error) {
        console.error(`Error handling broadcast event "${type}":`, error)
      }
    })
  }
}

// 注入键
const BROADCAST_KEY: InjectionKey<Broadcaster> = Symbol('broadcast')

/**
 * 广播 Hook
 * 用于向所有子组件和后代组件广播事件
 * @returns 广播函数
 *
 * @example
 * const broadcast = useBroadcast();
 */
export const useBroadcast = () => {
  // 创建广播器实例
  const broadcaster = new Broadcaster()

  // 提供广播器给子组件
  provide(BROADCAST_KEY, broadcaster)

  // 返回广播函数
  return (type: string, data?: unknown) => {
    broadcaster.emit(type, data)
  }
}

/**
 * 接收广播 Hook
 * 用于监听父级或祖先组件广播的事件
 * @param type 要监听的事件类型
 * @param handler 事件处理函数
 *
 * @example
 * const broadcast = useReceiveBroadcast('event', (data) => {
 *  console.log(data)
 * })
 */
export const useReceiveBroadcast = <T = unknown>(
  type: string,
  handler: BroadcastHandler<T>,
) => {
  // 获取父级广播器
  const broadcaster = inject(BROADCAST_KEY, null)

  if (!broadcaster) {
    console.warn(`No broadcast provider found for event type "${type}"`)
    return
  }

  // 注册监听器
  broadcaster.on(type, handler)

  // 组件卸载时自动移除监听器
  onUnmounted(() => {
    broadcaster.off(type, handler)
  })
}
