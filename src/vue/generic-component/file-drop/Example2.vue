<script setup lang="ts">
import FileDrop from './FileDrop/index.vue'
import FileDropDefaultContent from './FileDrop/DefaultContent.vue'
</script>

<template>
  <FileDrop mode="structure" @drop="(e) => console.log('drop', e)">
    <FileDropDefaultContent tips="读取文件结构" />
  </FileDrop>
</template>
