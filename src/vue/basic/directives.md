# 指令

## v-text

-   **预期**：`string`
-   **详细**：
    更新元素的 `textContent`。如果要更新部分的 `textContent`，需要使用插值语法。
-   **示例**：

    ```html
    <span v-text="msg"></span>
    <!-- 和下面的一样 -->
    <span>{{msg}}</span>
    ```

## v-html

-   **预期**：`string`
-   **详细**：

    更新元素的 `innerHTML`。**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**。如果试图使用 `v-html` 组合模板，可以重新考虑是否通过使用组件来替代。

    在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。只在可信内容上使用 `v-html`，**永不**用在用户提交的内容上。

    在单文件组件里，`scoped` 的样式不会应用在 `v-html` 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 `v-html` 的内容设置带作用域的 CSS，你可以替换为 [CSS Modules](https://vue-loader.vuejs.org/en/features/css-modules.html) 或用一个额外的全局 `<style>` 元素手动设置类似 BEM 的作用域策略。

-   **示例**：

    ```js
    <div v-html='html'></div>
    ```

## v-show

-   **预期**：`any`
-   **用法**：

    根据表达式之真假值，切换元素的 `display` CSS property。

    当条件变化时该指令触发过渡效果。

## v-if

-   **预期**：`any`
-   **用法**：

    根据表达式的值的 [truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>`，将提出它的内容作为条件块。

    当条件变化时该指令触发过渡效果。

    当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。

## v-else

-   **不需要表达式**
-   **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。
-   **用法**：

    为 `v-if` 或者 `v-else-if` 添加“else 块”。

    ```html
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>
    ```

## v-else-if <Badge text="2.1.0+"/>

-   **类型**：`any`
-   **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。
-   **用法**：

    表示 `v-if` 的“else if 块”。可以链式调用。

    ```html
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    ```

## v-for

-   **预期**：`Array | Object | number | string | Iterable (2.6 新增)`
-   **用法**：

    基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 `alias in expression`，为当前遍历的元素提供别名：

    ```html
    <div v-for="item in items">
      {{ item.text }}
    </div>
    ```

    另外也可以为数组索引指定别名 (或者用于对象的键)：

    ```html
    <div v-for="(item, index) in items"></div>
    <div v-for="(val, key) in object"></div>
    <div v-for="(val, name, index) in object"></div>
    ```

    `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：

    ```html
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
    ```

    从 2.6 起，`v-for` 也可以在实现了[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#可迭代协议)的值上使用，包括原生的 `Map` 和 `Set`。不过应该注意的是 Vue 2.x 目前并不支持可响应的 `Map` 和 `Set` 值，所以无法自动探测变更。

    当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。

## v-on

-   **缩写**：`@`
-   **预期**：`Function | Inline Statement | Object`
-   **参数**：`event`
-   **修饰符**：

    -   `.stop` - 调用 `event.stopPropagation()`。
    -   `.prevent` - 调用 `event.preventDefault()`。
    -   `.capture` - 添加事件侦听器时使用 capture 模式。
    -   `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    -   `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
    -   `.native` - 监听组件根元素的原生事件。
    -   `.once` - 只触发一次回调。
    -   `.left` - (2.2.0) 只当点击鼠标左键时触发。
    -   `.right` - (2.2.0) 只当点击鼠标右键时触发。
    -   `.middle` - (2.2.0) 只当点击鼠标中键时触发。
    -   `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

-   **用法**：

    绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

    用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。

    在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` property：`v-on:click="handle('ok', $event)"`。

    从 `2.4.0` 开始，`v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

-   **示例**：

    ```html
    <!-- 方法处理器 -->
    <button v-on:click="doThis"></button>

    <!-- 动态事件 (2.6.0+) -->
    <button v-on:[event]="doThis"></button>

    <!-- 内联语句 -->
    <button v-on:click="doThat('hello', $event)"></button>

    <!-- 缩写 -->
    <button @click="doThis"></button>

    <!-- 动态事件缩写 (2.6.0+) -->
    <button @[event]="doThis"></button>

    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>

    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>

    <!-- 阻止默认行为，没有表达式 -->
    <form @submit.prevent></form>

    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>

    <!-- 键修饰符，键别名 -->
    <input @keyup.enter="onEnter" />

    <!-- 键修饰符，键代码 -->
    <input @keyup.13="onEnter" />

    <!-- 点击回调只会触发一次 -->
    <button v-on:click.once="doThis"></button>

    <!-- 对象语法 (2.4.0+) -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
    ```

    在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

    ```html
    <my-component @my-event="handleThis"></my-component>

    <!-- 内联语句 -->
    <my-component @my-event="handleThis(123, $event)"></my-component>

    <!-- 组件中的原生事件 -->
    <my-component @click.native="onClick"></my-component>
    ```

## v-bind

-   **缩写**：`:`
-   **预期**：`any (with argument) | Object (without argument)`
-   **参数**：`attrOrProp (optional)`
-   **修饰符**：

    -   `.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。([差别在哪里？](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html#answer-6004028))
    -   `.camel` - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
    -   `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。
        ::: danger 注意
        注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 `v-bind:title.sync="doc.title + '!'"` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。
        :::
        
-   **用法**：

    动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

    在绑定 `class` 或 `style` attribute 时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

    在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

    没有参数时，可以绑定到一个包含键值对的对象。注意此时 `class` 和 `style` 绑定不支持数组和对象。

-   **示例**：

    ```html
    <!-- 绑定一个 attribute -->
    <img v-bind:src="imageSrc" />

    <!-- 动态 attribute 名 (2.6.0+) -->
    <button v-bind:[key]="value"></button>

    <!-- 缩写 -->
    <img :src="imageSrc" />

    <!-- 动态 attribute 名缩写 (2.6.0+) -->
    <button :[key]="value"></button>

    <!-- 内联字符串拼接 -->
    <img :src="'/path/to/images/' + fileName" />

    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]"></div>

    <!-- style 绑定 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <!-- 绑定一个全是 attribute 的对象 -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    <!-- 通过 prop 修饰符绑定 DOM attribute -->
    <div v-bind:text-content.prop="text"></div>

    <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
    <my-component :prop="someThing"></my-component>

    <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
    <child-component v-bind="$props"></child-component>

    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
    ```

    `.camel` 修饰符允许在使用 DOM 模板时将 `v-bind` property 名称驼峰化，例如 SVG 的 `viewBox` property：

    ```html
    <svg :view-box.camel="viewBox"></svg>
    ```

    在使用字符串模板或通过 `vue-loader`/`vueify` 编译时，无需使用 `.camel`。

## v-model

-   **预期**：随表单控件类型不同而不同。
-   **限制**：

    -   `<input>`
    -   `<select>`
    -   `<textarea>`
    -   components

-   **修饰符**：

    -   `.lazy` - 取代 `input` 监听 `change` 事件
    -   `.number` - 输入字符串转为有效的数字
    -   `.trim` - 输入首尾空格过滤

-   **用法**：

    在表单控件或者组件上创建双向绑定。细节请看下面的教程链接。

## v-slot

-   **缩写**：`#`
-   **预期**：可放置在函数参数位置的 JavaScript 表达式 (在支持的环境下可使用解构)。可选，即只需要在为插槽传入 prop 的时候使用。
-   **参数**：插槽名 (可选，默认值是 `default`)
-   **限用于**

    -   `<template>`
    -   组件 (对于一个单独的带 prop 的默认插槽)

-   **用法**：

    提供具名插槽或需要接收 prop 的插槽。

-   **示例**：

    ```html
    <!-- 具名插槽 -->
    <base-layout>
    	<template v-slot:header> Header content </template>

    	Default slot content

    	<template v-slot:footer> Footer content </template>
    </base-layout>

    <!-- 接收 prop 的具名插槽 -->
    <infinite-scroll>
    	<template v-slot:item="slotProps">
    		<div class="item">{{ slotProps.item.text }}</div>
    	</template>
    </infinite-scroll>

    <!-- 接收 prop 的默认插槽，使用了解构 -->
    <mouse-position v-slot="{ x, y }"> Mouse position: {{ x }}, {{ y }} </mouse-position>
    ```

    更多细节请查阅以下链接。

## v-pre

-   **不需要表达式**
-   **用法**：

    跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

-   **示例**：

    ```html
    <span v-pre>{{ this will not be compiled }}</span>
    ```

## v-cloak

-   **不需要表达式**
-   **用法**：

    这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

-   **示例**：

    ```css
    [v-cloak] {
    	display: none;
    }
    ```

    ```html
    <div v-cloak>{{ message }}</div>
    ```

    不会显示，直到编译结束。

## v-once

-   **不需要表达式**
-   **详细**：

    只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

    ```html
    <!-- 单个元素 -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- 有子元素 -->
    <div v-once>
    	<h1>comment</h1>
    	<p>{{msg}}</p>
    </div>
    <!-- 组件 -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` 指令-->
    <ul>
    	<li v-for="i in list" v-once>{{i}}</li>
    </ul>
    ```
