# 并行任务队列

`ParallelTaskQueue` 是一个用于管理并行任务的类，支持动态任务添加和流量控制。该类允许你指定最大并行任务数，并在任务队列为空时触发空闲回调函数。

## 功能和用途

- **动态任务添加**：可以通过 `add` 方法向队列中添加新的任务。
- **流量控制**：通过设置最大并行任务数来控制同时执行的任务数量。
- **空闲回调**：当任务队列为空时，可以执行自定义的空闲回调函数。
- **暂停和恢复**：可以通过 `pause` 和 `resume` 方法控制任务队列的处理状态。
- **清空队列**：可以通过 `clear` 方法清空未执行的任务队列。

## 代码

```js
/**
 * 并行任务队列管理器，支持动态任务添加和流量控制
 * @example
 * new ParallelTaskQueue({ parallel: 2 }, (available, add) => {
 *   add(() => console.log('Dynamic task'))
 * })
 */
class ParallelTaskQueue {
	/**
	 * 创建并行任务队列实例
	 * @param {Object} options 配置选项
	 * @param {number} options.parallel 最大并行任务数 (必须大于0)
	 * @param {Function} [onIdleCallback] 空闲回调函数
	 * @throws {TypeError} 当参数不符合要求时抛出
	 */
	constructor(options, onIdleCallback) {
		if (!options || typeof options !== 'object') {
			throw new TypeError('options must be an object');
		}
		if (typeof options.parallel !== 'number' || options.parallel <= 0) {
			throw new Error('Invalid parallel value');
		}

		// 核心配置
		this._parallel = options.parallel;
		this._onIdleCallback = typeof onIdleCallback === 'function' ? onIdleCallback.bind(this) : null;

		// 运行状态
		this._queue = [];
		this._running = 0;
		this._isPaused = false;

		// 初始化后立即检查空闲状态
		this._process();
	}

	/**
	 * 当前正在执行的任务数量（只读）
	 * @returns {number}
	 * @readonly
	 */
	get currentParallel() {
		return this._running;
	}

	/**
	 * 向队列添加任务
	 * @param {Function} task 要执行的任务函数
	 * @throws {TypeError} 当任务不是函数时抛出
	 * @example
	 * queue.add(() => fetch('/api').then(handle))
	 */
	add(task) {
		if (typeof task !== 'function') {
			throw new TypeError('Task must be a function');
		}
		this._queue.push(task);
		this._process();
	}

	/**
	 * 暂停任务队列处理
	 * @desc 不会影响正在执行中的任务，仅暂停新任务的获取
	 */
	pause() {
		this._isPaused = true;
	}

	/**
	 * 恢复任务队列处理
	 * @desc 与 pause() 配合使用，用于恢复被暂停的任务处理
	 */
	resume() {
		if (this._isPaused) {
			this._isPaused = false;
			this._process();
		}
	}

	/**
	 * 清空未执行的任务队列
	 * @desc 不会影响正在执行中的任务，仅清除等待中的任务
	 */
	clear() {
		this._queue = [];
	}

	/**
	 * 内部处理逻辑（私有方法）
	 * @private
	 */
	_process() {
		if (this._isPaused) return;

		// 计算可用并行量
		const available = this._parallel - this._running;
		if (available <= 0) return;

		// 队列为空时触发空闲回调
		if (this._queue.length === 0) {
			if (this._onIdleCallback) {
				this._onIdleCallback(
					available,
					this.add.bind(this) // 绑定好的添加方法
				);
			}
			return;
		}

		// 取出并执行任务
		const tasksToRun = this._queue.splice(0, available);
		this._running += tasksToRun.length;

		tasksToRun.forEach((task) => {
			Promise.resolve()
				.then(() => task())
				.catch((error) => console.error('Task failed:', error))
				.finally(() => {
					this._running--;
					this._process(); // 递归处理后续任务
				});
		});
	}

	/**
	 * 获取队列统计信息
	 * @returns {QueueStats}
	 */
	getStats() {
		return {
			pending: this._queue.length,
			running: this._running,
		};
	}
}
```

## 示例

```js
// 初始化队列（并行数2）
const queue = new ParallelTaskQueue({ parallel: 2 }, (availableSlots, addTask) => {
	console.log(`有 ${availableSlots} 个空闲位置，可以添加任务`);
	// 这里可以动态添加任务
	for (let i = 0; i < availableSlots; i++) {
		addTask(
			() =>
				new Promise((r) =>
					setTimeout(() => {
						console.log('动态添加的任务');
						r();
					}, Math.floor(Math.random() * 300) + 300)
				)
		);
	}
});

// 添加初始任务
queue.add(
	() =>
		new Promise((r) =>
			setTimeout(() => {
				console.log('任务1');
				r();
			}, 1000)
		)
);
queue.add(() => console.log('任务2'));
queue.add(() => console.log('任务3'));
```
