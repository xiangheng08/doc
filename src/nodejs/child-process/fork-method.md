# fork 方法与IPC通信

## 方法定义
```js
const { fork } = require('child_process');
const child = fork(modulePath[, args][, options])
```

## 核心特性
### 专属 Node 进程
- 始终使用 Node 解释器执行
- 必须指定 JavaScript 模块路径
- 自动建立 IPC 通信通道

### 与 spawn 对比
```js
// fork 等效写法（底层实现）
spawn('node', ['child.js'], {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc']
})
```

## IPC 通信机制
### 基础通信模式
```js
// 父进程
const child = fork('./worker.js')
child.send({ cmd: 'start' })

// 子进程 (worker.js)
process.on('message', (msg) => {
  process.send({ result: msg.cmd + '_done' })
})
```

### 消息类型限制
- 支持 JSON 序列化数据
- 支持 Buffer/ TypedArray 类型
- **不支持** 函数/原型链对象

### 通道生命周期
```js
// 手动断开连接
child.disconnect()

// 自动断开条件：
// - 父子进程中任一方调用 disconnect()
// - 父子进程任一方退出
```

## 高级 IPC 模式
### 双向心跳检测
```js
// 父进程
child.on('message', (msg) => {
  if (msg.type === 'heartbeat') {
    child.send({ type: 'heartbeat_ack' })
  }
})

// 子进程
setInterval(() => {
  process.send({ type: 'heartbeat' })
}, 5000)
```

### 大文件传输
```js
// 发送 Buffer 数据
fs.readFile('large.zip', (err, data) => {
  child.send({ type: 'file', payload: data }, (err) => {
    console.log('发送完成')
  })
})
```

### 错误传递协议
```js
// 子进程异常处理
process.on('uncaughtException', (err) => {
  process.send({ 
    type: 'error',
    stack: err.stack,
    timestamp: Date.now()
  })
  process.exit(1)
})
```

## ✅ 最佳实践
### 进程管理策略
1. **集群分工**： 
```js
// 主进程
if (cluster.isPrimary) {
  fork('./http-worker.js')
  fork('./task-worker.js')
}
```

2. **优雅退出**：
```js
child.on('exit', (code) => {
  console.log(`子进程退出，自动重启...`)
  fork('./worker.js') // 自动重启
})
```

### 消息规范
1. **协议标准化**：
```js
// 消息结构示例
{
  version: '1.0',
  id: 'uuidv4()',
  type: 'request/response/event',
  payload: {}
}
```

2. **流量控制**：
```js
// 背压处理
let canSend = true
child.on('drain', () => {
  canSend = true
})

function sendData(data) {
  if (!canSend) return false
  canSend = child.send(data)
  return canSend
}
```

## ⚠️ 常见问题
### IPC 通道未建立
**现象**：  
调用 `.send()` 时报错 `ERR_IPC_CHANNEL_CLOSED`

**解决方案**：
```js
// 检查 fork 参数是否错误
fork('worker.js', [], {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // 必须包含 ipc
})
```

### 消息序列化失败
**错误案例**：
```js
// 发送无法序列化的对象
child.send({ 
  date: new Date(), // Date 对象会被转为字符串
  fn: () => {}      // 函数会被自动过滤
})
```

**安全方案**：
```js
child.send({
  date: Date.now(), // 转换为时间戳
  logic: 'update'   // 用指令代替函数
})
```

### 内存泄漏
**高危场景**：  
频繁发送大对象且未及时释放

**优化方案**：
```js
// 使用共享内存
const { SharedArrayBuffer } = require('worker_threads')
const sab = new SharedArrayBuffer(1024)
child.send({ buffer: sab }, [sab]) // 转移所有权
```

### 消息死锁
**典型场景**：  
父子进程相互等待响应

**解决模式**：
```js
// 添加超时机制
function request(msg, timeout = 5000) {
  return new Promise((resolve, reject) => {
    child.send(msg)
    const timer = setTimeout(() => {
      reject(new Error('请求超时'))
    }, timeout)
    
    child.once('message', (response) => {
      clearTimeout(timer)
      resolve(response)
    })
  })
}
```

## 调试技巧
### 消息追踪
```js
// 记录所有通信消息
child.on('message', (msg) => {
  console.log('← 收到子进程消息:', msg)
})

child.send = (function(original) {
  return function(msg) {
    console.log('→ 发送消息给子进程:', msg)
    return original.apply(child, arguments)
  }
})(child.send)
```

### 性能监控
```js
const start = Date.now()
child.send({ cmd: 'begin' })

child.once('message', (result) => {
  console.log(`处理耗时: ${Date.now() - start}ms`)
})
```

## 跨进程事件转发
```js
// 将子进程错误转发给父进程
child.on('message', (msg) => {
  if (msg.type === 'error') {
    emitter.emit('child-error', msg.payload)
  }
})
```
