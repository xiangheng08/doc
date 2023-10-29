import { h } from "vue";
import DefaultTheme from 'vitepress/theme'
import './vars.css'
import imageViewer from './components/imageViewer.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

export default {
  ...DefaultTheme,
  Layout: () => {
		return h(DefaultTheme.Layout, null, {
			"doc-bottom": () => h(imageViewer),
		});
	},
}