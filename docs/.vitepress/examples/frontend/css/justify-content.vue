<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box" :style="styles">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
      </div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		justifyContent: 'flex-start',
	},
  {
		justifyContent: 'flex-end',
  },
  {
		justifyContent: 'center',
  },
  {
		justifyContent: 'space-between',
  },
  {
		justifyContent: 'space-around',
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
    width: 100%;
		height: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    .item{
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
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
