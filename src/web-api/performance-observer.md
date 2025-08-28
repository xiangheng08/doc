# PerformanceObserver

## 简介

PerformanceObserver API 提供了一种异步监听浏览器性能相关事件的机制。它允许我们订阅各种性能事件，如页面加载、资源加载、用户交互延迟等，并在这些事件发生时执行回调函数。这比传统的轮询 Performance API 获取数据的方式更加高效。

PerformanceObserver 特别适用于以下场景：
- 监控页面加载性能
- 分析资源加载时间
- 测量用户交互延迟
- 收集长期性能数据以进行分析

## 核心概念

在深入了解 API 之前，我们需要理解几个关键概念：

- **性能条目（Performance Entry）**：表示单个性能指标的数据对象，如导航时间、资源加载时间等
- **性能条目类型（Entry Types）**：不同类型的性能指标，如 'navigation'、'resource'、'measure' 等
- **观察者（Observer）**：监听特定类型性能事件的对象
- **缓冲（Buffer）**：存储尚未处理的性能条目的队列

## 基本语法

创建一个 PerformanceObserver 实例的基本语法如下：

```js
const observer = new PerformanceObserver(callback);
observer.observe(options);
```

其中：
- `callback`：当性能事件发生时触发的回调函数
- `options`：配置对象，指定要观察的性能条目类型

## 实际应用

### 监控页面加载性能

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log('页面加载时间:', entry.loadEventEnd - entry.loadEventStart);
      console.log('DNS 查询时间:', entry.domainLookupEnd - entry.domainLookupStart);
      console.log('TCP 连接时间:', entry.connectEnd - entry.connectStart);
    }
  }
});

observer.observe({ entryTypes: ['navigation'] });
```

### 监控资源加载性能

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) {
      console.warn('资源加载时间过长:', entry.name, entry.duration, 'ms');
    }
  }
});

observer.observe({ entryTypes: ['resource'] });
```

### 监控用户交互延迟

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) {
      console.warn('用户交互延迟过高:', entry.name, entry.duration, 'ms');
    }
  }
});

observer.observe({ entryTypes: ['event', 'first-input'] });
```

## 配置选项详解

### entryTypes选项

指定要观察的性能条目类型数组：

```js
// 观察多种类型的性能条目
observer.observe({
  entryTypes: ['navigation', 'resource', 'mark', 'measure']
});
```

### type选项

指定要观察的单个性能条目类型：

```js
// 只观察导航性能条目
observer.observe({ type: 'navigation' });

// 只观察资源性能条目
observer.observe({ type: 'resource' });
```

### buffered选项

设置为 `true` 时，获取观察之前发生的性能条目：

```js
// 获取缓冲的性能条目
observer.observe({ 
  type: 'navigation',
  buffered: true
});
```

## 常用性能条目类型

### navigation（导航）

提供页面导航相关的性能指标：

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntriesByType('navigation')) {
    console.log('DNS 查询时间:', entry.domainLookupEnd - entry.domainLookupStart);
    console.log('TCP 连接时间:', entry.connectEnd - entry.connectStart);
    console.log('请求时间:', entry.responseStart - entry.requestStart);
    console.log('响应时间:', entry.responseEnd - entry.responseStart);
    console.log('DOM 解析时间:', entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart);
    console.log('页面加载时间:', entry.loadEventEnd - entry.loadEventStart);
  }
});

observer.observe({ type: 'navigation', buffered: true });
```

### resource（资源）

提供资源加载相关的性能指标：

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntriesByType('resource')) {
    console.log('资源名称:', entry.name);
    console.log('资源类型:', entry.initiatorType);
    console.log('传输大小:', entry.transferSize);
    console.log('加载时间:', entry.duration);
  }
});

observer.observe({ type: 'resource' });
```

### measure（测量）

提供自定义测量相关的性能指标：

```js
// 创建自定义测量
performance.mark('start');
// 执行一些操作
doSomething();
performance.mark('end');
performance.measure('operation', 'start', 'end');

// 监听测量结果
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntriesByType('measure')) {
    console.log('操作耗时:', entry.duration, 'ms');
  }
});

observer.observe({ type: 'measure' });
```

## 回调函数参数

回调函数接收两个参数：

```js
const callback = (list, observer) => {
  // list 是 PerformanceObserverEntryList 对象
  console.log(list.getEntries());        // 获取所有条目
  console.log(list.getEntriesByType('navigation')); // 按类型获取条目
  console.log(list.getEntriesByName('resourceName')); // 按名称获取条目
  
  // observer 是 PerformanceObserver 实例
  console.log(observer);
};

