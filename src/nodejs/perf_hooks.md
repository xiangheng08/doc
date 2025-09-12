# Perf Hooks 性能测量

## 简介

`perf_hooks` 模块是 Node.js 提供的一个性能监控工具，它允许开发者在应用程序中测量和监控代码的执行性能。这个模块提供了高精度的性能计时功能，可以帮助识别代码中的性能瓶颈。

`perf_hooks` 是 "Performance Hooks" 的缩写，它基于 Web Performance API 标准实现，为 Node.js 应用提供了性能测量能力。

```js
const { performance } = require('node:perf_hooks');

// 基本性能测量示例
const startTime = performance.now();

// 执行一些操作
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

// 记录结束时间
const endTime = performance.now();
console.log(`这段代码执行耗时: ${endTime - startTime} 毫秒`);
```

## 核心概念

### 高精度时间戳

`perf_hooks` 模块提供了纳秒级别的精度，比 `Date.now()` 和 `console.time()` 更精确：

```js
const { performance } = require('node:perf_hooks');

// Date.now() 只能精确到毫秒级别
console.log(Date.now()); // 1645897234567

// performance.now() 提供更高精度
console.log(performance.now()); // 12345.678901234
```

### 性能时间线

性能时间线允许在代码的特定点创建标记，然后测量这些标记之间的时间间隔。

## 主要 API

### `performance.now()` {#performance.now}

