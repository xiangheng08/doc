# 文件系统基础操作

## 引入 fs 模块
Node.js 通过内置的 `fs` 模块操作文件系统：
```js
const fs = require('fs'); // 标准回调风格/同步 API
const fsPromises = require('fs').promises; // Promise API (Node 10+)
// or
const fsPromises = require('fs/promises');
```

ESM

```js
import * as fs from 'node:fs'; // 标准回调风格/同步 API
import * as fsPromises from 'fs/promises'; // Promise API (Node 10+)
// or
import { promises as fsPromises } from 'fs';
```

---

## 三种操作模式
### 同步模式（阻塞）
```js
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('读取失败:', err);
}
```

### 异步回调模式（非阻塞）
```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promise API（推荐）
```js
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('读取失败:', err);
  }
}
```

## 基础文件操作
### 读取文件
```js
// 异步读取（默认返回 Buffer）
fs.readFile('image.jpg', (err, data) => {
  if (err) throw err;
  console.log(data); // <Buffer ff d8 ff e0 ...>
});

// 文本文件需指定编码
fs.readFile('text.txt', 'utf8', callback);
```

### 写入文件
```js
// 覆盖写入（文件不存在则创建）
fs.writeFile('log.txt', '新的内容', 'utf8', (err) => {
  if (err) throw err;
});
```

### 追加内容
```js
fs.appendFile('log.txt', '\n追加的行', (err) => {
  if (err) throw err;
});
```

## 文件存在性检查
```js
// 同步检查
if (fs.existsSync('config.json')) {
  // 文件存在
}

// 异步推荐方式
fs.access('config.json', fs.constants.F_OK, (err) => {
  console.log(err ? '不存在' : '存在');
});

// 避免使用已废弃的 exists
fs.exists('config.json', (exists) => {
  console.log(exists ? '存在' : '不存在');
});
```

## ⚠️ 注意事项
1. **同步方法慎用**：会阻塞事件循环，仅适合启动初始化阶段
2. **路径安全性**：用户输入路径时需防范路径遍历攻击
3. **编码一致性**：读写操作需保持相同字符编码
4. **错误处理**：异步操作必须处理回调中的错误
5. **性能对比**：
   - 小文件：`readFile/writeFile` 更方便
   - 大文件：推荐使用流（Stream）操作
