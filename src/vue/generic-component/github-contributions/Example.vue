<template>
  <GithubContributions :data="contributionsData" :dark="isDark" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
import GithubContributions from './GithubContributions.vue'
import data from './data.json'

const { isDark } = useData()

// 模拟贡献数据来之：https://github.com/yyx990803 2024/8/25 - 2025/8/25
const contributionsData = ref(
  data as unknown as {
    date: string
    count: number
    level: number
  }[],
)
</script>
