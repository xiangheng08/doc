<script setup lang="ts">
import { ref } from 'vue'
import FileDrop from './FileDrop/index.vue'
import FileDropDefaultContent from './FileDrop/DefaultContent.vue'
const active = ref(true)
</script>

<template>
  <label>
    <input type="checkbox" v-model="active" />
    启用文件拖入
  </label>
  <FileDrop
    mode="file"
    :active="active"
    @drop="(e) => console.log('drop', e)"
  >
    <FileDropDefaultContent />
  </FileDrop>
</template>
