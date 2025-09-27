<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { vLoading, service } from './loading'

const loading = ref(false)

service.appContext = getCurrentInstance()?.appContext

const handleFullScreenLoading = () => {
  const instance = service.create({ fullscreen: true, lock: true })
  setTimeout(() => {
    instance.close()
  }, 5000)
}
</script>

<template>
  <button class="native" @click="loading = true">loading</button>
  <button class="native" @click="loading = false">close loading</button>
  <button class="native" @click="handleFullScreenLoading">
    fullscreen loading
  </button>
  <div
    style="
      width: 100px;
      height: 100px;
      margin-top: 20px;
      background-color: pink;
    "
    v-loading="loading"
  ></div>
</template>
