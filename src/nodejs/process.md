# process 进程

掌握进程管理的核心API与开发实战技巧

## 🧩 核心属性详解

### 基础运行时属性
| 属性               | 说明                                               | 典型场景       |
| ------------------ | -------------------------------------------------- | -------------- |
| `process.argv`     | 命令行参数数组（索引0: Node路径，索引1: 脚本路径） | CLI工具开发    |
| `process.argv0`    | 原始`argv[0]`值（可能被修改）                      | 进程溯源       |
| `process.env`      | 环境变量对象（支持动态修改）                       | 多环境配置     |
| `process.execPath` | Node.js可执行文件绝对路径                          | 子进程生成     |
| `process.versions` | 核心依赖版本信息对象                               | 环境兼容性检查 |
```js
// process.versions示例
{
  node: '20.5.1',
  v8: '11.3.244.8-node.13',
  uv: '1.46.0',
  zlib: '1.2.13',
  // ...
}
```

### 进程控制属性
| 属性               | 说明                                     |
| ------------------ | ---------------------------------------- |
| `process.exitCode` | 设置退出码（替代`process.exit()`更安全） |
| `process.pid`      | 当前进程PID                              |
| `process.ppid`     | 父进程PID（process.parent PID缩写）      |
| `process.arch`     | CPU架构标识（'arm', 'x64', 'ia32'等）    |

## ⚙️ 核心方法解析

### 文件系统相关
```js
// 获取/修改工作目录
console.log(process.cwd()); // '/projects/app'
process.chdir('/tmp');      // 改变工作目录

// 文件模式掩码
const oldMask = process.umask(0o022); // 设置新掩码返回旧值
```

### 进程控制
```js
// 高精度计时（纳秒级）
const start = process.hrtime.bigint();
setTimeout(() => {
  const duration = Number(process.hrtime.bigint() - start)/1e9;
  console.log(`耗时 ${duration} 秒`);
}, 1000);

// 内存分析
const { rss, heapUsed } = process.memoryUsage();
console.log(`物理内存: ${rss} bytes | 堆使用: ${heapUsed} bytes`);
```

### 信号处理
```js
// 发送信号到其他进程
process.kill(14321, 'SIGUSR1');

// 自我终止（慎用）
process.abort(); // 立即生成核心转储文件并退出
```

## 📡 关键事件系统

### 生命周期事件
| 事件         | 触发时机                 | 注意事项         |
| ------------ | ------------------------ | ---------------- |
| `exit`       | 进程即将退出（同步执行） | 不可执行异步操作 |
| `beforeExit` | 事件循环为空时触发       | 可执行异步操作   |
| `disconnect` | IPC通道断开时触发        | 集群/子进程场景  |

### 错误处理事件
```js
// 未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});

// 实验性警告
process.on('warning', (warning) => {
  if (warning.code === 'DEP0097') {
    console.warn('弃用警告:', warning.message);
  }
});
```

### 信号事件
```js
// 自定义信号处理
process.on('SIGUSR1', () => {
  console.log('收到用户自定义信号');
  // 执行日志转存等操作
});

// 优雅关闭
process.on('SIGTERM', () => {
  db.closeConnection().finally(() => {
    process.exit(0);
  });
});
```

## ✅ 最佳实践

### 环境变量管理
```js
// 类型转换处理
const PORT = parseInt(process.env.PORT || '3000');
const ENABLE_CACHE = process.env.CACHE === 'true'; // 字符串转布尔

// 敏感信息过滤
const sanitizedEnv = Object.keys(process.env)
  .filter(key => !/PASSWORD/i.test(key))
  .reduce((obj, key) => ({...obj, [key]: process.env[key]}), {});
```

### 错误处理策略
```js
// 全局异常处理中间件
process.on('uncaughtException', (err) => {
  logger.fatal(err);
  // 紧急恢复：关闭连接后重启
  server.close(() => {
    cluster.fork(); // 集群模式下重启
  });
  setTimeout(() => process.exit(1), 5000).unref();
});
```

### 性能优化
```bash
# 启动时添加V8优化参数
NODE_OPTIONS='--max-old-space-size=4096' node app.js
```

## ⚠️ 常见问题

### 环境变量失效
- **现象**：`process.env`读取值为`undefined`
- **检查清单**：
  1. 变量名是否包含空格等特殊字符
  2. 在Windows系统使用`SET VAR=value`临时设置
  3. 检查.env文件编码格式（推荐UTF-8）

### 内存泄漏定位
1. 使用`process.memoryUsage()`定期记录内存快照
2. 通过Chrome DevTools Memory面板分析堆快照
3. 检查未释放的定时器/事件监听器

### 进程僵死处理
```js
// 心跳检测机制
setInterval(() => {
  if(Date.now() - lastActivity > 30000) {
    console.error('进程无响应，主动退出');
    process.exit(2);
  }
}, 5000).unref();
```

### 信号处理异常
- **现象**：SIGTERM无法终止进程
- **解决方案**：
  ```js
  process.on('SIGTERM', () => {
    // 标记关闭状态，停止接受新请求
    isShuttingDown = true;
    // 设置关闭超时
    setTimeout(() => {
      console.error('强制终止进程');
      process.exit(1);
    }, 30000).unref();
    // 关闭资源
    closeResources().then(() => process.exit(0));
  });
  ```

> 📘 扩展阅读：[Node.js Process官方文档](https://nodejs.org/api/process.html) | [进程信号详解](https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html)  
> 🔍 调试技巧：使用`NODE_DEBUG=process node app.js`查看进程底层操作
