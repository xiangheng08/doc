# animation 动画

## @keyframes 关键帧

`@keyframes` 用于创建关键帧动画序列，它允许控制 CSS 动画序列中的中间步骤。和 转换 `transition` 相比，关键帧 `keyframes` 可以控制动画序列的中间步骤。

```css
@keyframes slidein {
	from {
		transform: translateX(0%);
	}

	to {
		transform: translateX(100%);
	}
}
```

除了 from 和 to，你还可以使用百分比指定多个关键帧，以更精细地控制动画效果。其中 `0% = from` 和 `100% = to`

```css
@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
```

JavaScript 可以通过 CSS 对象模型的 [`CSSKeyframesRule` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule) 接口来访问 `@keyframes`。

如果在关键帧的样式中使用了不能用作动画的属性，那么这些属性会被忽略掉，支持动画的属性仍然是有效的，不受波及。

### 重复定义

如果多个关键帧使用同一个名称，以最后一次定义的为准。 `@keyframes` 不存在层叠样式 (cascade) 的情况，所以动画在一个时刻（阶段）只会使用一个的关键帧的数据。

如果一个 `@keyframes` 内的关键帧的百分比存在重复的情况，则 `@keyframes` 规则中该百分比的所有关键帧都将用于该帧。如果多个关键帧指定了相同的百分比值，则 `@keyframes` 规则内是可以使用层叠样式的。

### 属性个数不定

如果一个关键帧中没有出现其他关键帧中的属性，那么这个属性将使用插值（不能使用插值的属性除外，这些属性会被忽略掉）。

```css
@keyframes identifier {
	0% {
		top: 0;
		left: 0;
	}
	30% {
		top: 50px;
	}
	68%,
	72% {
		left: 50px;
	}
	100% {
		top: 100px;
		left: 100%;
	}
}
```

以上例子中，`top` 属性分别出现在关键帧 `0%`、`30%` 和 `100%` 的中，而 `left` 属性分别出现在关键帧 `0%`、`68%`、`72%` 和 `100%` 中。

### 同一关键帧中的相同属性被重复定义

如果某一个关键帧出现了重复的定义，且重复的关键帧中的 CSS 属性值不同，则以最后一次定义的属性为准。

```css
@keyframes identifier {
	0% {
		top: 0;
	}
	50% {
		top: 30px;
		left: 20px;
	}
	50% {
		top: 10px;
	}
	100% {
		top: 0;
	}
}
```

以上的例子中，`50%` 关键帧中分别最后设置的属性 `top: 10px;` 和 `left: 20px;` 是有效的，但是其他的属性会被忽略。

### 关键帧中的 !important

关键帧中出现的 `!important` 将会被忽略。

```css
@keyframes important {
	from {
		margin-top: 50px;
	}
	50% {
		margin-top: 150px !important; /* 忽略 */
	}
	to {
		margin-top: 100px;
	}
}
```

## animation 动画

`animation` 属性是一个简写属性，可以同时设置多个动画属性，多个动画使用逗号（`,`）分隔。

```css
div {
	/* @keyframes duration | easing-function | delay |
       iteration-count | direction | fill-mode | play-state | name */
	animation: 3s ease-in 1s 2 reverse both paused slidein;

	/* @keyframes duration | easing-function | delay | name */
	animation: 3s linear 1s slidein;

	/* 多个动画 */
	animation: 3s linear slidein, 3s ease-out 5s slideout;
}
```

### animation-name 动画名称

`animation-name` 属性指定一个或多个 `@keyframes` 的名称，这些名称描述了要应用于元素的动画。多个 `@keyframes` 以逗号分隔的名称列表的形式指定。如果指定的名称不匹配任何 `@keyframes` 则不会对任何属性进行动画处理。

```css
div {
	/* 单个动画 */
	animation-name: none;
	animation-name: test_05;
	animation-name: -specific;
	animation-name: sliding-vertically;

	/* 多个动画 */
	animation-name: test1, animation4;
	animation-name: none, -moz-specific, sliding;
}
```

### animation-duration 动画时间

`animation-duration` 属性用于设置动画完成一个动画周期所需的时间。

