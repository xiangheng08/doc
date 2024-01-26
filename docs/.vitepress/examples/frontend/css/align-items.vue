<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box" :style="styles">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
      </div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		alignItems: 'flex-start',
	},
  {
		alignItems: 'flex-end',
  },
  {
		alignItems: 'center',
  },
  {
		alignItems: 'baseline',
  },
  {
		alignItems: 'stretch',
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
    justify-content: space-around;
    .item{
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      &:nth-child(1){
        background-color: #ac75d7;
        line-height: 5rem;
        font-size: 3rem;
      }
      &:nth-child(2){
        background-color: #8275d7;
        line-height: 7rem;
      }
      &:nth-child(3){
        background-color: #d7757b;
        line-height: 3rem;
        font-size: 2rem;
      }
      &:nth-child(4){
        background-color: #75d79a;
        line-height: 5rem;
      }
    }
	}
}
</style>
