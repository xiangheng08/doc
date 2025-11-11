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

## 基本使用

### 引入 dayjs

```javascript
import dayjs from 'dayjs'
// 或者
const dayjs = require('dayjs')
```

### 获取当前时间

```javascript
const now = dayjs()
console.log(now.format()) // 输出当前时间，如：2024-06-20T12:00:00+08:00
```

### 解析日期

Day.js 可以解析多种格式的日期：

```javascript
const date = dayjs('2023-10-01')
console.log(date.format('MMMM D, YYYY')) // 输出：October 1, 2023
```

### 格式化日期

```javascript
const now = dayjs()
console.log(now.format('YYYY-MM-DD')) // 输出：2023-10-01
console.log(now.format('YYYY/MM/DD')) // 输出：2023/10/01
```

### 操作日期

你可以轻松地添加或减去时间：

```javascript
const date = dayjs()
console.log(date.add(1, 'day').format('YYYY-MM-DD')) // 输出明天的日期
console.log(date.subtract(7, 'day').format('YYYY-MM-DD')) // 输出一周前的日期
```

### 比较日期

Day.js 提供了多种方法来比较日期：

```javascript
const date1 = dayjs('2023-10-01')
const date2 = dayjs('2023-10-10')

console.log(date1.isBefore(date2)) // true
console.log(date1.isSame(date2)) // false
console.log(date1.isAfter(date2)) // false
```
