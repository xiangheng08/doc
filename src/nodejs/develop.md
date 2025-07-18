# 搭建开发环境

首先，肯定是新建文件夹，然后使用 `npm init -y` 命令，生成一个 [`package.json`](/nodejs/package-json) 文件。

## 安装依赖

```bash
npm install express
```

使用这个命令，安装 `express` 框架。这时会在目录内生成一个 `node_modules` 文件夹，里面就是下载的依赖包，同时，`package.json` 文件内会多出一个 `dependencies` 字段，里面记录了下载的依赖包。
