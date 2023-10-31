import { define } from '../../utils'
import { DefaultTheme } from 'vitepress'

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: 'HTML',
	},
	{
		text: 'CSS',
		items: [
			{
				text: '选择器',
				link: '/frontend/css/selector'
			},
			{
				text: '值与单位',
				link: '/frontend/css/values-and-units'
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
		items: [
			{
				text: '对象',
				collapsed: true,
				items: [
					{
						text: 'Array',
						link: '/frontend/js/object/array'
					}
				]
			}
		]
	},
	{
		text: 'Vue',
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
						text: 'Vue 实例',
						link: '/frontend/vue/basic/instance',
					},
					{
						text: '模板语法',
						link: '/frontend/vue/basic/syntax',
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
	},
	{
		text: 'vitepress',
		items: [
			{
				text: '遇到的错误',
				link: '/frontend/vitepress/error',
			}
		]
	},
]);
