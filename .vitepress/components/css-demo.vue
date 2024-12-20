<script setup lang="ts">
import { computed, CSSProperties, PropType, ref } from 'vue'

const props = defineProps({
  height: {
    type: String,
    default: '280px',
  },
  styles: {
    type: Array as PropType<CSSProperties[]>,
    default(): CSSProperties[] {
      return []
    },
  },
  justifyStart: {
    type: Boolean,
    default: false,
  },
  property: {
    type: String,
    default: '',
  },
})

const active = ref(0)
const activeStyle = computed(() => props.styles[active.value])

const camelToKebabCase = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
</script>

<template>
  <Demo
    divider-line
    :title="'CSS Demo' + (property ? `: ${property}` : '')"
    class="css-demo"
  >
    <div class="css-demo-content-wrap" :style="{ height }">
      <div
        class="css-demo-content"
        :class="{ 'justify-start': justifyStart }"
      >
        <slot :activeStyle="activeStyle"></slot>
      </div>
    </div>
    <div class="style-values" :style="{ height }">
      <div class="value-list-wrap">
        <div class="value-list">
          <div
            class="value-item"
            v-for="(style, index) in styles"
            :key="index"
            @click="active = index"
            :class="{ selected: active === index }"
          >
            <div
              class="code-line"
              v-for="(value, property) in style"
              :key="property"
            >
              <span class="property">{{
                camelToKebabCase(property)
              }}</span>
              <span>: </span>
              <span class="value">{{ value }}</span>
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
    padding: 14px 0;
    display: flex;
    justify-content: space-between;
  }
  .style-values {
    min-height: 280px;
    width: 50%;
    border-left: 1px solid var(--vp-c-divider);
  }
  .value-list-wrap {
    padding: 0 14px;
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
    overflow: auto hidden;
    &:hover {
      outline: solid 1px var(--vp-c-brand-2);
    }
    &.selected {
      outline: solid 1px var(--vp-c-brand);
    }
  }
  .code-line {
    font-family: var(--vp-font-family-mono);
    white-space: nowrap;
    width: fit-content;
    .property {
      color: var(--c-property);
    }
    .value {
      color: var(--c-value);
    }
  }
  .css-demo-content-wrap {
    flex: 1;
    overflow: auto;
  }
  .css-demo-content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100%;
    &.justify-start {
      justify-content: flex-start;
    }
  }

  --c-property: #005cc5;
  --c-value: #005cc5;
}

.dark .css-demo {
  --c-property: #79b8ff;
  --c-value: #79b8ff;
}
</style>
