# 条件渲染

## `v-if`

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `truthy` 值的时候被渲染。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

### `v-if` 使用 `<template>` 条件渲染分组

如果有多个元素需要条件渲染，且通过一个数据来控制它们，那么使用 `<template>` 来包裹，会更加方便。

```html
<template v-if="ok">
	<h1>Title</h1>
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
</template>
```

### `v-else`

你可以使用 `v-else` 指令来表示 v-if 的“else 块”：

```html
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

### `v-else-if` <version text="2.1.0+"/>

`v-else-if`，顾名思义，充当` v-if` 的“else-if 块”，可以连续使用：

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

### 用 key 管理可复用的元素

用户在不同的登录方式之间切换的例子：

```html
<template v-if="loginType === 'username'">
	<label>Username</label>
	<input placeholder="Enter your username" />
</template>
<template v-else>
	<label>Email</label>
	<input placeholder="Enter your email address" />
</template>
```

Vue 是通过比较虚拟 dom，来更新页面的，在上面的示例中，不关 `loginType` 是真或假，相生成的虚拟 dom 都是同的，因此 Vue 不会更新真实 dom。也就是说 `input` 中输入的内容不会被清除。

如果不想复用 input 元素，可以添加一个具有唯一值的 key 即可：

```html
<template v-if="loginType === 'username'">
	<label>Username</label>
	<input placeholder="Enter your username" key="username-input" />
</template>
<template v-else>
	<label>Email</label>
	<input placeholder="Enter your email address" key="email-input" />
</template>
```

注意，`<label>` 元素仍然会被复用，因为没有添加 key。

## v-show

`v-show` 指令也是用于根据条件展示元素。用法 `v-if` 大致一样：

```html
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。只是简单地基于 CSS 进行切换。

`v-show` 是通过在元素上添加 `display: none;`，来隐藏元素，不用担心元素 `style` 上的本来的 `display` 属性被覆盖，Vue 会检测原本的 `display` 属性，在显示时恢复到原本的值。


## v-if 对比 v-show

``v-if`` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## v-if 与 v-for 一起使用

::: warning 注意
不推荐同时使用 v-if 和 v-for。
:::

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

如果需要使用，可以按照以下方式使用：

```html
<template v-for="item in 8">
  <span :key="item" v-if="item % 2 === 0">{{ item }}</span>
</template>
```

使用 `<template>` 包裹要循环的元素，并将 `v-for` 放在 `<template>` 上，因为 `<template>` 不会被渲染，所以 `key` 需要放到循环的根元素上，然后在循环的根元素上就可以使用 `v-if` 了。

这种方式不适用与高负载的场景，因为大量条件渲染元素，可能会导致性能问题。建议在直接操作数据，而不是使用 `v-if`。