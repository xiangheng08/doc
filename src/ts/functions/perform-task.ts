/**
 * 任务
 */
type Task = (...args: any[]) => any

/**
 * 调度器
 */
type Scheduler = (runChunk: (isGnOn: () => boolean) => void) => void

/**
 * 分步执行任务
 *
 * @param tasks 任务列表
 * @param scheduler 调度器
 *
 * @from teacher yuan
 */
const performTask = (tasks: Task[], scheduler: Scheduler) => {
  let index = 0
  const _run = () => {
    scheduler((isGnOn) => {
      while (index < tasks.length && isGnOn()) {
        tasks[index++]()
      }
      if (index < tasks.length) {
        _run()
      }
    })
  }

  _run()
}

/**
 * 分步执行任务（基于 requestIdleCallback）
 *
 * @param tasks 任务列表
 */
const idlePerformTask = (tasks: Task[]) => {
  performTask(tasks, (runChunk) => {
    requestIdleCallback((idle) => {
      runChunk(() => idle.timeRemaining() > 0)
    })
  })
}

/**
 * 分步执行任务（基于时间调度）
 *
 * @param tasks 任务列表
 * @param interval 时间间隔
 * @param count 每次执行的任务数量
 */
const timedPerformTask = (
  tasks: Task[],
  interval: number,
  count: number,
) => {
  performTask(tasks, (runChunk) => {
    let i = 0
    setTimeout(() => {
      runChunk(() => i++ < count)
    }, interval)
  })
}
