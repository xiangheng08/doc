<script setup lang="ts">
import { useChildBroadcast, useReceiveBroadcast } from './broadcast'

// 接收消息广播
useReceiveBroadcast<{ text: string }>('message', (data) => {
  console.log('子组件收到消息:', data.text)
})

// 接收通知广播
useReceiveBroadcast('notification', (data) => {
  console.log('子组件收到通知:', data)
})

// 忽略来自当前组件实例的广播
useReceiveBroadcast('notification', (data) => {
  console.log('子组件收到通知（忽略来自当前组件实例的广播）:', data)
}, { excludeSelf: true })

// 只接收一次
useReceiveBroadcast('notification', (data) => {
  console.log('子组件收到通知（只接收一次）:', data)
}, { once: true })

const broadcast = useChildBroadcast()

// 广播事件
const sendMessage = () => {
  broadcast('message', { text: 'Hello from parent!' })
}

const sendNotification = () => {
  broadcast('notification', 'This is a notification')
}
</script>

<template>
  <div class="child-component">
    子组件
    <button class="native" @click="sendMessage">发送消息</button>
    <button class="native" @click="sendNotification">发送通知</button>
  </div>
</template>

<style scoped>
.child-component {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  margin-top: 20px;
}
</style>
