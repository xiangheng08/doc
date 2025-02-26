# net 模块

## 核心方法
```js
const net = require('net');

// 创建服务器
const server = net.createServer((socket) => {
  // 连接处理逻辑
});

// 客户端连接
const client = net.connect({ port: 8080 }, () => {
  // 连接成功回调
});
```

---

## 模块方法详解

### 服务器端
1. `net.createServer([options][, connectionListener])`
   ```js
   const server = net.createServer({
     allowHalfOpen: false,    // 是否允许半开连接
     pauseOnConnect: false    // 是否暂停socket数据流
   });
   ```

2. `server.listen()`
   ```js
   // 多种监听方式
   server.listen(3000);
   server.listen({ port: 3000, host: '0.0.0.0', backlog: 511 });
   server.listen('/tmp/echo.sock');
   ```

### 客户端
1. `net.connect(options[, connectListener])`
   ```js
   // 自动重连实现
   function createAutoReconnectClient() {
     const client = net.connect(8080);
     client.on('close', () => setTimeout(createAutoReconnectClient, 1000));
     return client;
   }
   ```

---

## 关键属性速查

### Socket 核心属性
```js
socket.localAddress  // 本地IP地址
socket.remotePort   // 客户端端口号
socket.bytesRead    // 已接收字节数
socket.bytesWritten // 已发送字节数
socket.destroyed    // 连接状态检测
```

---

## 事件处理模板

### 服务器事件
```js
server.on('connection', (socket) => {
  socket.setEncoding('utf8');
  socket.setTimeout(30000); // 30秒超时
});

server.on('error', (err) => {
  console.error(`Server error: ${err.stack}`);
});
```

### Socket 事件
```js
socket.on('data', (data) => {
  // 处理数据时建议使用缓冲
});

socket.on('end', () => {
  // 客户端正常断开
});

socket.on('error', (err) => {
  // ECONNRESET需要特别处理
  if (err.code === 'ECONNRESET') {
    console.log('客户端强制断开连接');
  }
});
```


## ✅ 最佳实践

### 性能优化
1. 使用连接池管理TCP连接
2. 启用Nagle算法优化小数据包（默认启用）
3. 高并发时考虑cluster模块

### 安全实践
```js
// 限制最大连接数
server.maxConnections = 1000;

// DDOS防护
server.on('connection', (socket) => {
  if (server.connections > 800) {
    socket.destroy();
  }
});
```

### 调试技巧
```js
// 流量监控
socket.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

// 内存泄漏检测
setInterval(() => {
  const used = process.memoryUsage().heapUsed;
  console.log(`Memory usage: ${Math.round(used / 1024 / 1024)} MB`);
}, 5000);
```


## ⚠️ 常见问题

### 连接中断处理
```js
// 心跳检测机制
socket.setKeepAlive(true, 60000); // 60秒心跳
```

### 粘包问题
```js
// 使用定界符
const DELIMITER = '|END|';
let buffer = '';

socket.on('data', (data) => {
  buffer += data;
  let pos = buffer.indexOf(DELIMITER);
  while (pos > -1) {
    const message = buffer.substring(0, pos);
    buffer = buffer.substring(pos + DELIMITER.length);
    // 处理完整消息
    pos = buffer.indexOf(DELIMITER);
  }
});
```

### 端口占用解决方案
```js
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('端口被占用，尝试重启...');
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  }
});
```

### UNIX域套接字权限
```js
// 设置文件权限
server.listen('/tmp/app.sock', () => {
  fs.chmod('/tmp/app.sock', 0o777);
});
```

## 性能对比表

| 配置项         | 默认值     | 生产环境推荐值 |
| -------------- | ---------- | -------------- |
| highWaterMark  | 16KB       | 64-128KB       |
| keepAliveDelay | 0 (禁用)   | 45000ms        |
| backlog        | 511        | 2048           |
| timeout        | 0 (无超时) | 30000ms        |

---

## 扩展资料
- 官方文档：[Node.js net module](https://nodejs.org/api/net.html)
