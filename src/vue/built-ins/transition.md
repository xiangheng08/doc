# Transition

Vue 提供了内置的 [Transition](https://cn.vuejs.org/guide/built-ins/transition.html) 组件，用于在元素或组件进入和离开 DOM 时添加动画效果。

## 简介

`<Transition>` 是一个内置组件，可以在以下场景中为元素或组件添加进入和离开动画：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

## 基本使用

最基本的使用方式如下：

```vue
<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style>
/* 下面会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

## CSS 过渡类名

在进入和离开的过渡中，有 6 个类名会切换：

![transition-classes](../images/transition-classes.png)

1. `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
2. `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。
3. `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加，在过渡或动画完成之后移除。
4. `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
5. `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。
6. `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加，在过渡或动画完成之后移除。

其中 `v-` 是默认前缀，当使用 `<Transition name="fade">` 时，会替换为 `fade-` 前缀。

### Vue2、Vue3 过渡类名变化

Vue2 过渡类名与 Vue3 过渡类名略有不同。

| Vue2      | Vue3           |
| --------- | -------------- |
| `v-enter` | `v-enter-from` |
| `v-leave` | `v-leave-from` |


## 命名过渡

可以通过 `name` 属性为过渡命名：

```vue
<template>
  <Transition name="fade">
    <p v-if="show">hello</p>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## CSS 动画示例

```vue
<template>
  <Transition name="bounce">
    <p v-if="show">Hello here is some bouncy text!</p>
  </Transition>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

## JavaScript 钩子函数

可以通过监听 `<Transition>` 组件事件的方式在过渡过程中挂上钩子函数：

```vue
<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <!-- ... -->
  </Transition>
</template>

<script setup>
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
const onBeforeEnter = (el) => {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
const onEnter = (el, done) => {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
const onAfterEnter = (el) => {}

// 当进入过渡在完成之前被取消时调用
const onEnterCancelled = (el) => {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
const onBeforeLeave = (el) => {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
const onLeave = (el, done) => {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
const onAfterLeave = (el) => {}

// 仅在 v-show 过渡中可用
const onLeaveCancelled = (el) => {}
</script>
```

## 出现时过渡

```html
<!-- 使用 appear 属性开启 -->
<Transition appear></Transition>
```

## 过渡模式

```html
<Transition mode="out-in"></Transition>
```

- `out-in`: 旧元素先离开，新元素才进入
- `in-out`: 新元素先进入，旧元素再离开
- `default`: 同时进入和离开

## Props

```ts
interface TransitionProps {
  /**
   * 用于自动生成过渡 CSS class 名。
   * 例如 `name: 'fade'` 将自动扩展为 `.fade-enter`、
   * `.fade-enter-active` 等。
   */
  name?: string
  /**
   * 是否应用 CSS 过渡 class。
   * 默认：true
   */
  css?: boolean
  /**
   * 指定要等待的过渡事件类型
   * 来确定过渡结束的时间。
   * 默认情况下会自动检测
   * 持续时间较长的类型。
   */
  type?: 'transition' | 'animation'
  /**
   * 显式指定过渡的持续时间。
   * 默认情况下是等待过渡效果的根元素的第一个 `transitionend`
   * 或`animationend`事件。
   */
  duration?: number | { enter: number; leave: number }
  /**
   * 控制离开/进入过渡的时序。
   * 默认情况下是同时的。
   */
  mode?: 'in-out' | 'out-in' | 'default'
  /**
   * 是否对初始渲染使用过渡。
   * 默认：false
   */
  appear?: boolean

  /**
   * 用于自定义过渡 class 的 prop。
   * 在模板中使用短横线命名，例如：enter-from-class="xxx"
   */
  enterFromClass?: string // Vue2 为 enterClass
  enterActiveClass?: string
  enterToClass?: string
  appearFromClass?: string
  appearActiveClass?: string
  appearToClass?: string
  leaveFromClass?: string // Vue2 为 leaveClass
  leaveActiveClass?: string
  leaveToClass?: string
}
```


## 使用案例

### 淡入淡出效果

```vue
<template>
  <button @click="show = !show">Toggle Fade</button>
  <Transition name="fade">
    <p v-if="show">淡入淡出文本</p>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### 滑动过渡效果

```vue
<template>
  <button @click="show = !show">Toggle Slide</button>
  <Transition name="slide">
    <div v-if="show">滑动过渡内容</div>
  </Transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
```

### 集成第三方动画库

```vue
<template>
  <!-- 假设你已经在页面中引入了 Animate.css -->
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </Transition>
</template>
```

## 性能建议

为了更好的性能，推荐使用以下 CSS 属性制作动画：

- `transform`
- `opacity`

这些属性制作动画非常高效，因为：

1. 它们在动画过程中不会影响到 DOM 结构，因此不会每一帧都触发昂贵的 CSS 布局重新计算。
2. 大多数现代浏览器都可以在执行 transform 动画时利用 GPU 进行硬件加速。

相比之下，像 `height` 或 `margin` 这样的属性会触发 CSS 布局变动，因此执行它们的动画效果更昂贵，需要谨慎使用。

## 相关链接

- [Transition](https://cn.vuejs.org/guide/built-ins/transition.html)
- [Transition | API](https://cn.vuejs.org/api/built-in-components.html#transition)
