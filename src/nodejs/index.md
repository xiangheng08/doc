# 起步

[Node.js](https://nodejs.org/zh-cn/) 是一个开源和跨平台的 JavaScript 运行时环境。

## `node:` 前缀

1. 使用和不使用 `node:` 前缀的区别
     - 不带 `node:`：是一种传统的模块导入方式，通常用于 CommonJS 模块系统（require）。它依赖于 Node.js 的模块解析机制，会先尝试查找本地模块（如项目中的 node_modules 文件夹），如果没有找到，才会加载内置模块。
     - 带 `node:`：是 Node.js 提供的一种显式导入内置模块的方式，明确告诉 Node.js 加载内置的 fs 模块，而不会尝试解析本地模块。这种方式在 ES 模块（ESM）中更为推荐，因为它避免了路径解析的歧义。
2. `node:` 前缀的引入时间
    `node:` 前缀是在 Node.js v12 中引入的，用于显式导入内置模块。它在后续版本中得到了广泛应用，尤其是在 ES 模块的支持下，`node:` 前缀能够更清晰地区分内置模块和第三方模块。
3. 使用建议
    - 如果你使用的是 **CommonJS** 模块系统（`require`），可以继续使用 `require('fs')`。
    - 如果你使用的是 **ES 模块**（`import`），建议使用 `import * as fs from 'node:fs'` 或 `import { readFile } from 'node:fs/promises'`，这样可以避免模块解析的歧义。

总结：`node:fs` 是一种更现代、更明确的模块导入方式，尤其适用于 ES 模块。Node 12+ 推荐使用。

## 内置模块

以下是 Node.js 的主要内置模块列表，按格式整理：

---

- **assert** 断言测试（用于单元测试）
- **async_hooks** 异步钩子（追踪异步资源） Node 8.1+
- **buffer** 处理二进制数据
- **child_process** 创建和管理子进程
- **cluster** 多进程集群（利用多核CPU）
- **console** 控制台输入输出
- **crypto** 加密与安全功能
- **dgram** UDP 数据报（网络通信）
- **dns** 域名解析
- **domain** 异步操作的错误处理（已弃用） Node 0.8+
- **events** 事件触发器（发布-订阅模式）
- **fs** 文件系统操作
- **http** HTTP 服务器与客户端
- **http2** HTTP/2 协议支持 Node 8.4+
- **https** HTTPS 服务器与客户端
- **inspector** V8 调试器接口 Node 8.0+
- **module** 模块系统（加载与解析）
- **net** 基于流的 TCP/Unix Socket 通信
- **os** 操作系统信息（内存、CPU等）
- **path** 文件路径处理
- **perf_hooks** 性能监控钩子 Node 8.5+
- **process** 进程信息与控制
- **punycode** Unicode 与 ASCII 编码转换
- **querystring** URL 查询字符串解析
- **readline** 逐行读取输入流
- **repl** 交互式解释器环境
- **stream** 流式数据操作
- **string_decoder** 缓冲区的字符串解码
- **timers** 定时器（setTimeout等）
- **tls** TLS/SSL 加密通信
- **trace_events** 跟踪事件日志 Node 10+
- **tty** 终端控制（TTY接口）
- **url** URL 解析与格式化
- **util** 实用工具函数（格式化、继承等）
- **v8** V8 引擎接口（堆栈、序列化等） Node 1.0+
- **vm** 虚拟机（执行 JavaScript 代码）
- **wasi** WebAssembly 系统接口 Node 13.3+
- **worker_threads** 多线程支持 Node 10.5+
- **zlib** 压缩与解压缩（Gzip等）

---

**说明**：  
1. 未标注版本的模块均从 Node.js 初始版本（0.10.x 或更早）开始支持。  
2. 部分模块（如 `domain`）已被标记为弃用，但仍保留在内置模块中。  
3. 版本号标注基于 Node.js 官方文档的模块引入时间。
