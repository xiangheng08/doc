<template>
  <div class="corner-buttons">
    <scroll-to-top />
  </div>
</template>

<script setup lang="ts">
import scrollToTop from './scrollToTop.vue'
</script>
  
<style scoped lang="scss">
.corner-buttons{
  position: fixed;
  bottom: 0;
  right: 12px;
}
</style>