<template>
  <Demo>
    <div class="container">
      <div class="box">width: 160px;</div>
      <div class="box">flex: 1;</div>
    </div>
  </Demo>
</template>

<style scoped>
.container {
  display: flex;
  color: #ebebeb;
}
.box {
  width: 160px;
  background-color: #30997b;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box:nth-child(2) {
  background-color: #da6f2b;
  flex: 1;
}
</style>
