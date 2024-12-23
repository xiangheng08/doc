<template>
  <CssDemo
    :styles="[
      { flexWrap: 'nowrap' },
      { flexWrap: 'wrap' },
      { flexWrap: 'wrap-reverse' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        <div class="item">item 1</div>
        <div class="item">item 2</div>
        <div class="item">item 3</div>
        <div class="item">item 4</div>
        <div class="item">item 5</div>
        <div class="item">item 6</div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.box {
  padding: 0.75em;
  width: 240px;
  height: 240px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .item {
    padding: 0.75em 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin: 10px;

    &:nth-child(1) {
      background-color: #ac75d7;
    }

    &:nth-child(2) {
      background-color: #8275d7;
    }

    &:nth-child(3) {
      background-color: #d7757b;
    }

    &:nth-child(4) {
      background-color: #75d7b9;
    }

    &:nth-child(5) {
      background-color: #92d775;
    }

    &:nth-child(6) {
      background-color: #759ed7;
    }
  }
}
</style>
