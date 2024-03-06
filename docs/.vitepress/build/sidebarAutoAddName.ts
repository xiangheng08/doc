import fs from 'fs';
import path from 'path';
import { DefaultTheme } from 'vitepress';

function sidebarAutoAddName(basePath: string, sidebar: DefaultTheme.Sidebar): DefaultTheme.Sidebar {
	if (Array.isArray(sidebar)) {
		_sidebarAutoAddName(basePath, sidebar);
	} else {
		for (const key in sidebar) {
			const item = sidebar[key];
			if (Array.isArray(item)) {
				_sidebarAutoAddName(basePath, item);
			} else {
				_sidebarAutoAddName(basePath, item.items);
			}
		}
	}

	return sidebar;
}

function _sidebarAutoAddName(basePath: string, sidebarList: DefaultTheme.SidebarItem[]) {
	for (const item of sidebarList) {
		if (!item.text && item.link) {
			const fullPath = path.join(basePath, item.link + '.md');
			if (fs.existsSync(fullPath)) {
				const doc = fs.readFileSync(fullPath, 'utf-8');
				const match = doc.match(/^# (.*)$/m);
				if (match) {
					item.text = escapeHtml(match[1]);
				}
			}
		}

		if (item.items) {
			sidebarAutoAddName(basePath, item.items) as DefaultTheme.SidebarItem[];
		}
	}
}

function escapeHtml(input: string): string {
	const map: { [key: string]: string } = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'/': '&#x2F;',
		'`': '',
	};

	const regExp = /[&<>"'/`]/g;

	return input.replace(regExp, (match) => map[match]);
}

export default sidebarAutoAddName;
