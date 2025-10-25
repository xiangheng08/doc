import { CanceledError, Canceler } from 'axios'
import { RequestConfig, RequestQueueConfig } from './types'

export class RequestQueue {
  static readonly DEFAULT_PRIORITY = 5
  static readonly DEFAULT_MAX_CONCURRENT = 5

  private readonly pending: TaskContext[] = []
  private readonly concurrent: TaskContext[] = []
  private readonly maxConcurrent: number

  constructor(config: RequestQueueConfig = {}) {
    this.maxConcurrent =
      config.maxConcurrent ?? RequestQueue.DEFAULT_MAX_CONCURRENT
  }

  private process() {
    if (this.pending.length === 0) return

    // 计算可用并行量
    const available = this.maxConcurrent - this.currentConcurrent
    if (available <= 0) return

    // 取出需要并行执行任务
    const tasksToRun = this.pending.splice(0, available)

    for (const context of tasksToRun) {
      this.concurrent.push(context)
      context.isRunning = true
      context
        .task()
        .then(context.resolve)
        .catch(context.reject)
        .finally(() => {
          context.isRunning = false
          // 移除已结束任务
          this.concurrent.splice(this.concurrent.indexOf(context), 1)
          // 递归处理后续任务
          this.process()
        })
    }
  }

  /**
   * 查找任务
   *
   * @param id 任务id
   */
  find(id: string): TaskContext | undefined {
    for (const context of this.pending) {
      if (context.id === id) {
        return context
      }
    }
    for (const context of this.concurrent) {
      if (context.id === id) {
        return context
      }
    }
  }

  /**
   * 当前并发数
   */
  get currentConcurrent(): number {
    return this.concurrent.length
  }

  /**
   * 添加任务
   *
   * @param id 任务id
   * @param priority 任务优先级
   * @param task 任务
   * @param cancel 任务取消函数
   */
  add<T = any>(
    id: string,
    config: RequestConfig,
    task: () => Promise<T>,
    cancel: Canceler,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const context = new TaskContext(
        id,
        config,
        task,
        resolve,
        reject,
        cancel,
      )

      // 处理重复请求
      switch (config.preventDuplicate) {
        case 'cancel-new':
          {
            if (this.find(id)) {
              context.reject(new CanceledError('task duplicate'))
            }
          }
          break
        case 'cancel-old':
          {
            const old = this.find(id)
            if (old) {
              if (old.isRunning) {
                old.cancel('task canceled')
                this.concurrent.splice(this.concurrent.indexOf(old), 1)
              } else {
                old.reject(new CanceledError('task duplicate'))
                this.pending.splice(this.pending.indexOf(old), 1)
              }
            }
          }
          break
        case 'link':
          {
            const old = this.find(id)
            if (old) {
              old.link(context)
              this.process()
              return
            }
          }
          break
      }

      if (this.pending.length > 0) {
        let index = this.pending.length
        for (let i = this.pending.length - 1; i > 0; i--) {
          if (this.pending[i].priority >= context.priority) {
            break
          }
          index = i
        }
        this.pending.splice(index, 0, context)
      } else {
        this.pending.push(context)
      }

      this.process()
    })
  }

  /**
   * 移除任务
   *
   * @param id 任务id
   * @returns 移除的数量
   */
  remove(id: string, reason = 'task removed') {
    const indexes: number[] = []
    for (let i = 0; i < this.pending.length; i++) {
      const context = this.pending[i]
      if (context.id === id) {
        // 倒序插入，以免 splice 删除的索引位置错误
        indexes.unshift(i)
        context.reject(new CanceledError(reason))
      }
    }
    for (const index of indexes) {
      this.pending.splice(index, 1)
    }
    return indexes.length
  }

  /**
   * 清空队列
   */
  clear(reason = 'task removed') {
    for (const context of this.pending) {
      context.reject(new CanceledError(reason))
    }
    const count = this.pending.length
    this.pending.length = 0
    return count
  }
}

export class TaskContext<T = any> {
  readonly id: string
  readonly config: RequestConfig
  readonly priority: number
  readonly task: () => Promise<T>
  readonly cancel: Canceler
  readonly links: TaskContext[] = []

  /**
   * 是否正在运行
   */
  isRunning = false

  /**
   * 是否已经完成
   */
  private isFinished = false

  private readonly _reject: (reason?: any) => void
  private readonly _resolve: (value: T) => void

  constructor(
    id: string,
    config: RequestConfig,
    task: () => Promise<T>,
    resolve: (value: T) => void,
    reject: (reason?: any) => void,
    cancel: Canceler,
  ) {
    this.id = id
    this.config = config
    this.priority = config.priority ?? RequestQueue.DEFAULT_PRIORITY
    this.task = task
    this.cancel = cancel
    this._resolve = resolve
    this._reject = reject

    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value: T) {
    if (this.isFinished) return
    this._resolve(value)
    if (this.links && this.links.length > 0) {
      // 有链接的任务
      for (const link of this.links) {
        link.resolve(value)
      }
    }
    this.links.length = 0
    this.isFinished = true
  }

  reject(reason?: any) {
    if (this.isFinished) return
    this._reject(reason)
    if (this.links && this.links.length > 0) {
      // 有链接的任务
      for (const link of this.links) {
        link.reject(reason)
      }
    }
    this.links.length = 0
    this.isFinished = true
  }

  link(content: TaskContext) {
    this.links.push(content)
  }
}
