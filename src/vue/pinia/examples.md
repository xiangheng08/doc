# Pinia 使用案例

## 案例1：计数器

```js [src/stores/counter.js]
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }
})
```

```vue [Counter.vue]
<template>
  <div>
    <h2>计数器: {{ counter.count }}</h2>
    <p>双倍: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">+</button>
    <button @click="counter.decrement()">-</button>
    <button @click="counter.reset()">重置</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
```

## 案例2：用户信息管理

```js [src/stores/user.js]
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    isLoggedIn: false
  }),
  getters: {
    username: (state) => state.userInfo?.name || 'Guest'
  },
  actions: {
    login(userData) {
      this.userInfo = userData
      this.isLoggedIn = true
    },
    logout() {
      this.userInfo = null
      this.isLoggedIn = false
    }
  },
  persist: {
    storage: localStorage
  }
})
```

```vue [UserProfile.vue]
<template>
  <div>
    <div v-if="user.isLoggedIn">
      <p>欢迎, {{ user.username }}!</p>
      <button @click="user.logout">退出登录</button>
    </div>
    <div v-else>
      <p>请登录</p>
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const handleLogin = () => {
  // 模拟登录
  user.login({
    name: 'John Doe',
    email: 'john@example.com'
  })
}
</script>
```

## 案例3：购物车

```js [src/stores/cart.js]
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => 
      state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    }
  },
  persist: true
})
```

```vue [ShoppingCart.vue]
<template>
  <div>
    <h2>购物车 ({{ cart.totalItems }} 项)</h2>
    <div v-for="item in cart.items" :key="item.id">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }} x {{ item.quantity }}</span>
      <button @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
      <button @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
      <button @click="cart.removeItem(item.id)">删除</button>
    </div>
    <p>总计: ¥{{ cart.totalPrice }}</p>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>
```
