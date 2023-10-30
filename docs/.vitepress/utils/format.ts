/**
 * 匹配纯数字
 */
const pureNumberRegExp = /^[0-9]+$/;

/**
 * 格式化 CSS 长度
 */
export function formatCSSlength(val: number | string) {
	if (typeof val === 'string' && !pureNumberRegExp.test(val)) {
		return val;
	}
	return val + 'px';
}
