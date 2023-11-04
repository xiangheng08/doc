# class 与 style 绑定

`v-bind` 在用于 `class` 和 `style` 时，`Vue.js` 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

## 绑定 class

`v-bind:class` 指令可以与普通的 class 共存，不会覆盖原本 `class` 属性。

### 对象语法

```html
<div :class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 `class` 存在与否将取决于数据 `isActive` 的真假，当 `isActive` 变化时 `active` 这个 `class` 也会根据 `isActive` 的真假重新渲染。

当有多个 class 需要动态添加时，如果都写在模板内，会非常臃肿，所以绑定的数据对象不必内联定义在模板里：

```html
<div :class="classObject"></div>
```

```js
var vm = new Vue({
	data: {
		classObject: {
			active: true,
			'text-danger': false,
		},
	},
});
```

除了在 `data` 中定义 `classObject`，也可以计算属性中定义 `classObject`

写在模板的好处，`classObject` 如果写在 `data` 中，就不能用表达式了，因为在初始化时值旧确定了

```html
<div :class="{ active: num > 3 }"></div>
```

对于像 `num > 3` 这种简单表达式，可以直接写在模板中，用计算属性就有点大材小用了他

### 数组语法

```html
<div v-bind:class="[class1, class2]"></div>
```

以上示例中会将 `class1` 和 `class2`的值作为 `class` 应用到 DOM 上。

使用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

### 用在组件上

当在一个组件上使用 `class` 或 `v-bind:class` 时，这些 class 将被添加到该组件的根元素上面。不会被覆盖已经存在的 class。

```js
Vue.component('my-component', {
	template: '<p class="foo bar">Hi</p>',
});
```

```html
<my-component class="baz boo"></my-component>
```

或

```html
<my-component :class="{ active: isActive }"></my-component>
```

## 绑定内联样式

### 对象语法

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

对于 `font-size` 这种由多个单词组成的属性，需要使用驼峰，即：`fontSize`

同样也可以在 data 中定义样式对象，然后绑定到 `style` 上

```html
<div :style="styleObject"></div>
```

```js
var vm = new Vue({
	data: {
		styleObject: {
			color: 'red',
			fontSize: '13px',
		},
	},
});
```

计算属性同样适用

### 数组语法

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 自动添加前缀

当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，`Vue.js` 会自动侦测并添加相应的前缀。

### 多重值 <version text="2.3.0+" />

从 2.3.0 起你可以为 style 绑定中属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 `flexbox`，那么就只会渲染 `display: flex`。
