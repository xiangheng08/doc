import { ref } from 'vue'
import type { Ref } from 'vue'

export const useLock = <T extends any[]>(
  fn: (...args: T) => Promise<any>,
  shouldLock = true, // 是否需要加锁
): [running: Ref<boolean>, wrappedFn: (...args: T) => Promise<void>] => {
  const running = ref(false)

  const wrappedFn = async (...args: T) => {
    if (shouldLock && running.value) return
    running.value = true
    try {
      return await fn(...args)
    } finally {
      running.value = false
    }
  }

  return [running, wrappedFn]
}
