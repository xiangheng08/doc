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
					item.text = match[1];
				}
			}
		}

		if (item.items) {
			sidebarAutoAddName(basePath, item.items) as DefaultTheme.SidebarItem[];
		}
	}
}

export default sidebarAutoAddName;
