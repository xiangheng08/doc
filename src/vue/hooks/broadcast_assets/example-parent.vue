<script setup lang="ts">
import { useBroadcast } from './broadcast'
import ChildComponent from './example-child.vue'

const { broadcast, receive } = useBroadcast()

// 广播事件
const sendMessage = () => {
  broadcast('message', { text: 'Hello from parent!' })
}

const sendNotification = () => {
  broadcast('notification', 'This is a notification')
}

receive('message', (data) => {
  console.log('父组件收到消息:', data)
})

receive('notification', (data) => {
  console.log('父组件收到通知:', data)
})
</script>

<template>
  <div class="parent-component">
    父组件
    <button class="native" @click="sendMessage">发送消息</button>
    <button class="native" @click="sendNotification">发送通知</button>
    <ChildComponent />
  </div>
</template>

<style scoped>
.parent-component {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
}
</style>
