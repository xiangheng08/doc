<!-- InputSuggestions.vue -->
<template>
  <el-popover
    placement="bottom-start"
    trigger="manual"
    v-model="visible"
    popper-class="input-select-popover"
    transition="el-zoom-in-top"
  >
    <input
      type="text"
      size="18"
      v-model="innerValue"
      slot="reference"
      ref="input"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @click="handleClick"
      @keyup.enter="handleEnter"
      @keydown.up="handleUp"
      @keydown.down="handleDown"
    />
    <div
      class="content"
      :style="{ minWidth: inputWidth + 'px' }"
      ref="content"
      @mousedown.prevent
    >
      <ul class="list">
        <li
          class="item"
          v-for="(item, index) in innerOptions"
          :key="item"
          :class="{ active: index === activeIndex }"
          ref="items"
          @click.prevent.stop="handleItemClick(item)"
        >
          <span>{{ item }}</span>
        </li>
        <li class="item empty" v-if="innerOptions.length === 0">
          <span>暂无数据</span>
        </li>
      </ul>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "InputSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    searchable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      innerValue: this.value,
      activeIndex: -1,
      inputWidth: 0,
      selected: !!this.value,
    };
  },
  computed: {
    innerOptions() {
      if (this.searchable && !this.selected) {
        const regex = new RegExp(this.innerValue, "i");
        return this.options.filter((item) => regex.test(item));
      } else {
        return this.options;
      }
    },
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
    innerValue(val, old) {
      this.$emit("input", val);
      this.activeIndex = -1;
    },
    activeIndex(val) {
      this.$nextTick(() => {
        if (val !== -1 && this.$refs.items[val]) {
          // 判断是否在可视区域
          const top = this.$refs.items[val].offsetTop;
          const bottom =
            this.$refs.items[val].offsetTop +
            this.$refs.items[val].offsetHeight;
          const containerTop = this.$refs.content.scrollTop;
          const containerBottom =
            containerTop + this.$refs.content.offsetHeight;
          if (top < containerTop) {
            this.$refs.content.scrollTop = top;
          } else if (bottom > containerBottom) {
            this.$refs.content.scrollTop =
              bottom - this.$refs.content.offsetHeight;
          }
        }
      });
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    handleFocus() {
      if (this.searchable && this.options.length > 0) {
        this.show();
      }
    },
    handleBlur() {
      this.hide();
    },
    handleInput() {
      if (this.selected) {
        this.visible = true;
      }
      this.selected = false;
    },
    handleClick() {
      this.handleFocus();
    },
    handleEnter() {
      if (this.activeIndex === -1) return;
      const item = this.innerOptions[this.activeIndex];
      if (item === void 0) return;
      this.innerValue = item;
      this.hide();
      this.$nextTick(() => {
        this.selected = true;
      });
    },
    handleUp() {
      if (this.activeIndex === -1 || this.activeIndex === 0) {
        this.activeIndex = this.innerOptions.length - 1;
      } else {
        this.activeIndex--;
      }
    },
    handleDown() {
      if (
        this.activeIndex === -1 ||
        this.activeIndex === this.innerOptions.length - 1
      ) {
        this.activeIndex = 0;
      } else {
        this.activeIndex++;
      }
    },
    handleItemClick(item) {
      this.innerValue = item;
      this.hide();
      this.$nextTick(() => {
        this.selected = true;
      });
    },
  },
  mounted() {
    if (this.$refs.input) {
      this.inputWidth = this.$refs.input.offsetWidth;
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  max-height: 260px;
  overflow-y: auto;
  .list {
    box-sizing: border-box;
    list-style: none;
    padding: 6px 0px;
    margin: 0px;
    .item {
      font-size: 14px;
      position: relative;
      text-overflow: ellipsis;
      color: rgb(96, 98, 102);
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      padding: 0px 20px;
      white-space: nowrap;
      overflow: hidden;
      &.active,
      &:hover {
        background-color: rgb(245, 247, 250);
        color: rgb(64, 158, 255);
      }
      &.empty {
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(144, 147, 153);
      }
    }
  }
}
</style>

<style lang="scss">
.input-select-popover {
  padding: 0px;
}
</style>
