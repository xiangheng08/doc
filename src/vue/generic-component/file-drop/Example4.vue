<script setup lang="ts">
import { ref } from 'vue'
import FileDrop from './FileDrop/index.vue'

const isDragging = ref(false)
</script>

<template>
  <FileDrop
    mode="structure"
    @drop="(e) => console.log('drop', e)"
    v-model:dragging="isDragging"
  >
    <div class="content">
      自定义内容{{ isDragging ? '(文件拖入)' : '' }}
    </div>
  </FileDrop>
</template>

<style lang="css" scoped>
.content {
  width: 300px;
  height: 200px;
  background-color: pink;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
