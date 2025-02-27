# 性能优化与安全实践

## 性能优化策略
### 1. 进程复用与连接池
```js
// 创建子进程池
const { GenericPool } = require('generic-pool')

const pool = GenericPool.create({
  create: () => fork('./worker.js'),
  destroy: (worker) => worker.kill(),
  max: 10, // 最大进程数
  min: 2   // 最小保持进程数
})

// 使用示例
const worker = await pool.acquire()
worker.send(task)
```

### 流式处理优化
```js
// 大文件处理（避免内存溢出）
const child = spawn('openssl', ['enc', '-aes-256-cbc'], {
  stdio: ['pipe', fs.createWriteStream('out.bin'), 'ignore']
})

fs.createReadStream('input.bin')
  .pipe(child.stdin)
```

### 集群负载均衡
```js
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    fork('./app.js')
  }
} else {
  // Worker 代码
}
```

### 资源限制配置
```js
// 使用 cgroups (Linux)
spawn('node', ['app.js'], {
  detached: true,
  stdio: 'ignore',
  // 限制内存为 512MB
  execArgv: ['--max-old-space-size=512']
})
```

## ✅ 性能优化最佳实践
### 内存管理
```js
// 定期重启策略
let restarts = 0
function createWorker() {
  const worker = fork('./worker.js')
  
  worker.on('exit', () => {
    if (restarts++ < 5) {
      setTimeout(createWorker, 1000)
    }
  })
  
  return worker
}
```

### 数据传输优化
```js
// 使用二进制协议
child.send(Buffer.from('binary data'), (err) => {
  // 处理发送结果
})

// 共享内存（Node.js 17+）
const { SharedArrayBuffer } = require('worker_threads')
const sab = new SharedArrayBuffer(1024)
child.send(sab, [sab])
```

### 监控指标
```js
const pidusage = require('pidusage')

setInterval(() => {
  pidusage(child.pid, (err, stats) => {
    console.log('CPU:', stats.cpu, 'MEM:', stats.memory)
  })
}, 5000)
```

## 安全实践方案
### 输入消毒规范
```js
const { execFile } = require('child_process')
const validator = require('validator')

function safeExec(input) {
  if (!validator.isAlphanumeric(input)) {
    throw new Error('非法输入')
  }
  execFile('scan', [input])
}
```

### 权限最小化
```js
// 降权执行（UNIX）
spawn('sudo', ['-u', 'nobody', 'app.js'], {
  env: { ...process.env, HOME: '/tmp' }
})
```

### 沙箱隔离
```js
const vm = require('vm')
const context = vm.createContext({})
vm.runInContext('untrustedCode()', context, {
  timeout: 100,
  microtaskMode: 'afterEvaluate'
})
```

## ✅ 安全最佳实践
### 进程隔离策略
```js
// 使用 Docker 容器化
spawn('docker', [
  'run', '--rm',
  '--memory=512m',
  '--cpus=0.5',
  'isolated-app'
])
```

### 日志审计
```js
const { createSecureLog } = require('audit-logger')

spawn('payment-service', [], {
  stdio: [
    'ignore',
    createSecureLog('app.stdout.log'),
    createSecureLog('app.stderr.log')
  ]
})
```

### 安全通信
```js
const { generateKeyPairSync } = require('crypto')
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048
})

// 子进程使用公钥加密
child.send({ type: 'PUB_KEY', payload: publicKey.export({ type: 'pkcs1', format: 'pem' }) })
```

## ⚠️ 常见问题
### 资源耗尽攻击
**现象**：  
恶意输入导致无限创建子进程  

**解决方案**：
```js
// 使用 semaphore 控制
const { Semaphore } = require('async-mutex')
const sem = new Semaphore(5)

async function safeSpawn() {
  const [value, release] = await sem.acquire()
  try {
    return await createProcess()
  } finally {
    release()
  }
}
```

### 敏感信息泄漏
**高危代码**：
```js
exec(`mysql -u${DB_USER} -p${DB_PASS}`, (err) => { /*...*/ })
```

**修复方案**：
```js
execFile('mysql', ['-u', process.env.DB_USER, '-p', process.env.DB_PASS], {
  env: {} // 清空环境变量
})
```

### 僵尸进程堆积
**处理方案**：
```js
const timeout = setTimeout(() => {
  child.kill('SIGKILL')
}, 30000)

child.on('exit', () => clearTimeout(timeout))
```

### 跨平台路径注入
**错误处理**：
```js
// 危险写法
const cmd = `build-${process.platform}`
execFile(cmd)

// 安全验证
const ALLOWED_PLATFORMS = ['linux', 'darwin']
if (!ALLOWED_PLATFORMS.includes(process.platform)) {
  throw new Error('非法平台')
}
```

## 安全检测工具
| 工具名称        | 检测方向       | 使用场景         |
| --------------- | -------------- | ---------------- |
| `child-process` | 子进程调用分析 | 代码审计         |
| `node-secure`   | 依赖链安全检查 | CI/CD 集成       |
| `ClamAV`        | 病毒文件扫描   | 上传文件处理     |
| `sysdig`        | 系统调用监控   | 生产环境入侵检测 |

## 性能安全矩阵
| 优化维度 | 性能影响 | 安全增益 | 实施难度 |
| -------- | -------- | -------- | -------- |
| 进程池   | ⭐⭐⭐⭐     | ⭐        | ⭐⭐       |
| 输入消毒 | ⭐        | ⭐⭐⭐⭐     | ⭐⭐       |
| 容器隔离 | ⭐⭐       | ⭐⭐⭐⭐⭐    | ⭐⭐⭐      |
| 资源限制 | ⭐⭐⭐      | ⭐⭐⭐⭐     | ⭐⭐       |
