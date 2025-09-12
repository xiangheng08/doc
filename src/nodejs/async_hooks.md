# Async Hooks 异步钩子

## 简介

Async Hooks 是 Node.js 提供的一个实验性 API，用于跟踪异步资源的生命周期。它允许开发者监控异步操作的创建、回调执行和销毁过程，对于调试、性能监控和请求追踪等场景非常有用。

Async Hooks 模块可以跟踪以下类型的异步资源：
- TCP 服务器套接字连接
- 文件系统操作
- 定时器 (setTimeout, setInterval)
- Promise
- process.nextTick()
- 异步函数调用
- 各种其他异步操作

```js
const async_hooks = require('node:async_hooks');

// 创建一个异步钩子
const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    console.log(`异步资源被创建: ${asyncId}, 类型: ${type}`);
  },
  before(asyncId) {
    console.log(`异步回调即将执行: ${asyncId}`);
  },
  after(asyncId) {
    console.log(`异步回调执行完毕: ${asyncId}`);
  },
  destroy(asyncId) {
    console.log(`异步资源被销毁: ${asyncId}`);
  }
});

// 启用钩子
asyncHook.enable();
```

## 核心概念

### 异步资源
异步资源是指具有关联回调的对象。这些回调可能会被多次调用（如 `net.createServer()` 中的 'connection' 事件）或只调用一次（如 `fs.open()`）。

### Async ID
每个异步资源都有一个唯一的 asyncId，用于标识该资源。

### Trigger Async ID
triggerAsyncId 表示触发当前异步资源创建的资源 ID，用于构建异步调用链。

## API 详解

### `async_hooks.createHook(callbacks)`

创建一个新的 AsyncHook 实例。callbacks 是一个包含以下可选函数的对象：

```js
const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // 在异步资源被创建时调用
  },
  before(asyncId) {
    // 在异步回调被调用之前执行
  },
  after(asyncId) {
    // 在异步回调执行完毕后执行
  },
  destroy(asyncId) {
    // 在异步资源被销毁时调用
  },
  promiseResolve(asyncId) {
    // 当 promise 被 resolve 时调用
  }
});
```

#### `init(asyncId, type, triggerAsyncId, resource)`

- `asyncId`: 新异步资源的唯一标识符
- `type`: 异步资源的类型（如 'TCPWRAP', 'PROMISE', 'TIMEOUT' 等）
- `triggerAsyncId`: 触发该异步资源创建的资源 ID
- `resource`: 对该异步资源的引用

```js
const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    console.log(`资源类型: ${type}`);
    console.log(`资源ID: ${asyncId}`);
    console.log(`触发者ID: ${triggerAsyncId}`);
    
    // 根据资源类型进行不同处理
    if (type === 'PROMISE') {
      console.log('这是一个 Promise 资源');
    }
  }
});

asyncHook.enable();
```

#### `before(asyncId)`

在异步回调被调用之前执行。每个异步资源的回调只会调用一次 before 钩子。

#### `after(asyncId)`

在异步回调执行完毕后执行。即使回调抛出异常，after 钩子也会被调用。

#### `destroy(asyncId)`

在异步资源被销毁时调用。

#### `promiseResolve(asyncId)`

当 promise 被 resolve 时调用，而不是在执行 then() 回调时调用。

### `asyncHook.enable()`

启用异步钩子，使其开始监听异步资源的生命周期事件。

### `asyncHook.disable()`

禁用异步钩子，停止监听异步资源的生命周期事件。

```js
const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log(`资源创建: ${type} (${asyncId})`);
  }
});

// 启用钩子
asyncHook.enable();

// 执行一些异步操作
setTimeout(() => {
  console.log('定时器执行');
}, 100);

// 禁用钩子
asyncHook.disable();
```

## 工具函数

### `async_hooks.executionAsyncId()`

返回当前执行上下文的 asyncId。

```js
const async_hooks = require('node:async_hooks');

console.log(async_hooks.executionAsyncId()); // 1 - 默认上下文

setTimeout(() => {
  console.log(async_hooks.executionAsyncId()); // 定时器的 asyncId
}, 100);
```

### `async_hooks.triggerAsyncId()`

返回触发当前异步资源创建的 asyncId。

```js
const async_hooks = require('node:async_hooks');

console.log(async_hooks.triggerAsyncId()); // 1 - 默认上下文

setTimeout(() => {
  console.log(async_hooks.triggerAsyncId()); // 触发定时器的 asyncId
}, 100);
```

### `async_hooks.executionAsyncResource()`

