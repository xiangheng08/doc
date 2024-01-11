# 侧栏大纲自动滚动

## 效果

![](/images/frontend/vitepress/outline-auto-scroll-demo.gif)

## 实现

<<< @/.vitepress/theme/components/outlineAutoScroll.vue

```ts
// .vitepress/theme/index.ts
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import outlineAutoScroll from './components/outlineAutoScroll.vue';
import './style.css'; // 导入自定义样式

export default {
	...DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// 通过布局插槽插入页面
			'aside-outline-after': () => h(outlineAutoScroll),
		});
	},
};
```

```css
/* .vitepress/theme/style.css */
.aside-container {
	scroll-behavior: smooth;
}
```

## 原理

其实很简单，就是找到那个 `outline-marker`（那个绿色的条），通过监听滚动事件，实时获取 `outline-marker` 的 top 值，再计算需要的滚动距离，最后用 `scrollTo` 方法滚动到指定位置。

其实刚开始我想找大纲切换高亮显示的事件，但是没有找到，又在源码里找了找，但是看不太懂，也可以覆盖原来的组件，但是那样就有点麻烦了，干脆通过判断 `outline-marker` 的位置来实现，如果有知道的大佬，还请不吝赐教。
