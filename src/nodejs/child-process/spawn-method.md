# spawn 方法详解

## 方法定义
```js
const { spawn } = require('child_process');
const child = spawn(command[, args][, options])
```

## 核心参数解析
### 命令结构
```js
// 正确格式（参数分离）
spawn('git', ['commit', '-m', 'fix: critical bug'])

// 错误格式（避免将参数拼接在命令中）
spawn('git commit -m "fix: critical bug"') 
```

### 关键选项
```js
{
  cwd: '/path/to/workdir',    // 工作目录
  env: { ...process.env },    // 环境变量
  stdio: 'pipe' | 'ignore' | 'inherit',  // 标准流配置
  shell: true,                // 启用shell解析（慎用）
  detached: true,             // 创建独立进程
  signal: abortController.signal  // 终止信号
}
```

## 流式处理机制
### 标准流绑定
```js
const child = spawn('ls', ['-lh'])

// 标准输出流
child.stdout.on('data', (data) => {
  console.log(`输出: ${data}`)
})

// 错误输出流
child.stderr.on('data', (data) => {
  console.error(`错误: ${data}`)
})

// 输入流写入
child.stdin.write('INPUT DATA\n')
child.stdin.end()
```

### 流模式配置
```js
// 配置标准输入输出（父子进程共享）
spawn('node', ['app.js'], {
  stdio: 'inherit'  // 直接使用父进程的stdio
})

// 丢弃错误输出
spawn('cmd', [], {
  stdio: ['pipe', 'pipe', 'ignore'] 
})
```

## 进程生命周期控制
### 退出监听
```js
child.on('exit', (code, signal) => {
  console.log(`退出码: ${code}, 信号: ${signal}`)
})

child.on('close', (code) => {
  console.log('所有流已关闭')
})
```

### 超时终止
```js
const controller = new AbortController()
const timeout = setTimeout(() => {
  controller.abort()
}, 5000)

spawn('long-task', [], { 
  signal: controller.signal 
}).on('close', () => {
  clearTimeout(timeout)
})
```

## ✅ 最佳实践
### 流管理策略
1. 大数据量场景始终使用 `spawn`
2. 未使用的流必须配置为 `ignore`：
```js
spawn('server', [], {
  stdio: ['ignore', 'pipe', 'ignore']
})
```

### 安全执行
1. 优先使用参数数组形式：
```js
// 安全写法
spawn('rm', ['-rf', sanitizedPath])

// 危险写法（可能引发注入）
spawn(`rm -rf ${userInput}`, { shell: true })
```

### 跨平台处理
```js
const cmd = process.platform === 'win32' ? 'dir' : 'ls'
const args = process.platform === 'win32' ? [] : ['-lh']
spawn(cmd, args)
```

## ⚠️ 常见问题
### 命令未找到 (ENOENT)
**错误原因**：  
- 未配置PATH环境变量  
- 命令未全局安装  

**解决方案**：
```js
spawn('custom-cmd', [], {
  env: { ...process.env, PATH: '/custom/path' }
})
```

### 参数传递错误
**典型错误**：
```js
// 错误：参数未拆分
spawn('grep', 'hello world', { shell: true })

// 正确：数组形式拆分
spawn('grep', ['hello world'])
```

### 流阻塞问题
**现象**：  
未消费 stdout 导致进程挂起  

**处理方案**：
```js
// 主动消费或忽略输出
const child = spawn('generator', [], {
  stdio: ['ignore', 'pipe', 'inherit']
})

child.stdout.resume() // 仅消费不处理
```

### Windows 特殊处理
**执行批处理文件**：
```js
spawn('cmd.exe', ['/c', 'build.bat'], {
  windowsVerbatimArguments: true
})
```

### 权限问题
**处理方案**：
```js
// 添加执行权限
const fs = require('fs')
fs.chmodSync('script.sh', 0o755)
spawn('./script.sh')
```

## 调试技巧
```js
// 显示完整命令
console.log('执行命令:', [command, ...args].join(' '))

// 启用调试模式
spawn('node', ['app.js'], {
  env: { ...process.env, DEBUG: 'child_process' }
})
```
