# 列表渲染

## v-for 基于数组渲染

`v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。

`key` 属性用于给每个元素做一个唯一标识，以保证渲染的安全、高效。当数据变化时，Vue 会比较 `key` 属性的值，相同则不会操作 dom，如果不同，才会重新渲染该元素。

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```