# 性能优化

性能优化是创建流畅动画体验的关键，GSAP 提供了多种工具和策略来帮助优化动画性能。

## 性能监控工具

### GSAP 内置调试工具

```js
// 启用 GSAP 调试模式
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// 启用 ScrollTrigger 调试标记
gsap.registerPlugin(ScrollTrigger);

gsap.to(".element", {
  x: 100,
  scrollTrigger: {
    trigger: ".trigger",
    markers: true // 显示调试标记
  }
});
```

### 浏览器开发者工具分析

使用浏览器的性能分析工具：

1. **Performance 面板**：记录动画帧率和 CPU 使用情况
2. **Layers 面板**：检查合成层和内存使用
3. **Rendering 面板**：可视化 FPS 和重绘区域

### 性能指标监控方法

```js
// 监控动画性能
const start = performance.now();

gsap.to(".element", {
  x: 100,
  duration: 1,
  onComplete: () => {
    const end = performance.now();
    console.log(`动画耗时: ${end - start} 毫秒`);
  }
});
```

### 动画帧率检测

```js
// 检测帧率
let frameCount = 0;
let lastTime = performance.now();

function checkFPS() {
  frameCount++;
  const now = performance.now();
  
  if (now >= lastTime + 1000) {
    const fps = Math.round((frameCount * 1000) / (now - lastTime));
    console.log(`当前帧率: ${fps} FPS`);
    frameCount = 0;
    lastTime = now;
  }
  
  requestAnimationFrame(checkFPS);
}

checkFPS();
```

## 优化策略

### 硬件加速优化

```js
// 利用 transform 和 opacity 实现硬件加速
gsap.to(".element", {
  x: 100,        // transform 属性，硬件加速
  y: 50,         // transform 属性，硬件加速
  opacity: 0.5,  // opacity 属性，硬件加速
  // 避免使用会触发重排的属性，如 width, height, left, top 等
});

// 强制硬件加速
gsap.set(".element", {
  willChange: "transform"
});
```

### 动画帧优化

```js
// 使用 requestAnimationFrame 确保动画同步刷新
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}

// GSAP 内部已使用 requestAnimationFrame，
// 但可以在自定义动画中结合使用
```

### 内存管理与垃圾回收

```js
// 及时销毁不需要的动画
const tween = gsap.to(".element", { x: 100 });

// 动画完成后销毁
tween.then(() => {
  tween.kill(); // 释放内存
});

// 批量销毁
const tl = gsap.timeline();
// 添加多个动画...
// 使用完毕后销毁整个时间轴
tl.kill();
```

### 批量处理动画

```js
// 使用 stagger 批量处理相似动画
gsap.to(".item", {
  y: -20,
  stagger: 0.1, // 交错动画，避免同时执行过多动画
  duration: 0.5
});

// 使用 timeline 组织复杂动画序列
const master = gsap.timeline();

master.add(gsap.timeline() // 子时间轴 1
  .to(".element1", { x: 100 })
  .to(".element2", { y: 100 })
)
.add(gsap.timeline() // 子时间轴 2
  .to(".element3", { rotation: 180 })
  .to(".element4", { scale: 1.5 })
), 0); // 同时开始
```

### 移动端特定优化

```js
// 检测移动端并应用优化
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  // 减少动画复杂度
  gsap.to(".element", {
    x: 100,
    duration: 0.5, // 缩短动画时间
    ease: "none"   // 使用简单缓动
  });
} else {
  // 桌面端使用复杂动画
  gsap.to(".element", {
    x: 100,
    duration: 1,
    ease: "elastic.out(1, 0.3)"
  });
}

// 根据性能调整动画
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  // 执行动画
  gsap.to(".element", { x: 100 });
} else {
  // 跳过动画，直接应用最终状态
  gsap.set(".element", { x: 100 });
}
```

## 常见性能陷阱

### 过度使用复杂选择器

```js
// 避免复杂选择器
gsap.to(".container ul li.item[data-active='true'] .content", {
  x: 100
});

// 优化：使用类或直接引用元素
gsap.to(".active-item-content", {
  x: 100
});
```

### 内存泄漏预防

```js
// 避免重复创建动画
let currentTween = null;

function animateElement() {
  // 销毁之前的动画
  if (currentTween) {
    currentTween.kill();
  }
  
  // 创建新动画
  currentTween = gsap.to(".element", {
    x: 100,
    onComplete: () => {
      currentTween = null; // 清理引用
    }
  });
}
```

### 频繁重排重绘避免

```js
// 避免同时修改多个触发重排的属性
// 不推荐
gsap.to(".element", {
  width: "200px",   // 触发重排
  height: "100px",  // 触发重排
  left: "50px",     // 触发重排
  top: "50px"       // 触发重排
});

// 推荐：使用 transform 替代位置和尺寸变化
gsap.to(".element", {
  scaleX: 2,    // transform，触发合成
  scaleY: 1,    // transform，触发合成
  x: 50,        // transform，触发合成
  y: 50         // transform，触发合成
});
```

### 大型动画管理策略

```js
// 分段加载动画
class AnimationManager {
  constructor() {
    this.animations = new Map();
  }
  
  addAnimation(key, animation) {
    this.animations.set(key, animation);
  }
  
  playAnimation(key) {
    const anim = this.animations.get(key);
    if (anim) anim.play();
  }
  
  destroy() {
    for (let anim of this.animations.values()) {
      anim.kill();
    }
    this.animations.clear();
  }
}
```

### 降级方案设计

```js
// 检测浏览器支持情况
function canAnimate() {
  return (
    typeof gsap !== 'undefined' && 
    CSS.supports('transform', 'translateX(0)')
  );
}

// 根据支持情况提供降级方案
if (canAnimate()) {
  // 使用 GSAP 动画
  gsap.to(".element", { x: 100 });
} else {
  // 使用 CSS transition 作为降级方案
  document.querySelector(".element").style.transition = "transform 0.5s";
  document.querySelector(".element").style.transform = "translateX(100px)";
}
```
