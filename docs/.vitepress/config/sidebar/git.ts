import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: 'Git 命令大全',
		link: '/git/commandList',
	},
	{
		text: '下载安装',
		link: '/git/install',
	},
	{
		text: '与 vscode 联动',
		link: '/git/vscode',
	},
	{
		link: '/git/pagination-shortcut'
	},
	{
		text: '脚本',
		collapsed: false,
		items: [
			{
				text: '自动推送',
				link: '/git/script/auto_push',
			}
		],
	},
	{
		text: '错误',
		link: '/git/error/index',
		collapsed: false,
		items: [],
	},
]);
