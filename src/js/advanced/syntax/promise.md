# Promise

## 多重 Promise

可以使用 `Promise` 的 `.then()` 方法来链接多个 `Promise`，或者使用 `Promise.all()` 来等待多个 `Promise` 都完成。

### `.then()`

使用 `.then()` 方法链式处理多个 `Promise`：

```js
const firstPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('First promise resolved');
		}, 1000);
	});
};

const secondPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Second promise resolved');
		}, 2000);
	});
};

firstPromise()
	.then((result) => {
		console.log(result);
		return secondPromise();
	})
	.then((result) => {
		console.log(result);
	});
```

上面的代码首先等待第一个 `Promise` 完成，然后在它的 `.then()` 方法中处理第二个 `Promise`。

### `Promise.all()`

使用 `Promise.all()` 等待多个 `Promise` 全部完成：

```js
const promises = [
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Promise 1 resolved');
		}, 1000);
	}),
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Promise 2 resolved');
		}, 2000);
	}),
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Promise 3 resolved');
		}, 1500);
	}),
];

Promise.all(promises)
	.then((results) => {
		console.log(results);
	})
	.catch((error) => {
		console.error(error);
	});
```

`Promise.all()` 会等待所有的 `Promise` 都完成，然后返回一个包含所有结果的数组。

### 错误处理

您可以在 `Promise` 链中使用 `.catch()` 方法来捕获任何 `Promise` 链中的错误。这通常放在 `Promise` 链的末尾，以捕获整个链中的错误。

```js
someAsyncOperation()
	.then((result) => {
		// 处理成功的情况
	})
	.catch((error) => {
		// 处理错误的情况
	});
```
