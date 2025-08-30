# 在 Vue2 中使用 Vuex

## 什么是 Vuex？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

简单来说，Vuex 就像是一个全局的"数据仓库"，所有组件都可以访问和修改其中的数据。它解决了多个组件之间共享状态的问题，使得状态管理更加清晰和高效。

## 核心原理

Vuex 的工作流程遵循一个单向数据流的原则，其核心流程如下：

![Vuex 工作流程](../images/vuex-flow.png)

1. **Vue Components（Vue 组件）**：负责接收用户操作，执行 dispatch 方法触发对应 action 进行回应。
2. **Actions（操作）**：处理操作行为的模块，包含同步/异步操作，支持多个同名方法。向后台 API 请求和触发其他 action 都在这里进行。
3. **Mutations（变更）**：状态改变的操作方法，是 Vuex 修改 state 的唯一推荐方法。只能进行同步操作，方法名全局唯一。
4. **State（状态）**：页面状态管理容器对象，集中存储 Vue Components 中 data 对象的零散数据，以进行统一的状态管理。

整个流程可以概括为：组件 -> Actions（处理异步）-> Mutations（改状态）-> State（更新）-> 组件（重新渲染）

![vuex](../images/vuex.png)

## 在 Vue2 中使用 Vuex

在 Vue2 中使用 Vuex 时，需要注意版本匹配问题：

- Vue 2.x 需要使用 Vuex 3.x 版本
- Vue 3.x 需要使用 Vuex 4.x 版本

### 安装

```bash
npm install vuex@3 --save
# 或者
pnpm add vuex@3
yarn add vuex@3
```

### 基本使用方式

#### 1. 创建 Store

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

// 使用 Vuex 插件
Vue.use(Vuex)

// 创建 store 实例
const store = new Vuex.Store({
  // 状态
  state: {
    count: 0,
    todos: [
      { id: 1, text: '学习 Vue', done: true },
      { id: 2, text: '学习 Vuex', done: false }
    ]
  },
  
  // 计算属性
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  },
  
  // 同步修改状态的方法
  mutations: {
    increment(state) {
      state.count++
    },
    incrementBy(state, payload) {
      state.count += payload.amount
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    }
  },
  
  // 异步操作
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    // 带参数的 action
    incrementByAsync({ commit }, payload) {
      setTimeout(() => {
        commit('incrementBy', payload)
      }, 1000)
    }
  }
})

export default store
```

#### 2. 在 main.js 中引入 Store

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store, // 将 store 实例注入到根组件
  render: h => h(App),
}).$mount('#app')
```

#### 3. 在组件中使用

```vue
<template>
  <div>
    <h2>计数器: {{ count }}</h2>
    <p>已完成任务数: {{ doneTodosCount }}</p>
    
    <button @click="increment">增加</button>
    <button @click="incrementAsync">异步增加</button>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }} - {{ todo.done ? '完成' : '未完成' }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // 方式1: 直接访问
    count() {
      return this.$store.state.count
    },
    todos() {
      return this.$store.state.todos
    },
    
    // 方式2: 使用 mapState 辅助函数
    ...mapState(['count', 'todos']),
    
    // 方式3: 使用 mapGetters 访问 getters
    ...mapGetters(['doneTodosCount'])
  },
  
  methods: {
    // 方式1: 直接调用
    increment() {
      this.$store.commit('increment')
    },
    
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    },
    
    // 方式2: 使用 mapMutations 映射
    ...mapMutations(['increment']),
    
    // 方式3: 使用 mapActions 映射
    ...mapActions(['incrementAsync'])
  }
}
</script>
```

## 核心概念详解

### State

State 是 Vuex 中存储应用状态的地方，类似于组件中的 data。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  }
})
```

访问方式：
```js
// 在组件中
computed: {
  count() {
    return this.$store.state.count
  }
}
```

### Getters

Getters 类似于组件中的 computed 属性，用于从 state 中派生出一些状态。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

访问方式：
```js
// 在组件中
computed: {
  doneTodos() {
    return this.$store.getters.doneTodos
  }
}
```

### Mutations

Mutations 是修改 state 的唯一途径，且必须是同步函数。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    incrementBy(state, payload) {
      state.count += payload.amount
    }
  }
})
```

调用方式：
```js
// 在组件中
methods: {
  increment() {
    this.$store.commit('increment')
  },
  incrementBy() {
    this.$store.commit('incrementBy', {
      amount: 10
    })
  }
}
```

