# 文件属性与元数据

## 获取文件元数据
### 核心方法
```js
const fs = require('fs');

// 同步获取（返回 Stats 对象）
const stats = fs.statSync('file.txt');

// 异步回调
fs.stat('file.txt', (err, stats) => {
  if (err) throw err;
  console.log(stats);
});

// Promise 方式（推荐）
const { promises: fsPromises } = require('fs');
const stats = await fsPromises.stat('file.txt');
```

## Stats 对象解析
### 关键属性
```js
console.log({
  size: stats.size,         // 文件大小（字节）
  mtime: stats.mtime,      // 最后修改时间（Date 对象）
  ctime: stats.ctime,      // 最后状态变更时间（如权限修改）
  atime: stats.atime,      // 最后访问时间
  birthtime: stats.birthtime, // 创建时间（部分系统不支持）
  mode: stats.mode,        // 文件权限与类型编码
  ino: stats.ino           // 文件系统 inode 编号
});
```

### 类型判断方法
```js
stats.isFile();      // 是否是普通文件
stats.isDirectory(); // 是否是目录
stats.isSymbolicLink(); // 是否是符号链接（需用 fs.lstat）
stats.isSocket();    // 是否是 socket 文件
stats.isBlockDevice(); // 是否是块设备文件
```

## 时间戳详解
### 不同时间的含义
| 属性     | 描述                          | 跨平台差异                  |
|----------|-------------------------------|----------------------------|
| mtime    | 文件内容最后修改时间          | 最可靠的跨平台时间戳        |
| ctime    | 文件状态最后变更时间          | 在 Windows 表示创建时间     |
| atime    | 最后访问时间                  | 可能因系统配置不更新        |
| birthtime| 文件创建时间                  | 部分 UNIX 系统不支持        |

### 时间格式化示例
```js
const formattedTime = stats.mtime.toLocaleString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});
// 输出：2023-08-15 14:30
```

## 实际应用场景
### 监控文件修改
```js
let lastCheck = 0;

setInterval(async () => {
  const stats = await fsPromises.stat('data.json');
  if (stats.mtimeMs > lastCheck) {
    lastCheck = stats.mtimeMs;
    console.log('文件已被修改！');
  }
}, 1000);
```

### 文件大小限制检查
```js
const MAX_SIZE = 1024 * 1024; // 1MB
if (stats.size > MAX_SIZE) {
  throw new Error('文件超过大小限制');
}
```

## ⚠️ 关键注意事项
1. **符号链接陷阱**：
   ```js
   // 使用 fs.stat 会跟随符号链接
   // 要获取链接本身信息需用 fs.lstat
   const linkStats = fs.lstatSync('symlink');
   ```

2. **时间戳精度问题**：
   ```js
   // 高精度时间戳（毫秒）
   console.log(stats.mtimeMs); // 1689345612345.678
   ```

3. **跨平台差异**：
   - macOS：birthtime 准确
   - Linux：部分文件系统不记录 birthtime
   - Windows：ctime 表示创建时间

4. **性能影响**：
   - 高频调用 fs.stat 会影响性能（考虑缓存策略）
   - 监控大量文件时建议使用 fs.watch

## ✅ 最佳实践
- **类型检查优先**：操作前始终验证文件类型
  ```js
  if (!stats.isFile()) {
    throw new Error('目标不是普通文件');
  }
  ```
- **缓存策略**：
  ```js
  let cachedStats = null;
  function getCachedStats() {
    if (!cachedStats || Date.now() - cachedStats.timestamp > 5000) {
      cachedStats = {
        data: fs.statSync('large-file.dat'),
        timestamp: Date.now()
      };
    }
    return cachedStats.data;
  }
  ```
- **权限检查组合技**：
  ```js
  // 检查可读性（配合 access API）
  fs.accessSync('file.txt', fs.constants.R_OK);
  const stats = fs.statSync('file.txt');
  ```
