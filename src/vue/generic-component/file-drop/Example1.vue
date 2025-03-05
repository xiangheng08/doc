<script setup lang="ts">
import FileDrop from './FileDrop/index.vue'
import FileDropDefaultContent from './FileDrop/DefaultContent.vue'
</script>

<template>
  <FileDrop mode="file" @drop="(e) => console.log('drop', e)">
    <FileDropDefaultContent />
  </FileDrop>
</template>
