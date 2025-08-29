# URLPattern API

## 简介

URLPattern API 提供了一种强大的方式来匹配和解析 URL。它允许开发者使用类似正则表达式的语法来定义 URL 模式，并可以轻松地提取 URL 的各个组成部分。URLPattern 是现代 Web 平台的一个相对较新的功能，主要用于 Service Worker 路由、URL 匹配和解析等场景。

URLPattern 可以匹配 URL 的以下部分：
- 协议 (protocol)
- 用户名 (username)
- 密码 (password)
- 主机名 (hostname)
- 端口 (port)
- 路径 (pathname)
- 搜索参数 (search)
- 哈希 (hash)

## 基本语法

创建一个 URLPattern 实例的基本语法如下：

```js
const pattern = new URLPattern(init, baseURL, options);
```

其中：
- `init`：模式定义，可以是字符串、URL 对象或包含特定组件的对象
- `baseURL`：可选的基础 URL，用于解析相对 URL 模式
- `options`：配置选项，如区分大小写等

## 创建 URLPattern 实例

### 使用字符串模式

```js
// 匹配特定路径
const pattern = new URLPattern('https://example.com/books/:id');
console.log(pattern.test('https://example.com/books/123')); // true

// 使用通配符
const pattern2 = new URLPattern('https://example.com/users/*');
console.log(pattern2.test('https://example.com/users/john')); // true
console.log(pattern2.test('https://example.com/users/john/profile')); // true
```

### 使用对象模式

```js
// 定义 URL 的各个组件
const pattern = new URLPattern({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/books/:id',
  search: '*',
  hash: '*'
});

console.log(pattern.test('https://example.com/books/123?category= fiction#section1')); // true
```

### 使用相对模式

```js
// 使用基础 URL
const pattern = new URLPattern('/books/:id', 'https://example.com');
console.log(pattern.test('https://example.com/books/456')); // true
```

## 模式语法

URLPattern 支持多种模式语法来匹配 URL：

### 参数匹配

```js
// 命名参数
const pattern = new URLPattern('/users/:userId/posts/:postId');
const result = pattern.exec('/users/123/posts/456');

console.log(result.pathname.groups); 
// { userId: '123', postId: '456' }
```

### 通配符匹配

```js
// 通配符匹配任意字符
const pattern = new URLPattern('/api/*');
console.log(pattern.test('/api/users')); // true
console.log(pattern.test('/api/products/123')); // true

// 匹配零个或多个目录段
const pattern2 = new URLPattern('/static/:path*');
console.log(pattern2.test('/static/css/style.css')); // true
console.log(pattern2.test('/static/js/main.js')); // true
```

### 正则表达式匹配

```js
// 在模式中使用正则表达式
const pattern = new URLPattern({
  pathname: '/users/:id(\\d+)'  // id 必须是数字
});

console.log(pattern.test('/users/123')); // true
console.log(pattern.test('/users/abc')); // false
```

### 可选组

```js
// 可选的 URL 部分
const pattern = new URLPattern('/users/:id/:action?');
console.log(pattern.test('/users/123')); // true
console.log(pattern.test('/users/123/edit')); // true
```

## 实例方法

### test()

检查 URL 是否匹配模式：

```js
const pattern = new URLPattern('https://example.com/books/:id');

console.log(pattern.test('https://example.com/books/123')); // true
console.log(pattern.test('https://example.com/users/123')); // false
```

### exec()

执行匹配并返回详细结果：

```js
const pattern = new URLPattern('https://:hostname/books/:id');
const result = pattern.exec('https://example.com/books/123');

if (result) {
  console.log(result.pathname.groups); // { id: '123' }
  console.log(result.hostname.groups); // { hostname: 'example.com' }
  console.log(result.pathname.input); // '/books/123'
}
```

### parse()

解析模式字符串：

```js
const pattern = new URLPattern('/books/:id(\\d+)');
console.log(pattern.parse()); // 返回模式的内部表示
```

## 匹配结果对象

`exec()` 方法返回的结果对象包含以下属性：

- `inputs`：输入的 URL
- `protocol`：协议匹配信息
- `username`：用户名匹配信息
- `password`：密码匹配信息
- `hostname`：主机名匹配信息
- `port`：端口匹配信息
- `pathname`：路径匹配信息
- `search`：查询参数匹配信息
- `hash`：哈希匹配信息

每个组件对象包含：
- `input`：该组件的实际输入值
- `groups`：命名组的键值对