### Actions

Actions 类似于 mutations，但可以包含任意异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
```

调用方式：
```js
// 在组件中
methods: {
  incrementAsync() {
    this.$store.dispatch('incrementAsync')
  }
}
```

## 辅助函数

Vuex 提供了几个辅助函数来简化在组件中使用 store 的方式：

### mapState

将 store 中的 state 映射到组件的 computed 属性：

```js
import { mapState } from 'vuex'

export default {
  computed: {
    // 数组形式
    ...mapState(['count', 'todos']),
    
    // 对象形式
    ...mapState({
      countAlias: 'count',
      localCount(state) {
        return state.count + this.offset
      }
    })
  }
}
```

### mapGetters

将 store 中的 getters 映射到组件的 computed 属性：

```js
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
    ]),
    
    // 重命名
    ...mapGetters({
      doneCount: 'doneTodosCount'
    })
  }
}
```

### mapMutations

将 store 中的 mutations 映射到组件的 methods：

```js
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      // 映射 this.increment() 为 this.$store.commit('increment')
      'increment',
      // 映射 this.incrementBy(amount) 为 this.$store.commit('incrementBy', amount)
      'incrementBy'
    ]),
    
    // 重命名
    ...mapMutations({
      add: 'increment'
    })
  }
}
```

### mapActions

将 store 中的 actions 映射到组件的 methods：

```js
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      // 映射 this.incrementAsync() 为 this.$store.dispatch('incrementAsync')
      'incrementAsync'
    ]),
    
    // 重命名
    ...mapActions({
      addAsync: 'incrementAsync'
    })
  }
}
```

## Modules（模块化）

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（modules）。每个模块拥有自己的 state、mutation、action、getter，甚至是嵌套子模块——从上至下进行同样方式的分割：

::: code-group

```js [store/modules/user.js]
const userModule = {
  // 命名空间
  namespaced: true,
  
  state: () => ({
    profile: {
      name: '',
      email: ''
    },
    permissions: []
  }),
  
  getters: {
    fullName: (state) => {
      return state.profile.name + ' (用户)'
    }
  },
  
  mutations: {
    SET_USER_PROFILE(state, profile) {
      state.profile = profile
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions
    }
  },
  
  actions: {
    async fetchUserProfile({ commit }) {
      // 模拟 API 调用
      const profile = await fetch('/api/user/profile').then(res => res.json())
      commit('SET_USER_PROFILE', profile)
    },
    
    async fetchPermissions({ commit }) {
      const permissions = await fetch('/api/user/permissions')
        .then(res => res.json())
      commit('SET_PERMISSIONS', permissions)
    }
  }
}

export default userModule
```

```js [store/modules/products.js]
const productsModule = {
  namespaced: true,
  
  state: () => ({
    list: [],
    loading: false
  }),
  
  getters: {
    expensiveProducts: (state) => {
      return state.list.filter(product => product.price > 100)
    }
  },
  
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_PRODUCTS(state, products) {
      state.list = products
    }
  },
  
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const products = await fetch('/api/products').then(res => res.json())
        commit('SET_PRODUCTS', products)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}

export default productsModule
```

```js [store/index.js]
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import products from './modules/products'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '1.0.0'
  },
  modules: {
    user,
    products
  }
})

