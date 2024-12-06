# 问题

# 忽略以下划线开头的变量和 try catch 的 catch 参数

在 eslint 配置文件里的 `rules` 里添加以下配置：

```js
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    argsIgnorePattern: '^_', // 忽略以 `_` 开头的参数名
    varsIgnorePattern: '^_', // 忽略以 `_` 开头的变量名
    caughtErrorsIgnorePattern: '^_', // 忽略 try catch 的 catch 参数以 `_` 开头的错误变量名（推荐）
  },
],
```

```js
// 不报错！
const fn = (_a) => {}

// 不报错！！
const _b

try {
  throw new Error('_c')
} catch (_e) {
  // 还是不报错！！！
}
```


其他配置[参考](https://typescript-eslint.io/rules/no-unused-vars/)
