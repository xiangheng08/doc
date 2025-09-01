# Pinia 高级用法

## Store 互相调用

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async checkout() {
      const user = useUserStore()
      if (!user.isLoggedIn) {
        this.$router.push('/login')
        return
      }
      // 执行结账逻辑
    }
  }
})
```

## 插件开发

```js [pinia-plugin.js]
export function myPiniaPlugin(context) {
  // context 包含 store, options, pinia 等
  return {
    // 插件返回的对象将被混入到 store 中
  }
}

// main.js
import { createPinia } from 'pinia'
import { myPiniaPlugin } from './pinia-plugin'

const pinia = createPinia()
pinia.use(myPiniaPlugin)
```

## 持久化存储

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
    name: 'John'
  }),
  persist: {
    key: 'my-store',
    storage: localStorage,
    paths: ['count'] // 只持久化 count
  }
})
```

## TypeScript 支持

```ts
import { defineStore } from 'pinia'

interface State {
  count: number
  name: string
}

export const useStore = defineStore('main', {
  state: (): State => ({
    count: 0,
    name: 'John'
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

## 订阅状态变化

```js
const counterStore = useCounterStore()

// 订阅 store 的变化
const unsubscribe = counterStore.$subscribe((mutation, state) => {
  console.log(mutation)
  console.log(state)
})

// 订阅 actions
const unsubscribeAction = counterStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  console.log(name, args)
  after((result) => {
    console.log(result)
  })
})
```