```js
const pattern = new URLPattern({
  pathname: '/books/:id',
  search: ':action',
  hash: ':section'
});

const result = pattern.exec('https://example.com/books/123?action=view#intro');

if (result) {
  console.log(result.pathname.groups.id); // '123'
  console.log(result.search.groups.action); // 'view'
  console.log(result.hash.groups.section); // 'intro'
}
```

## 实际应用场景

### Service Worker 路由

```js
// 在 Service Worker 中使用 URLPattern 进行路由
const routes = [
  {
    pattern: new URLPattern({ pathname: '/api/books/:id' }),
    handler: handleBookRequest
  },
  {
    pattern: new URLPattern({ pathname: '/api/users/:id' }),
    handler: handleUserRequest
  }
];

self.addEventListener('fetch', event => {
  const { request } = event;
  
  for (const route of routes) {
    const result = route.pattern.exec(request.url);
    if (result) {
      event.respondWith(route.handler(request, result));
      return;
    }
  }
  
  // 默认处理
  event.respondWith(fetch(request));
});

function handleBookRequest(request, result) {
  const bookId = result.pathname.groups.id;
  // 处理书籍请求
  return new Response(`Book ${bookId}`);
}
```

### 前端路由

```js
class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
  }
  
  add(pattern, handler) {
    this.routes.push({
      pattern: new URLPattern(pattern, window.location.origin),
      handler
    });
  }
  
  navigate(url) {
    for (const route of this.routes) {
      const result = route.pattern.exec(url);
      if (result) {
        this.currentRoute = result;
        route.handler(result);
        return true;
      }
    }
    return false;
  }
}

// 使用示例
const router = new Router();

router.add('/users/:id', (result) => {
  console.log('用户页面:', result.pathname.groups.id);
});

router.add('/products/:category/:id', (result) => {
  console.log('产品页面:', result.pathname.groups.category, result.pathname.groups.id);
});

// 监听浏览器历史变化
window.addEventListener('popstate', () => {
  router.navigate(window.location.href);
});
```

### API 端点验证

```js
class APIValidator {
  constructor() {
    this.endpoints = new Map();
  }
  
  register(method, pattern, handler) {
    const key = \`\${method}:\${pattern}\`;
    this.endpoints.set(key, {
      pattern: new URLPattern(pattern),
      handler
    });
  }
  
  handleRequest(request) {
    const url = new URL(request.url);
    const method = request.method;
    
    for (const [key, endpoint] of this.endpoints) {
      if (key.startsWith(\`\${method}:\`) && endpoint.pattern.test(url)) {
        const result = endpoint.pattern.exec(url);
        return endpoint.handler(request, result);
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
}

// 使用示例
const validator = new APIValidator();
validator.register('GET', '/api/users/:id(\\d+)', (request, result) => {
  const userId = result.pathname.groups.id;
  // 处理获取用户信息的请求
  return new Response(JSON.stringify({ id: userId, name: 'User ' + userId }));
});
```

## 配置选项

URLPattern 构造函数支持以下选项：

```js
const pattern = new URLPattern(init, baseURL, {
  ignoreCase: true,     // 是否忽略大小写
  baseURL: 'https://example.com' // 可以在这里指定 baseURL
});
```

## 浏览器兼容性

URLPattern 是一个相对较新的 API，浏览器支持情况如下：

- Chrome 95+ ✅
- Firefox 93+ ✅
- Safari 16+ ✅
- Edge 95+ ✅

对于不支持的浏览器，可以使用 polyfill：

```js
// 检查浏览器支持
if ('URLPattern' in window) {
  // 使用原生 URLPattern
  const pattern = new URLPattern('/books/:id');
} else {
  // 使用 polyfill 或降级方案
  console.warn('URLPattern not supported');
  // 可以使用其他路由库或手动实现匹配逻辑
}
```

## 与其他技术对比

| 特性 | URLPattern | 正则表达式 | 传统字符串匹配 |
|------|------------|------------|----------------|
| 易用性 | 高 | 中 | 中 |
| 可读性 | 高 | 低 | 中 |
| 功能性 | 专门针对 URL | 通用 | 有限 |
| 性能 | 高 | 高 | 高 |
| 浏览器支持 | 现代浏览器 | 所有浏览器 | 所有浏览器 |

## 相关资源

- [MDN URLPattern](https://developer.mozilla.org/zh-CN/docs/Web/API/URLPattern)
- [URLPattern 规范](https://wicg.github.io/urlpattern/)
- [Web.dev URLPattern 介绍](https://web.dev/urlpattern/)
- [Can I Use: URLPattern](https://caniuse.com/mdn-api_urlpattern)