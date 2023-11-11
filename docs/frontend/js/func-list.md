# 常用函数

## 是否有小数

```js
function isDecimal(num) {
	// 使用 % 运算符获取余数，如果余数不等于 0，则说明是小数
	return num % 1 !== 0;
}
```

## 防抖

```js
function debounce(fn, delay) {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}
```

## 节流

```js
function throttle(fn, delay) {
	let last;
	return function (...args) {
		let now = Date.now();
		if (now - last > delay) {
			fn.apply(this, args);
			last = now;
		}
	};
}
```
