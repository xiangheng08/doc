<template>
  <CssDemo
    :styles="[
      { alignItems: 'flex-start' },
      { alignItems: 'flex-end' },
      { alignItems: 'center' },
      { alignItems: 'baseline' },
      { alignItems: 'stretch' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.box {
  width: 280px;
  height: 240px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    &:nth-child(1) {
      background-color: #ac75d7;
      line-height: 5rem;
      font-size: 3rem;
    }
    &:nth-child(2) {
      background-color: #8275d7;
      line-height: 7rem;
    }
    &:nth-child(3) {
      background-color: #d7757b;
      line-height: 3rem;
      font-size: 2rem;
    }
    &:nth-child(4) {
      background-color: #75d79a;
      line-height: 5rem;
    }
  }
}
</style>
