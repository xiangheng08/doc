/**
 * 批量修改链接为迅雷下载
 */
export function convertThunderDownload() {
	// 找到所有带有 data-thunder 的 a 标签
	const links = document.querySelectorAll('a[data-thunder]');

	for (const link of links) {
		// 转换迅雷链接
		const base64 = btoa(`AA${link.href}ZZ`);
		link.href = `thunder://${base64}`;
	}
}
