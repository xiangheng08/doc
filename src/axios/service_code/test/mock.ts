import Koa from 'koa'
import Router from '@koa/router'
import dayjs from 'dayjs'

const PORT = 23520

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  console.log(dayjs().format('HH:mm:ss:SSS'), ctx.method, ctx.url)
  await next()
})

router.all('/wait', async (ctx) => {
  await sleep(Number(ctx.query.ms) || random(100, 500))
  ctx.body = 'ok'
})

router.all('/error', async (ctx) => {
  await sleep(random(100, 500))
  ctx.status = 400
  ctx.body = 'error'
})

router.all('/timeout', async (ctx) => {
  await sleep(50000)
})

router.all('/api', async (ctx) => {
  await sleep(random(100, 500))
  ctx.body = {
    msg: 'ok',
  }
  ctx.type = 'json'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`mock server start on http://localhost:${PORT}`)
})

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
