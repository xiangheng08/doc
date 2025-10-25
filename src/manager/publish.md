# 发布包

## 查看那些文件会被发布到 npm

```bash
npm pack --dry-run
# or
npm publish --dry-run
```

- `npm pack --dry-run`： 显示哪些文件会被包含在发布的包中（常用）
- `npm publish --dry-run`：类似于 `npm pack --dry-run`，这个命令会模拟发布过程，显示将要发布的文件，但不会真正发布

可以配置 `.npmignore` 文件来忽略某些文件。
