# 常用正则

**相关网站**

- [正则大全](https://any-rule.vercel.app/)
- [RegExr: Learn, Build, & Test RegEx](https://regexr.com/)

## 去除 url 多余的斜杠(/)

```js
const url = 'https://www.baidu.com//';
const reg = /(?<!:)\/\/+/g;
url.replace(reg, '/'); // https://www.baidu.com/
```

## 匹配颜色格式

```js
// 匹配 hex 颜色的正则
const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

// 匹配 rgba 颜色的正则
const rgbaColorRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

// 匹配 hsl 颜色的正则
const hslColorRegex = /^hsl?\((\d+),\s*(\d+)(?:%\s*,\s*(\d+)(?:%\s*))?\)$/;
```

## 用户名

```js
const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
// 示例：user_123
```


## 密码

```js
// 6-20位字母数字特殊字符组合，不需要每种字符都有
const passwordRegex = /^[a-zA-Z\d!@#$%^&*]{6,20}$/;

// 6-20位字母+数字
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

// 大小写字母+数字+特殊符号，8位以上
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

## 邮箱

```js
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 示例：test@example.com
```

## 手机号

```js
// 中国大陆
const phoneRegex = /^1[3-9]\d{9}$/;
// 示例：13812345678
```

## URL

```js
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
// 示例：https://www.example.com/path?query=1
```

## 身份证号

```js
// 18位，简单格式
const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
// 示例：11010119900307751X
```

## 日期格式

```js
// YYYY-MM-DD
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
// 示例：2023-10-05
```

## IP 地址

```js
// IPv4
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
// 示例：192.168.1.1
```

## 中文字符

```js
const chineseRegex = /^[\u4e00-\u9fa5]+$/;
// 示例：你好世界
```

## 货币格式

```js
const currencyRegex = /^\d+(\.\d{1,2})?$/;
// 示例：100.00
```

## 去除首尾空格

```js
const trimSpaces = (str) => str.replace(/^\s+|\s+$/g, '');
```

## 正整数校验

```js
const positiveIntegerRegex = /^[1-9]\d*$/;
// 示例：42
```

## 提取数字

```js
const extractNumbers = (str) => str.match(/-?\d+(\.\d+)?/g);
// 示例："The price is $5.99" → ["5.99"]
```

## HTML 标签匹配

```js
const htmlTagRegex = /<\/?[\w\s="/.':;#-]+>/gi;
// 示例：<div class="example">
```
