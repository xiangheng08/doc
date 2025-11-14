export type Next = () => Promise<void>
export type Middleware<T> = (context: T, next: Next) => Promise<void>

export class OnionModel<T = any> {
  private middlewares: Middleware<T>[] = []

  // 添加中间件
  use(middleware: Middleware<T>): this {
    this.middlewares.push(middleware)
    return this
  }

  // 执行中间件链
  async execute(context: T): Promise<void> {
    const dispatch = (i: number): Promise<void> => {
      if (i >= this.middlewares.length) return Promise.resolve()

      const middleware = this.middlewares[i]
      return Promise.resolve(middleware(context, () => dispatch(i + 1)))
    }

    return dispatch(0)
  }
}
