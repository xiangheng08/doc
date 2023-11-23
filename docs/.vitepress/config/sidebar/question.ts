import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: '未整理',
    collapsed: false,
    items: [
      {
        text: '未整理',
        link: '/question/unorganize/1'
      },
    ]
	},
]);
