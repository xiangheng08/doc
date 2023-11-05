import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
    text: '后端',
    collapsed: false,
		items: [
			{
        text: 'MySql',
        collapsed: true,
				items: [
					{
						text: '错误',
						link: '/backend/mysql/error',
					},
				],
			},
		],
	},
]);
