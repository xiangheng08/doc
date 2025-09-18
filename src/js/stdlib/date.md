# Date

表示时间的 JavaScript 内置对象。

## 构造函数 {#constructor}

创建 Date 实例。

```js
// 当前时间
const now = new Date();

// 从毫秒数创建
const date1 = new Date(1641024000000);

// 从日期字符串创建
const date2 = new Date('December 17, 1995 03:24:00');
const date3 = new Date('1995-12-17T03:24:00');

// 从参数创建 (year, monthIndex[, day[, hours[, minutes[, seconds[, milliseconds]]]]])
const date4 = new Date(1995, 11, 17); // 1995年12月17日
const date5 = new Date(1995, 11, 17, 3, 24, 0); // 1995年12月17日 03:24:00

// 作为函数调用（返回当前时间字符串）
Date(); // "Wed Jul 20 2022 12:00:00 GMT+0800 (中国标准时间)"
```

## 静态方法 {#static-methods}

### `Date.now()` {#Date.now}

返回自 Unix 纪元（1970年1月1日00:00:00 UTC）以来的毫秒数。

```js
Date.now(); // 1641024000000
```

### `Date.parse(dateString)` {#Date.parse}

解析日期字符串并返回自 Unix 纪元以来的毫秒数。

```js
Date.parse('01 Jan 1970 00:00:00 GMT'); // 0
Date.parse('1970-01-01T00:00:00'); // 0
```

### `Date.UTC(year, monthIndex[, day[, hours[, minutes[, seconds[, milliseconds]]]])` {#Date.UTC}

接受与 Date 构造函数相同的参数，但将它们视为 UTC 时间，并返回自 Unix 纪元以来的毫秒数。

```js
Date.UTC(2020, 0); // 1577836800000 (2020年1月1日 00:00:00 UTC)
```

## 实例方法 {#instance-methods}

### `Date.prototype.getDate()` {#Date.prototype.getDate}

根据本地时间返回一个月中的第几天（1-31）。

```js
const date = new Date('August 19, 1975 23:15:30');
date.getDate(); // 19
```

### `Date.prototype.getDay()` {#Date.prototype.getDay}

根据本地时间返回一周中的第几天（0-6，0表示星期日）。

```js
const date = new Date('August 19, 1975 23:15:30');
date.getDay(); // 2 (星期二)
```

### `Date.prototype.getFullYear()` {#Date.prototype.getFullYear}

根据本地时间返回四位数年份。

```js
const date = new Date('July 20, 1969 20:18:04');
date.getFullYear(); // 1969
```

### `Date.prototype.getHours()` {#Date.prototype.getHours}

根据本地时间返回小时（0-23）。

```js
const date = new Date('July 20, 1969 20:18:04');
date.getHours(); // 20
```

### `Date.prototype.getMilliseconds()` {#Date.prototype.getMilliseconds}

根据本地时间返回毫秒（0-999）。

```js
const date = new Date('July 20, 1969 20:18:04.123');
date.getMilliseconds(); // 123
```

### `Date.prototype.getMinutes()` {#Date.prototype.getMinutes}

根据本地时间返回分钟（0-59）。

```js
const date = new Date('July 20, 1969 20:18:04');
date.getMinutes(); // 18
```

### `Date.prototype.getMonth()` {#Date.prototype.getMonth}

根据本地时间返回月份（0-11，0表示一月）。

```js
const date = new Date('July 20, 1969 20:18:04');
date.getMonth(); // 6 (七月)
```

### `Date.prototype.getSeconds()` {#Date.prototype.getSeconds}

根据本地时间返回秒（0-59）。

```js
const date = new Date('July 20, 1969 20:18:04');
date.getSeconds(); // 4
```

### `Date.prototype.getTime()` {#Date.prototype.getTime}

返回自 Unix 纪元以来的毫秒数。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getTime(); // -14159292000
```

### `Date.prototype.getTimezoneOffset()` {#Date.prototype.getTimezoneOffset}

返回协调世界时（UTC）相对于本地时间的时区差，以分钟为单位。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+07:00');
date.getTimezoneOffset(); // -420 (UTC+7 时区)
```

