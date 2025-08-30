# 选项式 API

选项式 API (Options API) 是 Vue 2 中构建组件的主要方式。它通过一个包含多个选项的对象来组织组件的逻辑，这些选项包括 `data`、`methods`、`computed`、`watch`等。开发者将不同的逻辑代码分别放在不同的选项中，每个选项都有其特定的用途。

## 特点

### 1. 结构清晰
选项式 API 将组件的不同功能模块分割到不同的选项中，使得代码结构清晰，易于理解和上手。对于初学者来说，这种方式更容易掌握。

### 2. 逻辑分离
不同的功能按照类型划分：
- `data`: 用于定义响应式数据
- `props`: 用于定义属性
- `emits`: 用于定义自定义事件
- `methods`: 用于定义方法
- `computed`: 用于定义计算属性
- `watch`: 用于监听数据变化
- `directives`: 用于定义局部指令
- `filters`: 用于定义局部过滤器
- `components`: 用于定义局部组件
- `mixins`: 用于混入组件选项
- `extends`: 用于扩展组件
- `provide/inject`: 用于依赖注入
- 生命周期钩子用于在特定时机执行代码

### 3. 约定优于配置
选项式 API 遵循约定优于配置的原则，开发者只需要按照约定的结构组织代码，Vue 会自动处理大部分工作。

## 示例

以下是一个典型的 Vue 2 选项式 API 组件示例：

```js
export default {
  name: 'UserComponent',
  // 数据选项
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  },
  // 属性选项
  props: {
    title: String
  },
  // 计算属性选项
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  },
  // 方法选项
  methods: {
    greet() {
      console.log('Hello, ' + this.fullName)
    }
  },
  // 侦听器选项
  watch: {
    age(newAge, oldAge) {
      console.log('Age changed from ' + oldAge + ' to ' + newAge)
    }
  },
  // 生命周期钩子
  created() {
    console.log('Component created')
  },
  mounted() {
    this.greet()
  }
}
```

## 局限性

随着组件逻辑的增长，选项式 API 也暴露出一些问题：

1. **逻辑分散**：同一个功能的代码可能会分散在不同的选项中，增加了理解和维护的难度。
2. **代码复用困难**：使用 Mixins 进行逻辑复用时容易产生命名冲突和数据来源不清晰的问题。
3. **TypeScript 支持有限**：选项式 API 对 TypeScript 的支持相对较弱。

## 相关链接

- [Vue 2 官方文档 - API](https://v2.cn.vuejs.org/v2/api/)
