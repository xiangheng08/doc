# Day.js 常见日期格式

## 常见格式

```js
dayjs().format('YYYY-MM-DD HH:mm:ss') // 2023-10-01 12:00:00

// 短格式
dayjs().format('YY-MM-DD') // 23-10-01
dayjs().format('YYYY-M-D') // 2023-10-1 (不补零)

// 长格式
dayjs().format('dddd, MMMM D, YYYY') // Sunday, October 1, 2023

// 24小时制
dayjs().format('HH:mm') // 12:00

// 12小时制
dayjs().format('h:mm A') // 12:00 PM

// 组合
dayjs().format('YYYY-MM-DD HH:mm') // 2023-10-01 12:00
dayjs().format('YYYY-MM-DD hh:mm A') // 2023-10-01 12:00 PM
dayjs().format('MM/DD/YYYY, h:mm:ss A') // 10/01/2023, 12:00:00 PM

// 数据库格式
dayjs().format('YYYY-MM-DD') // 2023-10-01 (日期)
dayjs().format('YYYY-MM-DD HH:mm:ss') // 2023-10-01 12:00:00 (日期时间)
dayjs().format('YYYY-MM-DDTHH:mm:ssZ') // 2023-10-01T12:00:00+08:00 (ISO 8601)

// 日志格式
dayjs().format('YYYY-MM-DD HH:mm:ss.SSS') // 2023-10-01 12:00:00.000 (带毫秒)
dayjs().format('YYYY/MM/DD HH:mm:ss') // 2023/10/01 12:00:00

// 报表
dayjs().format('YYYY年MM月DD日 HH时mm分') // 2023年10月01日 12时00分
dayjs().format('[Quarter] Q YYYY') // Quarter 4 2023 (季度)

// 国内
dayjs().format('YYYY年MM月DD日') // 2023年10月01日
dayjs().format('YYYY-MM-DD') // 2023-10-01 (ISO 8601标准)
dayjs().format('YYYY/MM/DD') // 2023/10/01

// 美国
dayjs().format('MM/DD/YYYY') // 10/01/2023
dayjs().format('MM-DD-YYYY') // 10-01-2023
dayjs().format('MMMM D, YYYY') // October 1, 2023

// 欧洲
dayjs().format('DD/MM/YYYY') // 01/10/2023
dayjs().format('DD-MM-YYYY') // 01-10-2023
dayjs().format('DD.MM.YYYY') // 01.10.2023 (德国等国家常用)

// 英国
dayjs().format('DD/MM/YYYY') // 01/10/2023
dayjs().format('D MMMM YYYY') // 1 October 2023

// japan
dayjs().format('YYYY年M月D日') // 2023年10月1日
dayjs().format('YYYY/MM/DD') // 2023/10/01
```

## 国际化格式

```js
// 使用 localizedFormat 插件
import localizedFormat from 'dayjs/plugin/localizedFormats'
dayjs.extend(localizedFormat)

dayjs().format('L') // 10/01/2023 (根据地区自动格式化)
dayjs().format('LL') // October 1, 2023
dayjs().format('LLL') // October 1, 2023 12:00 PM
dayjs().format('LLLL') // Sunday, October 1, 2023 12:00 PM
```

## 特殊格式

```js
// Unix 时间戳
dayjs().format('X') // 1696147200 (秒)
dayjs().format('x') // 1696147200000 (毫秒)

// 星期格式
dayjs().format('d') // 0 (星期几，0表示星期天)
dayjs().format('dd') // Su (星期缩写)
dayjs().format('ddd') // Sun (星期短名称)
dayjs().format('dddd') // Sunday (星期全名称)
```

