# 最佳实践

在使用 GSAP 进行动画开发时，遵循最佳实践可以提高代码质量、性能和可维护性。

## 代码组织

### 模块化动画代码

```js
// animations/base.js - 基础动画函数
export function fadeIn(element, duration = 0.3) {
  return gsap.from(element, {
    opacity: 0,
    duration
  });
}

export function slideIn(element, direction = 'left', distance = 50, duration = 0.5) {
  const from = {};
  
  switch (direction) {
    case 'left':
      from.x = -distance;
      break;
    case 'right':
      from.x = distance;
      break;
    case 'top':
      from.y = -distance;
      break;
    case 'bottom':
      from.y = distance;
      break;
  }
  
  return gsap.from(element, {
    ...from,
    opacity: 0,
    duration
  });
}

// animations/transitions.js - 页面过渡动画
import { fadeIn } from './base.js';

export function pageTransition() {
  const tl = gsap.timeline();
  
  tl.to('.page-content', {
    opacity: 0,
    duration: 0.3
  })
  .to('.transition-overlay', {
    y: 0,
    duration: 0.5
  }, 0);
  
  return tl;
}

// animations/components.js - 组件特定动画
export class ButtonAnimations {
  static hover(element) {
    return gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out'
    });
  }
  
  static click(element) {
    return gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  }
}
```

### 配置驱动设计

```js
// config/animations.js - 动画配置
export const animationConfig = {
  durations: {
    fast: 0.2,
    normal: 0.5,
    slow: 1.0
  },
  
  easings: {
    standard: 'power2.out',
    bounce: 'bounce.out',
    elastic: 'elastic.out(1, 0.3)'
  },
  
  stagger: {
    small: 0.05,
    medium: 0.1,
    large: 0.2
  }
};

// utils/animation-helpers.js - 动画工具函数
import { animationConfig } from '../config/animations.js';

export function createStaggeredAnimation(elements, vars, stagger = animationConfig.stagger.medium) {
  return gsap.to(elements, {
    ...vars,
    stagger
  });
}

export function createTimelineWithDefaults(vars = {}) {
  return gsap.timeline({
    defaults: {
      duration: animationConfig.durations.normal,
      ease: animationConfig.easings.standard,
      ...vars
    }
  });
}
```

### 动画状态管理

```js
// managers/animation-state.js - 动画状态管理
class AnimationStateManager {
  constructor() {
    this.states = new Map();
    this.animations = new Map();
  }
  
  setState(id, state) {
    this.states.set(id, state);
  }
  
  getState(id) {
    return this.states.get(id);
  }
  
  registerAnimation(id, animation) {
    this.animations.set(id, animation);
  }
  
  getAnimation(id) {
    return this.animations.get(id);
  }
  
  destroyState(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.kill();
      this.animations.delete(id);
    }
    this.states.delete(id);
  }
  
  destroyAll() {
    this.animations.forEach(anim => anim.kill());
    this.animations.clear();
    this.states.clear();
  }
}

// 全局动画状态管理器
export const animationStateManager = new AnimationStateManager();

// components/animated-component.js - 使用状态管理的组件
import { animationStateManager } from '../managers/animation-state.js';

class AnimatedComponent {
  constructor(element, id) {
    this.element = element;
    this.id = id;
    this.state = 'idle';
    
    animationStateManager.setState(this.id, this.state);
  }
  
  animateIn() {
    if (this.state !== 'idle') return;
    
    this.state = 'animating-in';
    animationStateManager.setState(this.id, this.state);
    
    const animation = gsap.from(this.element, {
      opacity: 0,
      y: 50,
      onComplete: () => {
        this.state = 'active';
        animationStateManager.setState(this.id, this.state);
      }
    });
    
    animationStateManager.registerAnimation(this.id, animation);
  }
  
  destroy() {
    animationStateManager.destroyState(this.id);
  }
}
```

### 可维护性策略

