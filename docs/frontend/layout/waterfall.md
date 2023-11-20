# 瀑布流布局

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>瀑布流布局</title>
		<style>
			* {
				margin: 0;
				padding: 0;
			}
			.container {
				position: relative;
				width: calc(100% - 160px);
				max-width: 1200px;
				min-width: 500px;
				margin: 20px auto;
				border: 1px solid #ccc;
				border-radius: 6px;
			}

			.container > div {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32px;
				font-weight: 700;
				color: #fff;
				transition: 0.3s;
				border-radius: 4px;
			}
		</style>
	</head>
	<body>
		<div class="container"></div>
		<script>
			const container = document.querySelector('.container');
			const columnWidth = 200; // 列宽
			const sideSpacing = true; // 两侧是否需要间距
			const minSpace = 10; // 最小间距

			// 随机颜色
			function randomColor() {
				return `hsl(${Math.floor(Math.random() * 360)}, 55%, 65%)`;
			}

			/**
			 * 添加元素
			 * @param {ELement} target 目标元素
			 * @param {numner} num 数量
			 */
			function addElement(target, num) {
				for (let i = 0; i < num; i++) {
					const el = document.createElement('div');
					el.style.width = columnWidth + 'px';
					el.style.height = Math.floor(100 + Math.random() * 200) + 'px';
					el.style.backgroundColor = randomColor();
					el.innerText = i + 1;
					target.appendChild(el);
				}
			}

			/**
			 * 计算列数量
			 * @param {number|Element} target 目标元素/宽度
			 * @param {number} columnWidth 列宽
			 * @param {boolean} sideSpacing 两侧是否需要间距
			 * @param {number} minSpace 最小间距
			 */
			function cal(target, columnWidth, sideSpacing = false, minSpace = 0) {
				const result = {
					space: 0,
					columns: 1,
				};

				if (typeof target !== 'number') {
					target = target.clientWidth;
				}

				result.columns = Math.floor(target / columnWidth); // 列数
				let remainder = target - columnWidth * result.columns; // 容器剩余宽度
				let spaceCount = sideSpacing ? result.columns + 1 : result.columns - 1; // 间距数量
				result.space = remainder / spaceCount; // 计算间距

				// 计算的间距小于最小间距时，重新计算
				if (result.space < minSpace && result.columns > 1) {
					result.columns -= 1;

					remainder = target - columnWidth * result.columns;
					spaceCount = sideSpacing ? result.columns + 1 : result.columns - 1;
					result.space = remainder / spaceCount;
				}

				return result;
			}

			/**
			 * 设置元素位置
			 * @param {Element} container 容器
			 * @param {number} columnWidth 列宽
			 * @param {boolean} sideSpacing 两侧是否需要间距
			 */
			function setPosition(container, columnWidth, sideSpacing = false) {
				const columnInfo = cal(container, columnWidth, sideSpacing, minSpace); // 列数信息
				const children = container.children;
				const nextTops = new Array(columnInfo.columns); // 每一列的 top 值
				nextTops.fill(sideSpacing ? columnInfo.space : 0); // 填充初始值

				for (let i = 0; i < children.length; i++) {
					const element = children[i];
					const min = Math.min.apply(null, nextTops); // 找到最小高度（使用 apply 兼容 es5）
					const minIndex = nextTops.indexOf(min); // 最小高度的索引
					const temp = sideSpacing ? 1 : 0;

					// 设置元素位置
					element.style.top = min + 'px';
					element.style.left = columnWidth * minIndex + columnInfo.space * (minIndex + temp) + 'px';

					// 更新 nextTops
					nextTops[minIndex] += element.clientHeight + columnInfo.space;
				}

				// 更新容器高度
				let max = Math.max.apply(null, nextTops);
				if (!sideSpacing) max -= columnInfo.space;
				container.style.height = max + 'px';
			}

			addElement(container, 100);

			setPosition(container, columnWidth, sideSpacing);

			let timer;

			window.addEventListener('resize', () => {
				clearTimeout(timer);
				timer = setTimeout(() => setPosition(container, columnWidth, sideSpacing), 500);
			});

			// 计算位置出现滚动条时，重新计算位置
			if (document.body.scrollHeight > window.innerHeight) {
				setPosition(container, columnWidth, sideSpacing);
			}
		</script>
	</body>
</html>
```

## 效果

<mylink href="/examples/frontend/layout/waterfall.html">效果</mylink>

## 实现原理

首先，我们要知道瀑布流布局的特点：

1. 每个元素的宽度是固定的
2. 每个元素的高度是动态的

既然宽度是固定的，那么列数的就可以确定下来

列数计算公式：容器的宽度 / 元素的宽度在向下取整

间距计算公式：容器的宽度 - 元素的宽度 * 列数 + 1（使用 “列数 - 1” 就是没有两边的间距）

在代码中使用了 `cal` 函数来计算列数和间距。

知道列数了，我们就可以定义一个数组，数组的长度就是列数，数组中的元素就是每列的高度，开始填充 0 作为初始值。

然后循环容器的子元素，获取每个元素的高度，然后找到数组中的最小值，作为当前元素的 y 轴，然后把数组中对应位置的值加上这个元素的高度和间距。

更新容器的样式，设置高度为数组中的最大值。

最后给添加 `resize` 事件，当大小发生变化时，重新计算位置，记得做一下防抖。