export default store
```

:::

## 使用案例：模块化应用

当使用模块化后，访问状态、getters、mutations 和 actions 的方式会发生一些变化，特别是使用了命名空间（namespaced: true）的情况下。

### 1. 访问其他模块的数据

```vue
<template>
  <div>
    <h2>用户信息: {{ userName }}</h2>
    <p>产品数量: {{ productCount }}</p>
    <p>昂贵产品数量: {{ expensiveProductCount }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    // 访问根状态
    version() {
      return this.$store.state.version
    },
    
    // 访问模块状态
    userName() {
      return this.$store.state.user.profile.name
    },
    
    productCount() {
      return this.$store.state.products.list.length
    },
    
    // 使用 mapState 访问模块状态
    ...mapState('user', {
      userProfile: 'profile'
    }),
    
    ...mapState('products', {
      productList: 'list'
    }),
    
    // 访问模块 getters
    expensiveProductCount() {
      return this.$store.getters['products/expensiveProducts'].length
    },
    
    // 使用 mapGetters 访问模块 getters
    ...mapGetters('user', ['fullName']),
    ...mapGetters('products', ['expensiveProducts'])
  },
  
  methods: {
    // 调用其他模块的 actions
    async loadData() {
      // 调用 user 模块的 action
      await this.$store.dispatch('user/fetchUserProfile')
      
      // 调用 products 模块的 action
      await this.$store.dispatch('products/fetchProducts')
    },
    
    // 调用其他模块的 mutations
    updateUserProfile(profile) {
      this.$store.commit('user/SET_USER_PROFILE', profile)
    },
    
    updateProducts(products) {
      this.$store.commit('products/SET_PRODUCTS', products)
    }
  },
  
  created() {
    this.loadData()
  }
}
</script>
```

### 2. 在命名空间模块中访问全局内容

```js
// store/modules/user.js
const userModule = {
  namespaced: true,
  
  state: () => ({
    profile: null
  }),
  
  getters: {
    // 在模块 getters 中访问根状态和其他模块的 getters
    userInfo: (state, getters, rootState, rootGetters) => {
      return {
        profile: state.profile,
        version: rootState.version, // 访问根状态
        // 访问其他模块的 getters
        expensiveProducts: rootGetters['products/expensiveProducts']
      }
    }
  },
  
  actions: {
    // 在模块 actions 中访问全局内容
    async updateProfile({ dispatch, commit, rootState }, profile) {
      // 访问根状态
      console.log('应用版本:', rootState.version)
      
      // 提交当前模块的 mutation
      commit('SET_USER_PROFILE', profile)
      
      // 调用其他模块的 action
      await dispatch('products/fetchProducts', null, { root: true })
      
      // 调用根级别的 action
      await dispatch('someGlobalAction', null, { root: true })
    }
  }
}
```

### 3. 使用辅助函数处理命名空间

当使用 mapState、mapGetters、mapActions 和 mapMutations 等辅助函数来绑定带命名空间的模块时，可以将模块的命名空间字符串作为第一个参数传递给这些辅助函数：

```vue
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    // 方式1: 传递命名空间作为第一个参数
    ...mapState('user', {
      userProfile: 'profile'
    }),
    
    ...mapState('products', {
      productList: 'list',
      productLoading: 'loading'
    }),
    
    ...mapGetters('user', [
      'fullName'
    ]),
    
    ...mapGetters('products', [
      'expensiveProducts'
    ])
  },
  
  methods: {
    // 方式1: 传递命名空间作为第一个参数
    ...mapActions('user', [
      'fetchUserProfile',
      'fetchPermissions'
    ]),
    
    ...mapActions('products', [
      'fetchProducts'
    ]),
    
    // 方式2: 使用 createNamespacedHelpers 创建基于命名空间的辅助函数
    ...mapMutations('user', {
      setUserProfile: 'SET_USER_PROFILE'
    }),
    
    ...mapMutations('products', {
      setProducts: 'SET_PRODUCTS',
      setLoading: 'SET_LOADING'
    })
  }
}
</script>
```

或者使用 `createNamespacedHelpers` 创建基于某个命名空间的辅助函数：

```vue
<script>
import { createNamespacedHelpers } from 'vuex'

// 为 user 模块创建辅助函数
const {
  mapState: mapUserState,
  mapActions: mapUserActions
} = createNamespacedHelpers('user')

// 为 products 模块创建辅助函数
const {
  mapState: mapProductsState,
  mapActions: mapProductsActions
} = createNamespacedHelpers('products')

export default {
  computed: {
    // 使用为 user 模块创建的辅助函数
    ...mapUserState({
      userProfile: 'profile'
    }),
    
    // 使用为 products 模块创建的辅助函数
    ...mapProductsState({
      productList: 'list',
      productLoading: 'loading'
    })
  },
  
  methods: {
    // 使用为 user 模块创建的辅助函数
    ...mapUserActions([
      'fetchUserProfile',
      'fetchPermissions'
    ]),
    
    // 使用为 products 模块创建的辅助函数
    ...mapProductsActions([
      'fetchProducts'
    ])
  }
}
</script>
```

## 项目结构

```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## 相关链接

- [Vuex 3 官方文档](https://v3.vuex.vuejs.org/zh/)
- [Vue 2 官方文档](https://v2.cn.vuejs.org/)
- [Vue Devtools 浏览器扩展](https://github.com/vuejs/vue-devtools)
- [项目结构](https://v3.vuex.vuejs.org/zh/guide/structure.html)
- [购物车示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)
