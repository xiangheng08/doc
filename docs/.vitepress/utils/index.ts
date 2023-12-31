import fs from 'fs';
import path from 'path';

// 基础路径
const BASE = process.env.BASE;

/**
 * 定义
 */
export function define<T>(value: T): T {
	return value;
}

export function _withBase(path: string) {
	let base = BASE;
	path = /^\//.test(path) ? path : '/' + path;

	if (base) {
		base = base.replace(/\/$/, '');
		return base + path;
	} else {
		return path;
	}
}

/**
 * 获取路径中所有目录路径
 */
export function getDirPaths(_path: string) {
	const arr: string[] = [_path];

	if (fs.existsSync(_path)) {
		fs.readdirSync(_path).forEach((file) => {
			const curPath = path.join(_path, file);
			if (fs.lstatSync(curPath).isDirectory()) {
				arr.push(...getDirPaths(curPath));
			}
		});
	}

	return arr;
}
