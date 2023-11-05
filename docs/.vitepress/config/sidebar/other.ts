import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: '小技巧',
		collapsed: false,
		items: [
			{
				text: 'VScode',
				link: '/other/tips/vscode',
			},
			{
				text: 'Windows',
				link: '/other/tips/windows',
			},
		],
	},
]);
