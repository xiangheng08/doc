# Vuex 3.x 与 Vuex 4.x 对比

## 概述

Vuex 3.x 和 Vuex 4.x 分别是针对 Vue 2 和 Vue 3 的状态管理库。虽然它们在核心概念和使用方式上非常相似，但在一些细节和 API 上存在差异。

## 版本匹配

| Vue 版本 | Vuex 版本 |
|---------|----------|
| Vue 2.x | Vuex 3.x |
| Vue 3.x | Vuex 4.x |

## 主要差异

### 1. 安装方式

**Vuex 3.x (Vue 2):**
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // ...
})
```

**Vuex 4.x (Vue 3):**
```js
import { createStore } from 'vuex'

const store = createStore({
  // ...
})

// 在应用中使用
import { createApp } from 'vue'
createApp(App).use(store)
```

### 2. Store 创建方式

**Vuex 3.x:**
```js
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  // 或者使用函数形式
  // state: () => ({
  //   count: 0
  // })
})
```

**Vuex 4.x:**
```js
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0
    }
  }
})
```

### 3. 模块中 state 的定义

**Vuex 3.x:**
```js
const module = {
  // 可以使用对象形式
  state: {
    count: 0
  },
  // 或者函数形式
  // state: () => ({
  //   count: 0
  // })
}
```

**Vuex 4.x:**
```js
const module = {
  // 只能使用函数形式
  state() {
    return {
      count: 0
    }
  }
}
```

### 4. TypeScript 支持

Vuex 4.x 提供了更好的 TypeScript 支持，类型推导更加准确。

### 5. 打包和体积

Vuex 4.x 使用了更现代的打包方式，与 Vue 3 的整体架构更加一致，体积略有优化。

## 相似之处

### 核心概念保持一致

1. **State** - 状态存储
2. **Getters** - 计算属性
3. **Mutations** - 同步修改状态
4. **Actions** - 异步操作
5. **Modules** - 模块化

### API 使用方式基本相同

```js
// 3.x 和 4.x 中提交 mutation 的方式相同
this.$store.commit('increment')

// 分发 action 的方式相同
this.$store.dispatch('incrementAsync')

// 访问 state 和 getters 的方式相同
this.$store.state.count
this.$store.getters.doneTodos

// 辅助函数用法相同
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
```

### 模块化功能一致

两个版本都支持：
- 命名空间模块
- 模块嵌套
- 模块局部状态
- 命名空间辅助函数

## 迁移注意事项

从 Vuex 3.x 迁移到 4.x 时需要注意：

1. **创建 store 的方式改变**：
   - 使用 `createStore` 替代 `new Vuex.Store`
   - 确保 state 使用函数形式定义

2. **Vue 插件安装方式改变**：
   - 使用 `createApp().use(store)` 替代 `new Vue({ store })`

3. **模块中 state 定义方式**：
   - 模块中的 state 必须使用函数形式定义

## 使用建议

1. **Vue 2 项目**：继续使用 Vuex 3.x
2. **Vue 3 项目**：使用 Vuex 4.x
3. **新项目**：如果使用 Vue 3，推荐使用 Vuex 4.x
4. **大型项目**：考虑使用 Pinia（Vue 官方推荐的新一代状态管理库）

## 相关链接

- [Vuex 3 官方文档](https://v3.vuex.vuejs.org/zh/)
- [Vuex 4 官方文档](https://vuex.vuejs.org/zh/)
- [Vue 2 官方文档](https://v2.cn.vuejs.org/)
- [Vue 3 官方文档](https://v3.cn.vuejs.org/)
- [Pinia - Vue 官方推荐的状态管理库](https://pinia.vuejs.org/)