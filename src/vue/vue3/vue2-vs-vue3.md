# Vue 2 与 Vue 3 的区别

## 简介

Vue 3 是 Vue.js 的最新主要版本，于 2020 年 9 月发布。相比 Vue 2，Vue 3 带来了许多重大改进和新特性，包括性能提升、更好的 TypeScript 支持、新的 Composition API 等。本文将详细对比 Vue 2 和 Vue 3 在各个方面的主要区别。

## 主要区别

### 1. 响应式系统

#### Vue 2
Vue 2 使用 `Object.defineProperty` 来实现数据响应式。这种方式存在一些限制：
- 无法检测到对象属性的添加或删除
- 无法检测到数组索引的变化
- 需要通过 `Vue.set` 或 `vm.$set` 来添加响应式属性
- 需要通过 `Vue.delete` 或 `vm.$delete` 来删除响应式属性

#### Vue 3
Vue 3 使用 `Proxy` 来实现响应式系统，解决了 Vue 2 中的许多限制：
- 可以直接监听对象属性的添加和删除
- 可以监听数组索引的变化
- 不需要特殊的 API 来处理响应式属性
- 提供了更精确的变更检测

### 2. API 风格

#### Vue 2
Vue 2 主要使用 Options API，将组件的逻辑按照选项（如 data、methods、computed 等）进行组织：

```js
// Vue 2 Options API
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
    }
  }
}
```

#### Vue 3
Vue 3 引入了 Composition API，允许开发者按逻辑关注点组织代码：

```js
// Vue 3 Composition API
import { ref, computed, watch } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
```

或者使用 `<script setup>` 语法糖：

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)

const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})
</script>
```

### 3. 性能优化

#### Vue 2
- 包体积相对较大
- 虚拟 DOM 实现不够高效
- 组件初始化速度较慢

#### Vue 3
- 更小的包体积（通过 Tree-shaking 减少了约 41%）
- 更快的渲染速度（重写了虚拟 DOM 实现）
- 更高效的组件初始化（速度提高了约 100%）
- 更少的内存占用（减少了约 30%）

### 4. 多根节点支持

#### Vue 2
在 Vue 2 中，组件模板必须有一个根节点：

```vue
<!-- Vue 2 -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

#### Vue 3
Vue 3 支持 Fragment，允许组件有多个根节点：

```vue
<!-- Vue 3 -->
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

### 5. Teleport 组件

#### Vue 2
在 Vue 2 中，要将组件渲染到 DOM 的其他位置比较困难，通常需要手动操作 DOM。

#### Vue 3
Vue 3 引入了 Teleport 组件，可以将子组件渲染到 DOM 层次结构之外的指定位置：

```vue
<!-- Vue 3 -->
<template>
  <button @click="open = true">Open Modal</button>
  
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
```

### 6. Suspense 组件

#### Vue 2
Vue 2 中处理异步组件的加载状态比较复杂。

#### Vue 3
Vue 3 引入了 Suspense 组件，提供了一种优雅的方式来处理异步依赖的加载状态：

```vue
<!-- Vue 3 -->
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

### 7. 更好的 TypeScript 支持

#### Vue 2
Vue 2 对 TypeScript 的支持有限，类型推导不够完善。

#### Vue 3
Vue 3 在设计时就考虑了 TypeScript，提供了更好的类型推导和更完整的类型定义。使用 Composition API 编写的代码可以享受到完整的类型推导。

### 8. 生命周期钩子变化

#### Vue 2
- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

#### Vue 3
Vue 3 保留了大部分生命周期钩子，但有以下变化：

- beforeDestroy → beforeUnmount
- destroyed → unmounted

同时，Composition API 提供了对应的函数式生命周期钩子：

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('Component is mounted!')
    })
    
    onUpdated(() => {
      console.log('Component is updated!')
    })
    
    onUnmounted(() => {
      console.log('Component is unmounted!')
    })
  }
}
```

### 9. v-model 的变化

#### Vue 2
在 Vue 2 中，v-model 默认绑定到 value 属性并监听 input 事件。

#### Vue 3
Vue 3 中 v-model 的默认绑定属性变为了 modelValue，事件变为了 update:modelValue：

```vue
<!-- Vue 3 -->
<template>
  <my-input v-model="searchText" />
  <!-- 等价于 -->
  <my-input :model-value="searchText" @update:model-value="searchText = $event" />
</template>
```

### 10. 移除的 API

Vue 3 移除了一些在 Vue 2 中存在的 API：

- 移除了 `keyCode` 修饰符
- 移除了 `Vue.config.keyCodes`
- 移除了 `.sync` 修饰符（被 `v-model` 参数替代）
- 移除了 `filter` 过滤器
- 移除了内联模板功能
- 移除了 `$children` 实例属性

## 升级建议

1. **渐进式升级**：Vue 3 允许在同一个项目中同时使用 Vue 2 和 Vue 3 的组件，可以逐步迁移。
2. **使用迁移构建**：Vue 3 提供了迁移构建版本，兼容大部分 Vue 2 的 API。
3. **工具支持**：可以使用官方提供的迁移工具帮助自动化部分迁移工作。
4. **测试覆盖**：在迁移过程中确保有足够的测试覆盖，以验证功能的正确性。

## 相关链接

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue 2 官方文档](https://v2.cn.vuejs.org/)
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/zh/)
- [Vue 2 到 Vue 3 迁移构建](https://github.com/vuejs/vue-next/tree/master/packages/vue-compat)
