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
 * @returns {number}
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
 * @returns {number}
 */
function gray(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

## 随机颜色

```js
/**
 * 随机 HEX 颜色
 * @returns {string}
 */
function randomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  );
}

/**
 * 随机 RGB 颜色
 * @returns {string}
 */
function randomRGBColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * 随机 HSL 颜色
 * @param {number} [saturation] 饱和度
 * @param {number} [lightness] 亮度
 * @returns {string}
 */
function randomHSLColor(saturation, lightness) {
  const hue = Math.floor(Math.random() * 360);
  if (saturation === void 0){
    saturation = Math.floor(Math.random() * 101); // 0-100
  }
  if (lightness === void 0){
    lightness = Math.floor(Math.random() * 101); // 0-100
  }
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
```

## 判断时间戳是否为毫秒级

**根据长度判断：**

通常，毫秒级的时间戳长度为 13 位，而秒级的时间戳长度为 10 位。你可以通过检查时间戳的长度来判断它是秒级还是毫秒级。

```js
/**
 * 判断时间戳是否为毫秒级
 * @param timestamp
 * @returns {boolean}
 */
function isMillisecondTimestamp(timestamp) {
  return timestamp.toString().length === 13;
}
```

**通过范围判断：**

如果你知道时间戳的取值范围，可以通过判断其是否在合理的范围内来确定其精度。

```js
/**
 * 判断时间戳是否为毫秒级
 * @param timestamp
 * @returns {boolean}
 */
function isMillisecondTimestamp(timestamp) {
  // 假设毫秒级时间戳在 2000 年到 2100 年之间
  return timestamp >= 946684800000 && timestamp <= 4102444800000;
}
```

**通过转换为日期对象判断：**

可以将时间戳转换为日期对象，然后检查日期对象的秒部分是否为零。

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
