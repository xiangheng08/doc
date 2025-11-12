# 调试指南

调试 GSAP 动画是确保动画按预期工作的关键步骤。本文档涵盖了常见的问题排查方法、调试工具和错误处理策略。

## 常见问题排查

### 动画不执行的原因

```js
// 1. 检查元素是否存在
const element = document.querySelector('.my-element');
if (!element) {
  console.error('元素未找到');
  return;
}

// 2. 检查 GSAP 是否正确加载
if (typeof gsap === 'undefined') {
  console.error('GSAP 未正确加载');
  return;
}

// 3. 检查动画配置是否正确
const tween = gsap.to(element, {
  x: 100,
  duration: 1,
  onComplete: () => {
    console.log('动画完成'); // 确认动画是否执行
  }
});

// 4. 检查动画是否被覆盖或杀死
console.log('动画是否活跃:', tween.isActive());
console.log('动画时间线:', tween.totalTime());
```

### 浏览器兼容性问题

```js
// 检测浏览器支持
function checkBrowserSupport() {
  const checks = {
    gsap: typeof gsap !== 'undefined',
    transforms: CSS.supports('transform', 'translateX(0)'),
    transitions: CSS.supports('transition', 'all 1s'),
    animations: CSS.supports('animation', 'test 1s')
  };
  
  Object.keys(checks).forEach(key => {
    if (!checks[key]) {
      console.warn(`${key} 不受支持`);
    }
  });
  
  return checks;
}

// 降级处理
function safeAnimate(element, vars) {
  try {
    return gsap.to(element, vars);
  } catch (error) {
    console.error('GSAP 动画错误:', error);
    // 降级到 CSS 动画
    element.style.transition = 'all 0.3s ease';
    Object.keys(vars).forEach(prop => {
      if (prop !== 'duration' && prop !== 'ease') {
        element.style[prop] = vars[prop];
      }
    });
  }
}
```

### 插件冲突解决

```js
// 检查插件是否正确注册
function checkPlugins() {
  const requiredPlugins = ['ScrollTrigger', 'Draggable'];
  const missingPlugins = [];
  
  requiredPlugins.forEach(pluginName => {
    if (!gsap.plugins[pluginName.toLowerCase()]) {
      missingPlugins.push(pluginName);
    }
  });
  
  if (missingPlugins.length > 0) {
    console.error('缺少插件:', missingPlugins);
    return false;
  }
  
  return true;
}

// 插件版本兼容性检查
function checkPluginVersions() {
  console.log('GSAP 版本:', gsap.version);
  
  // 检查 ScrollTrigger 版本
  if (gsap.plugins.scrolltrigger) {
    console.log('ScrollTrigger 已注册');
  }
}
```

### 内存泄漏检测

```js
// 动画实例管理
class AnimationManager {
  constructor() {
    this.animations = new Set();
  }
  
  createTween(...args) {
    const tween = gsap.to(...args);
    this.animations.add(tween);
    return tween;
  }
  
  killAll() {
    this.animations.forEach(tween => {
      tween.kill();
    });
    this.animations.clear();
  }
  
  getActiveCount() {
    return Array.from(this.animations).filter(tween => tween.isActive()).length;
  }
}

// 使用示例
const animManager = new AnimationManager();

// 创建动画
const tween1 = animManager.createTween('.element1', { x: 100 });
const tween2 = animManager.createTween('.element2', { y: 100 });

// 组件销毁时清理
// componentWillUnmount 或类似的生命周期钩子中
// animManager.killAll();
```

### 性能瓶颈定位

```js
// 性能监控工具
class PerformanceMonitor {
  constructor() {
    this.timings = new Map();
  }
  
  start(name) {
    this.timings.set(name, performance.now());
  }
  
  end(name) {
    const start = this.timings.get(name);
    if (start) {
      const duration = performance.now() - start;
      console.log(`${name} 耗时: ${duration.toFixed(2)}ms`);
      this.timings.delete(name);
      return duration;
    }
  }
  
  // 监控动画帧率
  monitorFPS(callback) {
    let frameCount = 0;
    let lastTime = performance.now();
    let monitoring = true;
    
    const checkFPS = () => {
      frameCount++;
      const now = performance.now();
      
      if (now >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        callback(fps);
        frameCount = 0;
        lastTime = now;
      }
      
      if (monitoring) {
        requestAnimationFrame(checkFPS);
      }
    };
    
    checkFPS();
    
    return () => {
      monitoring = false;
    };
  }
}

// 使用性能监控
const perfMonitor = new PerformanceMonitor();

// 监控动画创建性能
perfMonitor.start('create-animation');
const timeline = gsap.timeline();
timeline.to('.element', { x: 100, duration: 1 });
perfMonitor.end('create-animation');

// 监控帧率
const stopMonitoring = perfMonitor.monitorFPS((fps) => {
  if (fps < 30) {
    console.warn(`帧率较低: ${fps} FPS`);
  }
});

// 在适当时候停止监控
// stopMonitoring();
```

