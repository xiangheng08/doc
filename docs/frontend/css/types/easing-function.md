# \<easing-function\>

`<easing-function>` 表示描述某数值变化速率的数学函数。

这种两值之间的过渡可应用于不同情境，可用于描述属性值在动画中变化的快慢程度，由此得以在动画的持续过程中改变其速度。你可为 CSS 过渡和动画指定缓动函数。

```css
/* 线性函数和关键字 */
/* linear(<point-list>) */
linear(1, -0.5, 0)
linear

/* 三次贝塞尔函数和关键字 */
/* cubic-bezier(<x1>, <y1>, <x2>, <y2>) */
cubic-bezier(0.42, 0.0, 1.0, 1.0)
ease
ease-in
ease-out
ease-in-out

/* 阶跃函数和关键字 */
/* steps(<number-of-steps>, <direction>) */
steps(4, end)
step-start
step-end
```

- `linear`: 表示线性插值。此关键字表示缓动函数 linear(0, 1)。
  ![](/images/frontend/css/easing-function/linear.svg)