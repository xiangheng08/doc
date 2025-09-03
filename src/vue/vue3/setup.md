# setup()

## 基本使用

[setup()](https://cn.vuejs.org/api/composition-api-setup.html#basic-usage) 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

1. 需要在非单文件组件中使用组合式 API 时
2. 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时

```js
export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
```

## 访问 Props

setup 函数的第一个参数是组件的 props。和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

## Setup 上下文

传入 setup 函数的第二个参数是一个 Setup 上下文对象。上下文对象暴露了其他一些在 setup 中可能会用到的值：

```js
export default {
  setup(props, context) {
    // 透传 Attributes (非响应式的对象，等价于 $attrs)
    console.log(context.attrs)

    // 插槽(非响应式的对象，等价于 $slots)
    console.log(context.slots)

    // 触发事件(函数，等价于 $emit)
    console.log(context.emit)

    // 暴露公共属性(函数)
    console.log(context.expose)
  }
}
```

## 与渲染函数一起使用

setup 也可以返回一个渲染函数，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态：

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```