## 调试工具与技巧

### GSAP 调试面板使用

```js
// 启用 GSAP 调试模式
gsap.config({
  // 启用调试警告
  nullTargetWarn: true,
  // 性能优化设置
  force3D: true,
  // 其他配置
});

// ScrollTrigger 调试
gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  x: 100,
  scrollTrigger: {
    trigger: '.trigger',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true, // 显示调试标记
    onToggle: self => {
      console.log('ScrollTrigger 状态切换:', self.isActive);
    }
  }
});
```

### 控制台日志策略

```js
// 结构化日志记录
class AnimationLogger {
  static log(type, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      type,
      message,
      ...data
    };
    
    switch (type) {
      case 'info':
        console.info('[GSAP]', logData);
        break;
      case 'warn':
        console.warn('[GSAP]', logData);
        break;
      case 'error':
        console.error('[GSAP]', logData);
        break;
      default:
        console.log('[GSAP]', logData);
    }
  }
  
  static logAnimation(animation, action) {
    this.log('info', `动画 ${action}`, {
      id: animation.id || 'unknown',
      targets: animation.targets(),
      duration: animation.duration(),
      progress: animation.progress()
    });
  }
}

// 使用示例
const tween = gsap.to('.element', {
  x: 100,
  onStart: () => AnimationLogger.logAnimation(tween, '开始'),
  onUpdate: () => AnimationLogger.logAnimation(tween, '更新'),
  onComplete: () => AnimationLogger.logAnimation(tween, '完成')
});
```

### 断点调试方法

```js
// 使用 debugger 语句
function debugAnimation() {
  const element = document.querySelector('.debug-element');
  
  // 在关键点设置断点
  debugger; // 执行前断点
  
  const tween = gsap.to(element, {
    x: 100,
    onUpdate: function() {
      // 动画更新中断点
      if (this.progress() > 0.5) {
        debugger; // 中间断点
      }
    },
    onComplete: function() {
      debugger; // 完成断点
      console.log('动画完成');
    }
  });
  
  return tween;
}

// 条件断点示例
function conditionalDebug() {
  gsap.utils.toArray('.item').forEach((element, index) => {
    // 只在第三个元素中断点
    if (index === 2) {
      debugger;
    }
    
    gsap.to(element, {
      y: -20,
      duration: 0.5
    });
  });
}
```

### 可视化调试工具

```js
// 创建可视化调试覆盖层
class VisualDebugger {
  constructor() {
    this.overlay = this.createOverlay();
  }
  
  createOverlay() {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: '99999',
      maxWidth: '300px'
    });
    
    document.body.appendChild(overlay);
    return overlay;
  }
  
  updateInfo(info) {
    this.overlay.innerHTML = Object.entries(info)
      .map(([key, value]) => `<div>${key}: ${value}</div>`)
      .join('');
  }
  
  highlightElement(element, color = 'red') {
    const originalStyle = element.style.outline;
    
    element.style.outline = `2px solid ${color}`;
    
    // 3秒后恢复原样
    setTimeout(() => {
      element.style.outline = originalStyle;
    }, 3000);
  }
}

// 使用可视化调试器
const visualDebugger = new VisualDebugger();

// 调试滚动触发器
gsap.to('.element', {
  x: 100,
  scrollTrigger: {
    trigger: '.trigger',
    onUpdate: (self) => {
      visualDebugger.updateInfo({
        progress: self.progress.toFixed(2),
        direction: self.direction,
        isActive: self.isActive
      });
    }
  }
});
```

### 自动化测试方案

