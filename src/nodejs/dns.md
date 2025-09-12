# DNS

## 简介

DNS（Domain Name System，域名系统）是将人类可读的域名（如 `www.example.com`）转换为机器可读的 IP 地址（如 `192.0.2.1`）的系统。

Node.js 的 `dns` 模块是一个用于执行域名系统查询的核心模块。在网络通信中，计算机实际上是通过 IP 地址来识别彼此的，但人们更容易记住域名而不是数字 IP 地址。`dns` 模块提供了在 Node.js 应用程序中进行域名解析的能力，使得开发者可以：

- 将域名解析为 IP 地址
- 将 IP 地址反向解析为域名
- 查询 DNS 记录（MX、TXT、SRV 等）

```js
const dns = require('node:dns');
```

## 核心概念

DNS 模块中的方法可以分为两类：

### 1. 使用操作系统底层特性

这类方法使用操作系统的底层功能完成名字解析，不需要网络通信。这类方法只有一个：[dns.lookup()](#dns.lookup)。

```js
// 使用操作系统的底层特性进行解析
dns.lookup('example.com', (err, address, family) => {
  console.log('IP 地址:', address);
});
```

### 2. 连接 DNS 服务器进行解析

这类方法总是通过网络连接到 DNS 服务器进行域名查询。除了 [dns.lookup()](#dns.lookup) 外的所有函数都属于这一类。

```js
// 直接连接 DNS 服务器进行解析
dns.resolve4('example.com', (err, addresses) => {
  console.log('A 记录:', addresses);
});
```

## 域名解析方法

### `dns.lookup(hostname[, options], callback)` {#dns.lookup}

将域名解析为第一条找到的记录 A（IPv4）或 AAAA（IPv6）。这是最简单的域名解析方法，它使用操作系统提供的功能来执行 DNS 查询。

```js
const dns = require('node:dns');

dns.lookup('example.com', (err, address, family) => {
  if (err) throw err;
  console.log(`地址: ${address}, IP版本: IPv${family}`);
});

// 指定 IP 版本
dns.lookup('example.com', 4, (err, address, family) => {
  console.log(`IPv4 地址: ${address}`);
});

// 使用选项对象
dns.lookup('example.com', { family: 6 }, (err, address, family) => {
  console.log(`IPv6 地址: ${address}`);
});
```

### `dns.resolve(hostname[, rrtype], callback)` {#dns.resolve}

将一个域名解析为指定记录类型的数组。

```js
const dns = require('node:dns');

// 解析 A 记录
dns.resolve('example.com', 'A', (err, addresses) => {
  if (err) throw err;
  console.log(`A 记录: ${JSON.stringify(addresses)}`);
});

// 解析 MX 记录
dns.resolve('example.com', 'MX', (err, addresses) => {
  if (err) throw err;
  console.log(`MX 记录: ${JSON.stringify(addresses)}`);
});
```

### `dns.resolve4(hostname, callback)` {#dns.resolve4}

专门用于查询 IPv4（A 记录）地址。

```js
const dns = require('node:dns');

dns.resolve4('example.com', (err, addresses) => {
  if (err) throw err;
  console.log(`IPv4 地址: ${JSON.stringify(addresses)}`);
  
  // 对每个地址进行反向解析
  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        console.log(`反向解析 ${a} 失败: ${err.message}`);
      } else {
        console.log(`地址 ${a} 对应域名: ${JSON.stringify(hostnames)}`);
      }
    });
  });
});
```

### `dns.resolve6(hostname, callback)` {#dns.resolve6}

专门用于查询 IPv6（AAAA 记录）地址。

```js
const dns = require('node:dns');

dns.resolve6('example.com', (err, addresses) => {
  if (err) throw err;
  console.log(`IPv6 地址: ${JSON.stringify(addresses)}`);
});
```

### `dns.resolveMx(hostname, callback)` {#dns.resolveMx}

专门用于查询邮件交换（MX 记录）。

```js
const dns = require('node:dns');

dns.resolveMx('example.com', (err, addresses) => {
  if (err) throw err;
  console.log(`MX 记录: ${JSON.stringify(addresses)}`);
});
```

### `dns.resolveTxt(hostname, callback)` {#dns.resolveTxt}

专门用于查询文本记录（TXT 记录）。

```js
const dns = require('node:dns');

dns.resolveTxt('example.com', (err, records) => {
  if (err) throw err;
  console.log(`TXT 记录: ${JSON.stringify(records)}`);
});
```

### `dns.resolveSrv(hostname, callback)` {#dns.resolveSrv}

专门用于查询服务记录（SRV 记录）。

```js
const dns = require('node:dns');

dns.resolveSrv('_sip._tcp.example.com', (err, records) => {
  if (err) throw err;
  console.log(`SRV 记录: ${JSON.stringify(records)}`);
});
```

### `dns.resolveNs(hostname, callback)` {#dns.resolveNs}

专门用于查询名称服务器记录（NS 记录）。

```js
const dns = require('node:dns');

dns.resolveNs('example.com', (err, addresses) => {
  if (err) throw err;
  console.log(`NS 记录: ${JSON.stringify(addresses)}`);
});
```

### `dns.resolveCname(hostname, callback)` {#dns.resolveCname}

专门用于查询规范名称记录（CNAME 记录）。

```js
const dns = require('node:dns');

dns.resolveCname('example.com', (err, addresses) => {
  if (err) throw err;
  console.log(`CNAME 记录: ${JSON.stringify(addresses)}`);
});
```

## 反向解析方法

### `dns.reverse(ip, callback)` {#dns.reverse}

执行反向 DNS 查询，将 IP 地址解析为域名数组。

```js
const dns = require('node:dns');

dns.reverse('8.8.8.8', (err, hostnames) => {
  if (err) {
    console.log(`反向解析失败: ${err.message}`);
  } else {
    console.log(`域名: ${JSON.stringify(hostnames)}`);
  }
});
```

## 服务解析方法

### `dns.lookupService(address, port, callback)` {#dns.lookupService}

使用 getnameinfo 将传入的地址和端口解析为域名和服务。

```js
const dns = require('node:dns');

dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  if (err) throw err;
  console.log(`主机名: ${hostname}, 服务: ${service}`);
});
```

## Promise 版本

Node.js 也提供了基于 Promise 的 DNS 方法，可以通过 `require('node:dns/promises')` 引入。

```js
const dnsPromises = require('node:dns/promises');

async function resolveExample() {
  try {
    const addresses = await dnsPromises.resolve4('example.com');
    console.log(`IPv4 地址: ${JSON.stringify(addresses)}`);
    
    const hostnames = await dnsPromises.reverse('8.8.8.8');
    console.log(`反向解析结果: ${JSON.stringify(hostnames)}`);
  } catch (err) {
    console.error(`DNS 查询失败: ${err.message}`);
  }
}

resolveExample();
```

## 实际应用示例

### 域名信息查询工具

```js
const dns = require('node:dns');

function queryDomainInfo(domain) {
  console.log(`正在查询域名信息: ${domain}\n`);
  
  // 查询 A 记录
  dns.resolve4(domain, (err, addresses) => {
    if (err) {
      console.log(`A 记录查询失败: ${err.message}`);
    } else {
      console.log(`IPv4 地址: ${JSON.stringify(addresses)}`);
      
      // 对每个 IP 地址进行反向解析
      addresses.forEach((ip) => {
        dns.reverse(ip, (err, hostnames) => {
          if (err) {
            console.log(`  ${ip} 反向解析失败: ${err.message}`);
          } else {
            console.log(`  ${ip} 对应域名: ${JSON.stringify(hostnames)}`);
          }
        });
      });
    }
  });
  
  // 查询 MX 记录
  dns.resolveMx(domain, (err, records) => {
    if (err) {
      console.log(`MX 记录查询失败: ${err.message}`);
    } else {
      console.log(`MX 记录: ${JSON.stringify(records)}`);
    }
  });
  
  // 查询 TXT 记录
  dns.resolveTxt(domain, (err, records) => {
    if (err) {
      console.log(`TXT 记录查询失败: ${err.message}`);
    } else {
      console.log(`TXT 记录: ${JSON.stringify(records)}`);
    }
  });
}

// 使用示例
queryDomainInfo('example.com');
```

### DNS 服务器性能测试

```js
const dns = require('node:dns');
const { performance } = require('node:perf_hooks');

function testDnsPerformance(domain, iterations = 100) {
  console.log(`测试 DNS 解析性能: ${domain}`);
  console.log(`测试次数: ${iterations}\n`);
  
  let totalTime = 0;
  let completed = 0;
  
  function performTest() {
    const startTime = performance.now();
    
    dns.resolve4(domain, (err) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!err) {
        totalTime += duration;
      }
      
      completed++;
      
      if (completed < iterations) {
        performTest();
      } else {
        const averageTime = totalTime / iterations;
        console.log(`平均解析时间: ${averageTime.toFixed(2)} 毫秒`);
        console.log(`总测试时间: ${totalTime.toFixed(2)} 毫秒`);
      }
    });
  }
  
  // 并行执行测试
  for (let i = 0; i < Math.min(iterations, 10); i++) {
    performTest();
  }
}

// 使用示例
testDnsPerformance('example.com', 50);
```

## 错误处理

DNS 查询可能遇到各种错误，需要妥善处理：

```js
const dns = require('node:dns');

function safeDnsLookup(domain) {
  dns.lookup(domain, (err, address, family) => {
    if (err) {
      switch (err.code) {
        case 'ENOTFOUND':
          console.log(`域名未找到: ${domain}`);
          break;
        case 'EAI_AGAIN':
          console.log(`DNS 查询超时: ${domain}`);
          break;
        case 'ECONNREFUSED':
          console.log(`DNS 服务器连接被拒绝`);
          break;
        default:
          console.log(`DNS 查询错误: ${err.message}`);
      }
    } else {
      console.log(`域名 ${domain} 解析为 ${address} (IPv${family})`);
    }
  });
}

safeDnsLookup('example.com');
safeDnsLookup('nonexistent-domain-12345.com');
```

## 最佳实践

1. **选择合适的解析方法**：
   - 使用 [dns.lookup()](#dns.lookup) 进行常规的域名解析
   - 使用 [dns.resolve()](#dns.resolve) 系列方法查询特定类型的 DNS 记录

2. **错误处理**：
   - 始终处理 DNS 查询错误
   - 根据错误代码进行不同的处理

3. **性能优化**：
   - DNS 查询结果会被缓存
   - 避免频繁查询相同的域名

4. **安全性**：
   - 验证用户输入的域名
   - 防止 DNS 查询被恶意利用

```js
const dns = require('node:dns');

// 设置 DNS 服务器（可选）
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// 使用 Promise 版本处理异步操作
async function getDomainInfo(domain) {
  try {
    const addresses = await dns.promises.resolve4(domain);
    return {
      domain,
      addresses,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    throw new Error(`无法解析域名 ${domain}: ${err.message}`);
  }
}
```

## 注意事项

1. **缓存机制**：DNS 查询结果可能会被操作系统或 Node.js 缓存
2. **网络依赖**：除了 [dns.lookup()](#dns.lookup) 外，其他方法都需要网络连接
3. **异步操作**：所有 DNS 方法都是异步的，需要使用回调或 Promise 处理结果
4. **错误处理**：DNS 查询可能失败，需要妥善处理各种错误情况
5. **性能考虑**：频繁的 DNS 查询可能影响应用性能

## 相关链接

- [Node.js DNS 官方文档](https://nodejs.org/api/dns.html)
- [Net](./net)
- [HTTP](./http)
