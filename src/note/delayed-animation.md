# 利用延迟实现复杂动画

在某些场景中需要将动画效果的进度使用 js 控制，如果是简单的动画，自是不难，但比较复杂的动画效果，使用 js 控制进度就比较麻烦了。比如下面的例子。

<script setup>
import DelayedAnimationExample from './delayed-animation-example.vue'
</script>

<delayed-animation-example />

```css
@keyframes move {
  0% {
    transform: translate(-100px, 0) rotate(0deg) scale(1);
  }
  50% {
    transform: translate(0px, -30px) rotate(180deg) scale(1.5);
  }
  100% {
    transform: translate(100px, 0) rotate(360deg) scale(1);
  }
}

.box {
  /* 加上 paused 使动画暂停 */
  animation: move linear forwards 1s paused;

  /* 
      这时候设置动画延迟为 -0.5s，是不是代表了动画已经进行了 0.5s，
      那使用 js 控制动画延迟，不就控制了动画进度嘛。
    */
  animation-delay: -0.5s;
}
```

如果有多个动画需要同时进度，可以将一个 css 变量，放在它们共同的父元素上，然后使用 js 控制这个 css 变量，这样就可以控制多个动画的进度了。

```css
.box {
  --delay: 0;
}
.box .animation1 {
  animation: move1 linear forwards 1s paused;
  animation-delay: var(--delay);
}
.box .animation2 {
  animation: move2 linear forwards 1s paused;
  animation-delay: var(--delay);
}
.box .animation3 {
  animation: move3 linear forwards 1s paused;
  animation-delay: var(--delay);
}
```

```js
// 使用 js 控制 --delay 的值
boxDom.style.setProperty('--delay', `-${input.value}s`)
```

上面 demo 的代码如下：

::: details
<<< ./delayed-animation-example.vue
:::

基于这个原理，可以将一些比较复杂的动画效果，通过 js 与滚动、加载进度等结合，实现一些比较炫酷的效果。
