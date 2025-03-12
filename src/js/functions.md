# 常用函数

## 是否有小数

```js
function isDecimal(num) {
  // 使用 % 运算符获取余数，如果余数不等于 0，则说明是小数
  return num % 1 !== 0
}
```

## 防抖

```js
/**
 * 防抖
 *
 * @param {Function} fn - 要防抖的函数。
 * @param {number} delay - 延迟时间，以毫秒为单位。
 * @returns {Function} - 防抖后的函数。
 */
function debounce(fn, delay) {
  let timer

  /**
   * @param {...any} args - 传递给防抖函数的参数。
   */
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      fn.call(this, ...args)
    }, delay)
  }
}
```

## 节流

```js
/**
 * 节流
 *
 * @param {Function} fn 要节流的函数
 * @param {number} delay 两次调用之间的最小时间间隔，以毫秒为单位
 * @param {boolean} [start] 第一次是否执行
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay, start = true) {
  let last

  /**
   * @param {...any} args - 传递给节流函数的参数。
   */
  return function (...args) {
    let now = Date.now()
    if ((start && !last) || now - last > delay) {
      fn.apply(this, args)
      last = now
    }
  }
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
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  )
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
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
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
  )
}

/**
 * 随机 RGB 颜色
 * @returns {string}
 */
function randomRGBColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red}, ${green}, ${blue})`
}

/**
 * 随机 HSL 颜色
 * @param {number} [saturation] 饱和度
 * @param {number} [lightness] 亮度
 * @returns {string}
 */
function randomHSLColor(saturation, lightness) {
  const hue = Math.floor(Math.random() * 360)
  if (saturation === void 0) {
    saturation = Math.floor(Math.random() * 101) // 0-100
  }
  if (lightness === void 0) {
    lightness = Math.floor(Math.random() * 101) // 0-100
  }
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
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
  return timestamp.toString().length === 13
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
  return timestamp >= 946684800000 && timestamp <= 4102444800000
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
function isMillisecondTimestamp(timestamp) {
  const date = new Date(timestamp)
  return date.getSeconds() === 0
}
```

## 格式化距离时间

```js
/**
 * 格式化消息距离时间
 * @param {number | string} timestamp 时间戳或时间字符串
 */
function formatDistanceTime(timestamp) {
  const now = new Date()
  const targetDate = new Date(timestamp)
  const timeDiff = now - targetDate
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth() + 1
    const day = targetDate.getDate()
    return `${year}/${month}/${day}`
  }
}

/**
 * 格式化消息距离时间（微信消息时间格式）
 * @param {number | string} timestamp 时间戳或时间字符串
 */
function formatDistanceTime(timestamp) {
  const now = new Date()
  const date = new Date(timestamp)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period =
    hours < 6
      ? '凌晨'
      : hours < 12
      ? '上午'
      : hours < 13
      ? '中午'
      : hours < 18
      ? '下午'
      : '晚上'
  const baseTime = `${period}${hours}:${minutes
    .toString()
    .padStart(2, '0')}`

  // 当天
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return baseTime
  }

  // 昨天
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return '昨天 ' + baseTime
  }

  // 本周内
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() >= now.getDate() - now.getDay() &&
    date.getDate() < now.getDate()
  ) {
    return (
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
        date.getDay()
      ] +
      ' ' +
      baseTime
    )
  }

  // 本年内
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${baseTime}`
  }

  // 不是本年
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${baseTime}`
}
```

## 格式化用时

```js
/**
 * 格式化用时
 * @param {number} ms - 毫秒数
 * @returns {string} - 格式化后的用时字符串
 */
export function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms}ms`
  }

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const displaySeconds = seconds % 60
  const displayMinutes = minutes % 60
  const displayHours = hours

  let result = ''

  if (displayHours > 0) {
    result += `${displayHours}h `
  }
  if (displayMinutes > 0 || displayHours > 0) {
    result += `${displayMinutes}m `
  }
  if (displaySeconds > 0 || displayMinutes > 0 || displayHours > 0) {
    result += `${displaySeconds}s`
  }

  return result.trim()
}

// 返回值示例
// 545ms
// 45s
// 1m 5s
// 1h 2m 5s
```

