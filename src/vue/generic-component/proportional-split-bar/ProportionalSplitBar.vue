<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  proportional?: [number, number]
  leftValue?: number // 0 - 100
  decimal?: number
}
const props = withDefaults(defineProps<Props>(), {
  leftValue: 0,
})

const values = computed<[number, number, number]>(() => {
  if (props.proportional) {
    const numbers = props.proportional.map(Number)
    const sum = numbers[0] + numbers[1]
    if (sum === 0) {
      return [0, 0, 50]
    }
    return [
      (numbers[0] / sum) * 100,
      (numbers[1] / sum) * 100,
      (numbers[0] / sum) * 100,
    ]
  } else {
    return [props.leftValue, 100 - props.leftValue, props.leftValue]
  }
})
</script>

<template>
  <div
    class="proportional-split-bar"
    :style="{ '--left-value': values[2] }"
  >
    <div class="side left">
      <div class="side-text">{{ values[0].toFixed(decimal) }}%</div>
    </div>
    <div class="divider"></div>
    <div class="side right">
      <div class="side-text">{{ values[1].toFixed(decimal) }}%</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.proportional-split-bar {
  --left-value: 0;
  --height: 56px;
  --side-width: 110px;
  --left-bg: linear-gradient(180deg, #ea5455 0%, #feb692 100%);
  --right-bg: linear-gradient(180deg, #7367f0 0%, #ce9ffc 100%);
  --font-size: 24px;
  --divider-width: 6px;
  --divider-angle: -15deg;
  --side-padding: 15px;

  position: relative;
  height: var(--height);
  min-width: calc(var(--side-width) * 2);
  border-radius: 10px;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(0px - var(--height));
    z-index: 2;
    width: calc(
      (100% - (var(--side-width) * 2)) * (var(--left-value) / 100) +
        var(--side-width) + var(--height)
    );
    height: var(--height);
    background: var(--left-bg);
    transform: skewX(var(--divider-angle));
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: var(--height);
    background: var(--right-bg);
  }
  .side {
    width: var(--side-width);
    height: var(--height);
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;

    &.left {
      justify-content: flex-start;
      left: 0;
      z-index: 4;
      padding-left: var(--side-padding);
    }
    &.right {
      justify-content: flex-end;
      right: 0;
      z-index: 2;
      padding-right: var(--side-padding);
    }
  }
  .side-text {
    font-family: D-DIN, D-DIN;
    font-weight: 700;
    font-size: var(--font-size);
    color: #ffffff;
    line-height: var(--font-size);
    height: var(--font-size);
    text-align: left;
    font-style: normal;
    text-transform: none;
    .unit {
      font-size: var(--unit-font-size);
    }
  }
  .divider {
    position: absolute;
    top: 0;
    left: calc(
      (100% - (var(--side-width) * 2)) * (var(--left-value) / 100) +
        var(--side-width)
    );
    width: var(--divider-width);
    height: 100%;
    transform: translateX(-50%) skewX(var(--divider-angle));
    background-color: #fff;
    z-index: 5;
  }
}
</style>
