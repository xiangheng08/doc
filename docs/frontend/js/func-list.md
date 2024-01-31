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

## 获取某个日期位于当年的第几天

```js
/**
 * 获取某个日期位于当年的第几天
 * @param {Date} date 日期
 */
function dayOfYear(date) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
}
```

## 将 rgb 颜色灰度化（基于光感加权平均）

```js
/**
 * 将 rgb 颜色灰度化（基于光感加权平均）
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns
 */
function gray(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

## 随机 HEX 颜色

```js
/**
 * 随机 HEX 颜色
 * @returns
 */
function randomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  );
}
```

## 判断时间戳是否为毫秒级

```js
/**
 * 判断时间戳是否为毫秒级
 * @param timestamp
 * @returns {boolean}
 */
export function isMillisecondTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.getSeconds() === 0;
}
```
