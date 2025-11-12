# 核心 API

## Tween 基础

Tween 是 GSAP 中最基本的动画构建块，它定义了从一个状态到另一个状态的过渡。

### gsap.to() 详解：目标值动画

`gsap.to()` 是最常见的动画方法，它将元素从当前状态动画到指定的目标状态。

```js
// 基本用法
gsap.to(".element", {
  x: 100,
  duration: 1,
  ease: "power1.inOut"
});

// 多个属性同时动画
gsap.to(".box", {
  x: 100,
  y: 50,
  rotation: 180,
  scale: 1.5,
  duration: 2
});
```

### gsap.from() 详解：起始值动画

`gsap.from()` 从指定的起始状态开始，动画到元素的当前状态。

```js
// 从透明度为0开始淡入
gsap.from(".fade-in", {
  opacity: 0,
  duration: 1
});

// 从下方滑入
gsap.from(".slide-up", {
  y: 100,
  opacity: 0,
  duration: 0.8
});
```

### gsap.fromTo() 详解：起始值到目标值动画

`gsap.fromTo()` 允许精确控制动画的起始和结束状态。

```js
// 精确控制起始和结束状态
gsap.fromTo(".element", 
  { opacity: 0, scale: 0.5 },  // 起始状态
  { opacity: 1, scale: 1, duration: 1 } // 结束状态
);
```

### 基础参数

- **duration**：动画持续时间（秒）
- **delay**：动画开始前的延迟时间（秒）
- **ease**：缓动函数，控制动画的速度曲线
- **onComplete**：动画完成时的回调函数

```js
gsap.to(".element", {
  x: 100,
  duration: 1,
  delay: 0.5,
  ease: "elastic.out(1, 0.3)",
  onComplete: () => console.log("动画完成！")
});
```

## Timeline 时间轴

Timeline 允许创建和控制一组动画序列，实现复杂的动画编排。

### gsap.timeline() 创建与配置

```js
// 创建时间轴
const tl = gsap.timeline({
  duration: 1,
  repeat: -1, // 无限重复
  yoyo: true  // 往返动画
});

// 添加动画到时间轴
tl.to(".element1", { x: 100 })
  .to(".element2", { y: 100 })
  .to(".element3", { rotation: 360 });
```

### 序列化动画

```js
const tl = gsap.timeline();

// 顺序执行动画
tl.to(".step1", { opacity: 1, duration: 0.5 })
  .to(".step2", { opacity: 1, duration: 0.5 })
  .to(".step3", { opacity: 1, duration: 0.5 });

// 同时执行动画（通过时间为 0）
tl.to(".group1", { y: 100 })
  .to(".group2", { y: 100 }, 0); // 0 表示与上一个动画同时开始
```

### 时间轴控制

```js
const tl = gsap.timeline();

// 控制方法
tl.play();    // 播放
tl.pause();   // 暂停
tl.reverse(); // 反向播放
tl.restart(); // 重新开始
tl.seek(0.5); // 跳转到特定时间点
```

### 嵌套时间轴与层级管理

```js
const mainTl = gsap.timeline();
const subTl = gsap.timeline();

subTl.to(".sub1", { x: 100 })
     .to(".sub2", { y: 100 });

mainTl.to(".main", { opacity: 1 })
      .add(subTl, 1); // 在时间点 1 添加子时间轴
```

### 时间轴标签和位置控制

```js
const tl = gsap.timeline();

tl.addLabel("start")
  .to(".el1", { x: 100 })
  .addLabel("middle")
  .to(".el2", { y: 100 })
  .to(".el3", { rotation: 180 }, "middle"); // 与 middle 标签同时开始
```

## 核心动画参数详解

### duration：动画时长控制

```js
// 设置动画持续时间为 2 秒
gsap.to(".element", {
  x: 100,
  duration: 2
});
```

### delay：延迟执行

```js
// 延迟 1 秒后开始动画
gsap.to(".element", {
  x: 100,
  delay: 1
});
```

### ease：缓动函数基础

```js
gsap.to(".element", {
  x: 100,
  ease: "power2.out" // 使用 power2.out 缓动函数
});
```

### repeat：重复次数

```js
gsap.to(".element", {
  x: 100,
  repeat: 3, // 重复 3 次
  yoyo: true // 往返动画
});
```

### repeatDelay：重复间隔

```js
gsap.to(".element", {
  x: 100,
  repeat: 2,
  repeatDelay: 1 // 每次重复之间间隔 1 秒
});
```

### stagger：交错动画效果

```js
// 为多个元素创建交错动画效果
gsap.to(".box", {
  y: -100,
  stagger: 0.1 // 每个元素间隔 0.1 秒开始动画
});

// 更复杂的交错效果
gsap.to(".box", {
  y: -100,
  stagger: {
    each: 0.1,
    from: "center", // 从中心开始交错
    grid: "auto"
  }
});
```
