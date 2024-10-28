import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue'
import './vars.css';
import './style.scss';

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

export default {
	...DefaultTheme,
	Layout: Layout,
};
