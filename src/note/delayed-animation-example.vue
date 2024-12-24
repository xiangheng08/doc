<template>
  <demo>
    <div class="container">
      <div class="animation-box flex-center">
        <div class="box flex-center" ref="boxRef">BOX</div>
      </div>
      <div class="range-box flex-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value="0.5"
          ref="rangeRef"
          @input="setDelay"
        />
      </div>
    </div>
  </demo>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const boxRef = ref<HTMLDivElement>()
const rangeRef = ref<HTMLInputElement>()

const setDelay = () => {
  boxRef.value?.style.setProperty('--delay', `-${rangeRef.value?.value}s`)
}

onMounted(setDelay)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.animation-box {
  margin-top: 20px;
  height: 100px;
}
.box {
  --delay: 0;
  background-color: plum;
  color: #fff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  animation: move linear forwards 1s paused;
  animation-delay: var(--delay);
}
.range-box {
  margin-top: 1rem;
}

@keyframes move {
  0% {
    transform: translate(-100px, 0) rotate(0deg) scale(1);
  }
  50% {
    transform: translate(0px, -20px) rotate(180deg) scale(1.5);
  }
  100% {
    transform: translate(100px, 0) rotate(360deg) scale(1);
  }
}
</style>
