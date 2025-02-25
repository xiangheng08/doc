# os 模块

`os` 模块是 Node.js 的核心模块，用于获取操作系统相关信息，包括：
- 系统资源（CPU/内存）
- 网络接口
- 用户信息
- 系统运行时间
- 文件路径分隔符

```js
const os = require('node:os');
```

## 核心属性

| 属性            | 描述           | 示例值         |
| --------------- | -------------- | -------------- |
| `os.EOL`        | 操作系统换行符 | `\n` (Linux)   |
| `os.arch()`     | CPU 架构       | 'x64'          |
| `os.constants`  | 系统常量对象   | 包含信号常量等 |
| `os.platform()` | 操作系统平台   | 'linux'        |

## 常用方法

### 系统资源
```js
os.cpus()      // 返回 CPU 核心信息数组
os.freemem()   // 返回可用内存（字节）
os.totalmem()  // 返回总内存（字节）
os.loadavg()   // 返回 1/5/15 分钟平均负载（仅 Linux/macOS）
```

### 网络信息
```js
os.networkInterfaces() 
// 返回网络接口信息对象
// 示例输出：{ eth0: [ { address: '192.168.1.2', family: 'IPv4' } ] }
```

### 用户信息
```js
os.homedir()    // 返回当前用户主目录
os.userInfo()   // 返回当前用户信息对象
```

### 系统运行
```js
os.uptime()     // 返回系统运行时间（秒）
os.hostname()   // 返回主机名
```

## ✅ 最佳实践

### 监控系统资源
```js
setInterval(() => {
  console.log(`可用内存: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
}, 5000);
```

### 跨平台路径处理
```js
const path = require('path');
const downloadsPath = path.join(os.homedir(), 'Downloads');
```

### CPU 核心数判断
```js
const workerCount = os.cpus().filter(cpu => cpu.model.includes('Intel')).length;
```

### 网络检测
```js
function hasIPv4() {
  return Object.values(os.networkInterfaces())
    .flat()
    .some(iface => iface.family === 'IPv4' && !iface.internal);
}
```

## ⚠️ 常见问题

### 为什么 `os.totalmem()` 返回值小于物理内存？
- 操作系统保留部分内存给硬件使用
- 显示值为可用内存，非物理芯片容量

### 跨平台换行符如何处理？
```js
// 推荐使用 os.EOL 替代硬编码
const lineBreak = os.EOL;
```

### 用户信息不准确？
- `os.userInfo()` 在 Windows 可能需要管理员权限
- 某些容器环境可能返回虚拟化信息

### 如何检测生产环境？
```js
const isProd = os.hostname().includes('production');
```

### 内存监控的注意事项
- 不要频繁调用（至少间隔 1 秒）
- 容器环境中可能显示宿主机内存
