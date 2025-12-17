# 浏览器检测器

## browser-tool

[GitHub](https://github.com/mumuy/browser) [NPM](https://www.npmjs.com/package/browser-tool)

这是一个专门用于识别浏览器类型的 JavaScript 库，支持前端和 Node.js 环境：

- 可以识别国内外各大浏览器、手机厂商浏览器、客户端浏览器（微信/支付宝/抖音等）以及爬虫。
- 还能识别内核、操作系统、设备类型、硬件平台等。
- 支持判断支持情况、字体支持情况、获取浏览器指纹等。

安装：

::: code-group

```sh [npm]
npm install browser-tool
```

```sh [pnpm]
pnpm add browser-tool
```

```sh [yarn]
yarn add browser-tool
```

:::

使用：

```js
var browser = require("browser-tool");

// 解析User-Agent
let info = browser.parse('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0');

// 获取浏览器详细信息 - 指定字段：'browser','system','device','gpu','network','battery','screen','language','timezone'
let networkInfo = await browser.getInfo(['network']);

// 获取浏览器详细信息 - 全部字段
let info = await browser.getInfo();
```

数据返回结构：

```js
{
  "browser": "Chrome",                // 浏览器名称
  "browserVersion": "118.0.0.0",      // 浏览器版本
  "engine": "Blink",                  // 浏览器渲染引擎
  "system": "Windows",                // 操作系统名称
  "systemVersion": '10',              // 操作系统版本
  "platform": "Win32",                // 系统平台
  "screenFPS":60,                     // 屏幕刷新率
  "screenWidth":1920,                 // 屏幕宽度
  "screenHeight":800,                 // 屏幕高度
  "screenOrientation":'landscape-primary',    // 浏览器屏幕方向
  "clientWidth":1920,                 // 浏览器可视区域宽度
  "clientHeight":640,                 // 浏览器可视区域高度
  "device": "PC",                     // 设备类型
  "devicePixelRatio":1,               // 设备分辨率比
  "deviceMemory":8,                   // 设备大致内存大小
  "architecture": "x86",              // 芯片架构
  "bitness": 64,                      // CPU架构位数
  "gpu": "Google",                    // GPU厂商
  "gpuModel": "Vulkan 1.3.0",         // GPU型号
  "ip":'8.8.8.8',                     // IP地址
  "language": "zh_CN",                // 所用语言
  "network": "wifi",                  // 网络类型
  "timezone":'Asia/Shanghai',         // 所处时区
  "isWebview": false,                 // 是否Webview(仅Android有效)
  "isBot": false,                     // 是否搜索引擎蜘蛛程序
  "isTouch": false,                   // 是否为触屏
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/119.0.0.0 Safari/537.36"
}
```

```js
// 判断浏览器是否支持某种字体
let hasYaHei = browser.isSupport('font-family','Microsoft YaHei');

// 判断浏览器是否支持WebGL
let isWebGL = browser.isSupport('webgl');

// 浏览器各项综合特征指纹
let data = await browser.getFingerprint();
console.log('[浏览器指纹]',data.value);
```
