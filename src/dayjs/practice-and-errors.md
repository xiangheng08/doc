# Day.js 实践案例和常见错误

## 实践案例

### 1. 计算两个日期之间的差值

```js
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

// 需要使用插件
dayjs.extend(duration)
dayjs.extend(relativeTime)

const date1 = dayjs('2023-01-01')
const date2 = dayjs('2023-01-15')

// 计算差值
const diff = date2.diff(date1, 'day')
console.log(diff) // 14

// 人性化显示时间差
console.log(date1.from(date2)) // 2 weeks ago
console.log(date2.to(date1)) // in 2 weeks
```

### 2. 格式化特定时区的时间

```js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// 需要使用插件
dayjs.extend(utc)
dayjs.extend(timezone)

// 获取 UTC 时间
const utcTime = dayjs.utc()

// 转换为特定时区
console.log(utcTime.tz('America/New_York').format()) // 美国东部时间
console.log(utcTime.tz('Asia/Shanghai').format()) // 中国标准时间
```

### 3. 处理周相关的计算

```js
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'

// 需要使用插件
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

const date = dayjs('2023-10-01')

// 获取年中的第几周
console.log(date.week()) // 年中的第几周
console.log(date.isoWeek()) // ISO 标准的第几周

// 获取一周的开始和结束
console.log(date.startOf('week').format('YYYY-MM-DD')) // 一周的开始日期
console.log(date.endOf('week').format('YYYY-MM-DD')) // 一周的结束日期
```

### 4. 自定义解析和格式化

```js
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// 需要使用插件
dayjs.extend(customParseFormat)

// 解析自定义格式的日期
const customDate = dayjs('2023/10/01', 'YYYY/MM/DD')
console.log(customDate.format('YYYY-MM-DD')) // 2023-10-01

// 处理多种可能的格式
const formats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY']
const parseDate = (dateString) => {
  for (const format of formats) {
    const d = dayjs(dateString, format, true)
    if (d.isValid()) {
      return d
    }
  }
  return dayjs() // 如果都不匹配，返回当前日期
}
```

## 常见错误

### 1. 忘记引入插件

**错误示例：**
```js
// 没有引入 relativeTime 插件就直接使用
import dayjs from 'dayjs'

const date1 = dayjs('2023-01-01')
const date2 = dayjs('2023-01-15')
console.log(date1.from(date2)) // undefined 或报错
```

**正确做法：**
```js
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime) // 先扩展插件

const date1 = dayjs('2023-01-01')
const date2 = dayjs('2023-01-15')
console.log(date1.from(date2)) // 2 weeks ago
```

### 2. 日期字符串格式不匹配

**错误示例：**
```js
// 日期格式与输入不匹配
const date = dayjs('01-10-2023', 'YYYY-MM-DD')
console.log(date.isValid()) // false
```

**正确做法：**
```js
// 使用正确的格式解析日期
const date = dayjs('01-10-2023', 'DD-MM-YYYY')
console.log(date.isValid()) // true
console.log(date.format('YYYY-MM-DD')) // 2023-10-01

// 或者使用 customParseFormat 插件处理多种格式
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const date2 = dayjs('01-10-2023', ['DD-MM-YYYY', 'YYYY-MM-DD'])
console.log(date2.isValid()) // true
```

### 3. 修改原始日期对象

**错误示例：**
```js
// 以为可以直接修改日期对象
const date = dayjs('2023-10-01')
date.add(1, 'day') // 这不会修改原始 date 对象
console.log(date.format()) // 仍然是 2023-10-01
```

**正确做法：**
```js
// Day.js 是不可变的，所有操作都返回新对象
const date = dayjs('2023-10-01')
const newDate = date.add(1, 'day') // 将返回值赋给新变量
console.log(date.format()) // 2023-10-01 (原对象未改变)
console.log(newDate.format()) // 2023-10-02 (新对象)

// 或者链式调用
const result = date.add(1, 'day').subtract(2, 'month')
console.log(result.format()) // 2023-08-02
```

### 4. 时区处理错误

**错误示例：**
```js
// 没有使用时区插件直接处理时区
import dayjs from 'dayjs'

const date = dayjs('2023-10-01T12:00:00+08:00')
console.log(date.format()) // 可能不会正确处理时区
```

**正确做法：**
```js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const date = dayjs('2023-10-01T12:00:00+08:00')
console.log(date.format()) // 本地时间
console.log(date.utc().format()) // UTC 时间
console.log(date.tz('America/New_York').format()) // 美国东部时间
```

### 5. 日期比较错误

**错误示例：**
```js
// 直接比较两个 dayjs 对象
const date1 = dayjs('2023-10-01')
const date2 = dayjs('2023-10-01')

console.log(date1 === date2) // false (不同的对象)
console.log(date1 == date2) // false (不同的对象)
```

**正确做法：**
```js
// 使用 Day.js 提供的比较方法
const date1 = dayjs('2023-10-01')
const date2 = dayjs('2023-10-01')

console.log(date1.isSame(date2)) // true
console.log(date1.isSame(date2, 'day')) // true (同一天)
console.log(date1.isBefore(date2)) // false
console.log(date1.isAfter(date2)) // false

// 或者比较格式化的字符串
console.log(date1.format() === date2.format()) // true
```
