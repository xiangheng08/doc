<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<table :style="styles">
				<tbody>
					<tr>
						<td>Cell 1.1</td>
						<td>Cell 1.2</td>
					</tr>
					<tr>
						<td>Cell 2.1</td>
						<td>Cell 2.2</td>
					</tr>
					<tr>
						<td>Cell 3.1</td>
						<td>Cell 3.2</td>
					</tr>
				</tbody>
			</table>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		borderCollapse: 'collapse',
	},
	{
		borderCollapse: 'separate',
	},
];

const styles = ref(values[0]);

function change(value: string | CSSProperties) {
	styles.value = value as CSSProperties;
}
</script>

<style scoped lang="scss">
.ct {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	table {
		width: 15rem;
		table-layout: fixed;
		td {
			border: 5px solid;
			border-color: #dc143c #1e90ff orange #32cd32;
			padding: 0.75rem;
		}
	}
}
</style>
