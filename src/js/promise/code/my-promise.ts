export type PromiseResolve<T = unknown> = (
  value: T | PromiseLike<T>,
) => void
export type PromiseReject = (reason: any) => void
export type PromiseExecutor<T = unknown> = (
  resolve: PromiseResolve<T>,
  reject: PromiseReject,
) => void
export type PromiseState = 'pending' | 'fulfilled' | 'rejected'
export type PromiseOnFulfilled<T = unknown> =
  | ((value: T) => T | PromiseLike<T>)
  | undefined
  | null
export type PromiseOnRejected =
  | ((reason: any) => any | PromiseLike<any>)
  | undefined
  | null
export type OnFinally = (() => void) | undefined | null
export type PromiseThenCallback = {
  onFulfilled?: PromiseOnFulfilled<any>
  onRejected?: PromiseOnRejected
  resolve: PromiseResolve<any>
  reject: PromiseReject
}

export class MyPromise<T = unknown> {
  static readonly #PENDING = 'pending'
  static readonly #FULFILLED = 'fulfilled'
  static readonly #REJECTED = 'rejected'

  /**
   * 状态
   */
  #state: PromiseState

  /**
   * 值
   */
  #result: T | PromiseLike<T> | undefined = void 0

  #thenCallbacks: PromiseThenCallback[] = []

  constructor(executor: PromiseExecutor<T>) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function')
    }

    this.#state = MyPromise.#PENDING
    const resolve: PromiseResolve<T> = (value) => {
      if (value instanceof MyPromise) {
        // 如果 value 是 MyPromise 实例，则链接上
        value.then(
          (val) => this.#changeState(MyPromise.#FULFILLED, val),
          (reason) => this.#changeState(MyPromise.#REJECTED, reason),
        )
      } else {
        this.#changeState(MyPromise.#FULFILLED, value)
      }
    }
    const reject: PromiseReject = (reason) => {
      this.#changeState(MyPromise.#REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state: PromiseState, result: T | PromiseLike<T>) {
    if (this.#state !== MyPromise.#PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
  }

  #handleCallback(
    callback: PromiseOnFulfilled<any> | PromiseOnRejected,
    resolve: PromiseResolve<any>,
    reject: PromiseReject,
  ) {
    if (typeof callback !== 'function') {
      // callback 不是函数，状态穿透
      queueMicrotask(() => {
        if (this.#state === MyPromise.#FULFILLED) {
          resolve(this.#result)
        } else {
          reject(this.#result)
        }
      })
      return
    } else {
      // callback 是函数
      queueMicrotask(() => {
        try {
          const result = callback(this.#result)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      })
    }
  }

  #run() {
    if (
      this.#state === MyPromise.#PENDING ||
      this.#thenCallbacks.length === 0
    )
      return

    const { onFulfilled, onRejected, resolve, reject } =
      this.#thenCallbacks.shift()!

    if (this.#state === MyPromise.#FULFILLED) {
      this.#handleCallback(onFulfilled, resolve, reject)
    } else {
      this.#handleCallback(onRejected, resolve, reject)
    }

    queueMicrotask(() => {
      this.#run()
    })
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: PromiseOnFulfilled<TResult1>,
    onRejected?: PromiseOnRejected,
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

  catch<TResult = never>(
    onRejected?: PromiseOnRejected | undefined | null,
  ) {
    return this.then<T, TResult>(void 0, onRejected)
  }

  finally(onFinally?: OnFinally | undefined | null) {
    return this.then(
      (value) => {
        onFinally?.()
        return value
      },
      (reason) => {
        onFinally?.()
        throw reason
      },
    )
  }
}
