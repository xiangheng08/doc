# transition 过渡

`transition` 过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 `:hover`，`:active` 或者通过 JavaScript 实现的状态变化。

<transition-examples />

```css
div {
	/* property name | duration */
	transition: margin-right 4s;

	/* property name | duration | delay */
	transition: margin-right 4s 1s;

	/* property name | duration | timing function */
	transition: margin-right 4s ease-in-out;

	/* property name | duration | timing function | delay */
	transition: margin-right 4s ease-in-out 1s;

	/* 设置多个属性过渡 */
	transition: margin-right 4s, color 1s;

	/* 设置所有属性的过渡 */
	transition: all 0.5s ease-out;
}
```

`transition` 属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔。

## transition-duration 过渡时间

`transition-duration` 属性以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s，表示不出现过渡动画。

可以指定多个时长，每个时长会被应用到由 [`transition-property`](#transition-property-过渡属性) 指定的对应属性上。如果指定的时长个数小于属性个数，那么时长列表会重复。如果时长列表更长，那么该列表会被裁减。两种情况下，属性列表都保持不变。

```css
div {
	transition-duration: 6s;
	transition-duration: 120ms;
	transition-duration: 1s, 15s;
	transition-duration: 10s, 30s, 230ms;
}
```

## transition-property 过渡属性

`transition-property` 指定应用过渡属性的名称。

```css
div {
	transition-property: none;
	transition-property: all; /* 初始值 */
	transition-property: test_05;
	transition-property: -specific;
	transition-property: sliding-vertically;

	transition-property: test1;
	transition-property: test1, animation4;
	transition-property: all, height, all;
	transition-property: all, -moz-specific, sliding;
}
```

## transition-timing-function 速度曲线

CSS 属性受到 transition effect 的影响，会产生不断变化的中间值，而 `transition-timing-function` 属性用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个 `transition` 变化过程中，变化速度可以不断改变。

这条加速度曲线被 `<timing-function>` 所定义，之后作用到每个 CSS 属性的过渡。

你可以规定多个 timing function，通过使用 `transition-property` 属性，可以根据主列表 (transition property 的列表) 给每个 CSS 属性应用相应的 timing function.如果 timing function 的个数比主列表中数量少，缺少的值被设置为初始值（ease） 。如果 timing function 比主列表要多，timing function 函数列表会被截断至合适的大小。这两种情况下声明的 CSS 属性都是有效的。

```css
div {
	transition-timing-function: ease;
	transition-timing-function: ease-in;
	transition-timing-function: ease-out;
	transition-timing-function: ease-in-out;
	transition-timing-function: linear;
	transition-timing-function: step-start;
	transition-timing-function: step-end;

	/* Function values */
	transition-timing-function: steps(4, jump-end);
	transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);

	/* Steps Function keywords */
	transition-timing-function: steps(4, jump-start);
	transition-timing-function: steps(10, jump-end);
	transition-timing-function: steps(20, jump-none);
	transition-timing-function: steps(5, jump-both);
	transition-timing-function: steps(6, start);
	transition-timing-function: steps(8, end);

	/* Multiple timing functions */
	transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
}
```

取值

-   `ease`: 默认值。慢速开始，然后变快，然后慢速结束。这是一个常用的平滑过渡效果。

-   `linear`: 匀速过渡，速度恒定。

-   `ease-in`: 慢速开始，然后过渡变得更快。

-   `ease-out`: 开始时速度较快，然后减缓过渡。

-   `ease-in-out`: 慢速开始，中间速度快，然后慢速结束。

-   `cubic-bezier(n, n, n, n)`: 自定义贝塞尔曲线，通过四个数字（0 至 1 之间）定义。这允许你更精细地控制过渡的时间函数。

例如，`cubic-bezier(0.25, 0.1, 0.25, 1)` 表示一个自定义的贝塞尔曲线，你可以根据需要调整这些值。

-   `step-start`: 过渡立即开始，并在结束时保持最终状态。

-   `step-end`: 过渡立即结束，保持最终状态。

-   `steps(int, start/end)`: 定义一个步进过渡，其中 int 是步数，start 或 end 表示在步进的起始或结束时设置状态。

例如，`steps(4, end)` 表示将过渡分为四步，状态在每一步的结束时设置。

## transition-delay 过渡延迟

`transition-delay` 属性规定了在过渡效果开始作用之前需要等待的时间。

值以秒（s）或毫秒（ms）为单位，表明动画过渡效果将在何时开始。取值为正时会延迟一段时间来响应过渡效果；取值为负时会导致过渡立即开始。

你可以指定多个延迟时间，每个延迟将会分别作用于你所指定的相符合的 css 属性（`transition-property`）

```css
div {
	transition-delay: 3s;
	transition-delay: 2s, 4ms;
}
```

## transition-behavior 过渡行为

::: warning
这是一项实验性技术，[点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior#browser_compatibility)
:::

```css
div {
	transition-behavior: allow-discrete;
	transition-behavior: normal;
}
```

取值：

-   `allow-discrete`: 过渡将在元素上启动，用于离散的动画属性。
-   `normal`: 过渡将不会在元素上启动，用于离散的动画属性。