返回当前执行上下文的资源对象。

## `AsyncResource`

`AsyncResource` 类用于包装自定义异步资源，确保正确的异步上下文跟踪。

```js
const { AsyncResource } = require('node:async_hooks');

class DatabaseRequest extends AsyncResource {
  constructor(db) {
    super('DatabaseRequest');
    this.db = db;
  }

  lookup(id, callback) {
    // 在异步执行前调用 runInAsyncScope
    this.runInAsyncScope(callback, null, null, this.db.query(id));
  }

  close() {
    this.db.close();
    // 在资源销毁时调用 emitDestroy
    this.emitDestroy();
  }
}
```

### `new AsyncResource(type[, options])`

- `type`: 异步事件的类型
- `options`: 
  - `triggerAsyncId`: 触发该异步资源的 asyncId
  - `requireManualDestroy`: 是否需要手动调用 `emitDestroy()`

### `asyncResource.runInAsyncScope(fn[, thisArg, ...args])`

在异步资源的上下文中执行函数。

### `asyncResource.emitDestroy()`

调用 destroy 钩子。

### `asyncResource.asyncId()`

返回该异步资源的唯一 ID。

### `asyncResource.triggerAsyncId()`

返回触发该异步资源创建的 asyncId。

## `AsyncLocalStorage`

`AsyncLocalStorage` 用于在异步操作中维护上下文数据。

```js
const { AsyncLocalStorage } = require('node:async_hooks');

const als = new AsyncLocalStorage();

function logWithId(msg) {
  const id = als.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
function runWithId(fn) {
  als.run(idSeq++, fn);
}

// 示例应用
runWithId(() => {
  logWithId('开始');
  setImmediate(() => {
    logWithId('稍后');
  });
});

runWithId(() => {
  logWithId('另一个');
  process.nextTick(() => {
    logWithId('下一个事件循环');
  });
});
```

### `new AsyncLocalStorage()`

创建一个新的 AsyncLocalStorage 实例。

### `asyncLocalStorage.disable()`

禁用实例，在后续调用中 `getStore()` 将返回 undefined。

### `asyncLocalStorage.getStore()`

返回当前上下文的存储值。

### `asyncLocalStorage.run(store, callback[, ...args])`

在提供的存储值上下文中运行回调函数。

### `asyncLocalStorage.enterWith(store)`

将当前上下文过渡到使用提供的值。

## 实际应用示例

### 请求追踪

```js
const http = require('node:http');
const fs = require('node:fs');
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

// 简单的日志函数
function logWithId(msg) {
  const requestId = asyncLocalStorage.getStore();
  console.log(`请求 ${requestId}: ${msg}`);
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 为每个请求生成唯一 ID
  const requestId = Math.random().toString(36).slice(2);
  
  asyncLocalStorage.run(requestId, () => {
    logWithId('开始处理请求');
    
    // 模拟异步操作
    fs.readFile('data.txt', 'utf8', (err, data) => {
      if (err) {
        logWithId('文件读取失败');
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      logWithId('文件读取成功');
      res.end(data);
    });
  });
});

server.listen(8000, () => {
  console.log('服务器运行在端口 8000');
});
```

### 性能监控

```js
const async_hooks = require('node:async_hooks');
const { performance } = require('node:perf_hooks');

// 存储异步资源的开始时间
const asyncTiming = new Map();

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    // 记录异步资源的开始时间
    asyncTiming.set(asyncId, performance.now());
  },
  destroy(asyncId) {
    // 计算异步资源的生命周期
    const startTime = asyncTiming.get(asyncId);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`异步资源 ${asyncId} 存活时间: ${duration.toFixed(2)}ms`);
      asyncTiming.delete(asyncId);
    }
  }
});

asyncHook.enable();

// 示例异步操作
setTimeout(() => {
  console.log('定时器执行');
}, 100);

setImmediate(() => {
  console.log('立即执行');
});

Promise.resolve().then(() => {
  console.log('Promise 执行');
});
```

## 注意事项

1. **性能影响**: Async Hooks 会带来一定的性能开销，不应在生产环境中无限制使用
2. **避免异步操作**: 在钩子回调中避免执行异步操作，可能导致无限递归
3. **错误处理**: 在钩子回调中发生的错误需要妥善处理，避免影响主程序
4. **实验性功能**: Async Hooks 仍处于实验阶段，API 可能发生变化

## 相关链接

- [Node.js Async Hooks 官方文档](https://nodejs.org/api/async_hooks.html)
- [Events](./events.md)
- [Performance Hooks](./perf_hooks.md)
