# 目录操作与遍历

## 核心目录操作

### 创建目录
```js
const fs = require('fs');

// 同步创建（阻塞式）
fs.mkdirSync('new-directory');

// 异步回调
fs.mkdir('logs', { recursive: true }, (err) => {
  if (err) throw err;
});

// Promise 方式（推荐）
const { promises: fsPromises } = require('fs');
await fsPromises.mkdir('temp', { mode: 0o755 });
```

### 删除目录
```js
// 删除空目录（同步）
fs.rmdirSync('empty-dir');

// 递归删除（Node 14+）
fs.rm('non-empty-dir', { 
  recursive: true, 
  force: true 
}, (err) => {});
```

### 读取目录内容
```js
// 同步读取（返回文件名数组）
const files = fs.readdirSync('src');

// 异步读取带文件类型
fs.readdir('uploads', { withFileTypes: true }, (err, entries) => {
  entries.forEach(dirent => {
    console.log(
      `${dirent.name} - ${dirent.isDirectory() ? '目录' : '文件'}`
    );
  });
});
```

## 递归目录遍历

### 同步递归实现
```js
function walkSync(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSync(fullPath);
    } else {
      console.log(fullPath);
    }
  });
}
```

### 异步 Promise 实现
```js
async function walkAsync(dir) {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkAsync(fullPath);
    }
    console.log(fullPath);
  }));
}
```

## 目录监控

### 基本文件监控
```js
// watchFile 轮询检查（不推荐用于目录）
fs.watchFile('config', (curr, prev) => {
  console.log(`修改时间变化：${curr.mtime}`);
});

// watch 实时监控（推荐）
const watcher = fs.watch('logs', (eventType, filename) => {
  console.log(`事件类型：${eventType}，文件：${filename}`);
});

// 关闭监控
watcher.close();
```

### 递归监控实践
```js
const chokidar = require('chokidar'); // 推荐第三方库
chokidar.watch('src', {
  ignored: /node_modules/,
  persistent: true
}).on('all', (event, path) => {
  console.log(`[${event}] ${path}`);
});
```

## ⚠️ 关键注意事项

**阻塞风险**  
同步方法（如 `readdirSync`）在遍历大型目录时会阻塞事件循环

**递归删除陷阱**  
```js
// 危险操作！可能意外删除父目录
fs.rm(path.join(__dirname, '../'), { recursive: true })
```

**监控可靠性**  
- `fs.watch` 在不同平台表现不一致
- macOS 需要安装 Watchman 提高可靠性
- 生产环境建议使用 `chokidar` 库

**路径处理陷阱**  
```js
// 错误：直接拼接路径导致跨平台问题
const badPath = dir + '/' + fileName;
// 正确：使用 path.join()
const goodPath = path.join(dir, fileName);
```

## ✅ 最佳实践

**递归创建目录**  
```js
// 使用 { recursive: true } 自动创建中间目录
await fsPromises.mkdir('project/assets/images', { 
  recursive: true,
  mode: 0o755 
});
```

**安全目录遍历**  
```js
// 限制遍历深度
function safeWalk(dir, depth = 3) {
  if (depth <= 0) return;
  // ...遍历逻辑
}

// 过滤敏感目录
if (entry.name === 'node_modules') return;
```

**高效目录操作**  
- 大目录遍历使用流式处理（如 `readdirp` 库）
- 批量操作使用 Worker 线程
- 缓存频繁访问的目录结构

**错误处理模式**  
```js
try {
  await fsPromises.access('uploads', fs.constants.W_OK);
  const files = await fsPromises.readdir('uploads');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('目录不存在');
  } else if (err.code === 'EACCES') {
    console.log('权限不足');
  }
}
```
