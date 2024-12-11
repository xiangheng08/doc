<script setup lang="ts">
import { withBase } from 'vitepress';
import list from './extension-list.json'
</script>

<template>
  <div class="extension-list" data-not-zoom>
    <div class="extension-item" v-for="item in list" :key="item.url">
      <img class="logo" :src="withBase(item.logo)" :alt="item.name" data-no-zoom />
      <div class="info">
        <div class="title">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </div>
        <div class="description">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.extension-list {
  width: 100%;
  margin-top: 3em;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem 1.25rem;
}
.extension-item {
  padding: 12px 16px;
  display: flex;
  &:not(:first-child){
    margin-top: 0.5rem;
  }
  &:not(:last-child){
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .logo{
    width: 56px;
    height: 56px;
    margin-right: 1rem;
  }
  .info {
    flex: 1;
    margin-bottom: 1rem;
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .description {
      font-size: 0.9rem;
      color: var(--vp-c-text-1)
    }
  }
}
</style>
