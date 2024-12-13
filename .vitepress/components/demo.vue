<template>
  <div class="demo">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.demo {
  padding: 22px 24px;
  border-radius: 8px;
  margin: 16px 0;
  transition: background-color 0.5s ease;
  background-color: var(--vp-c-bg-alt);
}
</style>
