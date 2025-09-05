# 广播

## 介绍

`useBroadcast` 和 `useReceiveBroadcast` 是一对 Vue 组合式 API Hook，用于向所有子组件和后代组件广播。基于 `provide/inject` 实现。

- `useBroadcast` 返回一个函数，该函数用于向所有子组件和后代组件广播事件。
- `useReceiveBroadcast` 用于监听特定广播事件。

## 代码

<<< ./broadcast.ts

## 示例

父组件或祖先组件：
```vue
<script setup lang="ts">
import { useBroadcast } from './broadcast';

const broadcast = useBroadcast();

// 广播事件
const sendMessage = () => {
  broadcast('message', { text: 'Hello from parent!' });
};

const sendNotification = () => {
  broadcast('notification', 'This is a notification');
};
</script>

<template>
  <div>
    <button @click="sendMessage">发送消息</button>
    <button @click="sendNotification">发送通知</button>
    <ChildComponent />
  </div>
</template>
```

子组件：
```vue
<script setup lang="ts">
import { useReceiveBroadcast } from './broadcast';

// 接收消息广播
useReceiveBroadcast('message', (data) => {
  console.log('收到消息:', data.text);
});

// 接收通知广播
useReceiveBroadcast('notification', (data) => {
  console.log('收到通知:', data);
});
</script>

<template>
  <div>子组件</div>
</template>
```
