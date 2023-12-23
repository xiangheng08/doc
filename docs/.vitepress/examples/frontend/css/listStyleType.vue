<template>
	<demo>
		<template #left>
			demo (参考
			<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type" target="_blank">
				MDN
			</a>
			)
		</template>
		<div class="container" :class="{ dark: isDark }">
			<div class="example">
				<ul class="list" :style="{ listStyleType: active }">
					<li v-for="item in 52" :key="item">Item {{ item }}</li>
				</ul>
			</div>
			<div class="choice">
				<div
					class="item"
					v-for="item in types"
					:key="item"
					:class="{ active: item === active }"
					@click="change(item)">
					<span class="key">list-style-type</span>
					<span>: </span>
					<span class="value">{{ item }}</span>
					<span>;</span>
				</div>
			</div>
		</div>
	</demo>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { ref } from 'vue';

const { isDark } = useData();

const types = [
	'disc',
	'circle',
	'square',
	'decimal',
	'cjk-decimal',
	'decimal-leading-zero',
	'lower-roman',
	'upper-roman',
	'lower-greek',
	'lower-alpha',
	'lower-latin',
	'upper-alpha',
	'upper-latin',
	'arabic-indic',
	'armenian',
	'bengali',
	'cambodian',
	'cjk-earthly-branch',
	'cjk-heavenly-stem',
	'cjk-ideographic',
	'devanagari',
	'ethiopic-numeric',
	'georgian',
	'gujarati',
	'gurmukhi',
	'hebrew',
	'hiragana',
	'hiragana-iroha',
	'japanese-formal',
	'japanese-informal',
	'kannada',
	'katakana',
	'katakana-iroha',
	'khmer',
	'korean-hangul-formal',
	'korean-hanja-formal',
	'korean-hanja-informal',
	'lao',
	'lower-armenian',
	'malayalam',
	'mongolian',
	'myanmar',
	'oriya',
	'persian',
	'simp-chinese-formal',
	'simp-chinese-informal',
	'tamil',
	'telugu',
	'thai',
	'tibetan',
	'trad-chinese-formal',
	'trad-chinese-informal',
	'upper-armenian',
	'disclosure-open',
	'disclosure-close',
	'none',
	'"-"',
	'"\\1F44D"',
];

const active = ref(types[0]);

function change(type: string) {
	active.value = type;
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	justify-content: space-between;
	--key: #e50000;
	--value: #0451a5;
	height: 300px;
	overflow: hidden;
	&.dark {
		--key: #9cdcfe;
		--value: #ce9178;
	}

	.example {
		flex: 1;
		overflow-y: scroll;
		border-right: 1px solid var(--vp-c-divider);
		.list {
			list-style-position: inside;
			padding-left: 0;
			padding-right: 10px;
			li {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.choice {
		overflow-y: scroll;
		.item {
			background-color: var(--vp-code-block-bg);
			padding: 8px 14px;
			border-radius: 4px;
			font-family: var(--vp-font-family-mono);
			font-size: 14px;
			cursor: pointer;
			outline: solid 1px transparent;
			margin: 10px;
			outline: solid 1px var(--vp-c-divider);
			.key {
				color: var(--key);
			}
			.value {
				color: var(--value);
			}
			&:hover {
				outline: solid 1px rgba(250, 149, 80, 0.6);
			}
			&.active {
				outline: solid 1.5px #fa9550;
			}
		}
	}
}
@media screen and (max-width: 560px) {
	.item span:not(.value) {
		display: none;
	}
}
</style>