### `Date.prototype.getUTCDate()` {#Date.prototype.getUTCDate}

根据世界协调时间返回一个月中的第几天（1-31）。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.getUTCDate(); // 19
```

### `Date.prototype.getUTCDay()` {#Date.prototype.getUTCDay}

根据世界协调时间返回一周中的第几天（0-6，0表示星期日）。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.getUTCDay(); // 2 (星期二)
```

### `Date.prototype.getUTCFullYear()` {#Date.prototype.getUTCFullYear}

根据世界协调时间返回四位数年份。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getUTCFullYear(); // 1969
```

### `Date.prototype.getUTCHours()` {#Date.prototype.getUTCHours}

根据世界协调时间返回小时（0-23）。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getUTCHours(); // 20
```

### `Date.prototype.getUTCMilliseconds()` {#Date.prototype.getUTCMilliseconds}

根据世界协调时间返回毫秒（0-999）。

```js
const date = new Date('July 20, 1969 20:18:04.123 GMT+00:00');
date.getUTCMilliseconds(); // 123
```

### `Date.prototype.getUTCMinutes()` {#Date.prototype.getUTCMinutes}

根据世界协调时间返回分钟（0-59）。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getUTCMinutes(); // 18
```

### `Date.prototype.getUTCMonth()` {#Date.prototype.getUTCMonth}

根据世界协调时间返回月份（0-11，0表示一月）。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getUTCMonth(); // 6 (七月)
```

### `Date.prototype.getUTCSeconds()` {#Date.prototype.getUTCSeconds}

根据世界协调时间返回秒（0-59）。

```js
const date = new Date('July 20, 1969 20:18:04 GMT+00:00');
date.getUTCSeconds(); // 4
```

### `Date.prototype.setDate(dayValue)` {#Date.prototype.setDate}

根据本地时间为一个月中的第几天设置值。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setDate(24);
date.getDate(); // 24
```

### `Date.prototype.setFullYear(yearValue[, monthValue[, dayValue]])` {#Date.prototype.setFullYear}

根据本地时间为日期设置年份。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setFullYear(1970);
date.getFullYear(); // 1970
```

### `Date.prototype.setHours(hoursValue[, minutesValue[, secondsValue[, millisecondsValue]]])` {#Date.prototype.setHours}

根据本地时间为日期设置小时。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setHours(20);
date.getHours(); // 20
```

### `Date.prototype.setMilliseconds(millisecondsValue)` {#Date.prototype.setMilliseconds}

根据本地时间为日期设置毫秒。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setMilliseconds(123);
date.getMilliseconds(); // 123
```

### `Date.prototype.setMinutes(minutesValue[, secondsValue[, millisecondsValue]])` {#Date.prototype.setMinutes}

根据本地时间为日期设置分钟。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setMinutes(45);
date.getMinutes(); // 45
```

### `Date.prototype.setMonth(monthValue[, dayValue])` {#Date.prototype.setMonth}

根据本地时间为日期设置月份。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setMonth(0); // 一月
date.getMonth(); // 0
```

### `Date.prototype.setSeconds(secondsValue[, millisecondsValue])` {#Date.prototype.setSeconds}

根据本地时间为日期设置秒。

```js
const date = new Date('August 19, 1975 23:15:30');
date.setSeconds(30);
date.getSeconds(); // 30
```

### `Date.prototype.setTime(timeValue)` {#Date.prototype.setTime}

通过指定自 Unix 纪元以来经过的毫秒数来设置 Date 对象。

```js
const date = new Date('July 20, 1969 20:18:04');
date.setTime(1641024000000);
date.getFullYear(); // 2022
```

### `Date.prototype.setUTCDate(dayValue)` {#Date.prototype.setUTCDate}

根据世界协调时间为一个月中的第几天设置值。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCDate(24);
date.getUTCDate(); // 24
```

### `Date.prototype.setUTCFullYear(yearValue[, monthValue[, dayValue]])` {#Date.prototype.setUTCFullYear}

根据世界协调时间为日期设置年份。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCFullYear(1970);
date.getUTCFullYear(); // 1970
```

