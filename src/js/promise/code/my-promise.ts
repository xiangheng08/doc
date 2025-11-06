export type Resolve<T = unknown> = (value: T) => void
export type Reject = (reason: any) => void
export type Executor<T = unknown> = (
  resolve: Resolve<T>,
  reject: Reject,
) => void
export type State = 'pending' | 'fulfilled' | 'rejected'
export type OnFulfilled<T = unknown> = (value: T) => T | PromiseLike<T>
export type OnRejected = (reason: any) => any | PromiseLike<any>
export type thenCallback = {
  onFulfilled?: OnFulfilled<any>
  onRejected?: OnRejected
  resolve: Resolve<any>
  reject: Reject
}

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export class MyPromise<T = unknown> {
  /**
   * 状态
   */
  #state: State = 'pending'

  /**
   * 值
   */
  #result: T | undefined = void 0

  #thenCallbacks: thenCallback[] = []

  constructor(executor: Executor<T>) {
    const resolve: Resolve<T> = (value) => {
      if (this.#state === PENDING) {
        this.#changeState(FULFILLED, value)
      }
    }
    const reject: Reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state: State, result: T) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
  }

  #handleCallback(
    callback: OnFulfilled<any> | OnRejected | undefined,
    resolve: Resolve<any>,
    reject: Reject,
  ) {
    if (typeof callback !== 'function') {
      // callback 不是函数，状态穿透
      queueMicrotask(() => {
        if (this.#state === FULFILLED) {
          resolve(this.#result)
        } else {
          reject(this.#result)
        }
      })
      return
    }

    // callback 是函数
    queueMicrotask(() => {
      try {
        const result = callback(this.#result)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  #run() {
    if (this.#state === PENDING || this.#thenCallbacks.length === 0) return
    const { onFulfilled, onRejected, resolve, reject } =
      this.#thenCallbacks.shift()!

    if (this.#state === FULFILLED) {
      this.#handleCallback(onFulfilled, resolve, reject)
    } else {
      this.#handleCallback(onRejected, resolve, reject)
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: OnFulfilled<TResult1>,
    onRejected?: OnRejected,
  ) {
    return new MyPromise<TResult1 | TResult2>((resolve, reject) => {
      this.#thenCallbacks.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }
}
