// broadcast.ts

import { provide, inject, onUnmounted, getCurrentInstance } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * 广播处理函数
 */
export type BroadcastHandler<T = unknown> = (data: T) => void

/**
 * 广播函数
 */
export type Broadcast = (type: string, data?: unknown) => void

/**
 * 接收广播函数
 */
export type BroadcastReceive = <T = unknown>(
  type: string,
  handler: BroadcastHandler<T>,
  options?: BroadcastReceiveOptions,
) => () => void

/**
 * 接收广播函数配置项
 */
export interface BroadcastReceiveOptions {
  /**
   * 是否只接收一次
   * @default false
   */
  once?: boolean

  /**
   * 是否排除自身
   * @default false
   */
  excludeSelf?: boolean
}

interface ListenerMaterial {
  handler: BroadcastHandler<any>
  once?: boolean
  excludeSelf?: boolean
  uid?: number | undefined
}

/**
 * 广播器
 */
class Broadcaster {
  private readonly listeners = new Map<string, ListenerMaterial[]>()

  on(
    type: string,
    handler: BroadcastHandler<any>,
    once: boolean,
    excludeSelf: boolean,
    uid: number | undefined,
  ) {
    let materials = this.listeners.get(type)
    let repeated = false

    if (materials) {
      repeated = materials.some((item) => item.handler === handler)
    } else {
      materials = []
      this.listeners.set(type, materials)
    }

    // 忽略重复的监听器
    if (!repeated) {
      materials.push({ handler, once, excludeSelf, uid })
    }

    return () => this.off(type, handler)
  }

  off(type: string, handler: BroadcastHandler<any>) {
    const materials = this.listeners.get(type)
    if (!materials) return

    const index = materials.findIndex((item) => item.handler === handler)
    if (index !== -1) {
      materials.splice(index, 1)
    }

    if (materials.length === 0) {
      this.listeners.delete(type)
    }
  }

  emit(type: string, data: unknown, uid?: number) {
    const materials = this.listeners.get(type)
    if (!materials) return

    // 复制一份 materials 避免在迭代过程中被修改
    Array.from(materials).forEach((material) => {
      try {
        if (
          material.excludeSelf &&
          uid !== void 0 &&
          material.uid !== void 0 &&
          material.uid === uid
        ) {
          // 忽略来自当前组件实例的广播
          return
        }
        material.handler(data)
      } catch (error) {
        console.error(`Error handling broadcast event "${type}":`, error)
      }
      if (material.once) {
        this.off(type, material.handler)
      }
    })
  }
}

// 注入键
const BROADCAST_KEY: InjectionKey<Broadcaster> = Symbol('broadcast')

/**
 * 广播 Hook
 * 用于向所有子组件和后代组件广播事件
 * @returns 广播函数和接收广播函数
 *
 * @example
 * const { broadcast, receive } = useBroadcast();
 */
export const useBroadcast = (): {
  broadcast: Broadcast
  receive: BroadcastReceive
} => {
  const uid = getCurrentInstance()?.uid

  // 创建广播器实例
  const broadcaster = new Broadcaster()

  // 提供广播器给子组件
  provide(BROADCAST_KEY, broadcaster)

  const offs: Array<() => void> = []

  onUnmounted(() => {
    // 组件卸载时移除所有监听器
    offs.forEach((fn) => fn())
  })

  const broadcast: Broadcast = (type, data) => {
    return broadcaster.emit(type, data, uid)
  }

  const receive: BroadcastReceive = (type, handler, options) => {
    const { once = false, excludeSelf = false } = options || {}
    if (excludeSelf && uid === void 0) {
      console.warn('Failed to obtain uid, excludeSelf option is invalid')
    }
    offs.push(() => broadcaster.off(type, handler))
    return broadcaster.on(type, handler, once, excludeSelf, uid)
  }

  return { broadcast, receive }
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
export const useReceiveBroadcast: BroadcastReceive = (
  type,
  handler,
  options,
) => {
  const { once = false, excludeSelf = false } = options || {}

  const uid = getCurrentInstance()?.uid

  if (excludeSelf && uid === void 0) {
    console.warn('Failed to obtain uid, excludeSelf option is invalid')
  }

  // 获取父级广播器
  const broadcaster = inject(BROADCAST_KEY, null)

  if (!broadcaster) {
    console.warn(`No broadcast provider found for event type "${type}"`)
    return () => {}
  }

  // 组件卸载时自动移除监听器
  onUnmounted(() => {
    broadcaster.off(type, handler)
  })

  // 注册监听器
  return broadcaster.on(type, handler, once, excludeSelf, uid)
}

/**
 * 子组件广播 Hook
 * 用于在子组件中发送广播事件给父组件或兄弟组件
 * @returns 广播函数，可用于发送事件
 *
 * @example
 * const broadcast = useChildBroadcast();
 * broadcast('event', { message: 'hello' });
 */
export const useChildBroadcast = (): Broadcast => {
  const uid = getCurrentInstance()?.uid

  if (uid === void 0) {
    console.warn('Failed to obtain uid, excludeSelf option is invalid')
  }

  const broadcast = inject(BROADCAST_KEY)

  if (!broadcast) {
    console.warn(`No broadcast provider found`)
  }

  const childBroadcast = (type: string, data?: unknown) => {
    if (!broadcast) return
    broadcast.emit(type, data, uid)
  }

  return childBroadcast
}
