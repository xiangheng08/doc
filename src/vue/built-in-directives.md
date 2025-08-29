# 内置指令

Vue.js 提供了一系列内置指令，用于在模板中添加各种功能和行为。这些指令以 `v-` 前缀开头，用于操作 DOM 元素。

## 指令介绍

Vue 内置指令是一组特殊的 HTML 属性，它们以 `v-` 开头，用于在模板中添加各种功能和行为。这些指令提供了声明式地操作 DOM 的能力，使得开发者可以专注于业务逻辑而不是 DOM 操作。

## 常用内置指令

### v-text
更新元素的文本内容，类似于 `{{}}` 插值语法，但会替换整个元素的内容。

```html
<span v-text="message"></span>
```

### v-html
更新元素的 [innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)。注意：使用时要确保内容是可信的，避免 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。

```html
<div v-html="rawHtml"></div>
```

### v-show
根据表达式的真假值切换元素的显示和隐藏，通过 CSS 的 `display` 属性实现。

```html
<div v-show="isVisible">Hello!</div>
```

### v-if
条件性地渲染元素。当条件为假时，元素不会被渲染到 DOM 中。

```html
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>
```

### v-else
为 `v-if` 或 `v-else-if` 添加"else 块"，必须紧跟在 `v-if` 或 `v-else-if` 之后。

### v-else-if
表示 `v-if` 的"else if 块"，可以链式调用。

### v-for
基于数组或对象渲染元素列表。也可以是一个[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)或数字

```html
<!-- 遍历数组 -->
<li v-for="item in items" :key="item.id"></li>
<li v-for="(item, index) in items" :key="item.id"></li>

<!-- 遍历对象 -->
<div v-for="value in object"></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, name, index) in object"></div>

<!-- 范围值 -->
<div v-for="n in 10"></div>
<div v-for="(n, index) in 10"></div>
<!-- n: 1 - 10; index: 0 - 9 -->
```

使用 `v-for` 需要为每一个yuan素添加一个 [`key`](https://cn.vuejs.org/api/built-in-special-attributes.html#key) 属性，用于帮助 Vue 追踪元素。

```html
<div v-for="item in items" :key="item.id"></div>

<!-- 组件也是一样 -->
 <MyComponent v-for="item in items" :key="item.id" />
```


### v-on
绑定事件监听器，简写为 `@`。

```html
<!-- 完整语法 -->
<button v-on:click="doThis"></button>

<!-- 简写 -->
<button @click="doThis"></button>

<!-- 内联声明 -->
<button @click="doThat('hello', $event)"></button>

<!-- 修饰符 -->
<button @click.stop="doThis"></button>
<input @keyup.enter="submit">

<!-- 使用缩写的动态事件 -->
<button @[event]="doThis"></button>

<!-- 不带表达式地阻止默认事件 -->
<form @submit.prevent></form>

<!-- 链式调用修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>


<!-- 组件 -->
<MyComponent @my-event="handleThis" />

<!-- 内联声明 -->
<MyComponent @my-event="handleThis(123, $event)" />
```

### v-bind
动态绑定一个或多个属性，或组件的 prop，简写为 `:`。

```html
<!-- 完整语法 -->
<img v-bind:src="imageSrc">

<!-- 简写 -->
<img :src="imageSrc">

<!-- class 绑定 -->
<div :class="{ active: isActive }"></div>

<!-- style 绑定 -->
<div :style="{ color: activeColor }"></div>
```

### v-model
在表单控件或组件上创建双向数据绑定。

```html
<input v-model="message" placeholder="edit me">
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<select v-model="selected">
  <option disabled value="">请选择</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

### v-slot
提供具名插槽或需要接收 prop 的插槽，简写为 `#`。

```html
<!-- 具名插槽 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
</base-layout>

<!-- 作用域插槽 -->
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item.text }}</span>
  </template>
</todo-list>

<!-- 简写 -->
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>
</base-layout>
```

### v-pre
跳过这个元素和它的子元素的编译过程。

```html
<span v-pre>{{ 这些内容不会被编译 }}</span>
```

### v-cloak
保持在元素上直到关联实例结束编译，常与 CSS 规则一起使用来隐藏未编译的 Mustache 标签。

```css
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak>
  {{ message }}
</div>
```

### v-once
只渲染元素和组件一次，后续的重新渲染会被当作静态内容跳过。

```html
<span v-once>这个将不会改变: {{msg}}</span>
```

## 最佳实践

### 1. 合理使用 v-show 和 v-if
- `v-show` 适用于频繁切换显示/隐藏的元素（切换成本低）
- `v-if` 适用于条件很少改变的场景（真正条件渲染）

### 2. 使用 key 优化 v-for
在使用 v-for 时始终添加 key，以帮助 Vue 正确跟踪每个元素的身份：

```html
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

### 3. 避免在 v-for 中使用 v-if
这会导致性能问题，应该使用计算属性来过滤数据：

```html
<!-- 推荐 -->
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

### 4. 合理使用修饰符
使用修饰符可以简化事件处理：

```html
<!-- 阻止默认行为和事件冒泡 -->
<button @click.prevent.stop="doSomething">提交</button>

<!-- 只在按下回车键时触发 -->
<input @keyup.enter="submit">
```

## 相关链接

- [Vue 3 指令官方文档](https://cn.vuejs.org/api/built-in-directives)
- [Vue 2 指令官方文档](https://v2.cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)
- [列表渲染](https://cn.vuejs.org/guide/essentials/list.html)
