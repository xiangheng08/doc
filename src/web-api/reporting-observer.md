# ReportingObserver

## 简介

ReportingObserver API 提供了一种通用的机制来收集和访问浏览器中发生的各种报告，如内容安全策略（CSP）违规、网络错误报告、特性策略违规等。它允许开发者以统一的方式接收和处理这些报告，而不需要依赖网络请求或控制台日志。

ReportingObserver 特别适用于以下场景：
- 收集内容安全策略（CSP）违规报告
- 监控网络错误和特性策略违规
- 收集弃用警告和干预报告
- 进行网站健康监控和错误分析

## 核心概念

在深入了解 API 之前，我们需要理解几个关键概念：

- **报告（Report）**：表示单个问题或事件的数据对象，包含类型、URL、时间戳等信息
- **报告主体（Report Body）**：报告的详细内容，根据报告类型不同而不同
- **观察者（Observer）**：监听特定类型报告的对象
- **缓冲（Buffer）**：存储尚未处理的报告的队列

## 基本语法

创建一个 ReportingObserver 实例的基本语法如下：

```js
const observer = new ReportingObserver(callback, options);
observer.observe();
```

其中：
- `callback`：当有报告生成时触发的回调函数
- `options`：配置对象，指定要观察的报告类型和其他选项

## 实际应用

### 监控CSP违规报告

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    if (report.type === 'csp-violation') {
      console.warn('CSP违规:', report.body);
      // 发送违规报告到服务器进行分析
      sendCspReport(report.body);
    }
  }
}, { types: ['csp-violation'] });

observer.observe();
```

### 收集弃用和干预报告

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    if (report.type === 'deprecation') {
      console.warn('使用了已弃用的API:', report.body);
    } else if (report.type === 'intervention') {
      console.warn('浏览器干预:', report.body);
    }
  }
}, { types: ['deprecation', 'intervention'] });

observer.observe();
```

### 错误报告收集

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    if (report.type === 'crash') {
      console.error('页面崩溃:', report.body);
      // 发送崩溃报告到监控系统
      reportCrash(report.body);
    }
  }
});

observer.observe();
```

## 配置选项详解

### types选项

指定要观察的报告类型数组：

```js
const options = {
  // 可用的报告类型
  types: ['csp-violation', 'deprecation', 'intervention', 'crash', 'feature-policy-violation']
};

const observer = new ReportingObserver(callback, options);
```

### buffered选项

设置为 `true` 时，获取观察之前生成的报告：

```js
const options = {
  types: ['deprecation'],
  buffered: true  // 获取缓冲的报告
};

const observer = new ReportingObserver(callback, options);
observer.observe();
```

## 常用报告类型

### csp-violation（内容安全策略违规）

当页面违反内容安全策略时生成的报告：

```js
const observer = new ReportingObserver((reports) => {
  for (const report of reports) {
    if (report.type === 'csp-violation') {
      const body = report.body;
      console.log('CSP违规详情:');
      console.log('- 阻止的URL:', body.blockedURL);
      console.log('- 违规指令:', body.effectiveDirective);
      console.log('- 原始策略:', body.originalPolicy);
      console.log('- 文档URI:', body.documentURI);
    }
  }
}, { types: ['csp-violation'] });

observer.observe();
```

### deprecation（弃用警告）

当使用已弃用的API时生成的报告：

```js
const observer = new ReportingObserver((reports) => {
  for (const report of reports) {
    if (report.type === 'deprecation') {
      const body = report.body;
      console.warn('弃用警告:');
      console.warn('- 消息:', body.message);
      console.warn('- 文件:', body.sourceFile);
      console.warn('- 行号:', body.lineNumber);
      console.warn('- 列号:', body.columnNumber);
      console.warn('- 已弃用的特性:', body.id);
    }
  }
}, { types: ['deprecation'] });

observer.observe();
```

### intervention（浏览器干预）

当浏览器干预页面行为时生成的报告：

```js
const observer = new ReportingObserver((reports) => {
  for (const report of reports) {
    if (report.type === 'intervention') {
      const body = report.body;
      console.warn('浏览器干预:');
      console.warn('- 消息:', body.message);
      console.warn('- 文件:', body.sourceFile);
      console.warn('- 行号:', body.lineNumber);
      console.warn('- 列号:', body.columnNumber);
      console.warn('- 干预ID:', body.id);
    }
  }
}, { types: ['intervention'] });

observer.observe();
```

## 回调函数参数

回调函数接收两个参数：

```js
const callback = (reports, observer) => {
  // reports 是 Report 对象数组
  for (const report of reports) {
    console.log('报告类型:', report.type);
    console.log('报告URL:', report.url);
    console.log('报告时间:', report.timestamp);
    console.log('报告内容:', report.body);
  }
  
  // observer 是 ReportingObserver 实例
  console.log(observer);
};

