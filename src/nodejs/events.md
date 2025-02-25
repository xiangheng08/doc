# Events 模块

Node.js 的 `events` 模块是异步事件驱动架构的核心，提供 `EventEmitter` 类用于处理事件订阅与发布。通过 `require('events')` 引入。

## EventEmitter 类

### 核心方法

#### `emitter.on(eventName, listener)`
- 订阅事件
- 参数：
  - `eventName` (String | Symbol)
  - `listener` (...args: any[]) => void
- 返回：EventEmitter 实例

```js
emitter.on('data', (data) => {
  console.log('Received data:', data);
});
```

#### `emitter.emit(eventName[, ...args])`
- 同步触发事件
- 返回：Boolean（是否有监听器）
- 重要特性：同步调用所有监听器

```js
emitter.emit('data', { id: 1 }); // 同步执行
```

#### `emitter.once(eventName, listener)`
- 单次订阅（触发后自动移除）
- 适用于初始化场景

```js
emitter.once('db-connected', () => {
  startServer();
});
```

#### `emitter.removeListener(eventName, listener)`
- 移除指定监听器
- 需保持函数引用

```js
const listener = () => console.log('Debug');
emitter.on('debug', listener);
emitter.removeListener('debug', listener);
```

### 其他关键方法
| 方法                    | 说明                    |
| ----------------------- | ----------------------- |
| `prependListener()`     | 前置添加监听器          |
| `prependOnceListener()` | 前置添加单次监听器      |
| `off()`                 | removeListener 的别名   |
| `removeAllListeners()`  | 移除全部/指定事件监听器 |
| `eventNames()`          | 获取所有已注册事件名称  |

### 重要属性
- `emitter.getMaxListeners()`：获取最大监听器数
- `emitter.setMaxListeners(n)`：设置最大监听器数
- `emitter.listenerCount(eventName)`：统计监听器数量
- `emitter.listeners(eventName)`：获取监听器数组

## ✅ 最佳实践

### 错误处理规范
```js
// 必须处理 error 事件
emitter.on('error', (err) => {
  console.error('Emitter Error:', err.message);
});
```

### 内存管理
- 及时移除不再需要的监听器
- 避免循环引用（特别是在对象间传递 emitter 时）

### 性能优化
```js
// 异步处理耗时操作
emitter.on('process', async (data) => {
  await heavyProcessing(data); // 避免阻塞事件循环
});
```

### 事件命名规范
- 使用小写字母和短横线命名法（e.g. `user-registered`）
- 避免使用 Node.js 保留事件名（如 `newListener`）

## ⚠️ 常见问题

### 监听器执行顺序
监听器按注册顺序同步执行，可通过 `prependListener` 调整优先级

### 内存泄漏场景
```js
// 错误示例：未移除监听器导致内存泄漏
function createConnection() {
  const emitter = new EventEmitter();
  emitter.on('data', processData);
  return emitter;
}

// 正确做法：在适当时机调用 removeListener
```

### 最大监听器警告
当超过默认 10 个监听器时：
```js
// 调整限制或检查代码合理性
emitter.setMaxListeners(20);
```

### 异步事件触发
```js
// 确保先注册监听器再触发事件
setTimeout(() => {
  emitter.emit('async-event');
}, 100);

emitter.on('async-event', () => {
  // 保证能被执行
});
```

## 扩展模式

### 类继承模式
```js
class Database extends EventEmitter {
  constructor() {
    super();
    this.connect();
  }

  async connect() {
    try {
      await establishConnection();
      this.emit('connected');
    } catch (err) {
      this.emit('error', err);
    }
  }
}
```

### 事件代理模式
```js
const eventBus = new EventEmitter();

// 跨模块使用
// moduleA.js
eventBus.on('config-loaded', initApp);

// moduleB.js
eventBus.emit('config-loaded', config);
```
