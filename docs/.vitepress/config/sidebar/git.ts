import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: 'Git 命令大全',
		link: '/git/commandList',
	},
	{
		text: '错误',
		link: '/git/error/index',
		collapsed: false,
		items: [],
	},
]);
