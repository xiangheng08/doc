# 错误处理与调试

## 错误处理模式

### 回调函数模式
```js
// 错误优先回调标准写法
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('文件不存在');
      return;
    }
    throw err; // 不可恢复错误向上抛出
  }
  console.log(data);
});
```

### Promise 错误处理
```js
async function processFile() {
  try {
    const data = await fs.promises.readFile('data.bin');
  } catch (err) {
    if (err.code === 'EACCES') {
      console.log('权限不足');
      return;
    }
    console.error('未知错误:', err.stack);
  }
}
```

## 常见错误类型

### 文件系统错误代码
| 错误码  | 含义               | 典型场景             |
| ------- | ------------------ | -------------------- |
| ENOENT  | 文件/目录不存在    | 路径错误/文件未创建  |
| EACCES  | 权限不足           | 无读写权限           |
| EISDIR  | 意外收到目录       | 对目录执行文件操作   |
| ENOTDIR | 期望目录但收到文件 | 路径中间部分不是目录 |
| EEXIST  | 文件已存在         | 重复创建             |
| ENOSPC  | 磁盘空间不足       | 写入大文件时         |

## 调试技巧

### 错误堆栈分析
```js
fs.open('missing.txt', 'r', (err) => {
  console.error(err.stack);
  // 输出包含调用链的错误堆栈：
  // Error: ENOENT: no such file or directory...
  //     at Object.open (fs.js:472:3)
  //     at /app/index.js:15:6
});
```

### 调试日志实践
```js
const debug = require('util').debuglog('fs');
// 启动时设置 NODE_DEBUG=fs

function safeWrite(file, content) {
  debug(`尝试写入文件 ${file}`);
  fs.writeFile(file, content, (err) => {
    if (err) debug(`写入失败: ${err.code}`);
  });
}
```

## 大文件处理陷阱

### 内存溢出防护
```js
// 错误：直接读取大文件到内存
fs.readFile('huge-file.bin', (err, data) => { /* 可能崩溃 */ });

// 正确：使用流处理
fs.createReadStream('huge-file.bin')
  .on('error', handleError)
  .pipe(process.stdout);
```

### 流错误传播
```js
const { pipeline } = require('stream');

pipeline(
  fs.createReadStream('input'),
  zlib.createGzip(),
  fs.createWriteStream('output.gz'),
  (err) => {
    if (err) {
      console.error('管道处理失败:', err.code);
    }
  }
);
```

## ⚠️ 关键注意事项

**未捕获的 Promise 错误**  
```js
// 危险！未处理的 Promise 拒绝
fs.promises.readFile('missing.txt');
// 正确：始终添加 catch 处理
fs.promises.readFile('missing.txt').catch(console.error);
```

**错误类型误判**  
```js
// 错误：直接判断错误消息内容
if (err.message.includes('exist')) { /* 不可靠！ */ }

// 正确：使用 err.code 判断
if (err.code === 'EEXIST') { /* 可靠判断 */ }
```

**同步操作陷阱**  
```js
try {
  fs.writeFileSync('/sys/config', 'data');
} catch (err) {
  // 同步错误必须立即处理
  process.exit(1);
}
```

## ✅ 最佳实践

**错误包装模式**  
```js
class FileSystemError extends Error {
  constructor(code, path) {
    super(`文件操作失败 (${code})`);
    this.code = code;
    this.path = path;
  }
}

function readConfig() {
  return fs.promises.readFile('config.yaml')
    .catch(err => {
      throw new FileSystemError(err.code, 'config.yaml');
    });
}
```

**防御性编程**  
```js
async function safeDelete(path) {
  try {
    const stats = await fs.promises.stat(path);
    if (stats.isFile()) {
      await fs.promises.unlink(path);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}
```

**调试工具链**  
- 使用 `node --inspect` 进行 Chrome DevTools 调试
- 使用 `ndb` 或 `VS Code` 调试器设置文件系统断点
- 性能分析：`node --prof` + Chrome DevTools Performance

**错误恢复策略**  
```js
const MAX_RETRY = 3;
async function robustWrite(path, data) {
  let attempt = 0;
  while (true) {
    try {
      return await fs.promises.writeFile(path, data);
    } catch (err) {
      if (++attempt > MAX_RETRY) throw err;
      await new Promise(r => setTimeout(r, 100 * attempt));
    }
  }
}
```
