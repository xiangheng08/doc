# Cluster 集群

## 简介

Cluster 是 Node.js 的一个内置模块，用于创建共享服务器端口的子进程，从而充分利用多核 CPU 系统的计算能力。Node.js 本身是单线程的，这意味着它默认只能使用一个 CPU 核心。通过使用 Cluster 模块，我们可以启动一个主进程（Master），它可以分叉多个工作进程（Workers），每个工作进程都是应用程序的一个实例，运行在自己的进程中。

```js
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // Fork 工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接
  // 在这个例子中，它是一个 HTTP 服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);
  
  console.log(`工作进程 ${process.pid} 已启动`);
}
```

## 核心概念

### 主进程与工作进程

Cluster 模块采用主/工作进程模型：

- **主进程（Master）**：负责管理工作进程，包括创建、监控和重启工作进程
- **工作进程（Workers）**：实际处理请求的进程，每个工作进程都是独立的 Node.js 实例

```js
const cluster = require('node:cluster');

if (cluster.isMaster) {
  // 这是主进程
  console.log('运行在主进程中');
} else {
  // 这是工作进程
  console.log('运行在工作进程中');
}
```

### 进程间通信（IPC）

主进程和工作进程之间可以通过 IPC（Inter-Process Communication）通道进行通信：

```js
// 主进程向工作进程发送消息
worker.send({ type: 'broadcast', data: 'hello from master' });

// 工作进程接收消息
process.on('message', (msg) => {
  console.log('工作进程收到消息:', msg);
});

// 工作进程向主进程发送消息
process.send({ type: 'response', data: 'hello from worker' });

// 主进程接收消息
worker.on('message', (msg) => {
  console.log('主进程收到消息:', msg);
});
```

## 基本使用方法

### 创建工作进程

使用 `cluster.fork()` 方法创建工作进程：

```js
const cluster = require('node:cluster');
const numCPUs = require('node:os').cpus().length;

if (cluster.isMaster) {
  // 创建与 CPU 核心数相同的工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // 监听工作进程退出事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出，退出码: ${code}`);
    
    // 可以选择重启工作进程
    cluster.fork();
  });
}
```

### 工作进程处理请求

工作进程可以共享 TCP 连接，包括 HTTP 服务器：

```js
const cluster = require('node:cluster');
const http = require('node:http');

if (cluster.isMaster) {
  // 主进程逻辑
  cluster.fork();
} else {
  // 工作进程逻辑
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`处理请求的进程 ID: ${process.pid}\n`);
  });
  
  server.listen(8000, () => {
    console.log(`服务器运行在 http://localhost:8000，进程 ID: ${process.pid}`);
  });
}
```

## 高级功能

### 负载均衡

Cluster 模块内置了负载均衡机制，使用轮询（Round-Robin）算法分发请求：

```js
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // 监听工作进程在线事件
  cluster.on('online', (worker) => {
    console.log(`工作进程 ${worker.process.pid} 已上线`);
  });
  
  // 监听工作进程退出事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出，退出码: ${code}`);
    
    // 重启工作进程
    console.log('正在重启工作进程...');
    cluster.fork();
  });
} else {
  // 工作进程创建 HTTP 服务器
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`响应来自进程 ${process.pid}\n`);
  });
  
  server.listen(8000);
}
```

### 优雅关闭

实现工作进程的优雅关闭：

```js
const cluster = require('node:cluster');
const http = require('node:http');

if (cluster.isMaster) {
  const workers = [];
  
  // 创建工作进程
  for (let i = 0; i < 4; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }
  
  // 监听 SIGTERM 信号，实现优雅关闭
  process.on('SIGTERM', () => {
    console.log('收到 SIGTERM 信号，正在关闭所有工作进程...');
    
    workers.forEach((worker) => {
      worker.send({ type: 'shutdown' });
      worker.disconnect();
      
      // 设置超时，强制关闭工作进程
      setTimeout(() => {
        if (worker.isConnected()) {
          worker.kill('SIGKILL');
        }
      }, 5000);
    });
  });
} else {
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  });
  
  server.listen(8000);
  
  // 监听关闭消息
  process.on('message', (msg) => {
    if (msg.type === 'shutdown') {
      console.log(`工作进程 ${process.pid} 正在关闭...`);
      
      // 停止接收新连接
      server.close(() => {
        console.log(`工作进程 ${process.pid} 已关闭`);
        process.exit(0);
      });
      
      // 设置超时强制关闭
      setTimeout(() => {
        process.exit(1);
      }, 10000);
    }
  });
}
```

### 进程状态监控

监控工作进程的状态：

```js
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').cpus().length;

