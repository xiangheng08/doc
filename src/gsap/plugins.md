# 插件

GSAP 插件扩展了核心功能，提供了更多专业化的动画能力。

## 核心插件

### ScrollTrigger：滚动触发动画

ScrollTrigger 是 GSAP 最受欢迎的插件之一，它可以基于滚动位置触发动画。

#### 基础配置与使用

```js
// 基础用法
gsap.to(".element", {
  scrollTrigger: ".trigger",
  x: 100,
  duration: 1
});

// 详细配置
gsap.to(".element", {
  x: 500,
  scrollTrigger: {
    trigger: ".element",
    start: "top center",    // 触发动画的起点
    end: "bottom center",   // 触发动画的终点
    scrub: true,            // 滚动联动
    pin: true,              // 固定元素
    markers: true           // 显示调试标记
  }
});
```

#### 触发点控制

```js
scrollTrigger: {
  trigger: ".element",
  start: "top bottom",     // 当元素顶部到达视口底部时开始
  end: "bottom top",       // 当元素底部到达视口顶部时结束
  // 其他选项...
}

// 使用函数定义触发点
start: () => `top ${window.innerHeight * 0.8}px`
```

#### 针法效果 (pinning)

```js
gsap.to(".element", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    pin: true,              // 固定元素
    pinSpacing: false,      // 是否保留占位空间
    start: "top top",
    end: "+=1000"           // 滚动 1000px 后结束
  }
});
```

#### 回调事件

```js
gsap.to(".element", {
  x: 100,
  scrollTrigger: {
    trigger: ".element",
    onEnter: () => console.log("进入触发区域"),
    onLeave: () => console.log("离开触发区域"),
    onEnterBack: () => console.log("反向进入触发区域"),
    onLeaveBack: () => console.log("反向离开触发区域")
  }
});
```

### Draggable：拖拽交互

Draggable 插件使得创建拖拽交互变得非常简单。

#### 基础拖拽配置

```js
// 基础水平拖拽
Draggable.create(".element", {
  type: "x"
});

// 限制拖拽范围
Draggable.create(".element", {
  type: "x,y",
  bounds: ".container"
});
```

#### 限制与边界

```js
// 限制在父元素内拖拽
Draggable.create(".element", {
  type: "x,y",
  bounds: "parent"
});

// 自定义边界
Draggable.create(".element", {
  type: "x,y",
  bounds: { 
    minX: 0, 
    maxX: 500, 
    minY: 0, 
    maxY: 300 
  }
});
```

#### 惯性效果

```js
// 启用惯性效果
Draggable.create(".element", {
  type: "x,y",
  inertia: true,          // 启用惯性
  throwProps: true        // 启用投掷属性
});
```

#### 拖拽事件

```js
Draggable.create(".element", {
  type: "x,y",
  onPress: () => console.log("按下"),
  onDragStart: () => console.log("开始拖拽"),
  onDrag: () => console.log("拖拽中"),
  onDragEnd: () => console.log("结束拖拽")
});
```

## 图形相关插件

### MorphSVGPlugin：SVG 路径变形

```js
// SVG 路径变形
gsap.to("#path1", {
  duration: 1,
  morphSVG: "#path2"
});
```

### DrawSVGPlugin：SVG 路径绘制动画

```js
// 绘制 SVG 路径
gsap.fromTo("#path", 
  { drawSVG: "0%" },
  { drawSVG: "100%", duration: 2 }
);
```

### MotionPathPlugin：路径运动

```js
// 沿路径运动
gsap.to(".element", {
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    autoRotate: true
  },
  duration: 3
});
```

### Flip：元素状态转换动画

```js
// 记录初始状态
let state = Flip.getState(".cards");

// 改变布局
document.querySelector(".container").classList.add("reordered");

// 动画过渡到新状态
Flip.from(state, {
  duration: 0.5,
  ease: "power1.inOut",
  absolute: true
});
```

## 实用插件

### Observer：事件监听

```js
// 监听各种事件
Observer.create({
  target: window,
  type: "wheel,touch,pointer",
  onUp: self => console.log("向上", self.deltaY),
  onDown: self => console.log("向下", self.deltaY)
});
```

### CustomEase：自定义缓动曲线

```js
// 创建自定义缓动
CustomEase.create("myCustomEase", "M0,0 C0.2,0.5 0.5,1.5 1,1");

// 使用自定义缓动
gsap.to(".element", {
  x: 100,
  ease: "myCustomEase"
});
```

### SplitText：文本拆分动画

```js
// 拆分文本
let split = new SplitText(".text", { type: "chars,words,lines" });

// 为字符添加动画
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  stagger: 0.05,
  duration: 0.5
});
```

### Physics2DPlugin：2D 物理效果

```js
// 物理效果动画
gsap.to(".ball", {
  physics2D: {
    velocity: 200,
    angle: 60,
    gravity: 400
  },
  duration: 3
});
```

### 插件注册与管理策略

```js
// 导入并注册插件
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// 注册插件
gsap.registerPlugin(ScrollTrigger, Draggable);

// 检查插件是否已注册
console.log(gsap.plugins.ScrollTrigger); // 应该返回插件对象
```
