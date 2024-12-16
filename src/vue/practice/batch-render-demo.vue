<template>
  <Demo>
    <div>
      <h5>分批渲染 Demo</h5>
      <div class="box">
        <button @click="startRendering">开始渲染</button>
        <button @click="clear">清空</button>
        <span class="render-status" v-if="visibleItems.length > 0">{{
          rendering ? '正在渲染...' : '渲染完成'
        }}</span>
      </div>
      <ul>
        <li v-for="item in visibleItems" :key="item">{{ item }}</li>
      </ul>
    </div>
  </Demo>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 模拟数据
const totalItems = 300
const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`)

const visibleItems = reactive([]) // 当前显示的数据
const rendering = ref(false) // 是否正在渲染

// 开始渲染
const startRendering = () => {
  /*
    清空当前显示的数据
    真实的项目中，可能并不需要这一步，看需求而定
  */
  visibleItems.splice(0, visibleItems.length)

  const batchSize = 3 // 每批渲染的数据量
  rendering.value = true
  let index = 0 // 重置索引

  // 分批渲染函数
  const renderBatch = () => {
    if (index >= items.length) {
      rendering.value = false
      return
    }

    // 假如本次需要渲染的数据
    const nextBatch = items.slice(index, index + batchSize)
    visibleItems.push(...nextBatch)

    index += batchSize

    // 使用 requestAnimationFrame 或 setTimeout 将任务分散到后续任务队列
    // requestAnimationFrame(renderBatch)
    setTimeout(renderBatch, 50)
  }

  renderBatch()
}

const clear = () => {
  visibleItems.splice(0, visibleItems.length)
}
</script>

<style scoped>
ul {
  height: 200px;
  overflow-y: scroll;
}
.box {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.render-status {
  font-size: 14px;
}
</style>
