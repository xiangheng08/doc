import { useData } from 'vitepress';
import { watch } from 'vue';

export default function () {
  const { isDark } = useData();
  // 防止打包报错
  const myDocument = globalThis.document

	// tdesign 暗色切换
	watch(
		isDark,
		() => {
			if (isDark.value) {
				myDocument?.documentElement.setAttribute('theme-mode', 'dark');
			} else {
				myDocument?.documentElement.removeAttribute('theme-mode');
			}
		},
		{
			immediate: true,
		}
	);
}
