# 高级文件操作

## 文件流处理

### 流式读写大文件
```js
const fs = require('fs');

// 创建读取流（自动处理背压）
const readStream = fs.createReadStream('large-video.mp4', {
  highWaterMark: 1024 * 1024 // 1MB 缓冲区
});

// 创建写入流
const writeStream = fs.createWriteStream('copy-video.mp4');

// 管道操作
readStream.pipe(writeStream);

// 进度监控
readStream.on('data', (chunk) => {
  console.log(`已传输 ${chunk.length} 字节`);
});
```

### 流事件处理
```js
writeStream.on('finish', () => {
  console.log('写入完成');
});

readStream.on('error', (err) => {
  console.error('读取失败:', err);
});
```

## 文件描述符操作

### 底层文件控制
```js
const fs = require('fs').promises;

let fd;
try {
  // 打开文件获取描述符
  fd = await fs.open('data.bin', 'r+');
  
  // 定位并读取
  const buffer = Buffer.alloc(100);
  await fd.read(buffer, 0, 100, 0);
  
  // 定位并写入
  await fd.write('EOF', 1024);
} finally {
  if (fd) await fd.close();
}
```

### 原子写入操作
```js
// 使用 writev 进行批量写入
const buffers = [Buffer.from('Header'), Buffer.from('Body')];
await fd.writev(buffers, 0);
```

## 文件锁机制

### 简易锁实现
```js
const lockFile = 'file.lock';

// 排他锁创建
try {
  const fd = await fs.open(lockFile, 'wx');
  // 获得锁后执行操作
  await processCriticalTask();
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('资源被锁定');
  }
} finally {
  fs.unlinkSync(lockFile);
}
```

## 文件权限管理

### 权限修改
```js
// 设置权限为 644 (rw-r--r--)
fs.chmodSync('config.cfg', 0o644);

// 异步添加执行权限
fs.chmod('script.sh', 0o755, (err) => {
  if (err) throw err;
});
```

### 权限检查
```js
// 验证可写权限
try {
  await fs.access('system.log', fs.constants.W_OK);
  console.log('文件可写');
} catch {
  console.log('无写入权限');
}
```

## ⚠️ 关键注意事项

**流操作内存泄漏**  
```js
// 错误：未处理暂停流导致内存增长
readStream.on('data', (chunk) => {
  if (needPause) readStream.pause();
  // 忘记恢复流
});

// 正确：使用自动背压管理的 pipe 方法
```

**文件描述符泄漏**  
```js
// 危险！忘记关闭描述符
const fd = await fs.open('temp');
// 应该始终在 finally 块中关闭
```

**锁机制可靠性**  
- 简单文件锁在集群模式下不可靠
- 生产环境建议使用 `proper-lockfile` 等专业库

**权限继承问题**  
```js
// 目录权限会影响新建文件的默认权限
fs.mkdirSync('securedir', 0o700);
// 在此目录创建的文件将继承权限
```

## ✅ 最佳实践

**高效流处理**  
```js
// 使用 pipeline 管理复杂流
const { pipeline } = require('stream');
pipeline(
  fs.createReadStream('input.csv'),
  csvParser(),
  fs.createWriteStream('output.json'),
  (err) => {
    if (err) console.error('管道处理失败:', err);
  }
);
```

**安全的临时文件**  
```js
const tempFile = path.join(os.tmpdir(), `temp_${crypto.randomBytes(6).toString('hex')}`);
// 创建后立即设置权限
await fs.writeFile(tempFile, data, { mode: 0o600 });
```

**原子替换文件**  
```js
// 防止写入过程中出现部分文件
fs.writeFileSync('data.tmp', newData);
fs.renameSync('data.tmp', 'data.final');
```

**跨平台权限策略**  
```js
// 使用符号模式更易读
fs.chmodSync('script.sh', 'u+rwx,g+rx,o-rwx');
```
