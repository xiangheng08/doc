import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { EnhanceAppContext } from 'vitepress';
import './vars.css';
import './style.scss';
import imageViewer from './components/imageViewer.vue';
import outlineAutoScroll from './components/outlineAutoScroll.vue';
import runVue from './components/run.vue';
// import demo from './components/demo.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

export default {
	...DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'doc-bottom': () => h(imageViewer),
			'aside-outline-after': () => h(outlineAutoScroll),
			'layout-bottom': () => h(runVue),
		});
	},
	enhanceApp(ctx: EnhanceAppContext) {
		const { app } = ctx;

		// app.component('demo', demo);
	},
};
