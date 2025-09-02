# Pinia 基本使用

## 定义 Store

### Option Store

```js [src/stores/counter.js]
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### Setup Store

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

在 Setup Store 中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

::: warning 注意
要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性。这意味着，你不能在 store 中使用私有属性。不完整返回会影响 SSR ，开发工具和其他插件的正常运行。
:::

## TypeScript

pinia 默认兼容 TypeScript 并不需要额外的配置。pinia 能够自动推断您的状态类型，但为了确保类型推断的准确性，建议启用 strict 模式，或者至少启用 noImplicitThis 选项。但是一些复杂类型就需要手动指定。

```ts
const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 这些属性都会自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,

      // 但是一些复杂类型就需要手动指定
      userList: [] as UserInfo[],
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

或者定义一个 store 接口，然后使用它来定义 store：

```ts
interface State {
  count: number
  name: string
  isAdmin: boolean
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## 使用 Store

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
    <button @click="handleClick">Increment2</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

const handleClick = () => {
  // 也可直接对其进行读写
  counter.count++
}
</script>
```

## 解构 Store

```js
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// 响应式数据想要解构使用，需要使用 storeToRefs 函数
const { name, doubleCount } = storeToRefs(store)

// action 可以直接解构使用
const { increment } = store
```

## 修改 State

### 1. 直接修改

```js
const counter = useCounterStore()
counter.count++
```

### 2. 使用 $patch 批量修改

```js
counter.$patch({
  count: counter.count + 1,
  name: 'John'
})

// 或者使用函数形式
counter.$patch((state) => {
  state.count++
  state.name = 'John'
})
```

### 3. 使用 Actions 修改（推荐）

```js
// 在 store 中定义 action
defineStore('counter', {
  // ...
  actions: {
    increment() {
      this.count++
    },
    
    async fetchData() {
      const data = await api.getData()
      this.$patch({ data })
    }
  }
})

// 在组件中调用
counter.increment()
```

或者是 Setup Store 的 `function`

```js
defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { increment, /* ... */ }
})

// 在组件中调用
counter.increment()
```


## 重置 state

```js
const store = useStore()

// 在 $reset() 内部，会调用 state() 函数来创建一个新的状态对象，并用它替换当前状态。
store.$reset()
```

如果是 Setup Stores，则需要创建自己的 $reset() 方法：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```
