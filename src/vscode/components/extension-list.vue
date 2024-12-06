<script setup lang="ts">
import list from './extension-list.json'
</script>

<template>
  <div class="extension-list">
    <div class="extension-item" v-for="item in list" :key="item.url">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.extension-list {
  width: 100%;
  height: 100px;
  margin-top: 3em;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem 1.25rem;
}
.extension-item {
  padding: 12px 16px;
}
</style>
