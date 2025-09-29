# 前端性能优化

前端性能优化是提升用户体验、降低服务器负载、提高转化率的重要手段。

## 性能指标

### 核心 Web 指标 (Core Web Vitals)

1. **Largest Contentful Paint (LCP)** - 最大内容绘制
   - 衡量加载性能
   - 目标值：< 2.5 秒

2. **First Input Delay (FID)** - 首次输入延迟
   - 衡量交互性
   - 目标值：< 100 毫秒

3. **Cumulative Layout Shift (CLS)** - 累积布局偏移
   - 衡量视觉稳定性
   - 目标值：< 0.1

## 优化策略

### 1. 资源加载优化

#### 代码分割

```js
// 使用动态导入进行代码分割
const HomePage = () => import('./HomePage.vue');
const AboutPage = () => import('./AboutPage.vue');

// Webpack 魔法注释
const ContactPage = () => import(
  /* webpackChunkName: "contact" */ 
  './ContactPage.vue'
);
```

#### 预加载和预获取

```html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">

<!-- 预获取可能需要的资源 -->
<link rel="prefetch" href="other-page.js">
```

#### 懒加载

```js
// 图片懒加载
<img v-lazy="imageSrc" alt="">

// 组件懒加载
const LazyComponent = () => import('./LazyComponent.vue');

// 选项卡内容懒加载
<template>
  <div v-if="activeTab === 'tab1'">
    <component-a />
  </div>
  <div v-else-if="activeTab === 'tab2'">
    <component-b />
  </div>
</template>
```

### 2. 网络优化

#### 资源压缩

```js
// Webpack 配置
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    })
  ]
};
```

#### HTTP/2

```nginx
# Nginx 配置启用 HTTP/2
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

#### CDN 使用

```html
<!-- 使用 CDN 加速静态资源 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
```

### 3. 渲染优化

#### 虚拟滚动

```vue
<template>
  <div class="virtual-list" @scroll="handleScroll">
    <div :style="{ height: totalHeight + 'px' }" class="container">
      <div 
        :style="{ transform: `translateY(${offsetY}px)` }" 
        class="visible-items"
      >
        <div 
          v-for="item in visibleItems" 
          :key="item.id" 
          class="item"
          :style="{ height: itemHeight + 'px' }"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // 所有数据
      itemHeight: 50,
      containerHeight: 400,
      visibleCount: 10,
      startIndex: 0
    };
  },
  computed: {
    totalHeight() {
      return this.items.length * this.itemHeight;
    },
    visibleItems() {
      return this.items.slice(
        this.startIndex, 
        this.startIndex + this.visibleCount
      );
    },
    offsetY() {
      return this.startIndex * this.itemHeight;
    }
  },
  methods: {
    handleScroll(e) {
      const scrollTop = e.target.scrollTop;
      this.startIndex = Math.floor(scrollTop / this.itemHeight);
    }
  }
};
</script>
```

#### 防抖和节流

```js
// 防抖函数
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const handleResize = debounce(() => {
  // 处理窗口大小变化
}, 300);

const handleScroll = throttle(() => {
  // 处理滚动事件
}, 100);
```

### 4. 缓存策略

#### Service Worker 缓存

```js
// service-worker.js
const CACHE_NAME = 'my-site-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 缓存命中则返回缓存，否则发起网络请求
        return response || fetch(event.request);
      })
  );
});
```

#### HTTP 缓存头

```nginx
# Nginx 配置
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## 性能监测工具

### Lighthouse

```bash
# 安装 Lighthouse
npm install -g lighthouse

# 运行性能审计
lighthouse https://example.com --view
```

### Web Vitals

```js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // 发送指标到分析服务
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance API

```js
// 测量自定义性能指标
performance.mark('start-init');

// 执行一些初始化操作
initApp();

performance.mark('end-init');
performance.measure('init-duration', 'start-init', 'end-init');

const measures = performance.getEntriesByName('init-duration');
console.log('Initialization took', measures[0].duration, 'milliseconds');
```

## 框架特定优化

### Vue.js 优化

```vue
<!-- 使用 v-show 而不是 v-if 进行频繁切换 -->
<div v-show="isVisible">经常切换的内容</div>

<!-- 使用 computed 缓存计算结果 -->
<template>
  <div>{{ expensiveValue }}</div>
</template>

<script>
export default {
  computed: {
    expensiveValue() {
      // 复杂计算，但会被缓存
      return this.items.filter(item => item.active)
                       .map(item => item.value)
                       .reduce((sum, value) => sum + value, 0);
    }
  }
};
</script>

<!-- 使用 keep-alive 缓存组件 -->
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```

### React 优化

```jsx
// 使用 React.memo 避免不必要的重渲染
const MyComponent = React.memo(({ data }) => {
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
});

// 使用 useMemo 缓存计算结果
function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.filter(item => item.active)
                .map(item => item.value)
                .reduce((sum, value) => sum + value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
}

// 使用 useCallback 缓存函数
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

## 相关链接

- [Web.dev 性能优化指南](https://web.dev/fast/)
- [Google Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse 官方文档](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals 官方文档](https://github.com/GoogleChrome/web-vitals)