# 子进程基础与核心概念

## 核心模块
```js
const { spawn, exec, execFile, fork } = require('child_process');
```

## 核心概念
### 1. 进程类型
- **同步执行**：`execSync`/`spawnSync`（阻塞事件循环）
- **异步执行**：常规方法（非阻塞）

### 2. 进程通信（IPC）
- 默认无通信通道
- `fork()` 会自动建立 IPC 通道
- 通过 `.send()` 和 `process.on('message')` 通信

### 3. 方法对比表
| 方法       | 特点                          | 输出处理      | 适用场景                |
|------------|------------------------------|---------------|-----------------------|
| `spawn`    | 流式处理                      | 事件流        | 长时间运行/大数据量    |
| `exec`     | 缓存完整输出                  | 回调返回      | 简单命令/小输出       |
| `execFile` | 直接执行文件                  | 同 `exec`     | 执行可执行文件        |
| `fork`     | Node 专用/自带 IPC            | 事件+IPC      | 多进程计算            |

## 基础代码示例

### 同步执行
```js
const { execSync } = require('child_process');
const result = execSync('ls -l', { encoding: 'utf8' });
console.log(result);  // 直接获取完整输出
```

### 异步 spawn
```js
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`退出码: ${code}`);
});
```

### 简单 exec
```js
exec('cat *.js | wc -l', (error, stdout, stderr) => {
  if (error) throw error;
  console.log(`行数: ${stdout}`);
});
```

## ✅ 最佳实践
**方法选择策略**
   - 需要流式处理 → `spawn`
   - 执行文件 → `execFile`
   - 需要安全环境 → 避免 `shell:true`

**资源管理**
   - 始终监听 `exit`/`close` 事件
   - 手动销毁超时进程：
   ```js
   const controller = new AbortController();
   spawn('sleep', ['10'], { signal: controller.signal });
   setTimeout(() => controller.abort(), 1000);
   ```

**性能优化**
   - 大文件处理使用流式 I/O
   - CPU 密集型任务使用 `fork()` + IPC

## ⚠️ 常见问题
### 僵尸进程
- **现象**：父进程未正确监听子进程退出
- **解决**：必须添加错误和退出事件监听器
```js
const child = spawn('bad_command');
child.on('error', (err) => { /* ... */ });
child.on('exit', (code) => { /* ... */ });
```

### Shell 注入
- **高危代码**：
  ```js
  exec(`ls ${userInput}`); // 用户输入可能包含 ; rm -rf /
  ```
- **修复方案**：
  ```js
  execFile('ls', [sanitizedInput]); // 参数自动转义
  ```

### 流未消费
- **现象**：未监听 stdout/stderr 导致缓冲区填满
- **解决**：必须消费流或直接忽略：
```js
spawn('cmd', [], { 
  stdio: ['ignore', 'pipe', 'pipe'] // 显式配置流
});
```

### Windows 兼容性
- 路径分隔符使用 `path` 模块处理
- 执行 .bat/.cmd 文件需显式指定 shell
```js
spawn('cmd.exe', ['/c', 'myfile.bat']);
```

## 总结备忘
| 要点                  | 关键决策点                      |
|-----------------------|-------------------------------|
| 输出量大小            | 大 → spawn / 小 → exec        |
| 需要实时输出          | 必须使用 spawn                |
| 执行第三方可执行文件  | 优先 execFile 避免 shell 注入 |
| 跨平台需求            | 避免直接使用 shell 语法       |
