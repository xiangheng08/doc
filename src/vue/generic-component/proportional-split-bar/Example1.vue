<script setup lang="ts">
import ProportionalSplitBar from './ProportionalSplitBar.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <ProportionalSplitBar :proportional="[7500, 12500]"  />
    <ProportionalSplitBar :proportional="[630, 500]" :decimal="2" />
    <ProportionalSplitBar :left-value="75" style="--divider-angle: 15deg;" />
    <ProportionalSplitBar :left-value="75" style="--divider-angle: 0deg;" />
    <ProportionalSplitBar
      :left-value="75"
      style="
        --left-bg: linear-gradient(180deg, #3677ff 0%, #52e5e7 100%);
        --right-bg: linear-gradient(180deg, #0e5cad 0%, #79f1a4 100%);
      "
    />
    <ProportionalSplitBar
      :left-value="75"
      style="--height: 36px; --font-size: 16px"
    />
  </div>
</template>
