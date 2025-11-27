# jsconfig.json 配置路径别名

如果非 ts 项目，使用 `@` 别名没有提示，可以在项目根目录创建 `jsconfig.json` 文件，并添加以下内容，让编辑器识别 `@` 别名。

```json [jsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
