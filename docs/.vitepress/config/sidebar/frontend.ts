import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: 'HTML',
		collapsed: false,
		items: [
			{
				text: '起步',
				link: '/frontend/html/index',
			},
			{
				text: '标签',
				link: '/frontend/html/tag',
			},
		],
	},
	{
		text: 'CSS',
		collapsed: false,
		items: [
			{
				text: '选择器',
				link: '/frontend/css/selector',
			},
			{
				text: '值与单位',
				link: '/frontend/css/values-and-units',
			},
			{
				text: '背景样式',
				link: '/frontend/css/style/background',
			},
			{
				text: '效果',
				link: '/frontend/css/effect',
			},
			{
				text: '鼠标效果',
				link: '/frontend/css/cursor',
			},
		],
	},
	{
		text: 'JavaScript',
		collapsed: false,
		items: [
			{
				text: '语法',
				link: '/frontend/js/syntax',
			},
			{
				text: '常用函数',
				link: '/frontend/js/func-list',
			},
			{
				text: '对象',
				collapsed: true,
				items: [
					{
						text: 'Array',
						link: '/frontend/js/object/array',
					},
				],
			},
			{
				text: 'JS 高阶语法',
				collapsed: true,
				items: [
					{
						text: 'Primise',
						link: '/frontend/js/advanced/syntax/promise',
					},
				],
			},
			{
				text: 'JS 高阶函数',
				collapsed: true,
				items: [
					{
						text: '并发执行任务',
						link: '/frontend/js/advanced/function/paralle-task',
					},
					{
						text: '惰性函数',
						link: '/frontend/js/advanced/function/lazy',
					},
				],
			},
		],
	},
	{
		text: '布局',
		collapsed: false,
		items: [
			{
				text: '瀑布流布局',
				link: '/frontend/layout/waterfall',
			},
		],
	},
	{
		text: 'Vue',
		collapsed: false,
		items: [
			{
				text: 'Vue 基础',
				collapsed: true,
				items: [
					{
						text: '安装',
						link: '/frontend/vue/basic/install',
					},
					{
						text: 'Vue 开发者工具',
						link: '/frontend/vue/basic/devtools',
					},
					{
						text: 'Vue 实例',
						link: '/frontend/vue/basic/instance',
					},
					{
						text: '模板语法',
						link: '/frontend/vue/basic/syntax',
					},
					{
						text: '指令',
						link: '/frontend/vue/basic/directives',
					},
					{
						text: '计算属性和侦听器',
						link: '/frontend/vue/basic/computed-watch',
					},
					{
						text: 'class 与 style 绑定',
						link: '/frontend/vue/basic/class-style',
					},
					{
						text: '条件渲染',
						link: '/frontend/vue/basic/conditional',
					},
					{
						text: '列表渲染',
						link: '/frontend/vue/basic/list',
					},
					{
						text: '响应式原理',
						link: '/frontend/vue/basic/reactivity',
					},
					{
						text: '事件处理',
						link: '/frontend/vue/basic/events',
					},
				],
			},
			{
				text: 'Vue 核心',
				link: '/frontend/vue/core',
			},
		],
	},
	{
		text: 'vite',
		collapsed: false,
	},
	{
		text: 'vitepress',
		collapsed: false,
		items: [
			{
				text: '效果',

				collapsed: true,
				items: [
					{
						text: '平滑滚动',
						link: '/frontend/vitepress/effect/smooth-scroll',
					},
					{
						text: '侧栏大纲自动滚动',
						link: '/frontend/vitepress/effect/outline-auto-scroll',
					},
				],
			},
			{
				text: '遇到的错误',
				link: '/frontend/vitepress/error',
			},
		],
	},
]);
