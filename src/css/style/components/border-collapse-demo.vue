<template>
  <CssDemo
    :styles="[
      { borderCollapse: 'collapse' },
      { borderCollapse: 'separate' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <table :style="activeStyle">
        <tbody>
          <tr>
            <td>Cell 1.1</td>
            <td>Cell 1.2</td>
          </tr>
          <tr>
            <td>Cell 2.1</td>
            <td>Cell 2.2</td>
          </tr>
          <tr>
            <td>Cell 3.1</td>
            <td>Cell 3.2</td>
          </tr>
        </tbody>
      </table>
    </template>
  </CssDemo>
</template>

<style scoped>
table {
  width: 15rem;
  table-layout: fixed;
}
td {
  border: 5px solid;
  border-color: #dc143c #1e90ff orange #32cd32;
  padding: 0.75rem;
}
</style>
