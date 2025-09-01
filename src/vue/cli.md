# Vue CLI

## 简介

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 [@vue/cli](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli) 实现的交互式的项目脚手架
- 通过 [@vue/cli](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli) + [@vue/cli-service-global](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service-global) 实现的零配置原型开发
- 一个运行时依赖 ([@vue/cli-service](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service))：
  - 可升级
  - 基于 webpack 构建，并带有合理的默认配置
  - 可以通过项目内的配置文件进行配置
  - 可以通过插件进行扩展
- 一个丰富的官方插件集合，集成了前端生态中最好的工具
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面

Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

## 安装

### 环境要求

Vue CLI 需要 Node.js v8.9 或更高版本（推荐 v10 以上）。

### 安装方式

可以使用下列任一命令安装这个新的包：

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

安装之后，你就可以在命令行中访问 `vue` 命令。你可以通过简单运行 `vue`，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

你还可以用这个命令来检查其版本是否正确：

```bash
vue --version
```

## 基本使用

### 创建项目

运行以下命令来创建一个新项目：

```bash
vue create hello-world
```

在创建项目时，你会被提示选取一个 preset。你可以选默认的包含了基本的 Babel + ESLint 设置的 preset，也可以选"手动选择特性"来选取需要的特性。

你也可以通过图形化界面创建和管理项目：

```bash
vue ui
```

上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。

### CLI 命令

Vue CLI 提供了丰富的命令行工具：

```bash
vue create --help
```

常用的选项包括：
- `-p, --preset <presetName>`：忽略提示符并使用已保存的或远程的预设选项
- `-d, --default`：忽略提示符并使用默认预设选项
- `-m, --packageManager <command>`：在安装依赖时使用指定的 npm 客户端
- `-r, --registry <url>`：在安装依赖时使用指定的 npm registry
- `-g, --git [message]`：强制 / 跳过 git 初始化，并可选的指定初始化提交信息

### 升级

如需升级全局的 Vue CLI 包，请运行：

```bash
npm update -g @vue/cli
# 或者
yarn global upgrade --latest @vue/cli
```

如需升级项目中的 Vue CLI 相关模块，请在项目目录下运行：

```bash
vue upgrade
```

## 全局配置

有些针对 @vue/cli 的全局配置，例如你惯用的包管理器和你本地保存的 preset，都保存在 home 目录下一个名叫 `.vuerc` 的 JSON 文件。你可以用编辑器直接编辑这个文件来更改已保存的选项。

你也可以使用 `vue config` 命令来审查或修改全局的 CLI 配置。

## 项目配置

`vue.config.js` 是一个可选的配置文件，如果项目的（和 `package.json` 同级的）根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。

这个文件应该导出一个包含了选项的对象：

```js [vue.config.js]
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 选项
})
```

常用的配置选项包括：

### publicPath

部署应用包时的基本 URL。默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 `https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。

```js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
```

### outputDir

当运行 `vue-cli-service build` 时生成的生产环境构建文件的目录。默认值为 'dist'。

```js
module.exports = {
  outputDir: 'dist'
}
```

### assetsDir

放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。

```js
module.exports = {
  assetsDir: 'static'
}
```

### lintOnSave

是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。

```js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production'
}
```

### productionSourceMap

如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

```js
module.exports = {
  productionSourceMap: false
}
```

### devServer

配置开发服务器的相关选项。所有 [webpack DevServer](https://webpack.js.org/configuration/dev-server/) 的选项都支持。

> 像 host、port 和 https 可能会被命令行参数覆写

```js
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
    // 更多配置项...
  }
}
```

### devServer.proxy

配置代理选项。

```js
module.exports = {
  devServer: {
    // 将没有匹配到静态文件的请求代理到 http://localhost:4000
    proxy: 'http://localhost:4000',

    // 将所有以 /api 开头的请求代理到 http://localhost:3000
    proxy: {
      '/api': 'http://localhost:3000',
    },

    // 重写路径
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },

    // 多个代理到同一个目标
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
        // 重写 origin 头
        changeOrigin: true,
      },
    ],
  }
}
```


## 相关链接

- [Vue CLI 官方文档](https://cli.vuejs.org/zh/)
- [Vue CLI GitHub 仓库](https://github.com/vuejs/vue-cli)
