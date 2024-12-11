# 惰性函数

在非常多的场景中，都需要根据环境的不同，动态的改变函数的行为。

这里以复制函数举例，这是一个非常常见的场景。有些浏览器支持 `navigator.clipboard.writeText`，但是有些浏览器不支持，需要降级使用 `document.execCommand("copy")`。

```js
function copyText(text) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	} else {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	}
}
```

但是浏览器支不支持是不是在一开始就可以确定下来了，因此我们可以将函数改进一下，在第一次时就确定下来函数使用那些 API 来完成功能。

```js
function copyText(text) {
	if (navigator.clipboard) {
		copyText = (text) => {
			navigator.clipboard.writeText(text);
		};
	} else {
		copyText = (text) => {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
		};
	}

	copyText(text); // 第一次也要实现功能所以这里调用一下
}
```

在此之上呢，我们还可以将函数进行进一步的改进，将复制函数使用一个函数来的返回。将来如果需要修改复制函数的行为，再次调用 `createCopyText` 覆盖掉之前的。

这里说一个场景，在一些文档网站上需要限制用户的复制，就需要登录啊或者要会员啥的，那就可以在 `createCopyText` 中封装不同场景的逻辑，那在场景切换后（比如登录了、冲了会员啥的），那就可以重新调用 `createCopyText` 覆盖掉之前的。

```js
function createCopyText() {
	if (navigator.clipboard) {
		return (text) => {
			navigator.clipboard.writeText(text);
		};
	} else {
		return (text) => {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
		};
	}
}

// 在开始就确定的使用的 API
const copyText = createCopyText();
```

或者封装成一个立即执行函数，这样就省去了第一次调用函数的麻烦。

```js
const copyText = (function () {
	if (navigator.clipboard) {
		return (text) => {
			navigator.clipboard.writeText(text);
		};
	} else {
		return (text) => {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
		};
	}
})();
```

参考：
- [Clipboard API](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API)
- [execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)
