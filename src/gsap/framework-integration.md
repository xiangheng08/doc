# 框架集成

GSAP 可以与各种前端框架无缝集成，以下是主要框架的集成方法和最佳实践。

## React 集成

### 组件生命周期管理

```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function AnimatedComponent() {
  const elementRef = useRef(null);
  
  useEffect(() => {
    // 组件挂载时执行动画
    const tl = gsap.timeline();
    
    tl.from(elementRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5
    });
    
    // 清理函数，在组件卸载时调用
    return () => {
      tl.kill(); // 销毁动画
    };
  }, []); // 空依赖数组，只在挂载时执行一次
  
  return <div ref={elementRef} className="animated-element">Hello GSAP!</div>;
}
```

### 状态驱动动画

```jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

function ToggleAnimation() {
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    gsap.to(elementRef.current, {
      scale: isActive ? 1.2 : 1,
      rotation: isActive ? 180 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isActive]); // 依赖状态变化
  
  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        Toggle Animation
      </button>
      <div 
        ref={elementRef} 
        className="toggle-element"
        style={{ width: 100, height: 100, background: 'blue' }}
      />
    </div>
  );
}
```

### useRef 与 GSAP 配合

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';

const AnimatedBox = forwardRef((props, ref) => {
  const boxRef = useRef(null);
  
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    animateIn: () => {
      gsap.from(boxRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.5
      });
    },
    
    animateOut: () => {
      gsap.to(boxRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.5
      });
    }
  }));
  
  return (
    <div 
      ref={boxRef} 
      style={{ 
        width: 100, 
        height: 100, 
        background: 'red',
        margin: 20
      }}
    />
  );
});

// 父组件使用
function ParentComponent() {
  const boxRef = useRef(null);
  
  return (
    <div>
      <button onClick={() => boxRef.current.animateIn()}>
        Animate In
      </button>
      <button onClick={() => boxRef.current.animateOut()}>
        Animate Out
      </button>
      <AnimatedBox ref={boxRef} />
    </div>
  );
}
```

### 性能优化技巧

```jsx
import React, { useMemo, useCallback } from 'react';
import gsap from 'gsap';

function OptimizedAnimation() {
  const elementRef = useRef(null);
  
  // 使用 useMemo 缓存复杂配置
  const animationConfig = useMemo(() => ({
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1
  }), []);
  
  // 使用 useCallback 缓存动画函数
  const handleAnimate = useCallback(() => {
    gsap.to(".item", {
      ...animationConfig,
      y: -20,
      repeat: 1,
      yoyo: true
    });
  }, [animationConfig]);
  
  return (
    <div>
      <button onClick={handleAnimate}>Animate Items</button>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

### 常见反模式与解决方案

```jsx
// ❌ 错误：在每次渲染时创建新动画
function BadExample() {
  const ref = useRef();
  
  // 每次渲染都会创建新的 timeline
  const tl = gsap.timeline(); // 问题：每次渲染都创建新实例
  
  useEffect(() => {
    tl.to(ref.current, { x: 100 });
  });
  
  return <div ref={ref}>Element</div>;
}

// ✅ 正确：在 useEffect 中创建动画
function GoodExample() {
  const ref = useRef();
  
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(ref.current, { x: 100 });
    
    return () => tl.kill();
  }, []);
  
  return <div ref={ref}>Element</div>;
}
```

## Vue 集成

### Composition API 使用

```vue
<template>
  <div>
    <button @click="toggleAnimation">Toggle</button>
    <div ref="elementRef" class="animated-element">
      Animated Element
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

export default {
  setup() {
    const elementRef = ref(null);
    let animationTimeline = null;
    
    const toggleAnimation = () => {
      if (animationTimeline) {
        animationTimeline.reversed(!animationTimeline.reversed());
      }
    };
    
    onMounted(() => {
      animationTimeline = gsap.timeline({ paused: true })
        .from(elementRef.value, {
          opacity: 0,
          y: 50,
          duration: 0.5
        });
    });
    
    onUnmounted(() => {
      if (animationTimeline) {
        animationTimeline.kill();
      }
    });
    
    return {
      elementRef,
      toggleAnimation
    };
  }
};
</script>
```

### 指令封装

```js
// gsap-directive.js
import gsap from 'gsap';

export const vGsap = {
  mounted(el, binding) {
    // binding.value 包含动画配置
    if (binding.value) {
      gsap.from(el, binding.value);
    }
  },
  
  updated(el, binding) {
    // 值更新时重新执行动画
    if (binding.value !== binding.oldValue) {
      gsap.to(el, binding.value);
    }
  },
  
  unmounted(el) {
    // 清理动画
    gsap.killTweensOf(el);
  }
};

// 在组件中使用
// <template>
//   <div v-gsap="{ opacity: 0, y: 50, duration: 0.5 }">
//     Animated content
//   </div>
// </template>
```

### 响应式数据绑定

```vue
<template>
  <div>
    <input v-model="progress" type="range" min="0" max="100">
    <div ref="progressBar" class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import gsap from 'gsap';

export default {
  setup() {
    const progress = ref(0);
    const progressBar = ref(null);
    
    // 监听进度变化并动画更新
    watch(progress, (newVal) => {
      gsap.to(progressBar.value.querySelector('.progress-fill'), {
        width: `${newVal}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    return {
      progress,
      progressBar
    };
  }
};
</script>
```

### 过渡动画增强

```vue
<template>
  <div>
    <transition 
      @enter="enter" 
      @leave="leave"
      :css="false"
    >
      <div v-if="isVisible" class="fade-element">
        Fade Element
      </div>
    </transition>
    <button @click="isVisible = !isVisible">
      Toggle
    </button>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  data() {
    return {
      isVisible: false
    };
  },
  
  methods: {
    enter(element, done) {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        onComplete: done
      });
    },
    
    leave(element, done) {
      gsap.to(element, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        onComplete: done
      });
    }
  }
};
</script>
```

### Nuxt.js 服务端渲染处理

```js
// plugins/gsap.client.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 只在客户端注册插件
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
  
  export default (context, inject) => {
    inject('gsap', gsap);
  };
}