```css
div {
	/* 单个动画 */
	animation-duration: 6s;
	animation-duration: 120ms;

	/* 多个动画 */
	animation-duration: 1.64s, 15.22s;
	animation-duration: 10s, 35s, 230ms;
}
```

### animation-timing-function 时间曲线

`animation-timing-function` 属性用于设置动画在每个周期的持续时间内得动画时间曲线。

```css
div {
	/* 关键字值 */
	animation-timing-function: ease;
	animation-timing-function: ease-in;
	animation-timing-function: ease-out;
	animation-timing-function: ease-in-out;
	animation-timing-function: linear;
	animation-timing-function: step-start;
	animation-timing-function: step-end;

	/* 函数值 */
	animation-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
	animation-timing-function: steps(4, end);

	/* Steps 函数关键字 */
	animation-timing-function: steps(4, jump-start);
	animation-timing-function: steps(10, jump-end);
	animation-timing-function: steps(20, jump-none);
	animation-timing-function: steps(5, jump-both);
	animation-timing-function: steps(6, start);
	animation-timing-function: steps(8, end);

	/* 多个动画 */
	animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
}
```

### animation-delay 动画延时

`animation-delay` 属性用于指定从应用动画到元素开始执行动画之前等待的时间量。动画可以稍后开始、立即从开头开始或立即开始并在动画中途播放。

```css
div {
	/* 单个动画 */
	animation-delay: 3s;
	animation-delay: 0s;
	animation-delay: -1500ms;

	/* 多个动画 */
	animation-delay: 2.1s, 480ms;
}
```

### animation-iteration-count 重复次数

`animation-iteration-count` 属性用于设置动画序列在停止前应播放的次数。

```css
div {
	/* 关键字值 */
	animation-iteration-count: infinite; /* 无限循环播放动画 */

	/* 数字值 */
	animation-iteration-count: 3; /* 3 次 */
	animation-iteration-count: 2.4; /* 2.4 次 */

	/* 多个值 */
	animation-iteration-count: 2, 0, infinite;
}
```

### animation-direction 动画方向

`animation-direction` 属性用于设置动画是应正向播放、反向播放还是在正向和反向之间交替播放。

```css
div {
	/* 单个动画 */
	animation-direction: normal;
	animation-direction: reverse;
	animation-direction: alternate;
	animation-direction: alternate-reverse;

	/* 多个动画 */
	animation-direction: normal, reverse;
	animation-direction: alternate, reverse, normal;
}
```

取值

-   `normal`: 动画在每个循环中正向播放。换句话说，每次动画循环时，动画将重置为起始状态并重新开始。这是默认值。

-   `reverse`: 动画在每个循环中反向播放。换句话说，每次动画循环时，动画将重置为结束状态并重新开始。动画步骤将反向执行，并且时间函数也将被反转。例如，ease-in 时间函数变为 ease-out。

-   `alternate`: 动画在每个循环中正反交替播放，第一次迭代是正向播放。确定循环是奇数还是偶数的计数从 1 开始。

-   `alternate-reverse`: 动画在每个循环中正反交替播放，第一次迭代是反向播放。确定循环是奇数还是偶数的计数从 1 开始。

### animation-fill-mode 动画填充模式

`animation-fill-mode` 属性用于设置 CSS 动画在执行之前和之后如何将样式应用于其目标。

```css
div {
	animation-fill-mode: none;
	animation-fill-mode: forwards;
	animation-fill-mode: backwards;
	animation-fill-mode: both;
}
```

-   `none`: 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。

-   `forwards`: 目标将保留由执行期间遇到的最后一个关键帧 (en-US)计算值。

-   `backwards`: 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在 animation-delay 期间保留此值。

-   `both`: 动画将遵循 forwards 和 backwards 的规则，从而在两个方向上扩展动画属性。

### animation-play-state 动画播放状态

`animation-play-state` 属性用于设置动画是运行还是暂停。

```css
div {
	/* 单个动画 */
	animation-play-state: running; /* 运行 */
	animation-play-state: paused; /* 停止 */

	/* 多个动画 */
	animation-play-state: paused, running, running;
}
```

### animation-composition 动画组合方式

### animation-range

### animation-range-end

### animation-range-start

### animation-timeline
