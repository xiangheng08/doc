# Getter

## 访问其他 getter

```js
defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne() {
      // 通过 this 就可以访问到其他 getter
      return this.doubleCount + 1
    },
  },
})
```

## 访问其他 store 的 getter

```js
// 导入其他 store
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      // 直接用就好了
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```
