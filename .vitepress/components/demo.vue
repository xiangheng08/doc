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
  box-shadow: var(--vp-shadow-2);

  button {
    all: revert;
  }
}
.dark .demo {
  background-color: var(--vp-c-bg-alt);
}
</style>
