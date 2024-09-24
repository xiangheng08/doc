# 正则

## 去除 url 多余的斜杠(/)

```js
const url = 'https://www.baidu.com//';
const reg = /(?<!:)\/\/+/g;
url.replace(reg, '/'); // https://www.baidu.com/
```
