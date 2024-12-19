<script setup lang="ts">
defineProps({
  height: {
    type: String,
    default: '280px',
  },
})
</script>

<template>
  <Demo divider-line title="CSS Demo" class="css-demo">
    <div class="css-demo-content">
      <slot></slot>
    </div>
    <div class="style-values" :style="{ height }">
      <div class="value-list-wrap">
        <div class="value-list">
          <div class="value-item" v-for="item in 20">
            <div class="code-line">
              <span class="property">color</span>
              <span>:&nbsp;</span>
              <span class="value">red</span>
              <span>;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Demo>
</template>

<style lang="scss" scoped>
.css-demo {
  :deep(.content) {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .style-values {
    min-height: 280px;
    width: 50%;
    border-left: 1px solid var(--vp-c-divider);
  }
  .value-list-wrap {
    padding: 14px 14px;
    overflow: hidden auto;
    height: 100%;
  }
  .value-item {
    margin: 10px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    outline: solid 1px var(--vp-c-divider);
    padding: 8px 14px;
    &:hover {
      outline: solid 1px var(--vp-c-brand-2);
    }
    &.selected {
      outline: solid 1px var(--vp-c-brand);
    }
  }
  .code-line {
    display: block;
    .property {
      color: var(--c-property);
    }
    .value {
      color: var(--c-value);
    }
  }
  .css-demo-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  --c-property: #005cc5;
  --c-value: #005cc5;
}

.dark .css-demo {
  --c-property: #79b8ff;
  --c-value: #79b8ff;
}
</style>
