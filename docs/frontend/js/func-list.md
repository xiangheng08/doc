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
  if (saturation === void 0) {
    saturation = Math.floor(Math.random() * 101); // 0-100
  }
  if (lightness === void 0) {
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

## 格式化距离时间

```js
/**
 * 格式化消息距离时间
 * @param {number | string} timestamp 时间戳或时间字符串
 */
export function formatDistanceTime(timestamp) {
  const now = new Date();
  const targetDate = new Date(timestamp);
  const timeDiff = now - targetDate;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days === 1) {
    return '昨天';
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${year}/${month}/${day}`;
  }
}

/**
 * 格式化距离时间（微信消息时间样式）
 * @param {number | string} timestamp 时间戳或时间字符串
 */
export function formatDistanceTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  let period;
  if (hours < 5) {
    period = '凌晨';
  } else if (hours < 12) {
    period = '上午';
  } else if (hours < 18) {
    period = '下午';
  } else {
    period = '下午';
  }
  let baseTime = `${period}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  // 当天
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return baseTime;
  }

  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return '昨天 ' + baseTime;
  }

  // 本周内
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() >= now.getDate() - now.getDay() &&
    date.getDate() < now.getDate()
  ) {
    const dayOfWeek = date.getDay();
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[dayOfWeek] + ' ' + baseTime;
  }

  // 本年内
  if (date.getFullYear() === now.getFullYear()) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日 ${baseTime}`;
  }

  // 不是本年
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日 ${baseTime}`;
}
```

## 判断是否为文件协议

```js
/**
 * 判断是否为文件协议
 * @returns {boolean}
 */
export function isFileProtocol(url: string) {
    return url.startsWith("file://");
}
```

