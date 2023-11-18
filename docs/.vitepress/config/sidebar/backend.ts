import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: 'MySql',
		collapsed: false,
		items: [
			{
				text: '错误',
				link: '/backend/mysql/error',
			},
		],
	},
]);
