# useLock

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useLock = <T extends any[]>(
  fn: (...args: T) => Promise<any>,
  shouldLock = true, // 是否需要加锁
): [locking: Ref<boolean>, wrappedFn: (...args: T) => Promise<void>] => {
  const locking = ref(false)

  const wrappedFn = async (...args: T) => {
    if (shouldLock && locking.value) return
    locking.value = true
    try {
      return await fn(...args)
    } finally {
      locking.value = false
    }
  }

  return [locking, wrappedFn]
}
```

实践：

```ts
const getData = async (id: number) => { /* .... */ }

const [loading, getDataFn] = useLock(getData)
```