返回当前高精度时间戳，单位为毫秒，相对于 [performance.timeOrigin](#performance.timeOrigin)。

```js
const { performance } = require('node:perf_hooks');

const start = performance.now();
setTimeout(() => {
  const end = performance.now();
  console.log(`setTimeout 执行耗时: ${end - start} 毫秒`);
}, 10);
```

### `performance.timeOrigin` {#performance.timeOrigin}

返回性能测量开始时的时间戳，是 [performance.now()](#performance.now) 的起点。

```js
const { performance } = require('node:perf_hooks');

console.log(performance.timeOrigin); // 1645897234567.123
console.log(performance.now());      // 12345.678
```

### `performance.mark(name)` {#performance.mark}

在性能时间线中创建一个命名的时间戳标记。

```js
const { performance } = require('node:perf_hooks');

performance.mark('start');
// 执行一些操作
performance.mark('end');
```

### `performance.measure(name, startMark, endMark)` {#performance.measure}

测量两个标记之间的时间间隔。

```js
const { performance } = require('node:perf_hooks');

performance.mark('A');
doSomeOperation();
performance.mark('B');

// 测量 A 到 B 的时间
performance.measure('A to B', 'A', 'B');

// 测量某个标记到当前时间
performance.measure('Start to Now', 'A');
```

### `performance.getEntries()` {#performance.getEntries}

返回性能时间线中的所有条目。

```js
const { performance } = require('node:perf_hooks');

performance.mark('A');
performance.mark('B');
performance.measure('A to B', 'A', 'B');

const entries = performance.getEntries();
entries.forEach((entry) => {
  console.log(entry.entryType, entry.name, entry.duration);
});
```

### `performance.getEntriesByName(name[, type])` {performance.getEntriesByName}

根据名称获取性能条目。

```js
const { performance } = require('node:perf_hooks');

performance.mark('A');
performance.mark('B');
performance.measure('A to B', 'A', 'B');

const measures = performance.getEntriesByName('A to B', 'measure');
measures.forEach((measure) => {
  console.log(measure.duration);
});
```

### `performance.getEntriesByType(type)` {#performance.getEntriesByType}

根据类型获取性能条目。

```js
const { performance } = require('node:perf_hooks');

performance.mark('A');
performance.mark('B');

const marks = performance.getEntriesByType('mark');
marks.forEach((mark) => {
  console.log(mark.name, mark.startTime);
});
```

### `performance.clearMarks([name])` {#performance.clearMarks}

清除性能时间线中的标记。

```js
const { performance } = require('node:perf_hooks');

performance.mark('A');
performance.mark('B');

// 清除所有标记
performance.clearMarks();

// 或者清除特定标记
performance.clearMarks('A');
```

### `performance.clearMeasures([name])` {#performance.clearMeasures}

清除性能时间线中的测量结果。

```js
const { performance } = require('node:perf_hooks');

performance.measure('A to B', 'A', 'B');

// 清除所有测量结果
performance.clearMeasures();

// 或者清除特定测量结果
performance.clearMeasures('A to B');
```

### `performance.timerify(fn)` {#performance.timerify}

将一个函数包装起来，使其执行时间可以被测量。

```js
const { performance } = require('node:perf_hooks');

function doWork() {
  // 模拟一些工作
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
}

// 使用 timerify 包装函数
const timedDoWork = performance.timerify(doWork);

timedDoWork();

// 获取函数执行时间
const entries = performance.getEntriesByType('function');
entries.forEach((entry) => {
  console.log(`函数 ${entry.name} 执行耗时: ${entry.duration} 毫秒`);
});
```

## `PerformanceObserver` {#PerformanceObserver}

`PerformanceObserver` 用于观察性能测量事件的类，提供了观察者模式来持续监控特定类型的性能指标。

```js
const { PerformanceObserver, performance } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.entryType, entry.name, entry.duration);
  });
  
  performance.clearMarks();
  performance.clearMeasures();
});

// 观察特定类型的性能条目
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('A');
doSomeOperation();
performance.mark('B');
performance.measure('A to B', 'A', 'B');
```

### `PerformanceObserver.observe(options)` {#PerformanceObserver.observe}

开始观察性能条目。

```js
const { PerformanceObserver } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries());
});

// 观察多种类型的条目
obs.observe({ 
  entryTypes: ['mark', 'measure', 'function', 'gc'] 
});

// 或者观察单个类型
obs.observe({ type: 'measure' });
```

### `PerformanceObserver.disconnect()` {#PerformanceObserver.disconnect}

停止观察性能条目。

```js
const { PerformanceObserver } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries());
});

obs.observe({ entryTypes: ['measure'] });

// 在某个时候停止观察
obs.disconnect();
```

## 实际应用场景

### API 响应时间监控

```js
const { performance } = require('node:perf_hooks');

// Express 中间件示例
function performanceMiddleware(req, res, next) {
  const start = performance.now();
  
  res.on('finish', () => {
    const duration = performance.now() - start;
    console.log(`${req.method} ${req.url} ${duration.toFixed(2)}ms`);
  });
  
  next();
}

// 使用中间件
// app.use(performanceMiddleware);
```

### 函数性能分析

```js
const { performance, PerformanceObserver } = require('node:perf_hooks');

// 创建观察者来监听函数性能条目
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`函数 ${entry.name} 执行耗时: ${entry.duration.toFixed(2)}ms`);
  });
});

obs.observe({ entryTypes: ['function'] });

// 要分析的函数
function slowFunction() {
  // 模拟耗时操作
  for (let i = 0; i < 10000000; i++) {
    Math.sqrt(i);
  }
  return 'done';
}

// 使用 timerify 包装函数
const timedSlowFunction = performance.timerify(slowFunction);

// 调用包装后的函数
const result = timedSlowFunction();
console.log(result);
```

### 数据库查询性能监控

```js
const { performance } = require('node:perf_hooks');

class Database {
  async query(sql) {
    const markName = `db-query-${Date.now()}`;
    performance.mark(markName);
    
    try {
      // 模拟数据库查询
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
      return { data: 'result', sql };
    } finally {
      performance.mark(`${markName}-end`);
      performance.measure(`DB Query: ${sql}`, markName, `${markName}-end`);
    }
  }
}

// 监控数据库查询性能
const obs = new PerformanceObserver((items) => {
  items.getEntriesByType('measure').forEach((entry) => {
    if (entry.name.startsWith('DB Query')) {
      console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
    }
  });
});

obs.observe({ entryTypes: ['measure'] });

// 使用示例
(async () => {
  const db = new Database();
  await db.query('SELECT * FROM users');
  await db.query('SELECT * FROM orders');
})();
```

### HTTP 请求性能监控

```js
const { performance } = require('node:perf_hooks');
const http = require('node:http');

// 创建 HTTP 服务器性能监控
const obs = new PerformanceObserver((items) => {
  items.getEntriesByType('measure').forEach((entry) => {
    if (entry.name.startsWith('HTTP Request')) {
      console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
    }
  });
});

obs.observe({ entryTypes: ['measure'] });

const server = http.createServer((req, res) => {
  const markName = `http-request-${Date.now()}`;
  performance.mark(markName);
  
  // 模拟处理时间
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
    
    performance.mark(`${markName}-end`);
    performance.measure(`HTTP Request: ${req.method} ${req.url}`, markName, `${markName}-end`);
  }, Math.random() * 100);
});

server.listen(3000, () => {
  console.log('服务器运行在端口 3000');
});
```

## 性能直方图 (Histogram)

Node.js 11.10.0+ 版本引入了性能直方图功能，用于统计性能数据的分布。

```js
const { PerformanceObserver, monitorEventLoopDelay } = require('node:perf_hooks');

// 创建事件循环延迟监控
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

// 模拟一些负载
setInterval(() => {
  const start = process.hrtime.bigint();
  while (process.hrtime.bigint() - start < 100000000n); // 100ms
}, 1000);

// 监控直方图数据
const obs = new PerformanceObserver((list, observer) => {
  const entry = list.getEntries()[0];
  console.log('事件循环延迟统计:');
  console.log(`  平均值: ${h.mean.toFixed(2)}ms`);
  console.log(`  最大值: ${h.max.toFixed(2)}ms`);
  console.log(`  标准差: ${h.stddev.toFixed(2)}ms`);
  console.log(`  百分位数 (50%): ${h.percentile(50).toFixed(2)}ms`);
  console.log(`  百分位数 (99%): ${h.percentile(99).toFixed(2)}ms`);
});

obs.observe({ entryTypes: ['histogram'], buffered: true });

// 5秒后打印结果并退出
setTimeout(() => {
  h.disable();
  obs.disconnect();
}, 5000);
```

## 最佳实践
1. **选择合适的精度**：使用 [performance.now()](#performance.now) 而不是 `Date.now()` 进行性能测量
2. **合理使用标记**：在关键点使用 [performance.mark()](#performance.mark) 创建标记，便于后续分析
3. **及时清理数据**：使用 [performance.clearMarks()](#performance.clearMarks) 和 [performance.clearMeasures()](#performance.clearMeasures) 清理不需要的性能数据
4. **避免过度监控**：性能监控本身会带来开销，在生产环境中应适度使用
5. **使用观察者模式**：通过 [PerformanceObserver](#PerformanceObserver) 实现实时性能监控
6. **函数性能分析**：使用 [performance.timerify()](#performance.timerify()) 分析函数执行性能

## 注意事项
1. **性能开销**：perf_hooks 的性能测量本身会带来一定的性能开销，在生产环境中应谨慎使用
2. **时间测量准确性**：时间测量结果会受到系统负载和其他因素的影响，应多次测量取平均值
3. **版本兼容性**：在 Node.js 的不同版本中，perf_hooks 的实现可能有所差异，应注意版本兼容性
4. **内存使用**：频繁的性能测量会产生大量数据，需要及时清理以避免内存泄漏

## 相关链接

- [Node.js perf_hooks 官方文档](https://nodejs.org/api/perf_hooks.html)
- [Web Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
- [Async Hooks](./async_hooks.md)
- [Process](./process.md)
