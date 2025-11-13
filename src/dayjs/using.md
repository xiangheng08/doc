# Day.js 使用方法

## 解析

### 当前时间
获取当前时间的 Day.js 对象：

```js
dayjs() // 返回当前时间的 Day.js 对象
```

### 时间字符串
解析 ISO 8601 格式的时间字符串：

```js
dayjs('2018-06-03')
```

### 时间戳
解析 Unix 时间戳（毫秒）：

```js
dayjs(1528361259484)
```

### Date 对象
从 JavaScript Date 对象创建 Day.js 对象：

```js
dayjs(new Date(2018, 8, 18))
```

### 复制
复制一个 Day.js 对象：

```js
dayjs().clone()
// 或者
dayjs(dayjs())
```

### 验证
检查当前 Day.js 对象是否表示有效时间：

```js
dayjs().isValid() // true
dayjs('not a date').isValid() // false
```

## 获取

获取日期的各个组成部分：

```js
dayjs().year()       // 年份
dayjs().month()      // 月份 (0-11)
dayjs().date()       // 日期 (1-31)
dayjs().day()        // 星期几 (0-6，0 表示周日)
dayjs().hour()       // 小时 (0-23)
dayjs().minute()     // 分钟 (0-59)
dayjs().second()     // 秒 (0-59)
dayjs().millisecond() // 毫秒 (0-999)
```

## 设置

设置日期的特定部分：

```js
dayjs().set('year', 2017)
dayjs().set('month', 9)  // 月份从 0 开始
dayjs().set('date', 18)
dayjs().set('hour', 12)
dayjs().set('minute', 30)
dayjs().set('second', 45)
dayjs().set('millisecond', 123)

// 也可以直接使用对应的方法进行设置
dayjs().year(2017)
dayjs().month(9)
dayjs().date(18)
```

## 操作

### 增加时间
通过 [add](https://day.js.org/docs/zh-CN/manipulate/add) 方法增加时间并返回新的 Day.js 对象：

```js
dayjs().add(7, 'day')
dayjs().add(7, 'year')
dayjs().add(7, 'month')
dayjs().add(7, 'hour')
dayjs().add(7, 'minute')
dayjs().add(7, 'second')
```

### 减少时间
通过 [subtract](https://day.js.org/docs/zh-CN/manipulate/subtract) 方法减少时间并返回新的 Day.js 对象：

```js
dayjs().subtract(7, 'year')
dayjs().subtract(7, 'month')
dayjs().subtract(7, 'day')
dayjs().subtract(7, 'hour')
dayjs().subtract(7, 'minute')
dayjs().subtract(7, 'second')
```

### 开始时间
通过 [startOf](https://day.js.org/docs/zh-CN/manipulate/start-of) 方法返回当前时间的开头时间：

```js
dayjs().startOf('year')   // 今年第一天
dayjs().startOf('month')  // 本月第一天
dayjs().startOf('day')    // 今天凌晨
dayjs().startOf('hour')   // 当前小时的开始
```

### 结束时间
通过 [endOf](https://day.js.org/docs/zh-CN/manipulate/end-of) 方法返回当前时间的末尾时间：

```js
dayjs().endOf('month')   // 本月最后一天
dayjs().endOf('year')    // 今年最后一天
dayjs().endOf('day')     // 今天最后一刻
```

## 显示

### 格式化
通过 [format](https://day.js.org/docs/zh-CN/display/format) 方法格式化日期显示：

```js
dayjs().format()                                    // "2020-04-02T08:02:17-05:00"
dayjs().format('[YYYY] YYYY [MM] MM')              // "YYYY 2020 MM 04"
dayjs().format('YYYY-MM-DD HH:mm:ss')             // "2020-04-02 08:02:17"
dayjs().format('dddd, MMMM D, YYYY h:mm A')       // "Thursday, April 2, 2020 8:02 AM"
```

常用的格式化符号：
- `YYYY` - 四位数年份
- `MM` - 两位数月份
- `DD` - 两位数日期
- `HH` - 两位数小时
- `mm` - 两位数分钟
- `ss` - 两位数秒数

### 时间戳
获取 Unix 时间戳（毫秒）：

```js
dayjs().valueOf() // 1528361259484
```

## 查询

### 最小/最大时间
获取多个时间中的最早时间和最晚时间：

```js
dayjs.max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))
dayjs.min(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))
```

### 是否相同
通过 [isSame](https://day.js.org/docs/zh-CN/query/is-same) 判断两个时间是否相同：

```js
dayjs().isSame(dayjs('2018-06-03'))                // 是否为同一天
dayjs().isSame(dayjs('2018-06-03'), 'year')       // 是否为同一年
dayjs().isSame(dayjs('2018-06-03'), 'month')      // 是否为同一月
```

### 是否之前
通过 [isBefore](https://day.js.org/docs/zh-CN/query/is-before) 判断时间是否在另一个时间之前：

```js
dayjs().isBefore(dayjs('2018-06-03'))
dayjs().isBefore(dayjs('2018-06-03'), 'year')
```

### 是否之后
通过 [isAfter](https://day.js.org/docs/zh-CN/query/is-after) 判断时间是否在另一个时间之后：

```js
dayjs().isAfter(dayjs('2018-06-03'))
dayjs().isAfter(dayjs('2018-06-03'), 'year')
```

## 差异

通过 [diff](https://day.js.org/docs/zh-CN/display/difference) 计算两个时间的差值：

```js
const date1 = dayjs('2018-06-08')
const date2 = dayjs('2017-06-01')

date1.diff(date2)                          // 毫秒差
date1.diff(date2, 'year')                 // 年差
date1.diff(date2, 'month')                // 月差
date1.diff(date2, 'day')                  // 天差
date1.diff(date2, 'hour')                 // 小时差
date1.diff(date2, 'minute')               // 分钟差
date1.diff(date2, 'second')               // 秒差
date1.diff(date2, 'millisecond')          // 毫秒差
```

## 插件

Day.js 支持插件系统，可以通过插件扩展更多功能：

### 相对时间 (RelativeTime)
显示相对时间，如 "2 小时前"：

```js
dayjs.extend(relativeTime)
dayjs().subtract(2, 'hour').fromNow() // 2 小时前
```

### 是否闰年 (IsLeapYear)
判断是否为闰年：

```js
dayjs.extend(isLeapYear)
dayjs().isLeapYear() // true or false
```

### 是否之间 (IsBetween)
判断时间是否在两个时间之间：

```js
dayjs.extend(isBetween)
dayjs().isBetween(dayjs('2018-01-01'), dayjs('2019-01-01')) // true or false
```
