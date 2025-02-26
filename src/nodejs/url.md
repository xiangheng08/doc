# url 模块

Node.js 的 `url` 模块提供 URL 解析和格式化工具，用于处理 Web 地址的各个组成部分（协议/主机/路径等）。支持两种标准：
- **Legacy API**（Node.js 传统方式）
- **WHATWG URL 标准**（与现代浏览器兼容）

```js
const url = require('url'); // 传统方式
const { URL, URLSearchParams } = require('url'); // WHATWG

// 在 Node.js 中，URL 和 URLSearchParams 类是挂载在全局对象上的。
// 这意味着可以在不显式导入的情况下直接使用它们。
console.log(URL);
console.log(URLSearchParams);
```

## 核心 API

### 传统解析方式 (Legacy API)
```js
const parsedUrl = url.parse('https://example.com:8080/path?query=123#hash', true);
```
返回对象属性：
- `protocol`: 'https:'
- `host`: 'example.com:8080'
- `hostname`: 'example.com'
- `port`: '8080'
- `pathname`: '/path'
- `query`: { query: '123' } （当第二个参数为 true 时解析为对象）
- `hash`: '#hash'
- `auth`: 认证信息（如 'user:pass'）

### WHATWG URL 标准
```js
const myURL = new URL('https://example.com:8080/path?query=123#hash');
```
属性列表：
- `origin`: 'https\://example.com:8080'（只读）
- `protocol`: 'https:'
- `username`/`password`: 认证信息
- `host`: 'example.com:8080'
- `hostname`: 'example.com'
- `port`: '8080'
- `pathname`: '/path'
- `search`: '?query=123'
- `searchParams`: URLSearchParams 实例
- `hash`: '#hash'

**常用方法**：
- `url.format()`: 将对象转换为 URL 字符串
- `url.resolve(from, to)`: 解析相对路径（已弃用，推荐使用 WHATWG）


## 使用案例

### 1. 解析 URL
```js
const { href, origin, pathname } = new URL('https://nodejs.org/api/url.html');
```

### 2. 操作查询参数
```js
const params = new URLSearchParams('name=John&age=30');
params.append('city', 'NYC');
console.log(params.toString()); // "name=John&age=30&city=NYC"
```

### 3. 格式化 URL
```js
const obj = {
  protocol: 'https:',
  host: 'example.com',
  pathname: '/test'
};
console.log(url.format(obj)); // "https://example.com/test"
```

## ✅ 最佳实践
1. **优先使用 WHATWG URL 标准**（新版 Node.js 推荐）
2. **始终验证协议**：防止协议注入
   ```js
   if (!['https:', 'http:'].includes(new URL(input).protocol)) {
     throw new Error('Invalid protocol');
   }
   ```
3. **使用 URLSearchParams 处理查询参数**（自动处理编码）
4. **路径操作结合 path 模块**：
   ```js
   const path = require('path');
   const fullPath = path.join(new URL('https://a.com/b').pathname, 'c');
   ```
5. **编码处理**：使用 `encodeURIComponent` 处理特殊字符

## ⚠️ 常见问题

### 如何获取查询字符串参数？
```js
const { searchParams } = new URL('https://a.com?name=John');
console.log(searchParams.get('name')); // "John"
```

### URL 属性为什么是空字符串？
- 当 URL 中没有对应部分时，属性返回空字符串（WHATWG 标准）
- 传统 API 可能返回 `null`

### 如何处理特殊字符？
```js
const param = new URLSearchParams({ q: 'node.js&express' });
console.log(param.toString()); // "q=node.js%26express"
```

### 如何安全拼接 URL？
避免字符串拼接：
```js
// ✅ 正确
const url = new URL('/path', 'https://example.com');
// ❌ 危险
const unsafeUrl = 'https://example.com' + userInput;
```

### Q5: 版本兼容问题？
- Node.js v8 开始支持 WHATWG URL
- v10 后成为稳定功能
- 传统 API 的 `url.parse()` 在 v11 后不再自动解析查询字符串（需要传 `true`）
