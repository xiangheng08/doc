import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
	{
		text: '小技巧',
		collapsed: false,
		items: [
			{
				link: '/other/tips/vscode',
			},
			{
				link: '/other/tips/windows',
			},
		],
	},
	{
		text: '项目开发',
		collapsed: false,
		items: [
			{
				text: '版本后缀',
				link: '/other/project/version-suffix',
			},
		],
	},
	{
		text: '应用/软件',
		collapsed: false,
		items: [
			{
				text: 'NVM',
				link: '/other/app/nvm',
			},
		],
	},
	{
		text: 'ChatGPT',
		collapsed: false,
		items: [
			{
				text: '角色',
				link: '/other/chatgpt/role',
			},
		],
	},
	{
		text: '常用单词',
		link: '/other/common-words',
	},
	{
		text: 'Emoji',
		link: '/other/emoji',
	},
	{
		text: 'VScode 快捷键',
		link: '/other/vscode-shortcut',
	},
	{
		text: 'vscode 扩展',
		link: '/other/vscode-extension',
	},
]);
