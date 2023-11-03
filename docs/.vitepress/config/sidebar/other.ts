import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: '小技巧',
		items: [
			{
				text: 'VScode',
				link: '/other/tips/vscode',
			},
		],
	},
]);
