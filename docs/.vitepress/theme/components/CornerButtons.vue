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
  bottom: 12px;
  right: 12px;
}
</style>