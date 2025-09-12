# HTTP

## 简介

HTTP（HyperText Transfer Protocol）模块是 Node.js 的核心模块之一，用于创建 HTTP 服务器和客户端。它提供了一种简单而强大的方式来处理 HTTP 请求和响应，使得开发者可以直接使用 JavaScript 编写高效的网络应用。

HTTP 模块是构建 Web 应用和 API 的基础，无论是搭建 RESTful API 还是处理动态网页请求，HTTP 模块都能提供必要的工具支持。

```js
const http = require('node:http');

// 创建一个简单的 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});
```

## 核心概念

### HTTP 服务器

HTTP 服务器用于监听和处理来自客户端的 HTTP 请求。通过 [http.createServer()](#http.createServer) 方法创建服务器实例。

### HTTP 客户端

HTTP 客户端用于向其他服务器发起 HTTP 请求。通过 [http.request()](#http.request) 和 [http.get()](#http.get) 方法发起请求。

### Request 和 Response 对象

在处理 HTTP 请求时，会涉及到两个核心对象：
- `req`（[http.IncomingMessage](#http.IncomingMessage)）：包含客户端请求信息
- `res`（[http.ServerResponse](#http.ServerResponse)）：用于向客户端发送响应

## 服务器端 API

### `http.createServer([options][, requestListener])` {#http.createServer}

创建一个新的 HTTP 服务器实例。

```js
const http = require('node:http');

// 方法1：创建服务器并添加监听器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

// 方法2：先创建服务器，再添加监听器
const server2 = http.createServer();
server2.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});
```

### `server.listen()` {#server.listen}

启动服务器监听连接。

```js
const http = require('node:http');
const server = http.createServer();

// 监听指定端口
server.listen(3000);

// 监听指定端口和主机
server.listen(3000, 'localhost');

// 监听指定端口、主机和回调函数
server.listen(3000, 'localhost', () => {
  console.log('服务器已在 http://localhost:3000 启动');
});

// 监听 UNIX 套接字
server.listen('/tmp/http.sock');
```

### `server.close([callback])` {#server.close}

停止服务器接收新连接。

```js
const http = require('node:http');
const server = http.createServer((req, res) => {
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('服务器运行中...');
  
  // 5秒后关闭服务器
  setTimeout(() => {
    server.close(() => {
      console.log('服务器已关闭');
    });
  }, 5000);
});
```

## 客户端 API

### `http.request(options[, callback])` {#http.request}

发起一个 HTTP 请求。

```js
const http = require('node:http');

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  
  res.on('end', () => {
    console.log('响应接收完毕');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 发送请求
req.end();
```

### `http.get(options[, callback])` {#http.get}

发起一个 HTTP GET 请求的便捷方法。

```js
const http = require('node:http');

// 简单的 GET 请求
http.get('http://www.example.com/', (res) => {
  const { statusCode } = res;
  console.log(`状态码: ${statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
}).on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 带选项的 GET 请求
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/index.html',
  headers: {
    'User-Agent': 'Node.js HTTP Client'
  }
};

http.get(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应数据:', data);
  });
}).on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});
```

## `http.IncomingMessage` {#http.IncomingMessage}

`http.IncomingMessage` 对象由 `http.Server` 或 `http.ClientRequest` 创建，作为第一个参数传递给 `request` 和 `response` 事件。它可以用来访问响应状态、标头和数据。

### `message.headers` {#message.headers}

获取请求/响应头信息。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('请求头:', req.headers);
  console.log('User-Agent:', req.headers['user-agent']);
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('请求头信息已记录到控制台\n');
});

server.listen(3000);
```

### `message.method` {#message.method}

获取请求方法（仅对服务器端请求有效）。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('请求方法:', req.method);
  
  switch (req.method) {
    case 'GET':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('GET 请求处理完毕\n');
      break;
    case 'POST':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('POST 请求处理完毕\n');
      break;
    default:
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('方法不被允许\n');
  }
});

server.listen(3000);
```

### `message.url` {#message.url}

获取请求 URL（仅对服务器端请求有效）。

```js
const http = require('node:http');
const url = require('node:url');

const server = http.createServer((req, res) => {
  console.log('请求 URL:', req.url);
  
  // 解析 URL
  const parsedUrl = url.parse(req.url, true);
  console.log('解析后的 URL:', parsedUrl);
  console.log('查询参数:', parsedUrl.query);
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`URL: ${req.url}\n`);
});

server.listen(3000);
```

## `http.ServerResponse` {#http.ServerResponse}

`http.ServerResponse` 对象由 HTTP 服务器内部创建，作为第二个参数传递给 `request` 事件。

### `response.writeHead(statusCode[, statusMessage][, headers])` {#response.writeHead}

发送响应头到客户端。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // 基本用法
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // 带状态消息
  res.writeHead(200, 'OK', { 
    'Content-Type': 'text/html',
    'X-Powered-By': 'Node.js'
  });
  
  // 设置多个同名头部
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Set-Cookie': ['type=ninja', 'language=javascript']
  });
  
  res.end('Hello World\n');
});

server.listen(3000);
```