```js
// utils/animation-debugger.js - 动画调试工具
export class AnimationDebugger {
  static enable() {
    gsap.config({ nullTargetWarn: true });
    
    // 添加调试标记到 ScrollTrigger
    if (gsap.plugins.scrolltrigger) {
      gsap.config({
        force3D: true
      });
    }
  }
  
  static log(animation, label) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Animation] ${label}:`, {
        targets: animation.targets(),
        duration: animation.duration(),
        progress: animation.progress()
      });
    }
  }
}

// factories/animation-factory.js - 动画工厂模式
export class AnimationFactory {
  static create(type, element, options = {}) {
    switch (type) {
      case 'fade':
        return this.createFadeAnimation(element, options);
      case 'slide':
        return this.createSlideAnimation(element, options);
      case 'scale':
        return this.createScaleAnimation(element, options);
      default:
        throw new Error(`Unknown animation type: ${type}`);
    }
  }
  
  static createFadeAnimation(element, { duration = 0.3, from = 0, to = 1 } = {}) {
    return gsap.fromTo(element,
      { opacity: from },
      { opacity: to, duration }
    );
  }
  
  static createSlideAnimation(element, { direction = 'left', distance = 50, duration = 0.5 } = {}) {
    const from = {};
    const to = {};
    
    switch (direction) {
      case 'left':
        from.x = -distance;
        to.x = 0;
        break;
      case 'right':
        from.x = distance;
        to.x = 0;
        break;
      case 'top':
        from.y = -distance;
        to.y = 0;
        break;
      case 'bottom':
        from.y = distance;
        to.y = 0;
        break;
    }
    
    return gsap.fromTo(element,
      { ...from, opacity: 0 },
      { ...to, opacity: 1, duration }
    );
  }
  
  static createScaleAnimation(element, { from = 0, to = 1, duration = 0.3 } = {}) {
    return gsap.fromTo(element,
      { scale: from, opacity: 0 },
      { scale: to, opacity: 1, duration }
    );
  }
}
```

### 代码风格规范

```js
// .eslintrc.js 或项目 ESLint 配置
/*
{
  "rules": {
    // 动画相关规则
    "gsap/no-unused-tweens": "warn",
    "gsap/prefer-timeline": "warn",
    "gsap/consistent-easing": "error"
  }
}
*/

// 示例：遵循一致的动画模式
// ✅ 推荐写法
const tl = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: 'power2.out'
  }
});

tl.from('.element1', { y: 50, opacity: 0 })
  .from('.element2', { y: 50, opacity: 0 }, '-=0.2')
  .from('.element3', { y: 50, opacity: 0 }, '-=0.2');

// ❌ 不推荐写法
gsap.from('.element1', { y: 50, opacity: 0, duration: 0.5, ease: 'power2.out' });
gsap.from('.element2', { y: 50, opacity: 0, duration: 0.5, ease: 'power2.out' });
gsap.from('.element3', { y: 50, opacity: 0, duration: 0.5, ease: 'power2.out' });
```

## 设计原则

### 动画性能与体验平衡

```js
// 性能优化工具函数
export class PerformanceOptimizer {
  // 检测设备性能并调整动画复杂度
  static getPerformanceLevel() {
    // 简化的性能检测
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const saveData = navigator.connection && navigator.connection.saveData;
    
    if (isMobile || hasLowMemory || saveData) {
      return 'low';
    }
    
    return 'high';
  }
  
  // 根据性能级别调整动画
  static optimizeAnimation(animationConfig) {
    const performanceLevel = this.getPerformanceLevel();
    
    if (performanceLevel === 'low') {
      return {
        ...animationConfig,
        duration: Math.min(animationConfig.duration || 0.5, 0.3),
        ease: 'none',
        stagger: animationConfig.stagger ? animationConfig.stagger / 2 : undefined
      };
    }
    
    return animationConfig;
  }
}

// 使用示例
const optimizedConfig = PerformanceOptimizer.optimizeAnimation({
  x: 100,
  duration: 1,
  stagger: 0.1
});

