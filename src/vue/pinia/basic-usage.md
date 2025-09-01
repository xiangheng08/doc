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


## 使用 Store

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
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
actions: {
  increment() {
    this.count++
  },
  
  async fetchData() {
    const data = await api.getData()
    this.$patch({ data })
  }
}

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
