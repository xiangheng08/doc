<template>
	<css-demo
		:values="types"
		@change="change"
		height="300"
		property="list-style-type"
		:column-mode-threshold="600"
		:default="active">
		<template #left>
			demo (参考
			<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type" target="_blank"> MDN </a>
			)
		</template>
		<ul class="list" :style="{ listStyleType: active }">
			<li v-for="item in 52" :key="item">Item {{ item }}</li>
		</ul>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';

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

function change(value: string | CSSProperties) {
	active.value = value as string;
}
</script>

<style scoped lang="scss">
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
</style>