// 在组件中使用
export default {
  mounted() {
    // 确保只在客户端执行
    if (process.client) {
      this.$gsap.to(this.$refs.element, {
        x: 100,
        duration: 1
      });
    }
  }
};
```

## Angular 集成

### 指令开发

```typescript
// gsap.directive.ts
import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appGsap]'
})
export class GsapDirective implements OnInit, OnDestroy {
  @Input() appGsap: any;
  @Input() appGsapFrom: any;
  
  private tween: gsap.core.Tween | null = null;
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    if (this.appGsapFrom) {
      this.tween = gsap.fromTo(
        this.el.nativeElement,
        this.appGsapFrom,
        this.appGsap
      );
    } else {
      this.tween = gsap.to(this.el.nativeElement, this.appGsap);
    }
  }
  
  ngOnDestroy() {
    if (this.tween) {
      this.tween.kill();
    }
  }
}

// 使用示例
// <div [appGsap]="{ x: 100, duration: 1 }">Animated Element</div>
// <div [appGsap]="{ duration: 1 }" [appGsapFrom]="{ opacity: 0, y: 50 }">
//   From/To Animation
// </div>
```

### 服务封装

```typescript
// animation.service.ts
import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  fadeIn(element: HTMLElement, duration: number = 0.5) {
    return gsap.from(element, {
      opacity: 0,
      duration
    });
  }
  
  slideIn(element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left') {
    const from = {};
    
    switch (direction) {
      case 'left':
        from['x'] = -100;
        break;
      case 'right':
        from['x'] = 100;
        break;
      case 'top':
        from['y'] = -100;
        break;
      case 'bottom':
        from['y'] = 100;
        break;
    }
    
    return gsap.from(element, {
      ...from,
      opacity: 0,
      duration: 0.5
    });
  }
  
  staggerAnimate(elements: HTMLElement[], config: gsap.TweenVars) {
    return gsap.to(elements, {
      ...config,
      stagger: 0.1
    });
  }
}

// 在组件中使用
@Component({
  // ...
})
export class MyComponent implements OnInit {
  constructor(private animationService: AnimationService) {}
  
  ngOnInit() {
    const elements = document.querySelectorAll('.item');
    this.animationService.staggerAnimate(
      Array.from(elements) as HTMLElement[],
      { y: -20, duration: 0.5 }
    );
  }
}
```

### 变更检测优化

```typescript
import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-animated-list',
  template: `
    <div class="list-item" *ngFor="let item of items; let i = index">
      {{ item }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedListComponent implements AfterViewInit {
  items = ['Item 1', 'Item 2', 'Item 3'];
  
  constructor(private el: ElementRef) {}
  
  ngAfterViewInit() {
    // 初始动画
    const items = this.el.nativeElement.querySelectorAll('.list-item');
    gsap.from(items, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5
    });
  }
}
```

### 模块化组织

```typescript
// gsap.module.ts
import { NgModule } from '@angular/core';
import { GsapDirective } from './gsap.directive';
import { AnimationService } from './animation.service';

@NgModule({
  declarations: [
    GsapDirective
  ],
  providers: [
    AnimationService
  ],
  exports: [
    GsapDirective
  ]
})
export class GsapModule {}

// 在 app.module.ts 中导入
// import { GsapModule } from './gsap/gsap.module';
//
// @NgModule({
//   imports: [
//     GsapModule
//   ]
// })
// export class AppModule { }
```

## 其他技术栈

### Svelte 集成

```svelte
<script>
  import gsap from 'gsap';
  import { onMount, onDestroy } from 'svelte';
  
  let element;
  let tween;
  
  onMount(() => {
    tween = gsap.to(element, {
      x: 100,
      duration: 1
    });
  });
  
  onDestroy(() => {
    if (tween) tween.kill();
  });
</script>

<div bind:this={element}>
  Animated element
</div>
```

### Next.js/Nuxt.js SSR

```js
// next.config.js
module.exports = {
  webpack: (config) => {
    // 确保 GSAP 只在客户端使用
    config.module.rules.push({
      test: /gsap/,
      sideEffects: true,
    });
    
    return config;
  },
};

// 在组件中
import dynamic from 'next/dynamic';

// 动态导入 GSAP 组件，只在客户端渲染
const AnimatedComponent = dynamic(
  () => import('../components/AnimatedComponent'),
  { ssr: false }
);
```

### TypeScript 类型支持

```typescript
// gsap.d.ts
import gsap from 'gsap';

declare module 'gsap' {
  interface TweenVars {
    // 扩展 GSAP 配置类型
    myCustomProperty?: string;
  }
}

// 使用自定义属性
gsap.to('.element', {
  x: 100,
  myCustomProperty: 'custom-value', // TypeScript 不会报错
  duration: 1
});
```

### 构建工具配置

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      gsap: 'gsap/dist/gsap.min.js'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        gsap: {
          test: /[\\/]node_modules[\\/]gsap/,
          name: 'gsap',
          chunks: 'all'
        }
      }
    }
  }
};

// vite.config.js
export default {
  resolve: {
    alias: {
      gsap: 'gsap/dist/gsap.min.js'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap']
        }
      }
    }
  }
};
```
