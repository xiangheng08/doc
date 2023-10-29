import { DefaultTheme } from 'vitepress';
import { define } from '../utils';

export default define<DefaultTheme.Sidebar>({
	// 前端
	'/frontend/': [
		{
			text: 'HTML',
		},
		{
			text: 'CSS',
			items: [
				{
					text: '鼠标效果',
					link: '/frontend/css/cursor',
				},
			],
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
					],
				},
				{
					text: 'Vue 核心',
					link: '/frontend/vue/core',
				},
			],
		},
	],
	// git
	'/git/': [
		{
			text: 'Git 命令大全',
			link: '/git/commandList',
		}
	]
});
