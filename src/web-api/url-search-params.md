# URLSearchParams 对象

## 简介

URLSearchParams 对象表示 URL 的查询字符串（比如 `?foo=bar`）。它提供一系列方法，用来操作这些键值对。URL 实例对象的 `searchParams` 属性，就是指向一个 URLSearchParams 实例对象。

URLSearchParams 实例对象可以用 `for...of` 进行遍历。

```js
for (const [key, value] of mySearchParams) {
}
```

## 构造方法

URLSearchParams 可以作为构造函数使用，生成一个实例对象。

```js
const params = new URLSearchParams();
```

它可以接受一个查询字符串作为参数，将其转成对应的实例对象。

```js
const params = new URLSearchParams('?a=1&b=2');
```

注意，它最多只能去除查询字符串的开头问号 `?` ，并不能解析完整的网址字符串。

```js
const paramsString = "http://example.com/search?query=%40";
const params = new URLSearchParams(paramsString);
// 这里 URLSearchParams 会认为键名是`http://example.com/search?query`，而不是`query`。
```

它也可以接受表示键值对的对象或数组作为参数。

```js
// 参数为数组
const params3 = new URLSearchParams([
  ["foo", "1"],
  ["bar", "2"],
]);

// 参数为对象
const params1 = new URLSearchParams({ foo: "1", bar: "2" });
```

浏览器向服务器发送表单数据时，可以直接使用 URLSearchParams 实例作为表单数据。

```js
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params // 可以直接使用 URLSearchParams 实例对象作为数据体
}).then(...)
```

它还可以接受另一个 URLSearchParams 实例对象作为参数，等于复制了该对象。

```js
const params1 = new URLSearchParams('?a=1&b=2');
const params2 = new URLSearchParams(params1);

params1 === params2; // false
```

URLSearchParams 会对查询字符串自动编码。

```js
const params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

键名可以没有键值，这时 URLSearchParams 会认为键值等于空字符串。

```js
const params1 = new URLSearchParams("foo&bar=baz");
const params2 = new URLSearchParams("foo=&bar=baz");
```

## 实例方法

### append()

`append()` 用来添加一个查询键值对。如果同名的键值对已经存在，它依然会将新的键值对添加到查询字符串的末尾。

它的第一个参数是键名，第二个参数是键值，下面是用法示例。

```js
const params = new URLSearchParams('?a=1&b=2');

params.append('a', 3);
params.toString() // 'a=1&b=2&a=3'
// 键名 a 已经存在，但是 append() 依然会将 a=3 添加在查询字符串的末尾
```

### delete()

`delete()` 删除给定名字的键值对。

### get()

`get()` 返回指定键名所对应的键值。如果存在多个同名键值对，它只返回第一个键值。

```js
const params = new URLSearchParams('?a=1&b=2');
params.get('a') // 1
```

对于不存在的键名，它会返回 `null`。

注意，`get()` 会将键值里面的加号转为空格。

```js
const params = new URLSearchParams(`c=a+b`);
params.get('c') // 'a b'
```

如果希望避免这种行为，可以先用 `encodeURIComponent()` 对键值进行转义

### getAll()

`getAll()` 返回一个数组，里面是指定键名所对应的所有键值。

```js
const params = new URLSearchParams('?a=1&b=2&a=3');
params.getAll('a') // [ '1', '3' ]
```

### has()

`has()` 返回一个布尔值，表示指定键名是否存在。

```js
const params = new URLSearchParams('?a=1&b=2');
params.has('a') // true
params.has('c') // false
```

### set()

`set()` 用来设置一个键值对。如果相同键名已经存在，则会替换当前值，这是它与 `append()` 的不同之处。该方法适合用来修改查询字符串。

```js
const params = new URLSearchParams('?a=1&b=2');
params.set('a', 3);
params.toString() // 'a=3&b=2'
```

如果有多个的同名键，`set()`会移除现存所有的键，再添加新的键值对。

```js
const params = new URLSearchParams('?foo=1&foo=2');
params.set('foo', 3);
params.toString() // "foo=3"
// 有两个`foo`键，`set()`会将它们都删掉，再添加一个新的`foo`键。
```

### sort()

`sort()` 按照键名（以 Unicode 码点为序）对键值对排序。如果有同名键值对，它们的顺序不变。

```js
const params = new URLSearchParams('?a=1&b=2&a=3');
params.sort();
params.toString() // 'a=1&a=3&b=2'
```

### entries()

`entries()` 方法返回一个 iterator 对象，用来遍历键名和键值。

```js
const params = new URLSearchParams("key1=value1&key2=value2");

for (const [key, value] of params.entries()) {
  console.log(`${key}, ${value}`);
}
// key1, value1
// key2, value2
```

如果直接对 URLSearchParams 实例进行 `for...of` 遍历，其实内部调用的就是 `entries` 接口。

```js
for (var p of params) {}
// 等同于
for (var p of params.entries()) {}
```

### forEach()

`forEach()` 用来依次对每个键值对执行一个回调函数。

它接受两个参数，第一个参数 `callback` 是回调函数，第二个参数 `thisArg` 是可选的，用来设置 `callback` 里面的 `this` 对象。

```js
forEach(callback)
forEach(callback, thisArg)
```

`callback` 函数可以接收到以下三个参数。

- `value`：当前键值。
- `key`：当前键名。
- `searchParams`：当前的 URLSearchParams 实例对象。

```js
const params = new URLSearchParams("key1=value1&key2=value2");

params.forEach((value, key) => {
  console.log(value, key);
});
// value1 key1
// value2 key2
```

### keys()

`keys()` 返回一个 iterator 对象，用来遍历所有键名。

