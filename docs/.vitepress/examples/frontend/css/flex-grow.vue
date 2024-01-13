<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box">
        <div class="item" :style="styles">item 1</div>
        <div class="item">item 2</div>
        <div class="item">item 3</div>
      </div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		flexGrow: '1',
	},
  {
		flexGrow: '2',
	},
  {
		flexGrow: '3',
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
	.box {
		padding: 0.75em;
    width: 100%;
		height: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    .item{
      padding: 0.75em 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      margin: 10px;
      flex-grow: 1;
      transition: all 0.3s;
      &:nth-child(1){
        background-color: #ac75d7;
      }
      &:nth-child(2){
        background-color: #8275d7;
      }
      &:nth-child(3){
        background-color: #d7757b;
      }
    }
	}
}
</style>
