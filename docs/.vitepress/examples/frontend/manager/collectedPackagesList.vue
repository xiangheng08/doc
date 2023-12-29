<template>
	<table>
		<thead>
			<tr>
				<td>名称</td>
				<td>描述</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in data" :key="index">
				<td>
					<a :href="item.url" target="_blank">{{ item.name }}</a>
				</td>
				<td>{{ item.desc }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import data from './collectedPackagesList.json';
</script>

<style scoped lang="scss">
table {
	display: table;
	width: 100%;
	tbody {
		a {
			text-decoration: none;
      white-space: nowrap;
      transition: 0.1s;
			&:hover {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
}
</style>
