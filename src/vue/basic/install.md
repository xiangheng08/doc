# 安装

注意以下都是 Vue 2.x 的安装方式

## CDN

::: code-group

```html [开发环境版本]
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

```html [生产环境版本]
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

```html [原生 ES Modules]
<!-- 如果你使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件 -->
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2dist/vue.esm.browser.js'
</script>
```

:::

## NPM

```sh
# 最新稳定版
npm install vue@^2
```

## 命令行工具 (CLI)

Vue 提供一个官方命令行工具（vue cli），可用于快速搭建大型单页应用。

::: code-group

```sh [npm]
npm install -g @vue/cli
```

```sh [yarn]
yarn global add @vue/cli
```

:::

::: code-group

```sh [查看版本]
vue --version
```

```sh [简写]
vue -V
```

:::

### 创建项目

```sh
vue create project_name
```

