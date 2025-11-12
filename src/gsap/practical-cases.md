# 实战案例

通过实际案例学习如何运用 GSAP 创建各种动画效果。

## UI 交互动画

### 按钮悬停与点击效果

```js
// 悬停效果
gsap.to(".button", {
  scale: 1.05,
  duration: 0.3,
  ease: "power2.out",
  paused: true,
  overwrite: true
});

// 点击波纹效果
function createRipple(e) {
  const ripple = document.createElement("div");
  const button = e.currentTarget;
  
  gsap.set(ripple, {
    width: 0,
    height: 0,
    x: e.offsetX,
    y: e.offsetY,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.7)",
    absolute: true
  });
  
  button.appendChild(ripple);
  
  const tl = gsap.timeline({
    onComplete: () => ripple.remove()
  });
  
  tl.to(ripple, {
    width: 200,
    height: 200,
    x: "-=100",
    y: "-=100",
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  });
}

document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", createRipple);
});
```

### 表单验证反馈动画

```js
// 表单验证动画
function animateValidationError(field) {
  gsap.fromTo(field, 
    { x: 0 },
    { 
      x: 10, 
      duration: 0.1, 
      repeat: 3, 
      yoyo: true,
      ease: "sine.inOut",
      onComplete: () => {
        gsap.to(field, {
          borderColor: "#ff4444",
          duration: 0.3
        });
      }
    }
  );
}

function animateValidationSuccess(field) {
  gsap.to(field, {
    borderColor: "#4caf50",
    boxShadow: "0 0 10px rgba(76, 175, 80, 0.3)",
    duration: 0.3
  });
}
```

### 菜单展开/收起效果

```js
// 下拉菜单动画
class DropdownMenu {
  constructor(element) {
    this.element = element;
    this.button = element.querySelector('.dropdown-button');
    this.menu = element.querySelector('.dropdown-menu');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // 初始化菜单状态
    gsap.set(this.menu, {
      height: 0,
      opacity: 0,
      overflow: "hidden"
    });
    
    this.button.addEventListener('click', () => this.toggle());
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    gsap.to(this.menu, {
      height: "auto",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // 按钮旋转动画
    gsap.to(this.button.querySelector('.arrow'), {
      rotation: 180,
      duration: 0.3
    });
    
    this.isOpen = true;
  }
  
  close() {
    gsap.to(this.menu, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
    
    // 按钮旋转动画
    gsap.to(this.button.querySelector('.arrow'), {
      rotation: 0,
      duration: 0.3
    });
    
    this.isOpen = false;
  }
}

// 使用示例
document.querySelectorAll('.dropdown').forEach(dropdown => {
  new DropdownMenu(dropdown);
});
```

### 模态框出现/消失动画

```js
// 模态框动画
class Modal {
  constructor(element) {
    this.element = element;
    this.overlay = element.querySelector('.modal-overlay');
    this.content = element.querySelector('.modal-content');
    
    this.init();
  }
  
  init() {
    // 初始化状态
    gsap.set([this.overlay, this.content], {
      opacity: 0
    });
    
    gsap.set(this.content, {
      y: -50,
      scale: 0.9
    });
  }
  
  show() {
    const tl = gsap.timeline();
    
    tl.set(this.element, { display: "block" })
      .to(this.overlay, {
        opacity: 1,
        duration: 0.3
      }, 0)
      .to(this.content, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 0);
  }
  
  hide() {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(this.element, { display: "none" });
      }
    });
    
    tl.to(this.content, {
      opacity: 0,
      y: -50,
      scale: 0.9,
      duration: 0.3
    })
    .to(this.overlay, {
      opacity: 0,
      duration: 0.3
    }, 0);
  }
}
```

### 加载指示器动画

```js
// 加载指示器动画
class LoadingSpinner {
  constructor(element) {
    this.element = element;
    this.dots = element.querySelectorAll('.dot');
    
    this.animate();
  }
  
  animate() {
    const tl = gsap.timeline({ repeat: -1 });
    
    this.dots.forEach((dot, i) => {
      tl.to(dot, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.6,
        repeat: 1,
        yoyo: true,
        ease: "power1.inOut"
      }, i * 0.1);
    });
  }
}

// 进度条动画
class ProgressBar {
  constructor(element) {
    this.element = element;
    this.fill = element.querySelector('.progress-fill');
  }
  
  setProgress(percent) {
    gsap.to(this.fill, {
      width: `${percent}%`,
      duration: 0.5,
      ease: "power2.out"
    });
  }
  
  complete(callback) {
    const tl = gsap.timeline({
      onComplete: callback
    });
    
    tl.to(this.fill, {
      width: "100%",
      duration: 0.3
    })
    .to(this.element, {
      backgroundColor: "#4caf50",
      duration: 0.3
    }, 0);
  }
}
```