### `Date.prototype.setUTCHours(hoursValue[, minutesValue[, secondsValue[, millisecondsValue]]])` {#Date.prototype.setUTCHours}

根据世界协调时间为日期设置小时。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCHours(20);
date.getUTCHours(); // 20
```

### `Date.prototype.setUTCMilliseconds(millisecondsValue)` {#Date.prototype.setUTCMilliseconds}

根据世界协调时间为日期设置毫秒。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCMilliseconds(123);
date.getUTCMilliseconds(); // 123
```

### `Date.prototype.setUTCMinutes(minutesValue[, secondsValue[, millisecondsValue]])` {#Date.prototype.setUTCMinutes}

根据世界协调时间为日期设置分钟。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCMinutes(45);
date.getUTCMinutes(); // 45
```

### `Date.prototype.setUTCMonth(monthValue[, dayValue])` {#Date.prototype.setUTCMonth}

根据世界协调时间为日期设置月份。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCMonth(0); // 一月
date.getUTCMonth(); // 0
```

### `Date.prototype.setUTCSeconds(secondsValue[, millisecondsValue])` {#Date.prototype.setUTCSeconds}

根据世界协调时间为日期设置秒。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.setUTCSeconds(30);
date.getUTCSeconds(); // 30
```

### `Date.prototype.toDateString()` {#Date.prototype.toDateString}

返回一个表示该日期的日期部分的字符串。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toDateString(); // "Tue Aug 19 1975"
```

### `Date.prototype.toISOString()` {#Date.prototype.toISOString}

返回一个符合 ISO 8601 标准的字符串。

```js
const date = new Date('05 October 2011 14:48:00');
date.toISOString(); // "2011-10-05T14:48:00.000Z"
```

### `Date.prototype.toJSON()` {#Date.prototype.toJSON}

返回 Date 对象的字符串形式。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toJSON(); // "1975-08-19T23:15:30.000Z"
```

### `Date.prototype.toLocaleDateString([locales[, options]])` {#Date.prototype.toLocaleDateString}

返回该日期对象日期部分的字符串，该字符串格式因不同语言而不同。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toLocaleDateString('zh-CN'); // "1975/8/19"
date.toLocaleDateString('en-US'); // "8/19/1975"
```

### `Date.prototype.toLocaleString([locales[, options]])` {#Date.prototype.toLocaleString}

返回该日期对象的字符串，该字符串格式因不同语言而不同。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toLocaleString('zh-CN'); // "1975/8/19 23:15:30"
date.toLocaleString('en-US'); // "8/19/1975, 11:15:30 PM"
```

### `Date.prototype.toLocaleTimeString([locales[, options]])` {#Date.prototype.toLocaleTimeString}

返回该日期对象时间部分的字符串，该字符串格式因不同语言而不同。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toLocaleTimeString('zh-CN'); // "23:15:30"
date.toLocaleTimeString('en-US'); // "11:15:30 PM"
```

### `Date.prototype.toString()` {#Date.prototype.toString}

返回一个表示该 Date 对象的字符串。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toString(); // "Tue Aug 19 1975 23:15:30 GMT+0800 (中国标准时间)"
```

### `Date.prototype.toTimeString()` {#Date.prototype.toTimeString}

返回一个表示该日期对象时间部分的字符串。

```js
const date = new Date('August 19, 1975 23:15:30');
date.toTimeString(); // "23:15:30 GMT+0800 (中国标准时间)"
```

### `Date.prototype.toUTCString()` {#Date.prototype.toUTCString}

返回一个表示该日期对象的字符串，该字符串格式为 UTC 时间。

```js
const date = new Date('August 19, 1975 23:15:30 GMT+11:00');
date.toUTCString(); // "Tue, 19 Aug 1975 12:15:30 GMT"
```

### `Date.prototype.valueOf()` {#Date.prototype.valueOf}

返回自 Unix 纪元以来的毫秒数。

```js
const date = new Date('August 19, 1975 23:15:30');
date.valueOf(); // 175569330000
```
