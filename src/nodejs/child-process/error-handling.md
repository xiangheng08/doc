# 错误处理与调试技巧

## 核心错误类型
### 进程启动错误
```js
const child = spawn('invalid-command');
child.on('error', (err) => {
  console.error('启动失败:', err.message); // ENOENT 错误
});
```

### 运行时错误捕获
```js
child.stderr.on('data', (data) => {
  console.error('子进程错误:', data.toString());
});
```

### 退出状态处理
```js
child.on('exit', (code, signal) => {
  if (code === null) {
    console.log(`被信号终止: ${signal}`);
  } else if (code !== 0) {
    console.log(`异常退出码: ${code}`);
  }
});
```

### 流处理错误
```js
child.stdout.on('error', (err) => {
  console.error('输出流错误:', err);
});
```

## ✅ 最佳实践
### 错误监听全覆盖
```js
// 创建安全进程封装函数
function safeSpawn(...args) {
  const child = spawn(...args);
  
  child.on('error', (err) => { /* 处理启动错误 */ });
  child.stderr.on('data', (data) => { /* 处理运行错误 */ });
  child.on('exit', (code) => { /* 处理退出状态 */ });
  
  return child;
}
```

### 资源清理规范
```js
// 强制终止残留进程
function killChild(child) {
  child.stdin?.destroy();
  child.stdout?.destroy();
  child.stderr?.destroy();
  
  if (!child.killed) {
    child.kill('SIGTERM');
    setTimeout(() => {
      if (child.connected) child.kill('SIGKILL');
    }, 5000);
  }
}
```

### 超时处理模板
```js
async function runWithTimeout(command, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const child = spawn(command, { signal: controller.signal });
    let output = '';
    
    child.stdout.on('data', (d) => output += d);
    
    await new Promise((resolve, reject) => {
      child.on('close', resolve);
      child.on('error', reject);
    });
    
    return output;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

## ⚠️ 常见问题
### 静默失败
**危险代码**：
```js
exec('危险命令', (err) => {
  if (err) return; // 未处理错误
});
```

**解决方案**：
```js
exec('命令', (err) => {
  if (err) {
    console.error(err);
    process.exit(1); // 显式退出
  }
});
```

### 退出码混淆
**错误理解**：
```js
child.on('exit', (code) => {
  if (code) console.log('失败'); // 部分程序使用非0码表示正常
});
```

**正确做法**：
```js
// 根据具体命令文档判断退出码含义
const VALID_CODES = new Set([0, 2, 3]);
child.on('exit', (code) => {
  if (!VALID_CODES.has(code)) {
    console.error('异常退出:', code);
  }
});
```

### 调试信息丢失
**错误现象**：
```js
exec('失败命令', { stdio: 'ignore' }, (err) => {
  // 无法查看错误详细信息
});
```

**诊断方案**：
```js
const child = spawn('错误命令', [], {
  stdio: ['inherit', 'inherit', 'pipe']
});

child.stderr.pipe(fs.createWriteStream('error.log'));
```

## 高级调试技巧
### 进程跟踪
```js
// 显示完整执行命令
console.log('执行命令:', 
  [command, ...args]
    .map(s => s.includes(' ') ? `"${s}"` : s)
    .join(' ')
);
```

### 堆栈追踪增强
```js
exec('错误命令', (err) => {
  if (err) {
    Error.captureStackTrace(err); // 增强错误堆栈
    throw err;
  }
});
```

### 内存泄漏检测
```js
const heapdump = require('heapdump');
child.on('message', (msg) => {
  if (msg.type === 'memory-pressure') {
    heapdump.writeSnapshot();
  }
});
```

### 跨进程调试
```js
// 子进程启动参数
fork('./worker.js', [], {
  execArgv: ['--inspect-brk=9229']
});

// Chrome DevTools 连接至 localhost:9229
```

## 调试工具配置
### VSCode 调试配置
```json
{
  "type": "node",
  "request": "launch",
  "name": "调试子进程",
  "runtimeArgs": ["--inspect-brk"],
  "skipFiles": ["<node_internals>/**"],
  "console": "integratedTerminal"
}
```

### 性能分析
```js
// 生成CPU profile
child.send({ type: 'start-profiling' });
setTimeout(() => {
  child.send({ type: 'stop-profiling' });
}, 5000);
```

## 错误分类处理表
| 错误类型         | 检测方式                | 处理方案                   |
|------------------|-------------------------|---------------------------|
| 启动失败         | `error` 事件            | 检查PATH/文件权限         |
| 异常退出         | `exit` 事件 code≠0      | 日志分析/自动重启         |
| 流阻塞           | 进程挂起无响应          | 消费流/配置ignore         |
| 超时             | 定时器+AbortController  | 终止进程/重试机制         |
| 内存泄漏         | 内存监控工具            | 快照分析/优化消息体积     |