gsap.to('.element', optimizedConfig);
```

### 渐进增强策略

```js
// 渐进增强实现
export class ProgressiveAnimation {
  static isSupported() {
    return typeof gsap !== 'undefined';
  }
  
  static animate(element, gsapVars, cssFallback = {}) {
    if (this.isSupported()) {
      return gsap.to(element, gsapVars);
    } else {
      // CSS 降级方案
      Object.keys(cssFallback).forEach(prop => {
        element.style[prop] = cssFallback[prop];
      });
      
      return null;
    }
  }
  
  static stagger(elements, gsapVars, cssFallback = {}) {
    if (this.isSupported()) {
      return gsap.to(elements, {
        ...gsapVars,
        stagger: 0.1
      });
    } else {
      // 为每个元素设置简单的 CSS 过渡
      elements.forEach((element, index) => {
        setTimeout(() => {
          Object.keys(cssFallback).forEach(prop => {
            element.style[prop] = cssFallback[prop];
          });
        }, index * 100);
      });
      
      return null;
    }
  }
}

// 使用示例
ProgressiveAnimation.animate(
  document.querySelector('.element'),
  { x: 100, duration: 0.5 },
  { transform: 'translateX(100px)' }
);
```

### 可访问性考虑 (a11y)

```js
// 可访问性工具
export class AccessibleAnimation {
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  static create(element, vars) {
    if (this.prefersReducedMotion()) {
      // 立即应用最终状态
      Object.keys(vars).forEach(prop => {
        if (prop !== 'duration' && prop !== 'ease' && prop !== 'delay') {
          gsap.set(element, { [prop]: vars[prop] });
        }
      });
      return null;
    }
    
    return gsap.to(element, vars);
  }
  
  static createTimeline(vars) {
    if (this.prefersReducedMotion()) {
      // 返回一个立即完成的时间轴
      const fakeTimeline = {
        to: (element, vars) => {
          Object.keys(vars).forEach(prop => {
            if (prop !== 'duration' && prop !== 'ease' && prop !== 'delay') {
              gsap.set(element, { [prop]: vars[prop] });
            }
          });
          return fakeTimeline;
        },
        from: (element, vars) => {
          Object.keys(vars).forEach(prop => {
            if (prop !== 'duration' && prop !== 'ease' && prop !== 'delay') {
              gsap.set(element, { [prop]: vars[prop] });
            }
          });
          return fakeTimeline;
        },
        fromTo: (element, from, to) => {
          Object.keys(to).forEach(prop => {
            if (prop !== 'duration' && prop !== 'ease' && prop !== 'delay') {
              gsap.set(element, { [prop]: to[prop] });
            }
          });
          return fakeTimeline;
        }
      };
      
      return fakeTimeline;
    }
    
    return gsap.timeline(vars);
  }
}

// 使用示例
const tl = AccessibleAnimation.createTimeline();

tl.from('.element1', { opacity: 0, y: 50 })
  .from('.element2', { opacity: 0, y: 50 });
```

### 移动优先原则

```js
// 移动优先的动画实现
export class MobileFirstAnimation {
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  static createConfig(baseConfig) {
    const isMobile = this.isMobile();
    const isTouch = this.isTouchDevice();
    
    let config = { ...baseConfig };
    
    if (isMobile) {
      // 移动端优化
      config = {
        ...config,
        duration: Math.min(config.duration || 0.5, 0.3),
        ease: config.ease || 'none'
      };
    }
    
    if (isTouch) {
      // 触摸设备优化
      config = {
        ...config,
        delay: config.delay ? Math.min(config.delay, 0.1) : undefined
      };
    }
    
    return config;
  }
}

// 使用示例
const mobileOptimizedConfig = MobileFirstAnimation.createConfig({
  x: 100,
  duration: 1,
  stagger: 0.1
});