if (cluster.isMaster) {
  const workers = [];
  
  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    workers.push({
      id: worker.id,
      pid: worker.process.pid,
      worker: worker
    });
  }
  
  // 定期报告工作进程状态
  setInterval(() => {
    console.log('工作进程状态报告:');
    workers.forEach((w) => {
      console.log(`  进程 ID: ${w.pid}, 是否在线: ${w.worker.isConnected()}`);
    });
  }, 5000);
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出，退出码: ${code}`);
  });
} else {
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  });
  
  server.listen(8000);
}
```

## 实际应用示例

### Express 应用集群化

```js
const cluster = require('node:cluster');
const express = require('express');
const numCPUs = require('node:os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    console.log('正在重启工作进程...');
    cluster.fork();
  });
} else {
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });
  
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      pid: process.pid,
      uptime: process.uptime()
    });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Express 服务器运行在端口 ${PORT}，进程 ID: ${process.pid}`);
  });
}
```

### 数据共享与状态管理

通过主进程管理共享数据：

```js
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').cpus().length;

// 共享数据存储在主进程中
let sharedData = {
  requestCount: 0,
  startTime: Date.now()
};

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    
    // 向新创建的工作进程发送初始数据
    worker.send({
      type: 'init',
      data: sharedData
    });
  }
  
  // 监听工作进程的消息
  cluster.on('message', (worker, msg) => {
    if (msg.type === 'request') {
      // 更新共享数据
      sharedData.requestCount++;
      
      // 广播更新给所有工作进程
      for (const id in cluster.workers) {
        cluster.workers[id].send({
          type: 'update',
          data: sharedData
        });
      }
    }
  });
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    cluster.fork();
  });
} else {
  let localData = {};
  
  // 接收主进程的消息
  process.on('message', (msg) => {
    switch (msg.type) {
      case 'init':
        localData = { ...msg.data };
        break;
      case 'update':
        localData = { ...msg.data };
        break;
    }
  });
  
  const server = http.createServer((req, res) => {
    // 通知主进程有新请求
    process.send({ type: 'request' });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      pid: process.pid,
      localRequestCount: localData.requestCount,
      uptime: Date.now() - localData.startTime
    }));
  });
  
  server.listen(8000);
}
```

## 最佳实践

1. **合理设置工作进程数量**：通常设置为 CPU 核心数，但可以根据应用特性和服务器资源进行调整

2. **实现优雅重启**：在更新应用时，逐个重启工作进程，确保服务不中断

3. **监控进程健康状态**：定期检查工作进程状态，及时发现和处理问题

4. **合理处理异常**：在工作进程异常退出时能够自动重启

5. **共享状态管理**：对于需要在进程间共享的数据，应通过主进程进行管理

6. **日志管理**：确保主进程和工作进程的日志能够正确收集和分析

## 注意事项

1. **内存使用**：每个工作进程都是独立的 Node.js 实例，会占用独立的内存空间

2. **资源共享**：虽然工作进程可以共享 TCP 连接，但其他资源（如文件句柄）是独立的

3. **调试复杂性**：多进程架构会增加调试的复杂性

4. **进程间通信开销**：频繁的 IPC 通信会带来一定的性能开销

5. **错误处理**：需要分别处理主进程和工作进程的错误

## 相关链接

- [Node.js Cluster 官方文档](https://nodejs.org/api/cluster.html)
- [Child Process](./child-process/index.md)
- [OS](./os.md)
- [Process](./process.md)
