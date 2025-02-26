# exec/execFile 方法对比

## 方法定义
```js
// exec 方法
const { exec } = require('child_process');
exec(command[, options], callback)

// execFile 方法
const { execFile } = require('child_process');
execFile(file[, args][, options], callback)
```

## 核心差异对比表
| 特征                | exec                      | execFile            |
| ------------------- | ------------------------- | ------------------- |
| **执行方式**        | 通过 shell 执行           | 直接执行二进制文件  |
| **参数传递**        | 完整命令字符串            | 文件路径 + 参数数组 |
| **执行速度**        | 较慢（需启动 shell）      | 较快（直接执行）    |
| **安全系数**        | 低（存在 shell 注入风险） | 高（参数自动转义）  |
| **支持 shell 语法** | 支持（管道/重定向等）     | 不支持              |
| **Windows 扩展名**  | 自动识别 .bat/.cmd        | 需显式指定扩展名    |

## 典型使用场景
### exec 适用场景
```js
// 1. 需要 shell 特性的操作
exec('ls *.js | wc -l', (err, stdout) => {
  console.log(`JS 文件数量: ${stdout}`)
})

// 2. 快速执行简单命令
exec('git status', { cwd: './project' }, (err, stdout) => {
  if (err) return console.error(err)
  console.log(stdout)
})
```

### execFile 适用场景
```js
// 1. 执行系统命令（避免 shell 注入）
execFile('/bin/ls', ['-l', '/usr'], (err, stdout) => {
  console.log('目录内容:', stdout)
})

// 2. 运行二进制程序
execFile('/tmp/app', ['--port=3000'], (err) => {
  if (err) console.error('启动失败:', err)
})
```

## ✅ 最佳实践
### 安全优先原则
1. **用户输入处理**：
```js
// 危险写法（exec）
exec(`rm -rf ${userInput}`) 

// 安全写法（execFile）
execFile('/bin/rm', ['-rf', sanitizedPath])
```

2. **输出限制**：
```js
// 防止缓冲区溢出（默认 1MB）
exec('find /', { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
  // 处理 10MB 输出
})
```

### 性能优化
```js
// 复用 shell 进程（仅限需要多次执行 shell 命令的场景）
const shell = exec('sh', { stdio: ['pipe', 'pipe', 'pipe'] })
shell.stdin.write('npm install\n')
shell.stdin.write('npm start\n')
```

### 错误处理规范
```js
execFile('node', ['app.js'], (error, stdout, stderr) => {
  if (error) {
    console.error('错误码:', error.code)
    console.error('信号:', error.signal)
    return
  }
  console.log('输出:', stdout)
})
```

## ⚠️ 常见问题
### 1. Shell 注入漏洞
**高危场景**：
```js
// 用户可控输入导致风险
exec(`scan ${userInput}`) // 若输入 "; rm -rf /" 将导致灾难
```

**解决方案**：
```js
// 使用 execFile + 参数数组
execFile('scan', [userInput]) // 自动转义特殊字符
```

### 2. 缓冲区溢出
**现象**：  
`Error: stdout maxBuffer exceeded`

**处理方案**：
```js
exec('big-data-generator', { 
  maxBuffer: 1024 * 1024 * 50 // 调整为 50MB
}, (err, stdout) => { /*...*/ })
```

### 3. Windows 执行异常
**执行 .bat 文件问题**：
```js
// 错误写法（可能无法识别）
execFile('build.bat')

// 正确写法（显式调用 cmd）
execFile('cmd.exe', ['/c', 'build.bat'])
```

### 4. 退出码误判
**特殊案例**：
```js
exec('exit 1', (err) => {
  console.log(err.code) // 输出 1
  console.log(err.signal) // 输出 null
})

execFile('node', ['-e', 'process.exit(2)'], (err) => {
  console.log(err.code) // 输出 2
})
```

## 高级配置选项
### 通用选项
```js
{
  timeout: 5000, // 超时控制（毫秒）
  encoding: 'buffer', // 输出编码格式
  killSignal: 'SIGTERM', // 超时后发送的信号
  windowsHide: true // 隐藏 Windows 子进程窗口
}
```

### 环境变量配置
```js
execFile('app', [], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '3000'
  }
}, (err) => { /*...*/ })
```

## 调试技巧
```js
// 查看实际执行的命令
console.log(util.inspect([command, args], { breakLength: Infinity }))

// 捕获完整错误流
exec('problematic-cmd', (err, stdout, stderr) => {
  console.log('完整错误日志:', stderr)
})
```

## 方法选择决策树
```
是否需要 shell 特性？
├─ 是 → exec
└─ 否 → 
  ├─ 执行二进制文件？ → execFile
  └─ 执行 Node 脚本？ → fork()
```
