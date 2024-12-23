<template>
  <CssDemo
    :styles="[
      { alignSelf: 'auto' },
      { alignSelf: 'flex-start' },
      { alignSelf: 'flex-end' },
      { alignSelf: 'center' },
      { alignSelf: 'baseline' },
      { alignSelf: 'stretch' },
      { alignSelf: 'stretch', height: '4rem' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box">
        <div class="item">1</div>
        <div class="item" :style="activeStyle">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.box {
  width: 280px;
  height: 160px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: #ac75d7;
    &:nth-child(2) {
      background-color: #d7757b;
      height: unset;
      line-height: 3rem;
    }
  }
}
</style>
