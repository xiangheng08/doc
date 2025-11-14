import { OnionModel } from './base'

// 使用示例
interface Context {
  count: number
}

// 创建洋葱模型实例
const app = new OnionModel<Context>()

// 添加中间件 - 按顺序执行
app.use(async (ctx, next) => {
  ctx.count++
  console.log('Middleware 1 start', ctx)
  await next()
  console.log('Middleware 1 end', ctx)
})

app.use(async (ctx, next) => {
  ctx.count++
  console.log('Middleware 2 start', ctx)
  await next()
  console.log('Middleware 2 end', ctx)
})

app.use(async (ctx, next) => {
  ctx.count++
  console.log('Middleware 3 start', ctx)
  await next()
  console.log('Middleware 3 end', ctx)
})

// 执行并查看结果
async function run() {
  const context: Context = { count: 0 }
  await app.execute(context)
  console.log('Final result:', context)
}

run()

/* 输出
Middleware 1 start { count: 1 }
Middleware 2 start { count: 2 }
Middleware 3 start { count: 3 }
Middleware 3 end { count: 3 }
Middleware 2 end { count: 3 }
Middleware 1 end { count: 3 }
Final result: { count: 3 }
*/