## 页面效果

### 滚动视差效果

```js
// 滚动视差动画
gsap.utils.toArray(".parallax").forEach(section => {
  const elements = section.querySelectorAll(".parallax-element");
  
  gsap.to(elements, {
    y: -50,
    scrollTrigger: {
      trigger: section,
      scrub: true
    }
  });
});

// 多层视差效果
gsap.utils.toArray(".parallax-section").forEach((section, i) => {
  const depth1 = section.querySelectorAll(".depth-1");
  const depth2 = section.querySelectorAll(".depth-2");
  const depth3 = section.querySelectorAll(".depth-3");
  
  gsap.to(depth1, {
    y: -100,
    scrollTrigger: {
      trigger: section,
      scrub: true
    }
  });
  
  gsap.to(depth2, {
    y: -200,
    scrollTrigger: {
      trigger: section,
      scrub: true
    }
  });
  
  gsap.to(depth3, {
    y: -300,
    scrollTrigger: {
      trigger: section,
      scrub: true
    }
  });
});
```

### 页面过渡动画

```js
// 页面切换动画
function pageTransition() {
  const tl = gsap.timeline();
  
  tl.to("body", {
    overflow: "hidden",
    duration: 0
  })
  .to(".page-content", {
    opacity: 0,
    y: 50,
    duration: 0.3
  })
  .to(".transition-overlay", {
    y: 0,
    duration: 0.5,
    ease: "power2.inOut"
  }, 0)
  .to(".transition-overlay", {
    y: "-100%",
    duration: 0.5,
    ease: "power2.inOut",
    delay: 0.2
  });
  
  return tl;
}

// 页面加载动画
function pageLoad() {
  const tl = gsap.timeline();
  
  tl.from(".page-content", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out"
  })
  .from(".header", {
    y: -50,
    opacity: 0,
    duration: 0.5
  }, 0.2)
  .from(".hero-section", {
    y: 100,
    opacity: 0,
    duration: 0.7
  }, 0.4);
}
```

### 懒加载元素动画

```js
// 懒加载动画
function lazyAnimate() {
  gsap.utils.toArray(".lazy-animate").forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  });
}

// 图片懒加载配合动画
function imageReveal() {
  gsap.utils.toArray(".image-container").forEach(container => {
    const img = container.querySelector("img");
    
    // 图片加载完成后执行动画
    if (img.complete) {
      revealImage(container);
    } else {
      img.addEventListener("load", () => {
        revealImage(container);
      });
    }
  });
  
  function revealImage(container) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%"
      }
    });
    
    tl.from(container, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1,
      ease: "power2.out"
    })
    .from(container.querySelector("img"), {
      scale: 1.2,
      duration: 1.2,
      ease: "power2.out"
    }, 0);
  }
}
```

## 复杂动画案例

### 数据可视化动画

```js
// 图表动画
class AnimatedChart {
  constructor(element) {
    this.element = element;
    this.bars = element.querySelectorAll(".chart-bar");
    this.labels = element.querySelectorAll(".chart-label");
    
    this.init();
  }
  
  init() {
    // 初始化柱状图
    gsap.set(this.bars, {
      height: 0
    });
    
    gsap.set(this.labels, {
      opacity: 0,
      y: 20
    });
  }
  
  animateIn() {
    const tl = gsap.timeline();
    
    // 动画柱状图
    this.bars.forEach((bar, i) => {
      tl.to(bar, {
        height: bar.dataset.value + "%",
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }, i * 0.1);
    });
    
    // 动画标签
    tl.to(this.labels, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1
    });
  }
}

// 数字递增动画
function animateNumber(element, start, end, duration) {
  const obj = { value: start };
  
  gsap.to(obj, {
    value: end,
    duration: duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.floor(obj.value);
    }
  });
}
```

### 游戏化 UI 交互

