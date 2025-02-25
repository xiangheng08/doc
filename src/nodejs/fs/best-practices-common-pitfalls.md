# 最佳实践与常见问题

## 同步方法使用原则

### 适用场景
```js
// 启动初始化阶段（阻塞不影响业务）
const config = JSON.parse(fs.readFileSync('config.json'));

// CLI 工具脚本（执行顺序明确）
fs.writeFileSync('output.log', processReport());
```

### 危险场景
```js
// HTTP 请求处理中（会阻塞所有并发请求）
app.get('/data', () => {
  const data = fs.readFileSync('large.csv'); // ❌
});
```

## 路径处理陷阱

### 跨平台问题
```js
// 错误：硬编码路径分隔符
const badPath = 'src\\config'; // Windows 专属

// 正确：动态路径处理
const goodPath = path.join('src', 'config', 'app.ini');
```

### 路径安全防护
```js
// 过滤用户输入路径
function sanitizePath(userInput) {
  const basePath = path.resolve('uploads');
  const fullPath = path.join(basePath, userInput);
  if (!fullPath.startsWith(basePath)) {
    throw new Error('非法路径访问');
  }
  return fullPath;
}
```

## 回调地狱解决方案

### Promise 包装技巧
```js
const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, (err, data) => {
    err ? reject(err) : resolve(data);
  });
});

// 使用 async/await 简化
async function processFiles() {
  const [a, b] = await Promise.all([
    readFile('a.txt'),
    readFile('b.txt')
  ]);
}
```

## 内存管理策略

### 大文件处理对比
```js
// 危险：一次性读取（内存峰值 2GB）
fs.readFile('huge.iso', (err, data) => {});

// 安全：流式处理（内存稳定）
fs.createReadStream('huge.iso')
  .pipe(fs.createWriteStream('copy.iso'));
```

### 缓存优化方案
```js
const fileCache = new Map();

async function getFileWithCache(path) {
  if (fileCache.has(path)) {
    return fileCache.get(path);
  }
  const data = await fs.promises.readFile(path);
  fileCache.set(path, data);
  return data;
}
```

## ⚠️ 常见性能问题

**重复文件状态检查**  
```js
// 错误：循环中频繁调用 stat
setInterval(() => {
  fs.stat('file', () => { ... }); // 高 I/O 开销
}, 100);

// 优化：使用 watch 或合理缓存
```

**小文件流式滥用**  
```js
// 不必要流处理（增加复杂度）
createReadStream('1kb.txt').pipe(process.stdout); 

// 更优方案：直接 readFile
```

**不当的并发控制**  
```js
// 同时打开数千个文件描述符
files.forEach(file => fs.promises.open(file)); // 导致 EMFILE 错误

// 解决方案：使用 p-limit 控制并发
```

## ✅ 工程化实践

**配置加载规范**  
```js
// 使用 require 缓存机制
function reloadConfig() {
  delete require.cache[require.resolve('./config.json')];
  return require('./config.json');
}
```

**日志滚动策略**  
```js
const MAX_LOG_SIZE = 1024 * 1024 * 100; // 100MB

async function writeLog(message) {
  const stats = await fs.promises.stat('app.log');
  if (stats.size > MAX_LOG_SIZE) {
    await fs.promises.rename('app.log', `app.${Date.now()}.log`);
  }
  await fs.promises.appendFile('app.log', message);
}
```

**原子文件操作**  
```js
// 使用临时文件+重命名保证操作完整性
async function safeWrite(path, content) {
  const tempPath = `${path}.${process.pid}.tmp`;
  await fs.promises.writeFile(tempPath, content);
  await fs.promises.rename(tempPath, path);
}
```

## 高频问题解答

**Q：为什么文件已存在却报 ENOENT？**  
- 路径包含不存在的中间目录
- 文件路径包含非法字符（如 NUL）
- 父目录权限不足

**Q：如何正确处理文件锁？**  
```js
// 使用 flock（需要第三方库）
const { flock } = require('fs-ext');
const fd = await fs.promises.open('data.lock', 'w');
await flock(fd, 'ex'); // 排他锁
```

**Q：如何监控整个目录树的变化？**  
- 使用 chokidar 库（封装跨平台处理）
- 避免递归使用 fs.watch
```js
const chokidar = require('chokidar');
chokidar.watch('src', { ignoreInitial: true })
  .on('all', (event, path) => { ... });
```
