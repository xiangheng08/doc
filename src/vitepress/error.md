# 在 viteporess 遇到的错误

## 打包：document is not defined

当时版本：vitepress 1.0.0-rc.24

这样情况一般是在代码里或文档里直接使用了 `document`，而在打包时就找不到 `document`，viteporess 一般运行在 nodejs 环境嘛，nodejs 环境是没有 `document` 的，这时就可以使用 `globalThis` 了，而 `globalThis` 在 nodejs 环境和浏览器环境都是有的，在 nodejs 环境 `globalThis` 指向 `global` 而在浏览器环境 `globalThis` 就指向 `window`。

知道原理了，解决也简单，直接上代码

```js
// 通过 globalThis 获取 document 对象
const myDocument = globalThis.document;

// 使用可选链运算符判断
myDocument?.getElementById('app');

// 或者单独判断
if (myDocument) {
	myDocument.getElementById('app');
}

// 当然也可以直接用，反正打包完肯定时运行在浏览器环境
```

[globalThis MDN 地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

[可选链运算符 MDN 地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
