<template>
  <div style="height: 300px">
    <InfiniteScroll
      :loading="loading"
      :finished="finished"
      @load="loadMore"
    >
      <!-- 你的内容 -->
      <div v-for="item in list" :key="item.id">{{ item.content }}</div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InfiniteScroll from './InfiniteScroll.vue'

interface ListItem {
  id: number
  content: string
}

const list = ref<ListItem[]>([])
const loading = ref(false)
const finished = ref(false)
let page = 1

const loadMore = async () => {
  console.log('loadMore')

  if (loading.value || finished.value) return

  loading.value = true
  try {
    // 模拟 API 调用
    const newData = await fetchData(page)

    if (newData.length) {
      list.value.push(...newData)
      page++
    } else {
      finished.value = true
    }
  } finally {
    loading.value = false
  }
}

let count = 1

// 模拟 API
const fetchData = async (page: number) => {
  return new Promise<ListItem[]>((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: 10 }, () => {
        const n = count++
        return {
          id: n,
          content: `Item ${n}`,
        }
      })
      if (count >= 100) {
        finished.value = true
      }
      resolve(data)
    }, random(600, 300))
  })
}

const random = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 初始化加载
loadMore()
</script>
