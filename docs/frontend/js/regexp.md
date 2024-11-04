# 正则

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