```js
// 动画测试工具
class AnimationTester {
  static async waitForAnimation(animation, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const check = () => {
        if (animation.progress() >= 1) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('动画超时'));
        } else {
          requestAnimationFrame(check);
        }
      };
      
      check();
    });
  }
  
  static testAnimationProperties(element, expectedProps) {
    const computedStyle = window.getComputedStyle(element);
    
    Object.keys(expectedProps).forEach(prop => {
      const actualValue = computedStyle[prop];
      const expectedValue = expectedProps[prop];
      
      if (actualValue !== expectedValue) {
        console.warn(`属性 ${prop} 不匹配: 期望 ${expectedValue}, 实际 ${actualValue}`);
      }
    });
  }
  
  static async runAnimationTest(testFn, assertions) {
    try {
      const animation = testFn();
      await this.waitForAnimation(animation);
      assertions();
      console.log('动画测试通过');
    } catch (error) {
      console.error('动画测试失败:', error);
    }
  }
}

// 测试示例
AnimationTester.runAnimationTest(
  () => gsap.to('.test-element', { x: 100, duration: 0.1 }),
  () => {
    const element = document.querySelector('.test-element');
    const transform = window.getComputedStyle(element).transform;
    console.assert(transform.includes('100'), '元素应该移动 100px');
  }
);
```

## 错误处理与降级

### 异常捕获机制

```js
// 动画异常处理包装器
class AnimationWrapper {
  static async safeExecute(animationFn, fallbackFn = null) {
    try {
      const result = animationFn();
      return result;
    } catch (error) {
      console.error('动画执行错误:', error);
      
      if (fallbackFn) {
        try {
          return fallbackFn();
        } catch (fallbackError) {
          console.error('降级方案也失败:', fallbackError);
        }
      }
      
      return null;
    }
  }
  
  static createSafeTween(target, vars) {
    return this.safeExecute(
      () => gsap.to(target, vars),
      () => {
        // CSS 降级方案
        Object.keys(vars).forEach(prop => {
          if (prop !== 'duration' && prop !== 'ease') {
            target.style[prop] = vars[prop];
          }
        });
        return null;
      }
    );
  }
}

// 使用安全包装器
AnimationWrapper.createSafeTween(
  document.querySelector('.element'),
  { x: 100, duration: 1 }
);
```

### 优雅降级策略

```js
// 功能检测和降级
class FeatureDetector {
  static detect() {
    return {
      gsap: typeof gsap !== 'undefined',
      webAnimations: typeof Element.prototype.animate !== 'undefined',
      cssTransitions: CSS.supports('transition', 'all 1s'),
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  }
  
  static getBestAnimationMethod() {
    const features = this.detect();
    
    if (features.prefersReducedMotion) {
      return 'instant'; // 立即应用最终状态
    }
    
    if (features.gsap) {
      return 'gsap';
    }
    
    if (features.webAnimations) {
      return 'web-animations';
    }
    
    if (features.cssTransitions) {
      return 'css-transitions';
    }
    
    return 'instant'; // 最后的降级方案
  }
}

// 多级降级动画实现
class UniversalAnimator {
  static animate(element, properties, options = {}) {
    const method = FeatureDetector.getBestAnimationMethod();
    
    switch (method) {
      case 'gsap':
        return gsap.to(element, {
          ...properties,
          ...options
        });
        
      case 'web-animations':
        return element.animate(
          [properties],
          { duration: (options.duration || 1) * 1000 }
        );
        
      case 'css-transitions':
        element.style.transition = `all ${options.duration || 1}s`;
        Object.keys(properties).forEach(prop => {
          element.style[prop] = properties[prop];
        });
        return { 
          finish: () => Promise.resolve(),
          cancel: () => {}
        };
        
      case 'instant':
      default:
        Object.keys(properties).forEach(prop => {
          element.style[prop] = properties[prop];
        });
        return null;
    }
  }
}

// 使用通用动画器
UniversalAnimator.animate(
  document.querySelector('.element'),
  { transform: 'translateX(100px)' },
  { duration: 1 }
);
```

### 用户体验保障

```js
// 加载状态管理
class AnimationLoader {
  constructor() {
    this.loading = new Map();
  }
  
  async loadAnimation(animationPromise, element) {
    const id = element.id || Math.random().toString(36);
    
    // 显示加载指示器
    this.showLoadingIndicator(element);
    this.loading.set(id, true);
    
    try {
      const animation = await animationPromise;
      this.hideLoadingIndicator(element);
      this.loading.set(id, false);
      return animation;
    } catch (error) {
      this.hideLoadingIndicator(element);
      this.showError(element, error);
      this.loading.set(id, false);
      throw error;
    }
  }
  
  showLoadingIndicator(element) {
    const indicator = document.createElement('div');
    indicator.className = 'loading-indicator';
    indicator.innerHTML = 'Loading...';
    element.appendChild(indicator);
  }
  
  hideLoadingIndicator(element) {
    const indicator = element.querySelector('.loading-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  showError(element, error) {
    const errorElement = document.createElement('div');
    errorElement.className = 'animation-error';
    errorElement.innerHTML = `Animation failed: ${error.message}`;
    element.appendChild(errorElement);
    
    // 3秒后隐藏错误信息
    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }
}

// 使用加载管理器
const loader = new AnimationLoader();
const element = document.querySelector('.animated-element');

loader.loadAnimation(
  new Promise(resolve => {
    setTimeout(() => {
      resolve(gsap.to(element, { x: 100, duration: 1 }));
    }, 1000);
  }),
  element
);
```

