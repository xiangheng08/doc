import { EventEmitter } from './code'

// 通过 EventMap 声明事件名与参数类型
interface Events {
  start: []
  progress: [percent: number]
  done: [result: string]
  error: [message: string, code?: number]
}

const emitter = new EventEmitter<Events>()

// ---------- on / emit 基本用法 ----------
emitter.on('start', () => {
  console.log('started')
})
emitter.emit('start')

// 带参数触发
emitter.on('progress', (percent) => {
  console.log(`progress: ${percent}%`)
})
emitter.emit('progress', 50)

// 同一事件可注册多个监听器，按注册顺序依次触发
emitter.on('done', (result) => console.log(`first: ${result}`))
emitter.on('done', (result) => console.log(`second: ${result}`))
emitter.emit('done', 'ok')

// ---------- off 取消监听 ----------
function onError(message: string, code?: number) {
  console.log(`error: ${message} (${code})`)
}
emitter.on('error', onError)
emitter.emit('error', 'boom', 500) // 会触发

emitter.off('error', onError)
emitter.emit('error', 'boom', 500) // 已移除，不触发

// on 返回的取消函数，可精准移除自身
const offProgress = emitter.on('progress', (p) => console.log(p))
offProgress()

// ---------- once 只监听一次 ----------
emitter.once('done', (result) => {
  console.log(`once: ${result}`)
})
emitter.emit('done', 'first') // 触发并自动移除
emitter.emit('done', 'second') // 不再触发

// once 返回的取消函数，在触发前同样可以取消
const offOnce = emitter.once('error', (message) => console.log(message))
offOnce()
emitter.emit('error', '已取消') // 不触发

// ---------- context 绑定执行上下文 ----------
const ctx = { name: 'context' }
emitter.on(
  'start',
  function (this: { name: string }) {
    console.log(`this.name = ${this.name}`)
  },
  ctx,
)
emitter.emit('start')

// ---------- waitForEvent 等待事件 ----------
async function demo() {
  // 等待事件触发，超时未触发则 reject
  const donePromise = emitter.waitForEvent(
    'done',
    (result) => result === 'ok',
    1000,
  )
  setTimeout(() => emitter.emit('done', 'ok'), 100)
  console.log(await donePromise) // ['ok']

  // predicate 为 false 时继续等待
  const codePromise = emitter.waitForEvent(
    'error',
    (_, code) => code === 400,
    1000,
  )
  setTimeout(() => emitter.emit('error', 'bad request', 400), 100)
  console.log(await codePromise) // ['bad request', 400]

  // 超时 reject
  try {
    await emitter.waitForEvent('done', (result) => result === 'never', 100)
  } catch (e) {
    console.log('timeout:', (e as Error).message)
  }
}
demo()

// ---------- clear 清空所有监听 ----------
emitter.on('progress', () => {})
emitter.clear()
emitter.emit('progress', 100) // 无监听器，不触发