const observer = new PerformanceObserver(callback);
```

## 实例方法

### observe()

开始观察指定类型的性能事件：

```js
const observer = new PerformanceObserver(callback);

// 观察多种类型
observer.observe({ entryTypes: ['navigation', 'resource'] });

// 观察单个类型
observer.observe({ type: 'measure' });
```

### disconnect()

停止观察所有性能事件：

```js
observer.disconnect();
```

### takeRecords()

获取当前缓冲区中的所有性能条目并清空缓冲区：

```js
const entries = observer.takeRecords();
// 处理条目
processEntries(entries);
```

## 实际应用场景

### 性能监控和报告

```js
class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    // 监控页面加载性能
    this.observeNavigation();
    
    // 监控资源加载性能
    this.observeResources();
    
    // 监控长任务
    this.observeLongTasks();
  }
  
  observeNavigation() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // 发送性能数据到分析服务
        this.reportPerformance('navigation', {
          url: entry.name,
          loadTime: entry.loadEventEnd - entry.loadEventStart,
          domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
        });
      }
    });
    
    observer.observe({ type: 'navigation', buffered: true });
  }
  
  observeResources() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
          // 记录加载时间过长的资源
          this.reportPerformance('slow_resource', {
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize
          });
        }
      }
    });
    
    observer.observe({ type: 'resource' });
  }
  
  observeLongTasks() {
    if ('PerformanceLongTaskTiming' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // 记录长任务影响用户体验
          this.reportPerformance('long_task', {
            duration: entry.duration,
            startTime: entry.startTime
          });
        }
      });
      
      observer.observe({ type: 'longtask' });
    }
  }
  
  reportPerformance(type, data) {
    // 发送性能数据到服务器
    fetch('/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data, timestamp: Date.now() })
    }).catch(err => console.error('性能数据上报失败:', err));
  }
}

// 使用性能监控器
const monitor = new PerformanceMonitor();
```

### 用户体验优化

```js
// 监控首次内容绘制（FCP）
const fcpObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('首次内容绘制:', entry.startTime, 'ms');
    
    // 根据FCP优化用户体验
    if (entry.startTime > 2000) {
      // FCP超过2秒，可能需要优化
      console.warn('页面加载较慢，FCP:', entry.startTime, 'ms');
      // 可以显示加载提示或采取其他措施
    }
  }
});

fcpObserver.observe({ type: 'paint', buffered: true });

// 监控最大内容绘制（LCP）
const lcpObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('最大内容绘制:', entry.startTime, 'ms');
    
    if (entry.startTime > 2500) {
      // LCP超过2.5秒，需要优化
      console.warn('LCP性能不佳:', entry.startTime, 'ms');
    }
  }
});

lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
```

## 浏览器兼容性

PerformanceObserver 在现代浏览器中有良好的支持，但不同类型的性能条目支持情况可能不同：

```js
// 检查浏览器支持
if ('PerformanceObserver' in window) {
  // 检查特定条目类型的支持
  if (PerformanceObserver.supportedEntryTypes.includes('navigation')) {
    // 支持 navigation 类型
    const observer = new PerformanceObserver(callback);
    observer.observe({ type: 'navigation' });
  }
} else {
  // 降级处理方案
  console.warn('浏览器不支持 PerformanceObserver');
}
```

## 性能优化建议

1. **及时取消观察**：当不再需要监听性能事件时，使用 `disconnect()` 方法
2. **避免频繁处理**：在回调函数中避免执行复杂操作，可以将数据发送到队列中批量处理
3. **选择合适的条目类型**：只观察需要的性能条目类型，避免不必要的性能开销
4. **使用 buffered 选项**：对于需要获取历史数据的场景，使用 buffered: true 选项

## 与其他技术对比

| 特性 | PerformanceObserver | 定时轮询 Performance API | 手动打点 |
|------|---------------------|--------------------------|----------|
| 性能 | 高（异步、事件驱动） | 中（定时执行） | 高（但需要手动管理） |
| 实现复杂度 | 简单 | 简单但效率低 | 复杂 |
| 实时性 | 高 | 取决于轮询间隔 | 高 |
| 浏览器支持 | 现代浏览器 | 所有浏览器 | 所有浏览器 |

## 相关资源

- [MDN PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)
- [Web Performance APIs](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
- [W3C Performance Timeline](https://w3c.github.io/performance-timeline/)
- [Can I Use: PerformanceObserver](https://caniuse.com/mdn-api_performanceobserver)