## 判断是否为文件协议

```js
/**
 * 判断是否为文件协议
 * @returns {boolean}
 */
function isFileProtocol(url: string) {
  return url.startsWith('file://')
}
```

## 字符串相关

```js
/**
 * 删除字符串的某一段
 * @param {string} str 原字符串
 * @param {number} start 起始索引
 * @param {number} end 结束索引（包括结束索引位置）
 * @returns {string}
 */
function removeSubstring(str, start, end) {
  return str.slice(0, start) + str.slice(end + 1)
}

/**
 * 插入字符串
 * @param {string} str 原字符串
 * @param {string} insertion 要插入的字符串
 * @param {number} start 起始索引
 * @param {number} [end] 结束索引（不传就赋值为起始索引）
 * @returns  {string}
 */
function insertSubstring(str, insertion, start, end) {
  if (end === void 0) {
    end = start
  }
  return str.slice(0, start) + insertion + str.slice(end)
}
```

## 复制文字

```js
const copyText = async (text) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}
```

## 复制图片到剪贴板

```js
/**
 * 复制图片到剪贴板
 * @param {string} url 图片地址
 */
function copyImageToClipboard(url) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      return reject(new Error('当前浏览器不支持剪贴板API'))
    }
    const image = new Image()
    image.src = url
    image.crossOrigin = 'Anonymous' // 设置跨域
    image.onload = function () {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error('image to blob failed'))
          }
          const item = new ClipboardItem({ [blob.type]: blob })
          navigator.clipboard.write([item]).then(resolve, reject)
        })
      } catch (error) {
        reject(error)
      }
    }
    image.onerror = (err) => reject(err)
  })
}
```

## 触发全局自定义事件

```js
/**
 * 触发全局自定义事件
 * @param {string} event
 * @param {any} [value]
 */
const emitGlobalCustomEvent = (event, value = null) => {
  window.dispatchEvent(new CustomEvent(event, { detail: value }))
}
```

## 下载

```js
/**
 * 下载
 * @param {string} url
 * @param {string} [filename]
 */
function download(url, filename = 'download') {
  const a = document.createElement('a')
  a.style = 'display: none' // 创建一个隐藏的a标签
  a.download = filename
  a.href = url
  document.body.appendChild(a)
  a.click() // 触发a标签的click事件
  document.body.removeChild(a)
}
```

## 生成唯一 ID

```js
/**
 * 生成唯一ID
 * @param {string} [template] 模板
 * @returns {string} 唯一ID
 */
const getUuid = (template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
  let d = new Date().getTime()
  return template.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
```

## 版本

