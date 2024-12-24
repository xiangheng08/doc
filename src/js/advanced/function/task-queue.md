# 任务队列

```js
class TaskQueue {
	constructor(interval = 10) {
		this.queue = [];
		this.interval = interval;
		this.running = false;
	}

	addTask(task) {
		this.queue.push(task);
		if (!this.running) {
			this._runTasks();
		}
	}

	async _runTasks() {
		if (this.queue.length > 0) {
			this.running = true;
			const task = this.queue.shift();
			await task();
			setTimeout(() => {
				this._runTasks();
			}, this.interval);
		} else {
			this.running = false;
		}
	}
}
```

示例用法:

```js
const taskQueue = new TaskQueue(500); // 设置时间间隔为500毫秒

function createTask(name) {
	return () => {
		console.log(`Task ${name} is running`);
	};
}

for (let i = 0; i < 100; i++) {
	taskQueue.addTask(createTask(i + 1));
}

setTimeout(() => {
	for (let i = 100; i < 200; i++) {
		taskQueue.addTask(createTask(i + 1));
	}
}, 3000);
```
