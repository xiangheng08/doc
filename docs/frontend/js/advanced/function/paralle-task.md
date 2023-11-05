# 并发执行任务

```js
/**
 * 并发执行任务
 * @param {Function[]} tasks
 * @param {Number} paralleCount
 */
function paralleTask(tasks, paralleCount = 2) {
	return new Promise((resolve) => {
		if (tasks.length === 0) {
			resolve();
			return;
		}

		let nextIndex = 0; // 下一个任务索引
		let finishCount = 0; // 完成任务数量

		function _run() {
			const task = tasks[nextIndex++];

			task().then(() => {
				finishCount++;
				if (nextIndex < tasks.length) {
					_run();
				} else if (finishCount === tasks.length) {
					resolve();
				}
			});
		}

		// 初始运行任务
		for (let i = 0; i < paralleCount && i < tasks.length; i++) {
			_run();
		}
	});
}
```

使用示例：

```js
function task(index) {
	return new Promise((resolve) => {
		const ms = Math.random() * 900 + 100;
		setTimeout(() => {
			console.log(`任务 ${index + 1} 完成`);
			resolve();
		}, ms);
	});
}

const tasks = new Array(100).fill(0).map((_, index) => task.bind(null, index));

paralleTask(tasks, 4);
```
