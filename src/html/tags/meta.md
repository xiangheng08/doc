# `<meta>`

## 简介

打开任意网站，其 `<head>` 标签内都会有很多列的 `<meta>` 标签。在查阅 w3school 的过程中，第一句话中就包含了 `元数据` （元信息）。

`<meta>` 标签提供关于 HTML 文档的 元数据（meta-information）。元数据 不会显示在页面上，但将被机器解析。

meta 常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

meta 标签用的最多应该就是下面的两行了。

<!-- prettier-ignore -->
```html
<meta charset="UTF-8"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 属性

meta 标签共有多个属性，分别是：

-   `content` 属性
-   `http-equiv` 属性
-   `name` 属性
-   `scheme` 属性
-   `charset` 属性

## content 属性

它一般是为定义与 http-equiv 或 name 属性相关的元信息，以文本的格式作为其内容。

```html
<meta name="参数" content="这里面是对应 name 属性值的描述" />。
```

详细用法，请参考下面的 name 属性。

## name 属性

name 属性主要用于描述网页，比如网页的关键词、叙述等。与之对应的属性值为 content，content 中的内容是对 name 填入类型的具体描述，便于搜索引擎抓取。meta 标签中 name 属性语法格式是：

```html
<meta name="参数" content="具体的描述" />。
```

其中 name 属性共有以下几种参数。(前 3 个为常用属性)

### keywords 关键字

用于告诉搜索引擎，你网页的关键字。

```html
<meta name="keywords" content="博客,前端,js" />
```

### description 网站内容的描述

用于告诉搜索引擎，你网站的主要内容。

```html
<meta name="description" content="你好，这是本网站的描述~" />
```

### viewport 移动端的窗口

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### robots 定义搜索引擎爬虫的索引方式

robots 用来告诉爬虫哪些页面需要使用索引，哪些页面不需要索引。content 的参数有 all、none、index、noindex、follow、nofollow，默认是 all。

```html
<meta name="robots" content="none" />
```

具体参数如下：

1. none : 搜索引擎将忽略此网页，等价于 noindex，nofollow。

-   noindex : 搜索引擎不索引此网页。
-   nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。

1. all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于 index，follow。

-   index : 搜索引擎索引此网页。
-   follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。

### author 作者

用于标注网页作者

```html
<meta name="author" content="stevechow,zhmnda@icloud.com" />
```

### generator 网页制作软件

用以说明生成工具（如 dreamweaver）等

```html
<meta name="generator" content="dreamweaver" />
```

### copyright 版权

用于标注版权信息

```cpp
<meta name="copyright" content="stevechow"> // 代表该网站为 stevechow 个人版权所有。
```

### revisit-after 搜索引擎爬虫重访时间

如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。

```html
<meta name="revisit-after" content="7 days" />
```

### renderer 双核浏览器渲染方式

说明：renderer 是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说 360 浏览器。举例：

```html
<!-- 默认webkit内核 -->
<meta name="renderer" content="webkit" />
<!-- 默认IE兼容模式 -->
<meta name="renderer" content="ie-comp" />
<!-- 默认IE标准模式 -->
<meta name="renderer" content="ie-stand" />
```

## http-equiv 属性

> equiv 是 equivalent 的简写，equivalent 有相当于的意思，意思就是相当于 http 的作用。

meta 标签中 http-equiv 属性语法格式是：

```html
<meta http-equiv="参数" content="具体的描述" />
```

其中 http-equiv 属性主要有以下几种参数：

### content-Type 用来设定网页字符集，但推荐使用 HTML5 的方式

旧的 HTML 才这么使用，不推荐：

```html
<meta http-equiv="content-Type" content="text/html;charset=utf-8" />
```

推荐 HTML5 设定网页字符集的方式：

```html
<meta charset="utf-8" />
```

### X-UA-Compatible 浏览器采取何种版本渲染当前页面

用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见）

```html
<!-- 指定 IE 和 Chrome 使用最新版本渲染当前页面 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```

### cache-control 指定请求和响应遵循的缓存机制

#### 指导浏览器如何缓存某个响应以及缓存多长时间

```html
<meta http-equiv="cache-control" content="no-cache" />
```

共有以下几种用法：

1. `no-cache`：先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
2. `no-store`：不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
3. `public`：缓存所有响应（并非必须，因为 max-age 也可以做到相同效果）。
4. `private`：只为单个用户缓存，因此不允许任何中继进行缓存。（比如说 CDN 就不允许缓存 private 的响应）
5. `max-age`：表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如，max-age=60 表示响应可以再缓存和重用 60 秒。

[参考链接：HTTP 缓存](https://web.dev/articles/http-cache?hl=zh-cn#cache-control)

#### 禁止百度自动转码

用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在 head 中加入下面例子中的这句话，就可以避免百度自动转码了。

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```

### expires 网页到期时间

用于设定网页的到期时间，过期后网页必须到服务器上重新传输。

```html
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```

### refresh 自动刷新并指向某页面

网页将在设定的时间内，自动刷新并定向到指定的网址。

```html
<!-- 2秒后跳转百度 -->
<meta http-equiv="refresh" content="2;url=https://www.baidu.com" />
```

> 使用 refresh 浏览器可能提示：Timed refresh must not exist，但可以正常跳转。

### Set-Cookie cookie 设定

如果网页过期。那么这个网页存在本地的 cookies 也会被自动删除。

```html
<meta http-equiv="Set-Cookie" content="name, date" /> // 格式
<meta http-equiv="Set-Cookie" content="User=stevechow; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT" /> // 具体范例
```
