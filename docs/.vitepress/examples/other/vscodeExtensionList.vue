<template>
	<t-space direction="vertical" size="large" style="width: 100%" class="container">
		<t-list :split="true">
			<t-list-item v-for="(item, index) in data" :key="index">
				<t-list-item-meta :image="withBase(item.logo)" :description="item.desc">
					<template #title>
						<a class="title" :href="item.url" target="_blank">{{ item.name }}</a>
					</template>
				</t-list-item-meta>
			</t-list-item>
		</t-list>
	</t-space>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import data from './vscodeExtensionList.json';
</script>

<style scoped lang="scss">
.container {
	margin-top: 3em;
	:deep(.t-list-item__meta-title) {
		margin: 0 0 var(--td-comp-margin-s);
		font: var(--td-font-title-medium);
	}
	:deep(.t-list-item__meta) {
		width: 100%;
	}
	:deep(.t-list-item__meta-content) {
		flex: 1;
	}
	:deep(.t-list-item__meta-avatar) {
		border-radius: revert;
		background: revert;
	}
	:deep(.t-list__inner) {
		padding: 0 1.25rem;
	}
	.title {
		color: var(--td-text-color-primary);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
}
</style>
