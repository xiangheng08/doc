<script setup lang="ts">
import { ref } from 'vue'
import GlobalFileDrop from './FileDrop/Global.vue'

const dropActive = ref(false)
</script>

<template>
  <label>
    <input type="checkbox" v-model="dropActive" />
    启用全局文件拖入
  </label>
  <GlobalFileDrop
    mode="structure"
    @drop="(e) => console.log('drop', e)"
    :active="dropActive"
  />
</template>