```js
const params = new URLSearchParams("key1=value1&key2=value2");

for (const key of params.keys()) {
  console.log(key);
}
// key1
// key2
```

### values()

`values()` 返回一个 iterator 对象，用来遍历所有键值。

```js
const params = new URLSearchParams("key1=value1&key2=value2");

for (const value of params.values()) {
  console.log(value);
}
// value1
// value2
```

这个方法也可以用来将所有键值，转成一个数组。

```js
Array.from(params.values()) // ['value1', 'value2']
```

### toString()

`toString()` 用来将 URLSearchParams 实例对象转成一个字符串。它返回的字符串不带问号，这一点与 `window.location.search` 不同。

## 实例属性

### size

`size` 是一个只读属性，返回键值对的总数。

```js
const params = new URLSearchParams("c=4&a=2&b=3&a=1");
params.size; // 4
```

上面示例中，键名 `a` 在查询字符串里面有两个，`size` 不会将它们合并。

如果想统计不重复的键名，可以将使用 Set 结构。

```js
[...new Set(params.keys())].length // 3
```

`size` 属性可以用来判别，某个网址是否有查询字符串。

```js
const url = new URL("https://example.com?foo=1&bar=2");

if (url.searchParams.size) {
  console.log("该 URL 有查询字符串");
}
```

## 实际应用场景

### URL 查询参数管理

```js
// 解析当前页面的查询参数
const params = new URLSearchParams(window.location.search);

// 获取特定参数
const userId = params.get('userId');
const category = params.get('category');

// 修改参数并更新URL
params.set('page', '2');
window.history.replaceState({}, '', \`\${location.pathname}?\${params}\`);
```

### 构建 API 请求

```js
// 构建带有查询参数的 API 请求
const buildApiUrl = (endpoint, queryParams) => {
  const url = new URL(endpoint);
  Object.keys(queryParams).forEach(key => {
    if (queryParams[key] !== null && queryParams[key] !== undefined) {
      url.searchParams.append(key, queryParams[key]);
    }
  });
  return url.toString();
};

const apiUrl = buildApiUrl('https://api.example.com/users', {
  page: 1,
  limit: 10,
  sort: 'name'
});
// 结果: https://api.example.com/users?page=1&limit=10&sort=name
```

### 表单数据处理

```js
// 处理表单提交
const form = document.querySelector('#searchForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const params = new URLSearchParams();
  
  // 将 FormData 转换为 URLSearchParams
  for (const [key, value] of formData) {
    params.append(key, value);
  }
  
  // 发送请求
  fetch(\`/search?\${params}\`)
    .then(response => response.json())
    .then(data => console.log(data));
});
```

### 路由状态管理

```js
// 在单页应用中管理路由状态
class Router {
  constructor() {
    this.params = new URLSearchParams(window.location.search);
    this.updateState();
    window.addEventListener('popstate', () => this.updateState());
  }
  
  updateState() {
    this.params = new URLSearchParams(window.location.search);
    this.render();
  }
  
  navigate(path, queryParams = {}) {
    const params = new URLSearchParams(queryParams);
    const url = \`\${path}?\${params}\`;
    
    window.history.pushState({}, '', url);
    this.updateState();
  }
  
  getParam(key) {
    return this.params.get(key);
  }
  
  setParam(key, value) {
    this.params.set(key, value);
    this.navigate(window.location.pathname, Object.fromEntries(this.params));
  }
  
  render() {
    // 根据参数更新页面内容
    console.log('路由参数更新:', Object.fromEntries(this.params));
  }
}

// 使用示例
const router = new Router();
router.setParam('view', 'list');
router.setParam('filter', 'active');
```

## 与其他技术对比

| 特性 | URLSearchParams | 手动字符串处理 | 第三方库(如qs) |
|------|----------------|----------------|----------------|
| 浏览器原生支持 | ✅ 是 | ✅ 是 | ❌ 否 |
| 自动编码/解码 | ✅ 是 | ❌ 否 | ✅ 是 |
| 易用性 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 功能丰富度 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 嵌套对象支持 | ❌ 否 | ❌ 否 | ✅ 是 |

### 与手动字符串处理对比

```js
// 手动处理查询字符串（不推荐）
const parseQueryString = (query) => {
  const params = {};
  const pairs = query.substring(1).split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  
  return params;
};

// 使用 URLSearchParams（推荐）
const params = new URLSearchParams(window.location.search);
const value = params.get('key');
```

### 与第三方库对比

对于简单的查询字符串操作，URLSearchParams 已经足够。但对于复杂的嵌套对象序列化，可能需要使用第三方库：

```js
// URLSearchParams 不支持嵌套对象
const params = new URLSearchParams();
params.append('filter', { name: 'John', age: 30 }); // 转换为 "[object Object]"

// 第三方库（如 qs）支持嵌套对象
// qs.stringify({ filter: { name: 'John', age: 30 } })
// 结果: "filter[name]=John&filter[age]=30"
```

## 浏览器兼容性

URLSearchParams 在现代浏览器中有良好的支持：

- Chrome 49+
- Firefox 29+
- Safari 10.1+
- Edge 17+

对于较老的浏览器，可以使用 polyfill：

```js
// 检查浏览器支持
if ('URLSearchParams' in window) {
  // 使用原生 URLSearchParams
  const params = new URLSearchParams('a=1&b=2');
} else {
  // 使用 polyfill 或降级方案
  // 可以引入 https://github.com/WebReflection/url-search-params
}
```

## 相关资源

- [MDN URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)
- [URL 标准规范](https://url.spec.whatwg.org/#urlsearchparams)
- [Can I Use: URLSearchParams](https://caniuse.com/urlsearchparams)