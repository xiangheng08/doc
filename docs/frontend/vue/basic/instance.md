# Vue 实例

## MVVM 模型

在了解 Vue 实例之前，应该先了解下 **MVVM** 模型，Vue 就是一个基于 MVVM 的框架。

MVVM 模型是 Model-View-ViewModel 的缩写。

-   **M**：模型(Model)：对应 data 中的数据

-   **V**：视图(View)：模板

-   **VM**：视图模型(ViewModel)：即 Vue 实例对象

MVVM 的核心理念就是：数据驱动视图，视图的变化会导致数据的变化，数据的变化也会导致视图的变化。

-   视图和模型分离

-   视图和模型之间通过 **ViewModel** 进行交互

-   ViewModel 负责把 Model 层的数据同步到 View 层，同时把 View 层的数据同步到 Model 层

-   视图和模型之间的交互是通过 **DOM** 事件监听实现的

![MVVM 模型](/images/frontend/vue/mvvm.webp)

## 创建 Vue 实例

```js
var vm = new Vue({
	// 选项
});
```

因为 Vue 是一个基于 MVVM 的框架，因此经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个选项对象。

## 挂载

在选项对象中可以使用 `el` 属性的方式挂载 Vue 实例到指定元素。

```js
var vm = new Vue({
	el: '#app', // 挂载到 id 为 app 的元素上
});
```

> 注 `el` 属性是一个 css 选择器

除了 `el` 属性外，还可以使用 `$mount()` 方法挂载 Vue 实例。

```js
var vm = new Vue({
	// 选项
});

vm.$mount('#app');
```

## 数据

在选项对象中可以使用 `data` 属性定义的数据，Vue 实例在创建时，`data` 属性中的所有属性都会被代理到 Vue 实例上，因此可以直接通过 Vue 实例访问 `data` 属性中的数据。

```js
var vm = new Vue({
	data: { a: 1 },
});

console.log(vm.a); // 1
```

## 方法

选项对象中 `methods` 属性，是用于定义的方法的地方，`methods` 中方法都会被代理到 Vue 实例上，因此可以直接通过 Vue 实例调用 `methods` 中的方法。

在 `methods` 中的方法，this 都指向 Vue 实例，因此可以直接，通过 this 调用其他的方法，也可以通过 this 访问 data 中的数据。

```js
var vm = new Vue({
	data: { a: 1 },
	methods: {
		fn1() {
			console.log(this.a); // 1
		},
		fn2() {
			this.fn1();
		},
	},
});

vm.fn2();
```

::: warning 注意
不要在 `methods` 中使用箭头函数，箭头函数是没有 this 的！所以 Vue 无法改变的它的 this 指向，因此在箭头函数中 this 无法指向 Vue 实例。
:::

## 生命周期

每个 Vue 实例在被创建时都要经过一系列的过程。例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。而这些过程到 Vue 实例的销毁统称为 Vue 的生命周期。

## 生命周期钩子

同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

所有的生命周期钩子：

-   `beforeCreate`：创建前
-   `created`：创建后
-   `beforeMount`：挂载前
-   `mounted`：挂载后
-   `beforeUpdate`：更新前
-   `updated`：更新后
-   `beforeDestroy`：销毁前
-   `destroyed`：销毁后

代码示例：

```js
var app = new Vue({
	el: '#app',
	beforeCreate() {
		console.log('beforeCreate');
		// 这里不能通过 vm 或组件实例化对象访问 data 中的数据和 methods 的方法
	},
	created() {
		console.log('created');
		// 可以访问到data中的数据、methods中配置的方法。
		// 可以在这里做初始数据的获取
	},
	beforeMount() {
		console.log('beforeMount');
		// 这里生成了虚拟 dom ，但是还没有放到页面上
	},
	mounted() {
		console.log('mounted');
		// 这里 vue 完成了所有初始化操作(虚拟 dom 转为了真实 dom 放在页面上了)
		// 在这里就可以开启定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作。
		// 可以操作 dom 了(尽可能避免操作)
	},
	beforeUpdate() {
		console.log('beforeUpdate');
		// 数据更新 时 执行，此时数据已经更新完成，但是页面还没有更新
	},
	updated() {
		console.log('updated');
		// 数据更新 完 执行，此时数据和页面都已经更新完成
	},
	beforeDestroy() {
		console.log('beforeDestroy');
		// vm 或组件实例化对象销毁之前执行
		// 在这里可以般在此阶段：关闭定时器、取消订阅消息和解绑自定义事件等收尾操作
		// 这里操作数据不会触发数据更新操作，页面的更新
		/*
          注意：销毁只是销毁了 vm 或组件实例化对象，vue 不再管理对应的 dom 节点了，视图也不会随着数据变化进行更新了，
          页面的上的 dom 并没有删除，可以使用 this.$el.parentNode.removeChild(this.$el) 删除对应的 dom 节点
        */
	},
	destroyed() {
		console.log('destroyed');
		// vm 或组件实例化对象销毁之后执行
		// 这里也可以删除对应的 dom 节点
	},
});
```

## 生命周期图示

![生命周期](/images/frontend/vue/lifecycle_v2.webp)