### 错误日志收集

```js
// 错误日志收集器
class AnimationErrorLogger {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
  }
  
  log(error, context = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      error: error.message || error,
      stack: error.stack,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.errors.push(errorEntry);
    
    // 限制错误日志数量
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }
    
    // 输出到控制台
    console.error('Animation Error:', errorEntry);
    
    // 发送到服务器（如果需要）
    this.sendToServer(errorEntry);
  }
  
  sendToServer(errorEntry) {
    // 在生产环境中发送错误到服务器
    if (process.env.NODE_ENV === 'production') {
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorEntry)
      // }).catch(err => {
      //   console.error('发送错误日志失败:', err);
      // });
    }
  }
  
  getRecentErrors(count = 10) {
    return this.errors.slice(-count);
  }
}

// 全局错误处理器
const errorLogger = new AnimationErrorLogger();

// 包装 GSAP 方法以捕获错误
const originalTo = gsap.to;
gsap.to = function(...args) {
  try {
    return originalTo.apply(this, args);
  } catch (error) {
    errorLogger.log(error, { method: 'gsap.to', args });
    throw error;
  }
};
```

### 备份动画方案

```js
// 备份动画系统
class BackupAnimationSystem {
  constructor() {
    this.primaryMethod = this.detectPrimaryMethod();
    this.backupMethods = this.getBackupMethods();
  }
  
  detectPrimaryMethod() {
    if (typeof gsap !== 'undefined') return 'gsap';
    if (typeof Element.prototype.animate !== 'undefined') return 'web-animations';
    if (CSS.supports('transition', 'all 1s')) return 'css';
    return 'none';
  }
  
  getBackupMethods() {
    const methods = [];
    
    if (typeof Element.prototype.animate !== 'undefined') {
      methods.push('web-animations');
    }
    
    if (CSS.supports('transition', 'all 1s')) {
      methods.push('css');
    }
    
    methods.push('instant');
    return methods;
  }
  
  animate(element, properties, options = {}, attempt = 0) {
    const methods = [this.primaryMethod, ...this.backupMethods];
    const method = methods[attempt];
    
    if (!method || method === 'none') {
      console.error('没有可用的动画方法');
      return null;
    }
    
    try {
      switch (method) {
        case 'gsap':
          return gsap.to(element, { ...properties, ...options });
          
        case 'web-animations':
          return element.animate([properties], {
            duration: (options.duration || 1) * 1000,
            easing: options.ease || 'ease'
          });
          
        case 'css':
          return this.cssAnimate(element, properties, options);
          
        case 'instant':
          return this.instantApply(element, properties);
          
        default:
          throw new Error(`未知的动画方法: ${method}`);
      }
    } catch (error) {
      console.warn(`动画方法 ${method} 失败，尝试备用方法`, error);
      
      if (attempt < methods.length - 1) {
        return this.animate(element, properties, options, attempt + 1);
      } else {
        console.error('所有动画方法都失败了', error);
        return null;
      }
    }
  }
  
  cssAnimate(element, properties, options) {
    return new Promise((resolve) => {
      element.style.transition = `all ${options.duration || 1}s ${options.ease || 'ease'}`;
      
      Object.keys(properties).forEach(prop => {
        element.style[prop] = properties[prop];
      });
      
      // 动画完成后解析 Promise
      setTimeout(resolve, (options.duration || 1) * 1000);
    });
  }
  
  instantApply(element, properties) {
    Object.keys(properties).forEach(prop => {
      element.style[prop] = properties[prop];
    });
    return Promise.resolve();
  }
}

// 使用备份动画系统
const backupSystem = new BackupAnimationSystem();

backupSystem.animate(
  document.querySelector('.element'),
  { transform: 'translateX(100px)', opacity: 0.5 },
  { duration: 1, ease: 'ease-in-out' }
);
```
