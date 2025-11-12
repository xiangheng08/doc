# 高级特性

## 缓动函数 (Easing)

缓动函数控制动画过程中值的变化速率，为动画增添自然感和个性。

### 内置缓动类型

GSAP 提供了丰富的内置缓动函数：

```js
// 线性缓动
gsap.to(".element", { x: 100, ease: "none" });

// Power 缓动 (power1, power2, power3, power4)
gsap.to(".element", { x: 100, ease: "power2.out" });

// 弹性缓动
gsap.to(".element", { x: 100, ease: "elastic.out(1, 0.3)" });

// 弹跳缓动
gsap.to(".element", { x: 100, ease: "bounce.out" });

// 回弹缓动
gsap.to(".element", { x: 100, ease: "back.out(1.7)" });
```

### 自定义缓动函数

使用 CustomEase 插件创建自定义缓动曲线：

```js
// 注册自定义缓动
CustomEase.create("myEase", "M0,0 C0.2,0.5 0.5,1.5 1,1");

// 使用自定义缓动
gsap.to(".element", { x: 100, ease: "myEase" });
```

### 缓动可视化工具使用

GSAP 提供了在线的缓动可视化工具，可以帮助你选择和创建合适的缓动函数。

## 动画控制与事件

GSAP 提供了强大的动画控制能力和丰富的事件回调机制。

### 播放控制

```js
const tween = gsap.to(".element", { x: 100, duration: 1 });

// 控制动画播放
tween.play();   // 播放
tween.pause();  // 暂停
tween.resume(); // 继续
tween.reverse(); // 反向播放
```

### 进度控制

```js
const tween = gsap.to(".element", { x: 100, duration: 2 });

// 控制动画进度
tween.seek(1);        // 跳转到第 1 秒
tween.progress(0.5);  // 跳转到动画的 50% 进度
tween.time(0.75);     // 设置当前时间为 0.75 秒
```

### 速度控制

```js
const tween = gsap.to(".element", { x: 100, duration: 1 });

// 控制动画播放速度
tween.timeScale(2);   // 2 倍速播放
tween.timeScale(0.5); // 0.5 倍速播放（慢动作）
```

### 事件回调

```js
gsap.to(".element", {
  x: 100,
  duration: 1,
  onStart: () => console.log("动画开始"),
  onUpdate: () => console.log("动画更新中"),
  onComplete: () => console.log("动画完成"),
  onRepeat: () => console.log("动画重复"),
  onReverseComplete: () => console.log("反向动画完成")
});
```

### 动画状态检查

```js
const tween = gsap.to(".element", { x: 100, duration: 1 });

// 检查动画状态
console.log(tween.isActive());   // 是否处于活动状态
console.log(tween.isPaused());   // 是否暂停
console.log(tween.progress());   // 当前进度
console.log(tween.time());       // 当前时间
```

## 特殊属性与效果

GSAP 支持许多特殊属性和效果，可以创建丰富多样的动画。

### CSS 属性动画

```js
gsap.to(".element", {
  // Transform 属性
  x: 100,        // translateX
  y: 50,         // translateY
  rotation: 45,  // rotate
  scale: 1.5,    // scale
  skewX: 30,     // skew
  
  // 其他 CSS 属性
  opacity: 0.5,
  backgroundColor: "red",
  color: "white",
  width: "200px",
  height: "150px",
  
  // 滤镜效果
  filter: "blur(5px)",
  "--my-custom-property": 0.5 // CSS 变量
});
```

### SVG 动画支持

```js
// SVG 路径动画
gsap.to("path", {
  attr: { 
    d: "M10,10 C20,20 30,30 40,40" 
  }
});

// SVG 属性动画
gsap.to("circle", {
  attr: {
    cx: 100,
    cy: 100,
    r: 20,
    fill: "blue"
  }
});
```

### 3D 变换动画

```js
gsap.to(".element", {
  rotationX: 45,
  rotationY: 45,
  z: 100,
  transformPerspective: 800
});
```

### 滤镜效果动画

```js
gsap.to(".element", {
  duration: 1,
  filter: "blur(5px) brightness(1.5) contrast(1.2)"
});
```

### 属性插值与自定义属性

```js
// 自定义插值
gsap.to({}, {
  duration: 2,
  myValue: 100,
  onUpdate: function() {
    console.log("当前值:", this.targets()[0].myValue);
  }
});

// 颜色插值
gsap.to(".element", {
  '--color1': "red",
  '--color2': "blue",
  duration: 1
});
```