```js
// 游戏化进度系统
class GamifiedProgress {
  constructor(element) {
    this.element = element;
    this.progressBar = element.querySelector(".progress-bar");
    this.pointsDisplay = element.querySelector(".points");
    this.levelDisplay = element.querySelector(".level");
    
    this.points = 0;
    this.level = 1;
  }
  
  addPoints(points) {
    this.points += points;
    
    // 检查升级
    const newLevel = Math.floor(this.points / 100) + 1;
    const levelUp = newLevel > this.level;
    
    if (levelUp) {
      this.level = newLevel;
      this.levelUpAnimation();
    }
    
    // 更新显示
    this.updateDisplays();
    
    // 点数增加动画
    this.pointsAnimation(points);
  }
  
  updateDisplays() {
    // 进度条动画
    const progress = (this.points % 100) / 100 * 100;
    gsap.to(this.progressBar, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // 更新文字
    this.pointsDisplay.textContent = this.points;
    this.levelDisplay.textContent = this.level;
  }
  
  pointsAnimation(points) {
    const pointElement = document.createElement("div");
    pointElement.className = "floating-points";
    pointElement.textContent = `+${points}`;
    
    gsap.set(pointElement, {
      position: "absolute",
      x: gsap.getProperty(this.element, "width") / 2,
      y: 0,
      opacity: 1,
      color: "#4caf50",
      fontSize: "18px",
      fontWeight: "bold"
    });
    
    this.element.appendChild(pointElement);
    
    const tl = gsap.timeline({
      onComplete: () => pointElement.remove()
    });
    
    tl.to(pointElement, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  }
  
  levelUpAnimation() {
    const tl = gsap.timeline();
    
    tl.to(this.element, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    })
    .to(this.levelDisplay, {
      scale: 1.5,
      color: "#ff9800",
      duration: 0.3,
      yoyo: true,
      repeat: 1
    }, 0);
  }
}
```

### 3D 空间动画

```js
// 3D 卡片翻转效果
function create3DCardFlip(cardElement) {
  const front = cardElement.querySelector('.card-front');
  const back = cardElement.querySelector('.card-back');
  
  let isFlipped = false;
  
  function flipCard() {
    const tl = gsap.timeline();
    
    if (!isFlipped) {
      // 正面翻转到背面
      tl.to(front, {
        rotationY: -180,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .set(back, {
        rotationY: 180,
        zIndex: 2
      }, 0)
      .to(back, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    } else {
      // 背面翻转到正面
      tl.to(back, {
        rotationY: 180,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .set(front, {
        rotationY: -180,
        zIndex: 2
      }, 0)
      .to(front, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
    
    isFlipped = !isFlipped;
  }
  
  cardElement.addEventListener('click', flipCard);
}
```

### 响应式动画适配

```js
// 响应式动画
class ResponsiveAnimation {
  constructor(element, animations) {
    this.element = element;
    this.animations = animations; // { desktop, tablet, mobile }
    this.currentBreakpoint = this.getBreakpoint();
    
    this.init();
    this.setupResizeListener();
  }
  
  getBreakpoint() {
    const width = window.innerWidth;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  }
  
  init() {
    const animation = this.animations[this.currentBreakpoint];
    if (animation) {
      animation.call(this, this.element);
    }
  }
  
  setupResizeListener() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newBreakpoint = this.getBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
          this.currentBreakpoint = newBreakpoint;
          this.init();
        }
      }, 250);
    });
  }
}

// 使用示例
const responsiveAnim = new ResponsiveAnimation(
  document.querySelector('.hero-element'),
  {
    desktop: function(el) {
      gsap.to(el, {
        x: 200,
        rotation: 360,
        duration: 2
      });
    },
    tablet: function(el) {
      gsap.to(el, {
        x: 100,
        rotation: 180,
        duration: 1.5
      });
    },
    mobile: function(el) {
      gsap.to(el, {
        y: 50,
        scale: 1.2,
        duration: 1
      });
    }
  }
);
```

### 多设备兼容性处理

```js
// 设备检测和优化
class DeviceOptimizedAnimations {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isLowPowerMode = this.detectLowPowerMode();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.optimizeAnimations();
  }
  
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  detectLowPowerMode() {
    // 简化的低功耗模式检测
    return navigator.connection ? navigator.connection.saveData : false;
  }
  
  optimizeAnimations() {
    if (this.reducedMotion) {
      // 禁用复杂动画
      gsap.globalTimeline.timeScale(0);
    } else if (this.isMobile || this.isLowPowerMode) {
      // 移动端或低功耗模式优化
      gsap.config({
        force3D: false, // 禁用强制 3D 加速
        nullTargetWarn: false
      });
      
      // 简化动画效果
      gsap.defaults({
        duration: 0.3,
        ease: "none"
      });
    }
  }
}

// 初始化设备优化
const deviceOptimizer = new DeviceOptimizedAnimations();
```
