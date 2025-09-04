# TransitionGroup

Vue 提供了内置的 [TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group.html) 组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

## 简介

`<TransitionGroup>` 是一个内置组件，与 `<Transition>` 组件类似，但专门用于对 `v-for` 列表中的元素或组件应用过渡效果。

## 与 `<Transition>` 的区别

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个容器元素。但你可以通过传入 `tag` prop 来指定一个元素作为容器元素来渲染。
- 过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。
- 列表中的每个元素都必须有一个独一无二的 `key` attribute。
- CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上。

## 基本使用

这是一个 `<TransitionGroup>` 对一个 `v-for` 列表添加进入/离开动画的示例：

```vue
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5]
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

## 移动动画

当某一项被插入或移除时，它周围的元素会立即发生"跳跃"而不是平稳地移动。我们可以通过添加一些额外的 CSS 规则来解决这个问题：

```vue
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
```

## 使用案例

### 基本列表过渡

```vue
<template>
  <div>
    <button @click="add">添加项目</button>
    <button @click="remove">删除项目</button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      nextNum: 6
    }
  },
  methods: {
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      if (this.items.length) {
        this.items.splice(this.randomIndex(), 1)
      }
    },
    randomIndex() {
      return Math.floor(Math.random() * (this.items.length + 1))
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s;
}
</style>
```

### 渐进延迟列表动画

通过在 JavaScript 钩子中读取元素的 data attribute，我们可以实现带渐进延迟的列表动画：

```vue
<template>
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>

<script>
import gsap from 'gsap'

export default {
  data() {
    return {
      items: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    }
  },
  methods: {
    onBeforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    onEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
  }
}
</script>
```

## 注意事项

1. 列表中的每个元素都必须有一个独一无二的 `key` attribute
2. 当在 DOM 内模板中使用时，组件名需要写为 `<transition-group>`
3. 过渡模式（mode）在 `<TransitionGroup>` 中不可用
4. 默认情况下，`<TransitionGroup>` 不会渲染包装器元素，需要使用 `tag` prop 指定