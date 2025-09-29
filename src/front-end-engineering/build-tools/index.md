# 前端构建工具

构建工具是前端工程化中的重要组成部分，它能帮助我们将源代码转换为生产环境可用的代码。

## 常见构建工具对比

### Webpack

目前最流行的前端构建工具，具有丰富的生态系统和插件机制。

```js
// webpack.config.js 示例
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
```

### Vite

下一代前端构建工具，利用浏览器原生 ES 模块导入实现快速开发启动。

```js
// vite.config.js 示例
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
});
```

### Rollup

专注于打包 JavaScript 库的工具，能生成更小的代码体积。

```js
// rollup.config.js 示例
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    // 插件配置
  ]
};
```

## 构建优化策略

### 代码分割
```js
// 动态导入实现代码分割
const Home = () => import('./views/Home.vue');
const About = () => import('./views/About.vue');
```

### Tree Shaking
```js
// 只导入需要的模块
import { debounce } from 'lodash-es';
// 而不是导入整个库
import _ from 'lodash';
```

### 缓存策略
```js
// 使用 contenthash 实现长期缓存
output: {
  filename: '[name].[contenthash].js'
}
```

## 构建性能优化

1. **缩小构建范围**
   - 使用 resolve.modules 指定模块查找路径
   - 使用 resolve.alias 创建别名
   - 使用 module.noParse 忽略大型库的解析

2. **并行处理**
   - 使用 thread-loader 多进程打包
   - 并行压缩 JavaScript 和 CSS

3. **缓存**
   - 开启 babel-loader 缓存
   - 使用 cache-loader 或 hard-source-webpack-plugin

## 相关链接

- [Webpack 官方文档](https://webpack.js.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Rollup 官方文档](https://rollupjs.org/)