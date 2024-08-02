# Q&A

## Electron 下载失败

Electron 下载后会执行一个脚本，从 github 上下载资源。但是众所周知 github 不太稳定。所以下载失败是常有的事。

在项目根目录新建 `.npmrc` 加入以下配置：

::: code-group

```bash [大写]
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

```bash [小写]
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

:::

如果还是下载失败可以尝试把键名改为小写。

## 窗口置顶

```js
const win = new BrowserWindow({
  alwaysOnTop: true,
})

win.setAlwaysOnTop(true)

win.isAlwaysOnTop()
```

[setAlwaysOnTop](https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetalwaysontopflag-level-relativelevel)