gsap.to('.element', mobileOptimizedConfig);
```

### 用户体验优先

```js
// 用户体验优化工具
export class UXOptimizedAnimation {
  // 防止动画过于频繁触发
  static createThrottledAnimation(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // 防抖动动画
  static createDebouncedAnimation(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
  
  // 智能加载动画
  static async createWhenVisible(element, animationFn, options = {}) {
    return new Promise((resolve) => {
      if (this.isInViewport(element)) {
        const animation = animationFn();
        resolve(animation);
        return;
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(element);
            const animation = animationFn();
            resolve(animation);
          }
        });
      }, options);
      
      observer.observe(element);
    });
  }
  
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// 使用示例
const throttledHover = UXOptimizedAnimation.createThrottledAnimation((element) => {
  gsap.to(element, { scale: 1.1, duration: 0.2 });
}, 100);

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mouseenter', () => throttledHover(button));
});
```

## 团队协作

### 动画规范制定

```js
// docs/animation-guidelines.md - 动画规范文档示例

/*
# 动画规范指南

## 1. 动画时长规范

- 快速反馈动画: 0.1s - 0.2s (按钮点击、状态切换)
- 标准过渡动画: 0.3s - 0.5s (页面元素显示/隐藏)
- 复杂场景动画: 0.6s - 1.0s (页面切换、复杂交互)

## 2. 缓动函数规范

- 标准缓入缓出: power2.inOut
- 快速缓入: power2.out
- 弹性效果: elastic.out(1, 0.3)
- 弹跳效果: bounce.out

## 3. 命名规范

- 动画函数使用动词开头: fadeIn, slideUp, scaleIn
- 时间轴变量使用 tl 开头: tlIntro, tlContent
- 配置对象使用 Config 结尾: slideConfig, fadeConfig
*/

// config/team-animation-standards.js - 团队动画标准
export const teamAnimationStandards = {
  durations: {
    instant: 0,
    fast: 0.1,
    quick: 0.2,
    standard: 0.3,
    smooth: 0.5,
    slow: 0.8,
    deliberate: 1.2
  },
  
  easings: {
    standard: 'power2.out',
    smooth: 'power3.out',
    bounce: 'bounce.out',
    elastic: 'elastic.out(1, 0.3)',
    snap: 'back.out(1.7)'
  },
  
  naming: {
    prefixes: {
      in: '入场动画',
      out: '出场动画',
      loop: '循环动画',
      hover: '悬停动画'
    }
  }
};
```

### 代码审查要点

```js
// .github/pull_request_template.md - PR 模板中的动画审查要点

/*
## 动画审查清单

### 性能检查
- [ ] 动画是否使用了 transform 和 opacity（硬件加速）
- [ ] 是否避免了触发重排的属性（width, height, left, top 等）
- [ ] 复杂动画是否考虑了移动端性能
- [ ] 是否有内存泄漏风险（未销毁的动画实例）

### 可访问性检查
- [ ] 是否支持 prefers-reduced-motion
- [ ] 动画是否对所有用户都友好
- [ ] 是否提供了非动画的替代方案

### 代码质量检查
- [ ] 动画代码是否模块化和可复用
- [ ] 是否遵循团队的动画规范
- [ ] 是否有适当的错误处理
- [ ] 是否有必要的注释和文档
*/

// utils/code-review-helpers.js - 代码审查辅助工具
export class AnimationCodeReview {
  static checkPerformanceIssues(tweenVars) {
    const performanceWarnings = [];
    
    // 检查是否使用了性能较差的属性
    const layoutTriggers = ['width', 'height', 'left', 'top', 'right', 'bottom'];
    const usedLayoutTriggers = layoutTriggers.filter(prop => tweenVars[prop] !== undefined);
    
    if (usedLayoutTriggers.length > 0) {
      performanceWarnings.push(
        `避免使用这些会触发重排的属性: ${usedLayoutTriggers.join(', ')}`
      );
    }
    
    // 检查是否使用了 transform 和 opacity
    const goodProps = ['x', 'y', 'scale', 'rotation', 'opacity'];
    const usedGoodProps = goodProps.filter(prop => tweenVars[prop] !== undefined);
    
    if (usedGoodProps.length === 0) {
      performanceWarnings.push(
        '考虑使用 transform 和 opacity 属性以获得更好的性能'
      );
    }
    
    return performanceWarnings;
  }
  
