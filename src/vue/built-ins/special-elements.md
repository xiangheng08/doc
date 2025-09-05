# 内置特殊元素

Vue 提供了一些内置的特殊元素，包括 [component](https://cn.vuejs.org/api/built-in-special-elements.html#component)、[slot](https://cn.vuejs.org/api/built-in-special-elements.html#slot) 和 [template](https://cn.vuejs.org/api/built-in-special-elements.html#template)。这些元素具有类似组件的特性，也是模板语法的一部分，但它们并非真正的组件，在模板编译期间会被编译掉。

## component

一个用于渲染动态组件或元素的"元组件"。

### Props

- [is](https://cn.vuejs.org/api/built-in-special-elements.html#component)：指定要渲染的实际组件，可以是 HTML 标签名、组件的注册名或组件的定义

### 使用方法

#### 按注册名渲染组件

```vue
<!-- 选项式 API -->
<script>
import Foo from './Foo.vue'
import Bar from './Bar.vue'

export default {
  components: { Foo, Bar },
  data() {
    return {
      view: 'Foo'
    }
  }
}
</script>

<template>
  <component :is="view" />
</template>
```

```vue
<!-- 组合式 API -->
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" />
</template>
```

#### 渲染 HTML 元素

```vue
<template>
  <component :is="href ? 'a' : 'span'"></component>
</template>
```

#### 使用内置组件

```vue
<script>
import { Transition, TransitionGroup } from 'vue'

export default {
  components: {
    Transition,
    TransitionGroup
  }
}
</script>

<template>
  <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
    ...
  </component>
</template>
```

### 使用案例

#### 动态组件切换

```vue
<template>
  <div>
    <button @click="currentComponent = 'Home'">首页</button>
    <button @click="currentComponent = 'About'">关于</button>
    <button @click="currentComponent = 'Contact'">联系</button>
    
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const currentComponent = ref('Home')
</script>
```

#### 根据条件渲染不同元素

```vue
<template>
  <component 
    :is="isLoggedIn ? 'button' : 'a'" 
    :href="isLoggedIn ? undefined : '/login'"
    @click="isLoggedIn ? logout() : undefined"
  >
    {{ isLoggedIn ? '退出登录' : '登录' }}
  </component>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)

const logout = () => {
  isLoggedIn.value = false
}
</script>
```

## slot

表示模板中的插槽内容出口。

### Props

- [name](https://cn.vuejs.org/api/built-in-special-elements.html#slot)：指定插槽名
- 任何传递给 `<slot>` 的 prop 都可以作为作用域插槽的参数传递

### 使用方法

#### 默认插槽

```vue
<!-- 父组件 -->
<template>
  <MyComponent>
    <p>这是默认插槽的内容</p>
  </MyComponent>
</template>

<!-- MyComponent.vue -->
<template>
  <div>
    <header>组件头部</header>
    <slot></slot>
    <footer>组件底部</footer>
  </div>
</template>
```

#### 具名插槽

```vue
<!-- 父组件 -->
<template>
  <MyComponent>
    <template #header>
      <h1>这是头部标题</h1>
    </template>
    
    <template #default>
      <p>这是默认内容</p>
    </template>
    
    <template #footer>
      <p>这是底部内容</p>
    </template>
  </MyComponent>
</template>

<!-- MyComponent.vue -->
<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

#### 作用域插槽

```vue
<!-- 父组件 -->
<template>
  <MyComponent>
    <template #default="{ user, index }">
      <p>{{ index }}: {{ user.name }}</p>
    </template>
  </MyComponent>
</template>

<!-- MyComponent.vue -->
<template>
  <div>
    <slot 
      v-for="(user, index) in users" 
      :user="user" 
      :index="index"
    ></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { name: '张三' },
  { name: '李四' },
  { name: '王五' }
])
</script>
```

## template

当我们想要使用内置指令而不在 DOM 中渲染元素时，`<template>` 标签可以作为占位符使用。

### 使用方法

`<template>` 元素的特殊处理只有在它与以下任一指令一起使用时才会被触发：

- [v-if、v-else-if 或 v-else](https://cn.vuejs.org/api/built-in-directives.html#v-if)
- [v-for](https://cn.vuejs.org/api/built-in-directives.html#v-for)
- [v-slot](https://cn.vuejs.org/api/built-in-directives.html#v-slot)

### 使用案例

#### 与 v-if 一起使用

```vue
<template>
  <template v-if="isLoggedIn">
    <p>欢迎，{{ username }}!</p>
    <button @click="logout">退出</button>
  </template>
  <template v-else>
    <p>请登录</p>
    <button @click="login">登录</button>
  </template>
</template>
```

#### 与 v-for 一起使用

```vue
<template>
  <template v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.content }}</p>
    <hr>
  </template>
</template>
```

#### 与 v-slot 一起使用

```vue
<template>
  <MyComponent>
    <template #default="{ data }">
      <template v-for="item in data" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </template>
    </template>
  </MyComponent>
</template>
```

### 注意事项

1. 单文件组件使用顶层的 `<template>` 标签来包裹整个模板，这种用法与作为指令占位符的 `<template>` 是不同的
2. 顶层的 `<template>` 标签不是模板本身的一部分，不支持指令等模板语法
3. 带有 `v-for` 的 `<template>` 也可以有一个 `key` 属性
4. 所有其他的属性和指令都将被丢弃，因为没有相应的元素，它们就没有意义