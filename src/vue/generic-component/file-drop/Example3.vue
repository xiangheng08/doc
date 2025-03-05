<script setup lang="ts">
import FileDrop from './FileDrop/index.vue'
import FileDropDefaultContent from './FileDrop/DefaultContent.vue'
</script>

<template>
  <FileDrop
    mode="structure"
    @drop="(e) => console.log('drop', e)"
    show-overlay
  >
    <FileDropDefaultContent
      tips="显示遮罩层"
      width="300px"
      height="200px"
    />
  </FileDrop>
</template>
