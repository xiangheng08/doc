<template>
  <CssDemo
    :styles="[
      { flexDirection: 'row' },
      { flexDirection: 'row-reverse' },
      { flexDirection: 'column' },
      { flexDirection: 'column-reverse' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
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
  .item {
    width: 3rem;
    height: 3rem;
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
  }
}
</style>
