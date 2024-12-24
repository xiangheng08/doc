# VitePress 效果

## 平滑滚动

因为 VitePress 通过锚点滚动，所以加上下面样式就行了。

```css
html {
	/* 平滑滚动 */
	scroll-behavior: smooth;
}
```

导入参考：在 .vitepress/theme/index.ts 导入样式文件。
