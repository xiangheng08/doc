# Day.js

## 简介

Day.js 是一个轻量级的 JavaScript 日期处理库，专注于解决处理日期和时间的问题。与一些庞大的日期库不同，Day.js 的设计理念是保持简洁、易用和灵活。它的大小仅有 2KB 左右，而且拥有强大的功能。

### 特性

- **轻量级**: 只有 ~2KB (gzip 后更小)，远小于 Moment.js（约 200KB+）
- **不可变 (Immutable)**: 所有操作都返回新对象，不会修改原对象，更安全、更函数式
- **模块化**: 可按需引入插件，避免引入不必要的功能，保持体积最小化
- **链式调用**: 支持链式 API，使用直观、优雅
- **浏览器 & Node.js 兼容**: 可在前后端同时使用
- **Moment.js 风格 API**: 如果你熟悉 Moment.js，几乎可以零成本迁移到 Day.js

### 安装

使用 npm 或 yarn 安装：

```bash
npm install dayjs
# 或
yarn add dayjs
```

也可以通过 CDN 直接在 HTML 文件中引入 Day.js：

```html
<script src="https://unpkg.com/dayjs"></script>
```

## 相关链接

- [Day.js](https://day.js.org/zh-CN/)