  static checkAccessibilityIssues(tweenVars) {
    const accessibilityIssues = [];
    
    // 检查是否考虑了 prefers-reduced-motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // 在实际代码审查中，应该检查代码是否处理了这个情况
      // 这里只是一个示例
    }
    
    return accessibilityIssues;
  }
}
```

### 文档化标准

```js
// docs/animation-api.md - 动画 API 文档示例

/*
# 动画 API 文档

## 基础动画

### fadeIn(element, options)
淡入动画

**参数:**
- element (HTMLElement): 要动画的元素
- options (Object): 动画选项
  - duration (number): 动画时长，默认 0.3
  - delay (number): 延迟时间，默认 0

**返回:**
GSAP Tween 实例

**示例:**
```js
import { fadeIn } from './animations/base';

const element = document.querySelector('.my-element');
const tween = fadeIn(element, { duration: 0.5 });
```
*/

// scripts/generate-docs.js - 文档生成脚本示例
/*
const fs = require('fs');
const path = require('path');

function generateAnimationDocs() {
  // 扫描动画文件并生成文档
  const animationFiles = fs.readdirSync('./src/animations');
  
  animationFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const content = fs.readFileSync(`./src/animations/${file}`, 'utf8');
      // 解析 JSDoc 注释并生成 Markdown 文档
      // ...
    }
  });
}
*/
```

### 版本控制策略

```js
// CHANGELOG.md - 动画相关变更日志示例

/*
# 变更日志

## [1.2.0] - 2023-12-01
### 新增
- 添加了新的弹性动画效果
- 增加了移动端性能优化

### 修改
- 优化了 stagger 动画的默认时长
- 改进了 ScrollTrigger 的标记显示

### 修复
- 修复了在 Safari 中的动画闪烁问题
- 解决了内存泄漏问题

## [1.1.0] - 2023-11-15
### 新增
- 添加了可访问性支持
- 实现了渐进增强策略

### 修改
- 重构了动画工厂函数
- 更新了团队动画规范
*/
```

### 设计师-开发工作流

```js
// docs/designer-developer-workflow.md - 设计师-开发协作文档示例

/*
# 设计师-开发者动画协作流程

## 1. 设计阶段
设计师使用以下工具创建动画原型:
- Principle
- Framer
- After Effects (配合 Bodymovin 插件)

## 2. 规范制定
共同制定:
- 动画时长标准
- 缓动函数选择
- 交互动画规范

## 3. 开发实现
开发者遵循:
- 使用提供的动画规范文档
- 实现设计师提供的原型效果
- 提供技术可行性反馈

## 4. 测试验收
- 在实际设备上测试动画效果
- 验证不同浏览器的兼容性
- 确认可访问性支持
*/

// utils/design-token-converter.js - 设计令牌转换工具
export class DesignTokenConverter {
  // 将设计工具中的时长转换为 GSAP 格式
  static convertDuration(designDuration) {
    // 设计工具通常以毫秒为单位，GSAP 以秒为单位
    return designDuration / 1000;
  }
  
  // 将设计工具中的缓动转换为 GSAP 格式
  static convertEasing(designEasing) {
    const easingMap = {
      'ease-in-out': 'power2.inOut',
      'ease-in': 'power2.in',
      'ease-out': 'power2.out',
      'linear': 'none'
    };
    
    return easingMap[designEasing] || designEasing;
  }
  
  // 将设计工具中的颜色格式转换为 Web 格式
  static convertColor(designColor) {
    // 处理各种颜色格式转换
    if (designColor.startsWith('rgba')) {
      return designColor; // 已经是 Web 格式
    }
    
    // 处理其他格式...
    return designColor;
  }
}
```

通过遵循这些最佳实践，团队可以创建出高性能、可维护且用户友好的动画体验。