[SemVer 规范](https://semver.org/lang/zh-CN/);

```js
/**
 * 检查版本号是否符合 SemVer 规范。
 * @param version 要检查的版本号
 * @returns 如果版本号符合 SemVer 规范，则返回 true，否则返回 false。
 */
function isValidSemVer(version) {
  const semverRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm
  return semverRegex.test(version)
}

/**
 * 版本号比较
 * @param currentVersion 当前版本号
 * @param compareVersion 要比较的版本号
 * @returns 比较结果，如下
 * - -1: `currentVersion` < `compareVersion`
 * - 1: `currentVersion` > `compareVersion`
 * - 0: `currentVersion` = `compareVersion`
 */
function compareVersions(currentVersion, compareVersion) {
  // 去除元数据部分
  const [currentVersionWithoutMeta] = currentVersion.split('+')
  const [compareVersionWithoutMeta] = compareVersion.split('+')

  // 分离版本号和预发布版本号
  const [currentVersionNumber, currentPrerelease] =
    currentVersionWithoutMeta.split('-')
  const [compareVersionNumber, comparePrerelease] =
    compareVersionWithoutMeta.split('-')

  // 拆分版本号为数字数组
  const currentVersionArray = currentVersionNumber.split('.').map(Number)
  const compareVersionArray = compareVersionNumber.split('.').map(Number)

  // 比较主要版本号
  for (let i = 0; i < currentVersionArray.length; i++) {
    if (currentVersionArray[i] < compareVersionArray[i]) {
      return -1
    } else if (currentVersionArray[i] > compareVersionArray[i]) {
      return 1
    }
  }

  // 如果主要版本号相同，则比较预发布版本号
  if (currentPrerelease && !comparePrerelease) {
    return -1
  } else if (!currentPrerelease && comparePrerelease) {
    return 1
  } else if (currentPrerelease && comparePrerelease) {
    const currentPrereleaseArray = currentPrerelease.split('.').map(Number)
    const comparePrereleaseArray = comparePrerelease.split('.').map(Number)

    for (
      let i = 0;
      i <
      Math.max(
        currentPrereleaseArray.length,
        comparePrereleaseArray.length,
      );
      i++
    ) {
      const currentPart = currentPrereleaseArray[i] || 0
      const comparePart = comparePrereleaseArray[i] || 0

      if (currentPart < comparePart) {
        return -1
      } else if (currentPart > comparePart) {
        return 1
      }
    }
  }

  return 0
}
```

## 观察元素大小的变化

[ts 版本](/ts/functions#观察元素大小的变化)

```js
// observer.js

/**
 * @type {ResizeObserver | null}
 */
let resizeObserverInstance = null
/**
 * @type {WeakMap<HTMLElement, (result: any)=>void>}
 */
const resizeCallbackMap = new WeakMap()

/**
 * 观察元素大小的变化
 * @param {HTMLElement} element
 * @param {(result: {width: number, height: number, target: HTMLElement})=>void} callback
 * @returns {()=>void} 取消观察的函数
 */
export function observeResize(element, callback) {
  if (!resizeObserverInstance) {
    resizeObserverInstance = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        const target = entry.target
        const callbackFn = resizeCallbackMap.get(target)
        if (callbackFn) {
          callbackFn({ width, height, target })
        }
      }
    })
  }

  resizeObserverInstance.observe(element)
  resizeCallbackMap.set(element, callback)

  // 返回一个取消观察的函数
  return () => {
    resizeObserverInstance.unobserve(element)
    resizeCallbackMap.delete(element)
  }
}

/**
 * 停止观察元素大小的变化
 * @param {HTMLElement} element
 */
export function unobserveResize(element) {
  if (resizeObserverInstance) {
    resizeObserverInstance.unobserve(element)
    resizeCallbackMap.delete(element)
  }
}
```

## 检查对象是否包含循环引用

```js
/**
 * 检查对象是否包含循环引用
 * @param {object} obj
 * @returns {boolean}
 */
function hasCircularReference(obj) {
  const seen = new WeakSet()

  function detect(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (seen.has(obj)) {
        return true
      }
      seen.add(obj)
      const values = Object.values(obj)
      for (let i = 0; i < values.length; i++) {
        if (detect(values[i])) return true
      }
    }
    return false
  }

  return detect(obj)
}
```

## 计算每个数据值对应的高度比例

```js
/**
 * 计算每个数据值对应的高度比例（范围 0-1）。
 *
 * @param {number[]} arr - 输入的数据数组。
 * @returns {number[]} - 返回每个数据值对应的高度比例数组，范围 0-1。
 */
function calculateHeightPercentages(arr) {
  /**
   * 确保浮点数计算的精度，忽略小的浮点数误差
   * @param {number} num - 输入的浮点数
   * @returns {number} - 处理后的浮点数
   */
  function fixedNum(num) {
    if (('' + num).indexOf('.') >= 0) num = parseFloat(num.toFixed(8))
    return num
  }

  const magic = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100] // 魔数数组
  const splitNumber = 4 // 理想的刻度间隔段数
  const max = Math.max(...arr) // 获取数据中的最大值
  const min = Math.min(...arr) // 获取数据中的最小值

  // 计算初始刻度间隔的大小
  let tempGap = (max - min) / splitNumber
  // 计算缩放比例 multiple，使得 tempGap 落在魔数数组的区间内
  let multiple = Math.floor(Math.log10(tempGap) - 1)
  multiple = Math.pow(10, multiple)

  // 计算映射后的间隔大小 tempStep
  let tempStep = tempGap / multiple
  let estep // 期望得到的最佳间隔

  // 取出第一个大于 tempStep 的魔数，并乘以 multiple 作为期望得到的最佳间隔
  for (let i = 0; i < magic.length; i++) {
    if (magic[i] > tempStep) {
      estep = magic[i] * multiple
      break
    }
  }

  // 定义最大刻度和最小刻度
  let maxi = parseInt(max / estep + 1) * estep
  let mini = parseInt(min / estep - 1) * estep
  maxi = fixedNum(maxi)
  mini = fixedNum(mini)

  // 返回每个数据值对应的高度比例
  return arr.map((value) => (value - mini) / (maxi - mini))
}
```

## 是否为今天

```js
function isToday(date) {
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}
```

## 是否为昨天

```js
function isYesterday(date) {
  const yesterday = new Date(new Date().getTime() - 864e5)
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  )
}

// 第二种实现
function isYesterday(date) {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const start = now.getTime() - 864e5
  const end = now.getTime() - 1
  return start <= date.getTime() && date.getTime() <= end
}
```

## 去除 url 多余的斜杠(/)

```js
/**
 * 去除 url 多余的斜杠(/)
 */
export const trimExtraSlashes = (url) => {
  return url.replace(/(?<!:)\/\/+/g, '/')
}
```

## sleep

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
```

## 小驼峰转短横线分隔

```js
const camelToKebabCase = (input) => {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
```

## 获取 tan 角度

```js
const getTanDeg = (deg: number) => {
  const rad = (deg * Math.PI) / 180
  return Math.tan(rad)
}
```

## 选区

```js
// 选中元素内的所有内容
const selectText = (element) => {
  // 创建一个 Range 对象
  const range = document.createRange();
  range.selectNodeContents(element); // 选中元素内的所有内容

  // 创建一个 Selection 对象
  const selection = window.getSelection();
  selection.removeAllRanges(); // 清除当前选区
  selection.addRange(range); // 添加新的选区
}

// 获取选中的文本内容
const getSelectedText = () => {
  const selection = window.getSelection(); // 获取当前选区
  const selectedText = selection.toString(); // 获取选中的文本内容
  return selectedText;
}

// 选择输入框文字
const selectInputText = (inputElement, start, end) => {
  inputElement.focus(); // 聚焦到输入框
  inputElement.setSelectionRange(start, end); // 设置选区范围
}

// 监听选区变化
document.addEventListener("selectionchange", () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    console.log("Selection Changed:", selectedText);
  }
});

// 清除选区
const clearSelection = () => {
  const selection = window.getSelection();
  selection.removeAllRanges(); // 清除选区
}
```

## 选择文件

```js
/**
 * 选择文件
 * @param {object} [options]
 * @param {boolean} [options.accept]
 * @param {boolean} [options.multiple]
 * @returns {Promise<File[]>}
 *
 * @example
 * selectFile({ accept: 'image/*', multiple: true }).then(files => {
 *     console.log(files)
 * })
 */
const selectFile = (options) => {
  return new Promise((resolve, reject) => {
    const { accept, multiple } = options || {};
    const input = document.createElement('input');
    input.type = 'file';
    if (accept) input.accept = accept;
    if (multiple) input.multiple = multiple;
    input.click();
    input.onchange = () => {
      const files = [];
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
      }
      if (files.length > 0) {
        resolve(files);
      } else {
        reject();
      }
      input.remove();
    };
    input.onerror = () => {
      reject();
      input.remove();
    };
  });
};
```

## 随机数

```js
/**
 * 随机整数
 */
const randomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

## 获取错误信息字符串

[跳转 ts 查看](/ts/functions#获取错误信息字符串)

## 格式化金额

[跳转 ts 查看](/ts/functions#格式化金额)
