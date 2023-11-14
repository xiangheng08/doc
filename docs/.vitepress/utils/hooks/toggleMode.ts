import { useData } from 'vitepress';
import { watch } from 'vue';

const storageName = 'isDark';

export default function () {
	const { isDark } = useData();

	watch(
		isDark,
		() => {
			if (globalThis.localStorage) {
				globalThis.localStorage.setItem(storageName, JSON.stringify(isDark.value));
			}
		},
		{
			immediate: true,
		}
	);
}
