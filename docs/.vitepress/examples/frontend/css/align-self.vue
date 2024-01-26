<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box">
        <div class="item">1</div>
        <div class="item" :style="styles">2</div>
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
		alignSelf: 'auto',
	},
	{
		alignSelf: 'flex-start',
	},
  {
		alignSelf: 'flex-end',
  },
  {
		alignSelf: 'center',
  },
  {
		alignSelf: 'baseline',
  },
  {
		alignSelf: 'stretch',
  },
  {
    alignSelf: 'stretch',
    height: '4rem',
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
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: #ac75d7;
      &:nth-child(2){
        background-color: #d7757b;
        height: unset;
        line-height: 3rem;
      }
    }
	}
}
</style>