const observer = new ReportingObserver(callback);
```

## Report对象属性

每个报告对象包含以下属性：

- `type`：报告类型，如 'csp-violation'、'deprecation' 等
- `url`：生成报告的页面URL
- `timestamp`：报告生成的时间戳
- `body`：报告的详细内容，根据类型不同而不同

## ReportBody对象属性

ReportBody的内容根据报告类型不同而不同：

### CSP违规报告体

```js
{
  documentURL: "https://example.com/page.html",
  referrer: "",
  blockedURL: "https://evil.com/malware.js",
  effectiveDirective: "script-src",
  originalPolicy: "script-src 'self'; object-src 'none'; report-uri /csp-report.cgi",
  statusCode: 200,
  sourceFile: "https://example.com/page.html",
  lineNumber: 5,
  columnNumber: 12
}
```

### 弃用报告体

```js
{
  id: "PrefixedStorageInfo",
  message: "Prefixed 'window.webkitStorageInfo' is deprecated...",
  sourceFile: "https://example.com/script.js",
  lineNumber: 10,
  columnNumber: 5
}
```

## 实例方法

### observe()

开始观察报告：

```js
const observer = new ReportingObserver(callback, options);
observer.observe();
```

### disconnect()

停止观察报告：

```js
observer.disconnect();
```

### takeRecords()

获取当前缓冲区中的所有报告并清空缓冲区：

```js
const reports = observer.takeRecords();
// 处理报告
processReports(reports);
```

## 实际应用场景

### 综合报告监控系统

```js
class ReportMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    // 监控CSP违规
    this.observeCspViolations();
    
    // 监控弃用和干预
    this.observeDeprecations();
    
    // 监控特性策略违规
    this.observeFeaturePolicyViolations();
  }
  
  observeCspViolations() {
    const observer = new ReportingObserver((reports) => {
      for (const report of reports) {
        if (report.type === 'csp-violation') {
          this.sendReport('csp-violation', {
            url: report.url,
            timestamp: report.timestamp,
            body: report.body
          });
        }
      }
    }, { types: ['csp-violation'], buffered: true });
    
    observer.observe();
  }
  
  observeDeprecations() {
    const observer = new ReportingObserver((reports) => {
      for (const report of reports) {
        if (report.type === 'deprecation') {
          this.sendReport('deprecation', {
            url: report.url,
            timestamp: report.timestamp,
            body: report.body
          });
        } else if (report.type === 'intervention') {
          this.sendReport('intervention', {
            url: report.url,
            timestamp: report.timestamp,
            body: report.body
          });
        }
      }
    }, { types: ['deprecation', 'intervention'], buffered: true });
    
    observer.observe();
  }
  
  observeFeaturePolicyViolations() {
    const observer = new ReportingObserver((reports) => {
      for (const report of reports) {
        if (report.type === 'feature-policy-violation') {
          this.sendReport('feature-policy-violation', {
            url: report.url,
            timestamp: report.timestamp,
            body: report.body
          });
        }
      }
    }, { types: ['feature-policy-violation'], buffered: true });
    
    observer.observe();
  }
  
  sendReport(type, data) {
    // 发送报告到监控服务器
    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    }).catch(err => console.error('报告发送失败:', err));
  }
}

// 启动报告监控
const monitor = new ReportMonitor();
```

### 开发环境调试工具

```js
// 在开发环境中显示报告信息
if (process.env.NODE_ENV === 'development') {
  const observer = new ReportingObserver((reports) => {
    for (const report of reports) {
      // 在页面上显示报告信息
      const reportElement = document.createElement('div');
      reportElement.className = 'report-notification';
      reportElement.innerHTML = `
        <h4>报告: ${report.type}</h4>
        <p>URL: ${report.url}</p>
        <p>时间: ${new Date(report.timestamp).toLocaleString()}</p>
        <pre>${JSON.stringify(report.body, null, 2)}</pre>
      `;
      
      document.body.appendChild(reportElement);
      
      // 5秒后自动移除
      setTimeout(() => {
        if (reportElement.parentNode) {
          reportElement.parentNode.removeChild(reportElement);
        }
      }, 5000);
    }
  }, { buffered: true });
  
  observer.observe();
}
```

## 浏览器兼容性

ReportingObserver 在现代浏览器中有一定的支持，但不是所有浏览器都支持所有报告类型：

```js
// 检查浏览器支持
if ('ReportingObserver' in window) {
  const observer = new ReportingObserver(callback, options);
  observer.observe();
} else {
  // 降级处理方案
  console.warn('浏览器不支持 ReportingObserver');
  // 可以使用其他方式收集报告，如监听控制台日志
}
```

## 安全考虑

1. **报告内容过滤**：确保报告中不包含敏感信息
2. **跨域限制**：报告只会在同源情况下生成，避免信息泄露
3. **数据量控制**：避免生成过多报告导致性能问题

## 性能优化建议

1. **及时取消观察**：当不再需要监听报告时，使用 `disconnect()` 方法
2. **批量处理报告**：在回调函数中批量处理报告，避免频繁操作
3. **选择合适的报告类型**：只观察需要的报告类型，避免不必要的开销
4. **使用 buffered 选项**：对于需要获取历史报告的场景，使用 buffered: true 选项

## 与其他技术对比

| 特性 | ReportingObserver | 控制台日志监听 | 网络错误报告 |
|------|-------------------|----------------|--------------|
| 统一性 | 高（统一API） | 低（需要解析） | 中（仅网络错误） |
| 实时性 | 高 | 高 | 中（依赖网络） |
| 实现复杂度 | 简单 | 复杂 | 中等 |
| 浏览器支持 | 现代浏览器 | 所有浏览器 | 需要额外配置 |

## 相关资源

- [MDN ReportingObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ReportingObserver)
- [W3C Reporting API](https://w3c.github.io/reporting/)
- [Chrome Reporting API](https://developer.chrome.com/docs/extensions/mv3/reporting/)
- [Content Security Policy Reporting](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri)