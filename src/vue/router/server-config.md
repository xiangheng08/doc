# history 模式下服务器配置

在使用 Vue Router 的 history 模式时，需要服务器配置支持。因为这是一个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问如 `http://yoursite.com/user/id` 这样的 URL 时就会返回 404。

需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面。

## 注意

这有一个注意事项。你的服务器将不再报告 404 错误，因为现在所有未找到的路径都会显示你的 `index.html` 文件。为了解决这个问题，你应该在你的 Vue 应用程序中实现一个万能的路由来显示 404 页面。



::: code-group

```js [Vue3]
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:pathMatch(.*)', component: NotFoundComponent }],
})
```

```js [Vue2]
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})

```

:::

如果你使用了 SSR，可以看看[Vue 服务器端渲染文档](https://cn.vuejs.org/guide/scaling-up/ssr)

## 服务器配置示例

### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Apache

```
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 原生 Node.js

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

### Express

可以使用 [`connect-history-api-fallback`](https://github.com/bripkens/connect-history-api-fallback) 中间件：

安装：

::: code-group

```bash [npm]
npm install --save connect-history-api-fallback
```

```bash [pnpm]
pnpm add connect-history-api-fallback
```

```bash [yarn]
yarn add connect-history-api-fallback
```

:::

使用：
```js
const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
```