### `response.statusCode` {#response.statusCode}

设置响应状态码。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // 根据不同条件设置状态码
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('首页\n');
  } else if (req.url === '/not-found') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('页面未找到\n');
  } else {
    res.statusCode = 301;
    res.setHeader('Location', '/');
    res.end();
  }
});

server.listen(3000);
```

### `response.setHeader(name, value)` {#response.setHeader}

为隐式标头设置单个标头值。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Custom-Header', 'Custom Value');
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  
  res.writeHead(200);
  res.end('<h1>Hello World</h1>\n');
});

server.listen(3000);
```

### `response.write(chunk[, encoding][, callback])` {#response.write}

发送响应体的一部分。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // 发送多个数据块
  res.write('Hello ');
  res.write('World\n');
  res.write('这是第三行\n');
  
  res.end('这是最后一行\n');
});

server.listen(3000);
```

### `response.end([data[, encoding]][, callback])` {#response.end}

结束响应过程。

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // 不同方式结束响应
  if (req.url === '/simple') {
    // 简单结束
    res.end();
  } else if (req.url === '/with-data') {
    // 带数据结束
    res.end('Hello World\n');
  } else if (req.url === '/with-callback') {
    // 带回调结束
    res.end('处理完毕\n', () => {
      console.log('响应已发送给客户端');
    });
  } else {
    res.end('默认响应\n');
  }
});

server.listen(3000);
```

## 实际应用示例

### RESTful API 服务器

```js
const http = require('node:http');
const url = require('node:url');

// 模拟数据存储
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 路由处理
  if (path === '/api/users' && method === 'GET') {
    // 获取所有用户
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (path === '/api/users' && method === 'POST') {
    // 创建新用户
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      newUser.id = users.length + 1;
      users.push(newUser);
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } else if (path.match(/\/api\/users\/\d+/) && method === 'GET') {
    // 获取特定用户
    const id = parseInt(path.split('/')[3]);
    const user = users.find(u => u.id === id);
    
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '用户未找到' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '路由未找到' }));
  }
});

server.listen(3000, () => {
  console.log('RESTful API 服务器运行在 http://localhost:3000');
});
```

### 文件服务器

```js
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // 构造文件路径
  let filePath = path.join(__dirname, req.url);
  
  // 如果是目录，尝试查找 index.html
  if (filePath.endsWith('/') || filePath.endsWith('\\')) {
    filePath = path.join(filePath, 'index.html');
  }
  
  // 获取文件扩展名
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件未找到
        fs.readFile(path.join(__dirname, '404.html'), (err, content404) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content404 || '404 Not Found', 'utf-8');
        });
      } else {
        // 服务器错误
        res.writeHead(500);
        res.end(`服务器错误: ${error.code}`);
      }
    } else {
      // 成功读取文件
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('文件服务器运行在 http://localhost:3000');
});
```

### HTTP 客户端代理

```js
const http = require('node:http');

// 创建一个代理服务器
const proxyServer = http.createServer((req, res) => {
  console.log(`代理请求: ${req.method} ${req.url}`);
  
  // 解析目标 URL
  const targetUrl = new URL(req.url.startsWith('http') ? req.url : `http://example.com${req.url}`);
  
  // 构造请求选项
  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || 80,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: req.headers
  };
  
  // 发起请求到目标服务器
  const proxyReq = http.request(options, (proxyRes) => {
    // 将目标服务器的响应头转发给客户端
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // 将目标服务器的响应数据转发给客户端
    proxyRes.pipe(res);
  });
  
  // 处理代理请求错误
  proxyReq.on('error', (e) => {
    console.error(`代理请求错误: ${e.message}`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('代理服务器错误');
  });
  
  // 将客户端请求的数据转发给目标服务器
  req.pipe(proxyReq);
});

proxyServer.listen(8080, () => {
  console.log('HTTP 代理服务器运行在 http://localhost:8080');
});
```

## 最佳实践

1. **正确设置响应头**：始终设置正确的 Content-Type 和其他必要头部
2. **处理错误**：为所有异步操作添加错误处理
3. **资源清理**：及时关闭连接和清理资源
4. **安全性**：验证和清理用户输入，防止注入攻击
5. **性能优化**：
   - 使用流处理大文件
   - 启用压缩
   - 使用缓存头
6. **日志记录**：记录重要事件和错误信息

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // 记录请求
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from ${req.connection.remoteAddress}`);
  
  try {
    // 设置安全相关的头部
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // 处理请求
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  } catch (error) {
    console.error('处理请求时出错:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

## 注意事项

1. **性能考虑**：HTTP 模块是底层实现，对于复杂应用建议使用 Express.js 等高级框架
2. **安全性**：直接使用 HTTP 模块需要手动处理各种安全问题
3. **错误处理**：务必为所有异步操作添加适当的错误处理
4. **内存管理**：处理大文件时使用流避免内存溢出
5. **兼容性**：注意不同 Node.js 版本的 API 差异

## 相关链接

- [Node.js HTTP 官方文档](https://nodejs.org/api/http.html)
- [URL](./url)
- [HTTPS](./https)
- [Net](./net)
