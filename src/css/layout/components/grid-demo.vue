<template>
  <Demo>
    <div class="container">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
  </Demo>
</template>

<style scoped>
.container {
  width: 100%;
  height: 360px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
}

.item:nth-child(1) {
  background-color: #b03531;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
}
.item:nth-child(2) {
  background-color: #33a8a5;
}
.item:nth-child(3) {
  background-color: #30997b;
}
.item:nth-child(4) {
  background-color: #6a478f;
}
.item:nth-child(5) {
  background-color: #da6f2b;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 3;
  grid-column-end: 4;
}
</style>
