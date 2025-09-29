# 前端模块化

模块化是前端工程化中的重要概念，它有助于组织代码、提高可维护性和复用性。

## 模块化的发展历程

### 1. 无模块化时代

```html
<!-- 全局变量污染 -->
<script src="jquery.js"></script>
<script src="util.js"></script>
<script src="app.js"></script>
```

```js
// util.js
var Util = {
  formatDate: function(date) {
    // 格式化日期
  }
};

// app.js
var App = {
  init: function() {
    // 使用 Util
    Util.formatDate(new Date());
  }
};
```

### 2. CommonJS (Node.js)

同步加载模块，主要用于服务端。

```js
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// app.js
const { add, subtract } = require('./math');

console.log(add(1, 2)); // 3
```

### 3. AMD (RequireJS)

异步加载模块，主要用于浏览器端。

```js
// math.js
define(['lodash'], function(_) {
  return {
    add: function(a, b) {
      return a + b;
    },
    subtract: function(a, b) {
      return a - b;
    }
  };
});

// app.js
require(['math'], function(math) {
  console.log(math.add(1, 2)); // 3
});
```

### 4. UMD (Universal Module Definition)

兼容 CommonJS 和 AMD 的模块定义。

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['lodash'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('lodash'));
  } else {
    // 浏览器全局变量
    root.MyModule = factory(root._);
  }
}(typeof self !== 'undefined' ? self : this, function(_) {
  // 模块代码
  return {
    add: function(a, b) {
      return a + b;
    }
  };
}));
```

### 5. ES Module (ECMAScript 6)

现代标准的模块系统，支持静态分析。

```js
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 默认导出
export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { add, subtract } from './math.js';

console.log(add(1, 2)); // 3
console.log(multiply(2, 3)); // 6
```

## 模块化的优势

### 1. 命名空间隔离

```js
// 避免全局变量污染
// bad
var userName = 'John';
var userAge = 30;

// good
export const user = {
  name: 'John',
  age: 30
};
```

### 2. 可复用性

```js
// utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 在多个文件中复用
import { formatDate, debounce } from './utils.js';
```

### 3. 依赖管理

```js
// 明确声明依赖关系
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './components/Button.js';
import './App.css';

function App() {
  // ...
}
```

## 模块设计原则

### 1. 单一职责原则

```js
// bad - 一个模块做太多事情
export class UserManager {
  login(username, password) { /* ... */ }
  logout() { /* ... */ }
  fetchUserData() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}

// good - 拆分成多个模块
// auth.js
export class AuthManager {
  login(username, password) { /* ... */ }
  logout() { /* ... */ }
}

// user.js
export class UserManager {
  fetchUserData() { /* ... */ }
}

// email.js
export class EmailService {
  sendEmail() { /* ... */ }
}
```

### 2. 开放封闭原则

```js
// 允许扩展，但不允许修改
class PaymentProcessor {
  process(amount) {
    throw new Error('Must implement process method');
  }
}

class CreditCardProcessor extends PaymentProcessor {
  process(amount) {
    // 处理信用卡支付
  }
}

class PayPalProcessor extends PaymentProcessor {
  process(amount) {
    // 处理 PayPal 支付
  }
}
```

### 3. 依赖倒置原则

```js
// 依赖抽象而不是具体实现
class NotificationService {
  constructor(sender) {
    this.sender = sender;
  }
  
  send(message) {
    this.sender.send(message);
  }
}

// 可以轻松切换不同的发送方式
class EmailSender {
  send(message) {
    // 发送邮件
  }
}

class SMSSender {
  send(message) {
    // 发送短信
  }
}

// 使用
const emailService = new NotificationService(new EmailSender());
const smsService = new NotificationService(new SMSSender());
```

## 模块打包工具

### Webpack 配置示例

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
};
```

### Rollup 配置示例

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es'
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'MyBundle'
    }
  ],
  external: ['lodash'],
  plugins: [
    // 插件配置
  ]
};
```

## 模块联邦 (Module Federation)

Webpack 5 的新特性，支持跨应用共享模块。

```js
// host 应用 webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js'
      }
    })
  ]
};

// remote 应用 webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      }
    })
  ]
};
```

## 微前端架构

将大型应用拆分为多个小型应用，每个应用可以独立开发、部署。

```js
// 主应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app',
    entry: '//localhost:3001',
    container: '#react-container',
    activeRule: '/react'
  },
  {
    name: 'vue app',
    entry: '//localhost:3002',
    container: '#vue-container',
    activeRule: '/vue'
  }
]);

start();
```

## 相关链接

- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends](https://micro-frontends.org/)